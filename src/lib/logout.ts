import { redirect, type Cookies } from '@sveltejs/kit';
import { db } from './surreal';

export const logout = async (locals: App.Locals, cookies: Cookies) => {
  locals.user = undefined;
  cookies.set('token', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1
  });
  await db.invalidate();
  return redirect(302, '/auth/login');
};
