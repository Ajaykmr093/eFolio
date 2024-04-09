<script lang="ts">
  import type { PageData } from './$types';
  import { fileProxy, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { SellerApplicationSchema } from './schema';
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { onDestroy } from 'svelte';
  import { page } from '$app/stores';

  export let data: PageData;
  const toastStore = getToastStore();

  const { form, enhance, message, errors } = superForm(data.form, {
    validators: zod(SellerApplicationSchema),
    taintedMessage: false
  });

  const unsubMsg = message.subscribe(() => {
    if ($message) {
      const t: ToastSettings = { message: $message, background: 'variant-filled-error' };
      toastStore.trigger(t);
    }
  });

  const fileDocument = fileProxy(form, 'document');
  $: applicationStatus = $page.data.applicationStatus as string;
  $: remark = $page.data.remark as string;
  $: title = applicationStatus == undefined ? 'Apply for seller account' : 'Application status';

  onDestroy(() => unsubMsg());
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-sm space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">{title}</h3>
    {#if applicationStatus == 'approved'}
      <p>
        Youre application is approved. You are now eligible to access
        <a href="/seller" class="anchor">seller portal</a>.
      </p>
    {:else if applicationStatus == 'rejected'}
      <p>Youre application is rejected.</p>
      <p>REMARK: {remark}</p>
    {:else if applicationStatus == 'pending'}
      <p>
        You already have a pending application request. It can take upto 48 hours to verify your
        application.
      </p>
    {:else if applicationStatus == undefined}
      <form
        use:enhance
        class="flex flex-col gap-4 md:gap-6"
        method="post"
        enctype="multipart/form-data"
      >
        <label class="label">
          <p class="font-medium">Name</p>
          <input
            class="input"
            class:variant-ghost-error={$errors.name}
            name="name"
            bind:value={$form.name}
            required
          />
          {#if $errors.name}
            <div class="text-sm text-error-500">{$errors.name}</div>
          {/if}
        </label>
        <label class="label">
          <p class="font-medium">Support Email</p>
          <input
            class="input"
            class:variant-ghost-error={$errors.email}
            type="email"
            name="email"
            bind:value={$form.email}
            required
          />
          {#if $errors.email}
            <div class="text-sm text-error-500">{$errors.email}</div>
          {/if}
        </label>
        <label class="label">
          <p class="font-medium">Document</p>
          <input type="file" name="document" bind:files={$fileDocument} />
          {#if $errors.document}
            <div class="text-sm text-error-500">{$errors.document}</div>
          {/if}
        </label>
        <label class="label">
          <p class="font-medium">Confirm Password</p>
          <input
            class="input"
            class:variant-ghost-error={$errors.password}
            type="password"
            name="password"
            bind:value={$form.password}
            required
          />
          {#if $errors.password}
            <div class="text-sm text-error-500">{$errors.password}</div>
          {/if}
        </label>
        <button type="submit" class="variant-filled btn mt-4 w-full">Apply</button>
      </form>
    {:else}
      <p>
        Unknown application status: {applicationStatus}
      </p>
    {/if}
  </div>
</div>
