import { DB_PASSWORD, DB_USER } from '$env/static/private';
import { connectSurreal } from '../utilities/surreal_connect';

export const db = await connectSurreal({
	username: DB_USER,
	password: DB_PASSWORD
});
