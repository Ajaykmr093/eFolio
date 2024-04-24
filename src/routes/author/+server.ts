import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { AddAuthorSchema, type Author } from '$lib/schema/Author';
import { db } from '$lib/server/db/surreal';
import { z } from 'zod';

export const GET: RequestHandler = async ({ url }) => {
  const q = url.searchParams.get('q');
  const st = 'SELECT * FROM author WHERE string::lowercase(name) CONTAINS string::lowercase($q) LIMIT 20';
  const result = await db.query<[Author[]]>(st, { q });
  return json(result[0]);
};

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const parsedData = AddAuthorSchema.extend({ photo: z.string() }).parse(data);
  if (!parsedData) return error(400);
  const st = 'CREATE ONLY author CONTENT $author';
  const result = await db.query<[Author]>(st, { author: parsedData });
  return json(result[0]);
};
