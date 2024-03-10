import { PUBLIC_SURREALDB_URL } from '$env/static/public';
import { Surreal } from 'surrealdb.js';

const MAX_RETRIES = 5;
const RETRY_TIMEOUT = 2000;
const DB_URL = PUBLIC_SURREALDB_URL;

let _db: Surreal;

const database = {
	get instance() {
		if (!_db) {
			let retries = 1;

			const tryConnect = async () => {
				try {
					if (retries > 1)
						console.log(`Database connection retry, attempt ${retries}/${MAX_RETRIES}`);
					_db = new Surreal();

					if (!DB_URL) return null;

					await _db.connect(DB_URL, { namespace: 'eFolio', database: 'eFolio' });
				} catch (error) {
					if (retries < MAX_RETRIES) {
						retries++;
						setTimeout(tryConnect, RETRY_TIMEOUT);
					} else {
						console.log('Database connection failed.');
						throw error;
					}
				}
			};

			tryConnect();
		}

		return _db;
	}
};

export const db = database.instance;
