import { PUBLIC_DB_URL } from '$env/static/public';
import { connectSurreal } from './utilities/surreal_connect';

export const db = await connectSurreal(PUBLIC_DB_URL);
