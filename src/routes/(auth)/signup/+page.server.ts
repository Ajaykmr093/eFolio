import { SignupSchema } from '$lib/schema/User';
import { zod, type Infer } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { fail, message, setError, superValidate, type SuperValidated } from 'sveltekit-superforms';
import type { z } from 'zod';
import { db } from '$lib/server/db/surreal';

const usernameSchema = SignupSchema.pick({ username: true });

export const load = (async () => {
  const signupForm = await superValidate(zod(SignupSchema));
  const checkUsernameForm = await superValidate(zod(SignupSchema.pick({ username: true })));
  return { signupForm, checkUsernameForm };
}) satisfies PageServerLoad;

export const actions = {
  signup: async ({ request }) => {
    const form = await superValidate(request, zod(SignupSchema));
    const usernameAvailable = await checkUsernameAvailable(form);
    if (!form.valid || !usernameAvailable) return fail(400, { form });

    try {
      await db.signup({ scope: 'user', ...form.data });
      return message(form, { type: 'success' });
    } catch (err) {
      const existsErrMsg = 'Email already exists.';
      if ((err as Error).message.includes(existsErrMsg)) {
        return setError(form, 'email', existsErrMsg);
      }
      throw err;
    }
  },

  checkUsername: async ({ request }) => {
    const form = await superValidate(request, zod(usernameSchema));
    const usernameAvailable = await checkUsernameAvailable(form);
    if (!form.valid || !usernameAvailable) return fail(400, { form });
    else return { form };
  }
} satisfies Actions;

async function checkUsernameAvailable(form: SuperValidated<Infer<typeof usernameSchema>>) {
  type Username = z.infer<typeof usernameSchema>;
  const username = form.data.username.toLowerCase();
  const st = 'SELECT * FROM ONLY username_lookup WHERE username = $username LIMIT 1;';
  const result = await db.query<[Username]>(st, { username });
  const exists = result[0];
  if (exists) {
    setError(form, 'username', 'Username is already taken.');
    return false;
  }
  return true;
}
