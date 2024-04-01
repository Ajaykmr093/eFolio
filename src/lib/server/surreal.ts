import { DB_PASSWORD, DB_URL, DB_USER } from '$env/static/private';
import { connect } from '$lib/surreal';

export const db = await connect(DB_URL, { username: DB_USER, password: DB_PASSWORD });
