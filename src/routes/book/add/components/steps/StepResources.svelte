<script lang="ts">
  import InputField from '$lib/components/InputField.svelte';
  import type { AddBookSchema } from '$lib/schema/book';
  import { getContext } from 'svelte';
  import { fileProxy, type SuperForm } from 'sveltekit-superforms/client';
  import { z } from 'zod';

  // Get Context
  type AddBook = z.infer<typeof AddBookSchema>;
  const sf: SuperForm<AddBook, App.Superforms.Message> = getContext('addBookSf');

  // Locals
  let { form, errors: e } = sf;
  const fileCover = fileProxy(form, 'resources.cover');
  const fileSampleBook = fileProxy(form, 'resources.sampleBook');
  const fileBook = fileProxy(form, 'resources.book');

  const allowedImgType = ['image/*'];
  const allowedBookType = ['application/pdf', 'application/epub+zip'];
</script>

<InputField
  label="Cover Image"
  accept={allowedImgType}
  type="file"
  errors={$e.resources?.cover}
  bind:files={$fileCover}
/>
<InputField
  label="Sample Book"
  type="file"
  accept={allowedBookType}
  errors={$e.resources?.sampleBook}
  bind:files={$fileSampleBook}
/>
<InputField
  label="Book"
  type="file"
  accept={allowedBookType}
  errors={$e.resources?.book}
  bind:files={$fileBook}
/>
