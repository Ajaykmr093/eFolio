<script lang="ts">
  import { goto } from '$app/navigation';
  import HorizontalScroll from '$lib/components/HorizontalScroll.svelte';
  import MediaItem from '$lib/components/MediaItem.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: newlyAddedBooks = data.newlyAddedBooks;
  $: randomlySelectedBooks = data.randomlySelectedBooks;
  $: newlyPublishedBooks = data.newlyPublishedBooks;
  $: oldBooks = data.oldBooks;
  $: randomAuthorName = data.randomAuthorName;
  $: booksByRandomAuthor = data.booksByRandomAuthor;
</script>

<div class="m-auto mx-6 my-16 max-w-screen-xl justify-between xl:mx-auto">
  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Recently Added</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each newlyAddedBooks as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>

  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Randoms</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each randomlySelectedBooks as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>

  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Recently published</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each newlyPublishedBooks as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>

  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Books by {randomAuthorName}</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each booksByRandomAuthor as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>

  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Classics</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each oldBooks as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>
</div>
