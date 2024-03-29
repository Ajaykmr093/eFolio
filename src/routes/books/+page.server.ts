import type { PageServerLoad } from './$types';
import { popularBooks, trendingBooks, mostSoldBooks, booksByFavouriteAuthor } from './data';

export const load = (async () => {
  return { popularBooks, trendingBooks, mostSoldBooks, booksByFavouriteAuthor };
}) satisfies PageServerLoad;
