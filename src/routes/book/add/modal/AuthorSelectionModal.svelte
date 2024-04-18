<script lang="ts">
  import { Tab, TabGroup, getModalStore } from '@skeletonlabs/skeleton';
  import SearchAuthorPanel from './SearchAuthorPanel.svelte';
  import AddAuthorPanel from './AddAuthorPanel.svelte';
  import type { SvelteComponent } from 'svelte';

  export let parent: SvelteComponent;

  // Locals
  const modalStore = getModalStore();
  const meta = $modalStore[0].meta;
  let tabSet: number = 0;

  let searchPanel: SearchAuthorPanel;
  let addPanel: AddAuthorPanel;

  // Classes
  const cBase = 'card w-modal space-y-4 p-4 shadow-xl bg-surface-100/60 dark:bg-surface-500/30 backdrop-blur-lg';
</script>

{#if $modalStore[0]}
  <div class="modal-author-selection {cBase}">
    <header class="text-2xl font-bold">{$modalStore[0].title}</header>

    <TabGroup justify="justify-center">
      <Tab bind:group={tabSet} name="search" value={0}>Search</Tab>
      <Tab bind:group={tabSet} name="add" value={1}>Add</Tab>

      <svelte:fragment slot="panel">
        <div class:hidden={tabSet != 0}>
          <SearchAuthorPanel {parent} bind:this={searchPanel} searchAuthorForm={meta.searchAuthorForm} />
        </div>
        <div class:hidden={tabSet != 1}>
          <AddAuthorPanel {parent} bind:this={addPanel} addAuthorForm={meta.addAuthorForm} />
        </div>
      </svelte:fragment>
    </TabGroup>
  </div>
{/if}
