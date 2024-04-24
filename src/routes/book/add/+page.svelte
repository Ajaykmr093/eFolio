<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import AddBookStepper from './steps/AddBookStepper.svelte';
  import { setContext } from 'svelte';
  import { AddBookSchema } from '$lib/schema/Book';
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';

  // Exoprts
  export let data;

  // Locals
  const toastStore = getToastStore();

  const sf = superForm(data.addBookForm, {
    validators: zodClient(AddBookSchema),
    dataType: 'json',
    invalidateAll: false,
    onUpdated({ form }) {
      if (form.message?.type == 'success') {
        const bookId = form.message.data!.result;
        const t: ToastSettings = {
          message: 'Book Added.',
          background: 'variant-filled-success',
          action: {
            label: 'View',
            response: () => goto(`/book/${bookId}`)
          }
        };
        toastStore.trigger(t);
      }
    },
    onError({ result }) {
      const message = result.error.message || 'Unknown error';
      const background = 'variant-filled-error';
      const t: ToastSettings = { message, background };
      toastStore.trigger(t);
    }
  });

  const { enhance } = sf;

  // Set context
  setContext('addBookSf', sf);
  setContext('searchAuthorForm', data.searchAuthorForm);
  setContext('addAuthorForm', data.addAuthorForm);

  // Classes
  const cForm = 'flex flex-col gap-4 md:gap-6';
</script>

<div class="flex min-h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-md space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Add Book</h3>
    <form use:enhance class={cForm} method="post" action="?/add" enctype="multipart/form-data">
      <AddBookStepper />
    </form>
  </div>
</div>
