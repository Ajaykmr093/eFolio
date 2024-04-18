<script lang="ts">
  import { NumberField } from '$lib/components/Input';
  import type { AddBookSchema } from '$lib/schema/book';
  import { getContext } from 'svelte';
  import type { Infer, SuperForm } from 'sveltekit-superforms/client';

  // Get Context
  const sf: SuperForm<Infer<typeof AddBookSchema>> = getContext('addBookSf');

  // Locals
  let { form: f, errors: e } = sf;
</script>

<NumberField label="Price" errors={$e.pricing?.price} bind:value={$f.pricing.price} />
<NumberField label="Discount" errors={$e.pricing?.discount} bind:value={$f.pricing.discount} />
