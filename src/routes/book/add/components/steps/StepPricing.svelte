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

<InputField label="Price" type="number" errors={$e.pricing?.price} bind:value={$f.pricing.price} />
<!-- prettier-ignore -->
<InputField label="Discount" type="number" errors={$e.pricing?.discount} bind:value={$f.pricing.discount} />
