import { DB_PASSWORD, DB_USER, PRIVATE_DB_URL } from '$env/static/private';
import { connectSurreal } from '../utilities/surreal_connect';

export const db = await connectSurreal(PRIVATE_DB_URL, {
	username: DB_USER,
	password: DB_PASSWORD
});
