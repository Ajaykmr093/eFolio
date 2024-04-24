<script lang="ts">
  import { DateField, TextField } from '$lib/components/Input';
  import type { AddBookSchema } from '$lib/schema/Book';
  import { getContext } from 'svelte';
  import { dateProxy, type Infer, type SuperForm } from 'sveltekit-superforms/client';

  // Get Context
  const sf: SuperForm<Infer<typeof AddBookSchema>> = getContext('addBookSf');

  // Locals
  let { form: f, errors: e } = sf;
  const datePublish = dateProxy(f, 'publication.date', { format: 'date', empty: 'null' });
</script>

<DateField label="Publish Date" errors={$e.publication?.date} bind:value={$datePublish} />
<TextField label="Publication" errors={$e.publication?.name} bind:value={$f.publication.name} />
<TextField label="ISBN" errors={$e.publication?.isbn} bind:value={$f.publication.isbn} />
