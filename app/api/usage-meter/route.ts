import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabaseServer';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    // Check if the user is logged in
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      throw 'missing auth token';
    }

    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (!user || userError) {
      throw 'supabase auth error';
    }

    // Check the user's active_plan status in the stripe_customers table
    const { data: customer, error: fetchError } = await supabaseAdmin
      .from('stripe_customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!customer || !customer.subscription_id || fetchError) {
      throw 'Please subscribe to a plan to download the image.';
    }

    // Create a new record in the downloads table
    const { image } = await request.json();
    await supabaseAdmin
      .from('downloads')
      .insert({ user_id: user.id, image });

    await supabaseAdmin
      .from('stripe_customers')
      .update({ total_downloads: customer.total_downloads + 1 })
      .eq('user_id', user.id);

    // Send a request to Stripe's /v1/billing/meter_events
    const usageRecord = await fetch('https://api.stripe.com/v1/billing/meter_events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, // Replace with your actual Stripe secret key
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        event_name: 'usagemeter',
        timestamp: Math.floor(Date.now() / 1000).toString(), // Unix timestamp
        'payload[stripe_customer_id]': customer.stripe_customer_id, // Stripe Customer ID from your database
        'payload[value]': '1', // Increment value for usage
      })
    }).then(res => res.json());

    console.log('Usage record response:', usageRecord);

    return NextResponse.json({ message: 'Usage record created successfully!', total_downloads: customer.total_downloads + 1 }, { status: 200 });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message || error }, { status: 500 });
  }
}
