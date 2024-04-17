<script lang="ts">
  import { getContext } from 'svelte';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import AuthorSelectionModal from '../modal/AuthorSelectionModal.svelte';
  import type { AddBookSchema } from '$lib/schema/book';

  // Get Context
  type AddBook = z.infer<typeof AddBookSchema>;
  const sf: SuperForm<AddBook, App.Superforms.Message> = getContext('addBookSf');
  const searchAuthorForm = getContext('searchAuthorForm');
  const addAuthorForm = getContext('addAuthorForm');

  //Locals
  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: 'component',
    component: { ref: AuthorSelectionModal },
    title: 'Select Author',
    meta: { searchAuthorForm, addAuthorForm }
  };

  const { form: f, errors: e } = sf;

  // Functions
  function showModal() {
    modalStore.trigger(modal);
  }
</script>

<div class="flex h-48 items-center justify-center">
  <button type="button" class="variant-filled btn" on:click={showModal}>Select Author</button>
  <input bind:value={$f.author} hidden />
</div>
