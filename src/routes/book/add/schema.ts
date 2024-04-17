import { AuthorSchema } from '$lib/schema/author';
import { BookSchema as OriginalSchema } from '$lib/schema/book';
import { z } from 'zod';

const BookSchema = OriginalSchema.pick({
  title: true,
  description: true,
  totalPages: true,
  language: true
});

const PublicationSchema = OriginalSchema.pick({
  isbn: true
}).extend({
  name: OriginalSchema.shape.publication,
  date: OriginalSchema.shape.publishDate
});

const PricingSchema = OriginalSchema.pick({
  price: true,
  discount: true
});

const ResourcesSchema = z.object({
  cover: z.instanceof(File),
  book: z.instanceof(File),
  sampleBook: z.instanceof(File)
});

export const AddBookSchema = z.object({
  book: BookSchema,
  publication: PublicationSchema,
  pricing: PricingSchema,
  resources: ResourcesSchema,
  author: z.string().min(3).max(20)
});

export const SearchAuthorSchema = z.object({
  q: z.string()
});

export const AddAuthorSchema = AuthorSchema.pick({ name: true, about: true });
