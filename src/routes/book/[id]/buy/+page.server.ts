import { SECRET_STRIPE_KEY } from '$env/static/private';
import type { Book } from '$lib/schema/Book';
import { db } from '$lib/server/db/surreal';
import Stripe from 'stripe';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const st = `SELECT * FROM ONLY $bookId;`;
  const bookId = params.id;
  const result = await db.query<[Book]>(st, { bookId });
  const book = result[0];

  const stripe = new Stripe(SECRET_STRIPE_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'inr',
    amount: Math.ceil(book.price - book.price * (book.discount / 100)) * 100,
    description: `Purchased ${book.title}.`,
    automatic_payment_methods: {
      enabled: true
    },
    metadata: {
      productId: book.id,
      userId: locals.user.id
    }
  });

  const clientSecret = paymentIntent.client_secret;
  return { book, clientSecret };
}) satisfies PageServerLoad;
