import Stripe from 'stripe';
import { SECRET_STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { rootDB } from '$lib/server/db/surreal.js';
import type { RequestHandler } from './$types';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Webhook Error: signature not found.', {
      status: 400
    });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      return new Response(`Webhook Error: ${err.message}`, {
        status: 400
      });
    }
    throw err;
  }

  if (event.type === 'payment_intent.succeeded') {
    const { amount, metadata } = event.data.object;
    const productId = metadata.productId;
    const userId = metadata.userId;

    const st = `RELATE $userId->bought->$productId set price = $amount`;
    await rootDB.query(st, { amount, productId, userId });
  }

  return new Response(undefined);
};
