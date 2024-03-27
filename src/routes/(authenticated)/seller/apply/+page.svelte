<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { SellerApplicationSchema } from './schema';
  import { Avatar, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { onDestroy } from 'svelte';

  export let data: PageData;
  const toastStore = getToastStore();

  const { form, enhance, message, errors } = superForm(data.form, {
    validators: zod(SellerApplicationSchema),
    taintedMessage: false
  });

  const unsunbMsg = message.subscribe(() => {
    if ($message) {
      const t: ToastSettings = { message: $message, background: 'variant-filled-error' };
      toastStore.trigger(t);
    }
  });

  onDestroy(() => {
    unsunbMsg();
  });

  $: initials = $form.name
    ? $form.name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
    : 'AB';
</script>

<div class="w-full h-screen flex justify-center items-center">
  <div class="card w-full max-w-sm m-4 p-6 sm:p-8 space-y-4 md:space-y-6">
    <h3 class="h3 font-bold">Apply for seller account</h3>
    <form use:enhance class="flex flex-col gap-4 md:gap-6" method="post">
      <div class="flex items-center justify-center">
        <Avatar {initials} width="w-32" />
      </div>
      <label class="label">
        <p class="font-medium">Name</p>
        <input
          class="input"
          class:variant-ghost-error={$errors.name}
          title="Enter your name"
          type="text"
          name="name"
          placeholder="Seller Name"
          bind:value={$form.name}
          required
        />
        {#if $errors.name}
          <div class="text-error-500 text-sm">{$errors.name}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Support Email</p>
        <input
          class="input"
          class:variant-ghost-error={$errors.email}
          title="Enter your email"
          type="text"
          name="email"
          placeholder="name@company.com"
          bind:value={$form.email}
          required
        />
        {#if $errors.email}
          <div class="text-error-500 text-sm">{$errors.email}</div>
        {/if}
      </label>
      <button type="submit" class="w-full btn variant-filled mt-4">Apply</button>
    </form>
  </div>
</div>
