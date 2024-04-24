<script lang="ts">
  import { getContext } from 'svelte';
  import type { Infer, SuperForm } from 'sveltekit-superforms/client';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import AuthorSelectionModal from '../modal/AuthorSelectionModal.svelte';
  import type { AddBookSchema } from '$lib/schema/Book';

  // Get Context
  const sf: SuperForm<Infer<typeof AddBookSchema>> = getContext('addBookSf');
  const searchAuthorForm = getContext('searchAuthorForm');
  const addAuthorForm = getContext('addAuthorForm');

  //Locals
  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: 'component',
    component: { ref: AuthorSelectionModal },
    title: 'Select Author',
    meta: { searchAuthorForm, addAuthorForm },
    response: (r) => {
      if (r) {
        $f.author = r;
      }
    }
  };

  const { form: f, errors: e } = sf;

  // Functions
  function showModal() {
    modalStore.trigger(modal);
  }
</script>

<div class="flex h-48 flex-col items-center justify-center gap-2">
  <button type="button" class="variant-filled btn" on:click={showModal}>Select Author</button>
  <input bind:value={$f.author} hidden />
  {#if $e.author}
    <div class="text-error-700-200-token text-sm">{$e.author}</div>
  {/if}
</div>
