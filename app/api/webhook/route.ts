import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/utils/stripe';
import { supabaseAdmin } from '@/utils/supabaseServer';
import { buffer } from 'micro'; // Import buffer from micro
import Stripe from 'stripe';

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false, // Disable body parsing for Stripe's raw body
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Capture the raw body using buffer
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      if (!signature) {
        console.error('Stripe signature missing');
        return res.status(400).send('Stripe signature missing');
      }

      let event;
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
      } catch (err) {
        const errorMessage = (err as Error).message; // Explicitly cast err to Error
        console.error(`Webhook signature verification failed: ${errorMessage}`);
        return res.status(400).send(`Webhook signature verification failed: ${errorMessage}`);
      }

      // Handle the checkout.session.completed event
      if (event.type === 'checkout.session.completed') {
        const session: Stripe.Checkout.Session = event.data.object;
        console.log(session);
        const userId = session.metadata?.user_id;

        // Create or update the stripe_customer_id in the stripe_customers table
        const { error } = await supabaseAdmin
          .from('stripe_customers')
          .upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            subscription_id: session.subscription,
            plan_active: true,
            plan_expires: null,
          });

        if (error) {
          console.error('Error upserting customer:', error.message);
          return res.status(500).json({ message: 'Database Error' });
        }
      }

      if (event.type === 'customer.subscription.updated') {
        const subscription: Stripe.Subscription = event.data.object;
        console.log(subscription);

        // Update the plan_expires field in the stripe_customers table
        const { error } = await supabaseAdmin
          .from('stripe_customers')
          .update({ plan_expires: subscription.cancel_at })
          .eq('subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription:', error.message);
          return res.status(500).json({ message: 'Database Error' });
        }
      }

      if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;
        console.log(subscription);

        const { error } = await supabaseAdmin
          .from('stripe_customers')
          .update({ plan_active: false, subscription_id: null })
          .eq('subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription deletion:', error.message);
          return res.status(500).json({ message: 'Database Error' });
        }
      }

      return res.status(200).json({ received: true });
    } catch (err: any) {
      console.error('Webhook processing error:', err.message);
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
