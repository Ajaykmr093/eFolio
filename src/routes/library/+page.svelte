<script lang="ts">
  import { goto } from '$app/navigation';
  import HorizontalScroll from '$lib/components/HorizontalScroll.svelte';
  import MediaItem from '$lib/components/MediaItem.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: userBoughtBooks = data.userBoughtBooks;
</script>

<div class="m-auto mx-6 my-16 max-w-screen-xl justify-between xl:mx-auto">
  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Purchased</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each userBoughtBooks as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>
</div>
