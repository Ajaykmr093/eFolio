<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Stepper, Step, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { debounce } from 'throttle-debounce';
  import { db } from '$lib/surreal';
  import { z } from 'zod';
  import { goto } from '$app/navigation';
  import { UserSchema } from '$lib/schema/user';

  const toastStore = getToastStore();

  let validName = false;
  let validCreds = false;
  let usernameAvailable: boolean | undefined;
  let checkingUsername = false;

  const signupSchema = UserSchema.pick({
    username: true,
    email: true,
    password: true
  }).extend({
    name: UserSchema.shape.name.omit({ full: true })
  });

  const defaults: z.infer<typeof signupSchema> = {
    username: '',
    email: '',
    password: '',
    name: {
      first: '',
      last: ''
    }
  };

  const { form, enhance, errors, validate } = superForm(defaults, {
    validators: zodClient(signupSchema),
    dataType: 'json',
    taintedMessage: false
  });

  const showError = (message: string) => {
    const t: ToastSettings = { message: message, background: 'variant-filled-error' };
    toastStore.trigger(t);
  };

  const validateName = async () => {
    const a = await validate('name.first', { update: false });
    const b = await validate('name.last', { update: false });
    const c = await validate('username', { update: false });
    validName = !a && !b && !c;
  };

  const validateCreds = async () => {
    const a = await validate('email', { update: false });
    const b = await validate('password', { update: false });
    validCreds = !a && !b;
  };

  const checkUsername = () => {
    if (checkingUsername) return;
    checkingUsername = true;
    debounce(800, async () => {
      const st = 'SELECT * FROM username_lookup WHERE username = type::string($username) limit 1;';
      type Username = z.infer<typeof signupSchema.shape.username>;
      const query = await db.query<[Username[]]>(st, {
        username: $form.username.toLowerCase()
      });
      const exists = query[0][0];
      if (exists) usernameAvailable = false;
      else usernameAvailable = true;
      checkingUsername = false;
    })();
  };

  const signup = async () => {
    const { username, password, name, email } = $form;

    try {
      const token = await db.signup({ scope: 'user', name, email, username, password });
      if (!token) return showError('Authentication failed.');
      return goto('/auth/login');
    } catch (err) {
      const existsErrMsg = 'Email already exists.';
      if ((err as Error).message.includes(existsErrMsg)) {
        $errors.email = [existsErrMsg];
      } else {
        console.error(err);
        console.log('Signup failed.');
        return showError('Somthing went wrong.');
      }
    }
  };
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-sm space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Create a new account</h3>
    <form use:enhance method="post">
      <Stepper regionHeader="hidden" on:complete={signup}>
        <!-- Name -->
        <Step regionHeader="hidden" locked={!validName || !usernameAvailable || checkingUsername}>
          <div class="space-y-4 md:space-y-6" on:input={validateName}>
            <div class="flex gap-4">
              <div class="w-1/2">
                <label class="label">
                  <p class="font-medium">First Name</p>
                  <input
                    class="input"
                    class:variant-ghost-error={$errors.name?.first}
                    type="text"
                    bind:value={$form.name.first}
                    required
                  />
                  {#if $errors.name?.first}
                    <div class="text-sm text-error-500">{$errors.name.first}</div>
                  {/if}
                </label>
              </div>
              <div class="w-1/2">
                <label class="label">
                  <p class="font-medium">Last Name</p>
                  <input
                    class="input"
                    class:variant-ghost-error={$errors.name?.last}
                    type="text"
                    bind:value={$form.name.last}
                    required
                  />
                  {#if $errors.name?.last}
                    <div class="text-sm text-error-500">{$errors.name.last}</div>
                  {/if}
                </label>
              </div>
            </div>
            <label class="label">
              <p class="font-medium">Username</p>
              <input
                class="input"
                class:variant-ghost-error={$errors.username}
                bind:value={$form.username}
                on:input={checkUsername}
                required
              />
              {#if $errors.username}
                <div class="text-sm text-error-500">{$errors.username}</div>
              {:else if usernameAvailable == false}
                <div class="text-sm text-error-500">Username already taken.</div>
              {/if}
            </label>
          </div>
        </Step>

        <!-- Login Credentials -->
        <Step regionHeader="hidden" locked={!validCreds}>
          <div on:input={validateCreds} class="space-y-4 md:space-y-6">
            <label class="label">
              <p class="font-medium">Your email</p>
              <input
                class="input"
                class:variant-ghost-error={$errors.email}
                type="email"
                bind:value={$form.email}
                required
              />
              {#if $errors.email}
                <div class="text-sm text-error-500">{$errors.email}</div>
              {/if}
            </label>
            <label class="label">
              <p class="font-medium">Password</p>
              <input
                class="input"
                class:variant-ghost-error={$errors.password}
                type="password"
                bind:value={$form.password}
                required
              />
              {#if $errors.password}
                <div class="text-sm text-error-500">{$errors.password}</div>
              {/if}
            </label>
          </div>

          <!-- https://github.com/skeletonlabs/skeleton/discussions/1490#discussioncomment-5886991 -->
          <!-- Stepper does not support multi-step forms; hence, this workaround -->
          <input name="first_name" bind:value={$form.name.first} hidden />
          <input name="last_name" bind:value={$form.name.last} hidden />
          <input name="username" bind:value={$form.username} hidden />
        </Step>
      </Stepper>
    </form>
    <p>
      <span class="text-sm font-light opacity-90">Already have an account?</span>
      <a href="login" class="anchor text-sm font-medium">Login</a>
    </p>
  </div>
</div>
