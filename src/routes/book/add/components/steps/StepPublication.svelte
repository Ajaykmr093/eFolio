<script lang="ts">
  import InputField from '$lib/components/InputField.svelte';
  import type { AddBookSchema } from '$lib/schema/book';
  import { getContext } from 'svelte';
  import { dateProxy, type SuperForm } from 'sveltekit-superforms/client';
  import { z } from 'zod';

  // Get Context
  type AddBook = z.infer<typeof AddBookSchema>;
  const sf: SuperForm<AddBook, App.Superforms.Message> = getContext('addBookSf');

  // Locals
  let { form: f, errors: e } = sf;
  const datePublish = dateProxy(f, 'publication.date', { format: 'date', empty: 'null' });
</script>

<!-- prettier-ignore -->
<InputField label="Publish Date" type="date" errors={$e.publication?.date} bind:value={$datePublish} />
<InputField label="Publication" errors={$e.publication?.name} bind:value={$f.publication.name} />
<InputField label="ISBN" errors={$e.publication?.isbn} bind:value={$f.publication.isbn} />
