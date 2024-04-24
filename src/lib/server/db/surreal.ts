import { DB_NAME, DB_NS, DB_ROOT_PASSWORD, DB_ROOT_USER, DB_URL } from '$env/static/private';
import { Surreal } from 'surrealdb.js';

export const db = new Surreal();
export const rootDB = new Surreal();

db.connect(DB_URL, {
  namespace: DB_NS,
  database: DB_NAME
});

rootDB.connect(DB_URL, {
  namespace: DB_NS,
  database: DB_NAME,
  auth: {
    username: DB_ROOT_USER,
    password: DB_ROOT_PASSWORD
  }
});
