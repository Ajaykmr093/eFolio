<script lang="ts">
  import { superForm, type SuperValidated } from 'sveltekit-superforms/client';
  import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
  import { SearchAuthorSchema, type Author } from '$lib/schema/author';
  import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import AuthorItem from '$lib/components/AuthorItem.svelte';
  import type { SvelteComponent } from 'svelte';

  // Exports
  export let searchAuthorForm: SuperValidated<Infer<typeof SearchAuthorSchema>>;
  export let parent: SvelteComponent;

  // Locals
  const toastStore = getToastStore();
  const modalStore = getModalStore();

  let authors: Author[] = [];
  let selectedAuthorId: string | undefined;

  const sf = superForm(searchAuthorForm, {
    validators: zodClient(SearchAuthorSchema),
    invalidateAll: false,
    dataType: 'json',
    onUpdated: ({ form }) => {
      if (form.message?.type == 'success') {
        authors = form.message.data!.result as Author[];
        selectedAuthorId = undefined;
      }
    },
    onError({ result }) {
      const message = result.error.message || 'Unknown error';
      const background = 'variant-filled-error';
      const t: ToastSettings = { message, background };
      toastStore.trigger(t);
    }
  });

  const { form, enhance } = sf;

  // Functions
  function selectAuthor(author: Author) {
    if (selectedAuthorId == author.id) selectedAuthorId = undefined;
    else selectedAuthorId = author.id;
  }

  function submit() {
    if ($modalStore[0].response) $modalStore[0].response(selectedAuthorId);
    modalStore.close();
  }

  // Classes
  const cSearchInput = 'w-full border-0 bg-transparent text-lg ring-0 focus:ring-0';
</script>

<header class="variant-soft-surface flex items-center rounded-xl">
  <i class="fa-solid fa-magnifying-glass ml-4 text-xl"></i>
  <form use:enhance class="m-2 ml-4 w-full" method="post" action="?/searchAuthor">
    <input class={cSearchInput} type="search" bind:value={$form.q} placeholder="Search..." />
  </form>
</header>

<section class="flex h-full w-full flex-1 flex-wrap gap-4 p-2">
  {#each authors as item (item.id)}
    <AuthorItem
      name={item.name}
      photo={item.photo}
      on:click={() => selectAuthor(item)}
      selected={selectedAuthorId == item.id}
    />
  {/each}
</section>

<footer class="modal-footer {parent.regionFooter} mt-4 p-2">
  <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
  <button class="btn {parent.buttonPositive}" on:click={submit} disabled={selectedAuthorId == null}>Select</button>
</footer>
