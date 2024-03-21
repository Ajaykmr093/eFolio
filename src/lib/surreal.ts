import { PUBLIC_DB_NAME, PUBLIC_DB_URL, PUBLIC_DB_NS } from '$env/static/public';
import { Surreal } from 'surrealdb.js';

const MAX_RETRIES = 3;
const CONNECTION_TIMEOUT = 10000;

async function connect(
	url: string,
	auth?: {
		username: string;
		password: string;
	}
): Promise<Surreal> {
	async function attemptConnection(retries: number): Promise<Surreal> {
		if (retries > MAX_RETRIES) {
			throw new Error('Max retries reached, unable to connect to database.');
		}

		const db = new Surreal({
			onError: () => {
				throw Error('Database connection failed.');
			}
		});

		try {
			await Promise.race([
				db.connect(url, {
					namespace: PUBLIC_DB_NS,
					database: PUBLIC_DB_NAME,
					auth
				}),
				new Promise((_, reject) =>
					setTimeout(
						() => reject(new Error('Connection attempt timed out', { cause: 'timeout' })),
						CONNECTION_TIMEOUT
					)
				)
			]);

			console.log('Database connection successful.');
			return db;
		} catch (error) {
			console.error(`Database connection failed: ${(error as Error).message}. Retrying...`);
			return attemptConnection(retries + 1);
		}
	}

	return attemptConnection(1);
}

export const db = await connect(PUBLIC_DB_URL);
