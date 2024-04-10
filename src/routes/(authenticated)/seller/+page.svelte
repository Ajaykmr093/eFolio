<script lang="ts">
  import { page } from '$app/stores';
  import MediaEntry from '$lib/components/MediaEntry.svelte';
  import type { Book } from '$lib/schema/book';

  $: entries = $page.data.entries as Book[];
</script>

<div class="mt-12"></div>

<div>
  <div class="px-5 py-5 xl:px-14">
    <h4 class="cursor-pointer text-lg font-bold xl:text-[20px]">Your posted books</h4>
  </div>
  <div class="flex flex-wrap gap-4 px-5 xl:px-14">
    <a
      href="/seller/post"
      class="card btn-icon card-hover h-[190px] w-[135px] xl:h-[265px] xl:w-[185px]"
    >
      <i class="fa-solid fa-add" />
    </a>
    {#each entries as entry (entry.id)}
      <MediaEntry
        title={entry.title}
        cover={entry.cover_url}
        price={entry.price}
        discount={entry.discount}
      />
    {/each}
  </div>
</div>
