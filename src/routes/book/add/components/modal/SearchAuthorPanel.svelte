<script lang="ts">
  import { getContext } from 'svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { SearchAuthorSchema } from '$lib/schema/author';

  // Context
  const searchAuthorForm: Record<string, unknown> = getContext('searchAuthorForm');

  // Locals
  const { form, message, enhance } = superForm(searchAuthorForm, {
    validators: zodClient(SearchAuthorSchema),
    invalidateAll: false,
    dataType: 'json'
  });

  // Classes
  const cSearchInput = 'w-full border-0 bg-transparent text-lg ring-0 focus:ring-0';

  // Reactive
  $: res = $message?.data;
  $: console.log(res);
</script>

<header class="variant-soft-surface flex items-center rounded-xl">
  <i class="fa-solid fa-magnifying-glass ml-4 text-xl"></i>
  <form use:enhance class="m-2 ml-4 w-full" method="post" action="?/searchAuthor">
    <input class={cSearchInput} type="search" bind:value={$form.q} placeholder="Search..." />
  </form>
</header>

<section></section>
