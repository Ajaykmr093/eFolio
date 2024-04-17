<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import SuperDebug from 'sveltekit-superforms';
  import { AddBookSchema } from './schema.js';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import AddBookStepper from './components/steps/AddBookStepper.svelte';
  import { setContext } from 'svelte';

  // Exoprts
  export let data;

  // Locals
  const sf = superForm(data.addBookForm, {
    validators: zodClient(AddBookSchema),
    dataType: 'json',
    invalidateAll: false,
    onError({ result }) {
      $message = {
        status: 'error',
        text: result.error.message || 'Unknown error',
        data: null
      };
    }
  });

  const { form, enhance, message } = sf;

  // Set context
  setContext('addBookSf', sf);
  setContext('searchAuthorForm', data.searchAuthorForm);
  setContext('addAuthorForm', data.addAuthorForm);

  // Classes
  const cBase = 'flex min-h-dvh w-full items-center justify-center';
  const cCard = 'card m-4 w-full max-w-xl space-y-4 p-6 sm:p-8 md:space-y-6';
  const cHeader = 'h3 font-bold';
  const cForm = 'flex flex-col gap-4 md:gap-6';
  const cAlertStatus = $message?.status ? `variant-ghost-${$message?.status}` : '';
</script>

<div class={cBase}>
  <div class={cCard}>
    <h3 class={cHeader}>Add Book</h3>

    {#if $message?.text}
      <aside class="alert ${cAlertStatus}">
        <div class="alert-message">
          <p>{$message.text}</p>
        </div>
      </aside>
    {/if}

    <form use:enhance class={cForm} method="post" action="?/add" enctype="multipart/form-data">
      <AddBookStepper />
    </form>
  </div>
</div>

<!-- Superform Debugging component -->
{#if process.env.NODE_ENV !== 'production'}
  <div class="m-auto w-1/2">
    <SuperDebug data={$form} />
  </div>
{/if}
