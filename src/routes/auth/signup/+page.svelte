<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  import { signupSchema } from './schema';
  import { zod } from 'sveltekit-superforms/adapters';
  import { Stepper, Step, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { debounce } from 'throttle-debounce';
  import { db } from '$lib/surreal';
  import { z } from 'zod';

  export let data: PageData;
  const toastStore = getToastStore();

  let validName = false;
  let validCreds = false;
  let usernameAvailable: boolean | undefined;
  let checkingUsername = false;

  const { form, enhance, errors, message, validate } = superForm(data.form, {
    validators: zod(signupSchema),
    taintedMessage: false
  });

  message.subscribe(() => {
    if ($message) {
      const t: ToastSettings = { message: $message, background: 'variant-filled-error' };
      toastStore.trigger(t);
    }
  });

  const validateName = async () => {
    const a = await validate('first_name', { update: false });
    const b = await validate('last_name', { update: false });
    const c = await validate('username', { update: false });
    validName = !a && !b && !c;
  };

  const validateCreds = async () => {
    const a = await validate('email', { update: false });
    const b = await validate('password', { update: false });
    validCreds = !a && !b;
  };

  type Username = z.infer<typeof signupSchema.shape.username>;

  const checkUsername = () => {
    if (checkingUsername) return;
    checkingUsername = true;
    debounce(800, async () => {
      const st = 'SELECT * FROM username_lookup WHERE username = type::string($username)';
      const query = await db.query<[Username[]]>(st, {
        username: $form.username.toLowerCase()
      });
      const exists = query[0][0];
      if (exists) usernameAvailable = false;
      else usernameAvailable = true;
      checkingUsername = false;
    })();
  };
</script>

<div class="flex h-screen w-full items-center justify-center">
  <div class="card m-4 w-full max-w-sm space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Create a new account</h3>
    <form use:enhance method="post">
      <Stepper regionHeader="hidden" buttonCompleteType="submit">
        <!-- Name -->
        <Step regionHeader="hidden" locked={!validName || !usernameAvailable || checkingUsername}>
          <div class="space-y-4 md:space-y-6" on:input={validateName}>
            <div class="flex gap-4">
              <div class="w-1/2">
                <label class="label">
                  <p class="font-medium">First Name</p>
                  <input
                    class="input"
                    class:variant-ghost-error={$errors.first_name}
                    title="Enter your first name"
                    type="text"
                    name="first_name"
                    placeholder="Ramu"
                    bind:value={$form.first_name}
                    required
                  />
                  {#if $errors.first_name}
                    <div class="text-sm text-error-500">{$errors.first_name}</div>
                  {/if}
                </label>
              </div>
              <div class="w-1/2">
                <label class="label">
                  <p class="font-medium">Last Name</p>
                  <input
                    class="input"
                    class:variant-ghost-error={$errors.last_name}
                    title="Enter your last name"
                    type="text"
                    name="last_name"
                    placeholder="Kaka"
                    bind:value={$form.last_name}
                    required
                  />
                  {#if $errors.last_name}
                    <div class="text-sm text-error-500">{$errors.last_name}</div>
                  {/if}
                </label>
              </div>
            </div>
            <label class="label">
              <p class="font-medium">Username</p>
              <input
                class="input"
                class:variant-ghost-error={$errors.username}
                title="Enter a username"
                type="text"
                name="username"
                placeholder="ramukaka123"
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
                title="Enter your email"
                type="email"
                name="email"
                placeholder="name@company.com"
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
                title="Enter a password"
                type="password"
                name="password"
                placeholder="••••••••"
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
          <input name="first_name" bind:value={$form.first_name} hidden />
          <input name="last_name" bind:value={$form.last_name} hidden />
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
