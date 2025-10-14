// app/api/create-stripe-session/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, size, quantity, productId } = body;

    const priceInCents = Math.round(price * 100);

    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    // 1. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur', // Your currency
            product_data: {
              name: `${name} (${size})`,
            },
            unit_amount: priceInCents,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/product/${productId}`,
    });
    
    // 2. RETURN the FULL session object, which contains the 'url' property
    return NextResponse.json({ session }, { status: 200 }); // <-- THIS IS KEY

  } catch (err) {
    console.error('Stripe session creation error:', err);
    return NextResponse.json({ 
      error: err.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}