import { PUBLIC_DB_NAME, PUBLIC_DB_URL, PUBLIC_DB_NS } from '$env/static/public';
import { Surreal } from 'surrealdb.js';

const MAX_RETRIES = 3;
const CONNECTION_TIMEOUT = 10000;

async function connect(url: string, auth?: { username: string; password: string }) {
  async function attemptConnection(retries: number) {
    if (retries > MAX_RETRIES) {
      throw new Error('Max retries reached, unable to connect to database.');
    }

    const db = new Surreal();

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
    ]).catch((err) => {
      console.log(err);
      console.log(`Database connection failed. Retrying...`);
      return attemptConnection(retries + 1);
    });

    console.log('Database connection successful.');
    return db;
  }

  return attemptConnection(1);
}

export const db = await connect(PUBLIC_DB_URL);
