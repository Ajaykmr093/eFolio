<script lang="ts">
  import InputField from '$lib/components/InputField.svelte';
  import type { AddBookSchema } from '$lib/schema/book';
  import { getContext } from 'svelte';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import { z } from 'zod';

  // Get Context
  type AddBook = z.infer<typeof AddBookSchema>;
  const sf: SuperForm<AddBook, App.Superforms.Message> = getContext('addBookSf');

  // Locals
  let { form: f, errors: e } = sf;
</script>

<InputField label="Title" errors={$e.book?.title} bind:value={$f.book.title} />
<!-- prettier-ignore -->
<InputField label="Description" errors={$e.book?.description} bind:value={ $f.book.description} multiline/>
<InputField label="Language" errors={$e.book?.language} bind:value={$f.book.language} />
<!-- prettier-ignore -->
<InputField label="Total Pages" type="number" errors={$e.book?.totalPages} bind:value={ $f.book.totalPages}/>
