<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { SignupSchema } from '$lib/schema/user';
  import { TextField } from '$lib/components/Input';
  import { debounce } from 'throttle-debounce';
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';

  // Exports
  export let data;

  // Locals
  const toastStore = getToastStore();

  const { form, enhance, errors } = superForm(data.signupForm, {
    validators: zodClient(SignupSchema),
    dataType: 'json',
    onUpdated({ form }) {
      if (form.message?.type == 'success') {
        const t: ToastSettings = {
          message: 'Account created. Sign in to continue.',
          background: 'variant-filled-success',
          action: {
            label: 'Sign In',
            response: () => goto('/signin')
          }
        };
        toastStore.trigger(t);
      }
    },
    onError({ result }) {
      const message = result.error.message || 'Unknown error';
      const background = 'variant-filled-error';
      const t: ToastSettings = { message, background };
      toastStore.trigger(t);
    }
  });

  const { submit: submitCheckUsername, enhance: usernameEnhance } = superForm(data.checkUsernameForm, {
    invalidateAll: false,
    applyAction: false,
    onUpdated({ form }) {
      $errors.username = form.errors.username;
    }
  });

  const checkUsername = debounce(300, submitCheckUsername);
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-sm space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Create a new account</h3>

    <!-- Form -->
    <form use:enhance class="flex flex-col gap-4 md:gap-6" method="post" action="?/signup">
      <div class="flex items-stretch gap-4">
        <TextField label="First Name" bind:value={$form.name.first} errors={$errors.name?.first} />
        <TextField label="Last Name" bind:value={$form.name.last} errors={$errors.name?.last} />
      </div>
      <TextField label="Email" type="email" bind:value={$form.email} errors={$errors.email} />
      <TextField label="Username" bind:value={$form.username} errors={$errors.username} on:input={checkUsername} />
      <TextField label="Password" type="password" bind:value={$form.password} errors={$errors.password} />
      <button type="submit" class="variant-filled btn mt-4 w-full">Sign up</button>
    </form>

    <!-- Form for checking username -->
    <form method="post" action="?/checkUsername" use:usernameEnhance>
      <input name="username" bind:value={$form.username} hidden />
    </form>

    <!-- Form footer -->
    <p>
      <span class="text-sm font-light opacity-90">Already have an account?</span>
      <a href="/signin" class="anchor text-sm font-medium">Sign in</a>
    </p>
  </div>
</div>
