import { PUBLIC_DB_NAME, PUBLIC_DB_NS, PUBLIC_DB_URL } from '$env/static/public';
import { Surreal } from 'surrealdb.js';

export const db = new Surreal();

db.connect(PUBLIC_DB_URL, {
  namespace: PUBLIC_DB_NS,
  database: PUBLIC_DB_NAME
});
