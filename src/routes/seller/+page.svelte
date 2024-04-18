<script lang="ts">
  import { goto } from '$app/navigation';
  import MediaItem from '$lib/components/MediaItem.svelte';

  export let data;
  $: entries = data.entries;
</script>

<div class="flex min-h-dvh justify-center">
  <div class="w-full max-w-screen-xl p-6">
    <div class="flex flex-wrap gap-4">
      <!-- TODO: Seller profile -->

      <!-- Add entry button -->
      <a href="/book/add" class="card btn card-hover h-[190px] w-[135px] flex-col gap-2 xl:h-[265px] xl:w-[185px]">
        <i class="fa-solid fa-add text-2xl" />
        <p>Add new entry</p>
      </a>

      <!-- Entries -->
      {#each entries as entry (entry.id)}
        <MediaItem
          title={entry.title}
          cover={entry.coverUrl}
          price={entry.price}
          discount={entry.discount}
          on:click={() => goto('/book/' + entry.id)}
        />
      {/each}
    </div>
  </div>
</div>
