<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { LoginSchema } from '$lib/schema/User';
  import { Checkbox, TextField } from '$lib/components/Input';
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

  // Exports
  export let data: PageData;

  // Locals
  const toastStore = getToastStore();

  const { form, enhance, errors } = superForm(data.form, {
    validators: zodClient(LoginSchema),
    dataType: 'json',
    onUpdated({ form }) {
      if (form.message?.type == 'error') {
        const text = form.message.text!;
        const background = 'variant-filled-error';
        const t: ToastSettings = { message: text, background };
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
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-sm space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Log in to your account</h3>

    <!-- Form -->
    <form use:enhance class="flex flex-col gap-4 md:gap-6" method="post">
      <TextField label="Username or email" type="text" errors={$errors.uid} bind:value={$form.uid} />
      <TextField label="Password" type="password" errors={$errors.password} bind:value={$form.password} />
      <Checkbox label="Remember me" type="checkbox" bind:checked={$form.remember} />
      <button type="submit" class="variant-filled btn mt-4 w-full">Sign in</button>
    </form>

    <!-- Form footer -->
    <p>
      <span class="text-sm font-light opacity-90">Don't have an account yet?</span>
      <a href="/signup" class="anchor text-sm font-medium">Create Account</a>
    </p>
  </div>
</div>
