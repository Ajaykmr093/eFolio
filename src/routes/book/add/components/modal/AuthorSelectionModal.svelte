<script lang="ts">
  import { setContext, type SvelteComponent } from 'svelte';
  import { Tab, TabGroup, getModalStore } from '@skeletonlabs/skeleton';
  import SearchAuthorPanel from './SearchAuthorPanel.svelte';
  import AddAuthorPanel from './AddAuthorPanel.svelte';

  // Exports
  export let parent: SvelteComponent;

  // Locals
  const modalStore = getModalStore();
  const meta = $modalStore[0].meta;

  let authorId: string | null = null;
  let tabSet: number = 0;

  // Classes
  const cBase =
    'card w-modal space-y-4 p-4 shadow-xl bg-surface-100/60 dark:bg-surface-500/30 backdrop-blur-lg';
  const cHeader = 'text-2xl font-bold';

  // Set Context
  setContext('searchAuthorForm', meta.searchAuthorForm);

  // Functions
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(authorId);
    modalStore.close();
  }
</script>

{#if $modalStore[0]}
  <div class="modal-author-selection {cBase}">
    <header class={cHeader}>{$modalStore[0].title}</header>

    <TabGroup justify="justify-center" regionPanel="h-96">
      <Tab bind:group={tabSet} name="search" value={0}>Search</Tab>
      <Tab bind:group={tabSet} name="add" value={1}>Add</Tab>

      <svelte:fragment slot="panel">
        {#if tabSet === 0}
          <SearchAuthorPanel />
        {:else if tabSet === 1}
          <AddAuthorPanel />
        {/if}
      </svelte:fragment>
    </TabGroup>

    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select</button>
    </footer>
  </div>
{/if}
