import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';

export async function POST(request: Request) {
    try {
        const { priceId, email, userId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            metadata: {
                user_id: userId,
            },
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [
                {
                    // base subscription
                    price: priceId,
                },
            ],
            mode: 'subscription',
            success_url: `${request.headers.get('origin')}/user`,
            cancel_url: `${request.headers.get('origin')}/user`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}