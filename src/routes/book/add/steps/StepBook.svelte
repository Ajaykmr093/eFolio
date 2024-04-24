<script lang="ts">
  import { NumberField, TextField } from '$lib/components/Input';
  import type { AddBookSchema } from '$lib/schema/Book';
  import { getContext } from 'svelte';
  import type { Infer, SuperForm } from 'sveltekit-superforms/client';

  // Get Context
  const sf: SuperForm<Infer<typeof AddBookSchema>> = getContext('addBookSf');

  // Locals
  let { form: f, errors: e } = sf;
</script>

<TextField label="Title" errors={$e.book?.title} bind:value={$f.book.title} />
<TextField label="Description" errors={$e.book?.description} bind:value={$f.book.description} multiline />
<TextField label="Language" errors={$e.book?.language} bind:value={$f.book.language} />
<NumberField label="Total Pages" errors={$e.book?.totalPages} bind:value={$f.book.totalPages} />
