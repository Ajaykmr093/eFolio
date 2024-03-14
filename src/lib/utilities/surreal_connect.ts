import { PUBLIC_DB_NAME, PUBLIC_DB_NS, PUBLIC_DB_URL } from '$env/static/public';
import { Surreal } from 'surrealdb.js';

const MAX_RETRIES = 5;
const RETRY_TIMEOUT = 2000;

export async function connectSurreal(auth?: {
	username: string;
	password: string;
}): Promise<Surreal> {
	let retries = 1;

	while (retries <= MAX_RETRIES) {
		try {
			if (retries > 1) {
				console.log(`Database connection retry, attempt ${retries}/${MAX_RETRIES}`);
			}
			const db = new Surreal();
			await db.connect(PUBLIC_DB_URL, {
				namespace: PUBLIC_DB_NS,
				database: PUBLIC_DB_NAME,
				auth
			});
			console.log('Database connection successful.');
			return db;
		} catch (error) {
			console.error('Database connection failed:', error);
			if (retries === MAX_RETRIES) {
				throw error;
			}
			retries++;
			await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
		}
	}
	throw new Error('Max retries reached, unable to connect to database.');
}
