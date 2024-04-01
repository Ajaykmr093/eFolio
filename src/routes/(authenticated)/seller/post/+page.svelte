<script lang="ts">
  import { dateProxy, fileProxy, superForm } from 'sveltekit-superforms';
  import { SellerBookPostSchema } from './schema.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { onDestroy } from 'svelte';

  export let data;
  const toastStore = getToastStore();

  const { form, enhance, errors, message } = superForm(data.form, {
    validators: zodClient(SellerBookPostSchema)
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

  const fileCover = fileProxy(form, 'cover');
  const fileBook = fileProxy(form, 'book');
  const datePublish = dateProxy(form, 'publishDate', { format: 'date' });
</script>

<div class="flex w-full items-center justify-center">
  <div class="m-4 w-full max-w-xl space-y-4 variant-outline-surface p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Create Post</h3>
    <form
      use:enhance
      class="flex flex-col gap-4 md:gap-6"
      method="post"
      enctype="multipart/form-data"
    >
      <label class="label">
        <p class="font-medium">Title</p>
        <input
          class="input"
          class:variant-ghost-error={$errors.title}
          type="text"
          name="title"
          bind:value={$form.title}
          required
        />
        {#if $errors.title}
          <div class="text-sm text-error-500">{$errors.title}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Description</p>
        <textarea
          class="input"
          class:variant-ghost-error={$errors.description}
          name="description"
          bind:value={$form.description}
          required
        />
        {#if $errors.description}
          <div class="text-sm text-error-500">{$errors.description}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Publish date</p>
        <input
          class="input"
          class:variant-ghost-error={$errors.publishDate}
          type="date"
          name="publishDate"
          bind:value={$datePublish}
          required
        />
        {#if $errors.publishDate}
          <div class="text-sm text-error-500">{$errors.publishDate}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Cover</p>
        <input type="file" name="cover" accept="image/png, image/jpeg" bind:files={$fileCover} />
        {#if $errors.cover}
          <div class="text-sm text-error-500">{$errors.cover}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Price</p>
        <input
          class="input"
          class:variant-ghost-error={$errors.price}
          name="price"
          type="number"
          bind:value={$form.price}
          required
        />
        {#if $errors.price}
          <div class="text-sm text-error-500">{$errors.price}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Discount</p>
        <input
          class="input"
          class:variant-ghost-error={$errors.discount}
          name="discount"
          type="number"
          max="100"
          min="0"
          bind:value={$form.discount}
          required
        />
        {#if $errors.discount}
          <div class="text-sm text-error-500">{$errors.discount}</div>
        {/if}
      </label>
      <label class="label">
        <p class="font-medium">Book</p>
        <input type="file" name="book" bind:files={$fileBook} />
        {#if $errors.book}
          <div class="text-sm text-error-500">{$errors.book}</div>
        {/if}
      </label>
      <button type="submit" class="variant-filled btn mt-4 w-full">Submit</button>
    </form>
  </div>
</div>
