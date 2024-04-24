<script lang="ts">
  import { FileField } from '$lib/components/Input';
  import type { AddBookSchema } from '$lib/schema/Book';
  import { getContext } from 'svelte';
  import { fileProxy, type Infer, type SuperForm } from 'sveltekit-superforms/client';

  // Get Context
  const sf: SuperForm<Infer<typeof AddBookSchema>> = getContext('addBookSf');

  // Locals
  let { form, errors: e } = sf;
  const fileCover = fileProxy(form, 'resources.cover');
  const fileSampleBook = fileProxy(form, 'resources.sampleBook');
  const fileBook = fileProxy(form, 'resources.book');

  const allowedImgType = ['image/*'];
  const allowedBookType = ['application/pdf', 'application/epub+zip'];
</script>

<FileField label="Cover Image" accept={allowedImgType} errors={$e.resources?.cover} bind:files={$fileCover} />
<FileField label="Sample" accept={allowedBookType} errors={$e.resources?.sampleBook} bind:files={$fileSampleBook} />
<FileField label="Book" accept={allowedBookType} errors={$e.resources?.book} bind:files={$fileBook} />
