import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/utils/stripe';
import { supabaseAdmin } from '@/utils/supabaseServer';
import { buffer } from 'micro'; // Import buffer from micro
import Stripe from 'stripe';

// Disable body parsing to use raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Capture the raw body using the buffer function from micro
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      let event;
      try {
        // Verify the webhook signature using the raw body
        event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
      } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return res.status(400).json({ message: 'Webhook Error' });
      }

      // Handle Stripe webhook events
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

      return res.status(200).json({ message: 'success' });
    } catch (error: any) {
      console.error('Webhook processing error:', error.message);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
