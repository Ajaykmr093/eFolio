import { SECRET_STRIPE_KEY } from '$env/static/private';
import type { Book } from '$lib/schema/Book';
import { db } from '$lib/server/db/surreal';
import Stripe from 'stripe';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const st = `SELECT * FROM ONLY book:1vov3uei3itih5dv09xd;`;
  const bookId = params.id;
  const result = await db.query<[Book]>(st, { bookId });
  const book = result[0];

  const stripe = new Stripe(SECRET_STRIPE_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(book.price - (book.price * (book.discount / 100))),
    currency: 'inr',
    description: `Purchased ${book.title}.`,
    automatic_payment_methods: {
      enabled: true
    }
  });

  const clientSecret = paymentIntent.client_secret;
  return { book, clientSecret };
}) satisfies PageServerLoad;
