<script lang="ts">
  import { page } from '$app/stores';
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
      <a
        href="/"
        class="flex w-[135px] shrink-0 flex-col gap-3 duration-300 ease-out hover:-translate-y-1 hover:brightness-125 xl:w-[185px]"
      >
        <div class="h-[190px] overflow-hidden rounded-lg xl:h-[265px]">
          <img
            class="object-contain brightness-90"
            src={entry.cover_url}
            alt="cover"
            title={entry.title}
            loading="lazy"
          />
        </div>
        <p class="line-clamp-2 text-[15px] xl:text-base">
          {entry.title}
        </p>
      </a>
    {/each}
  </div>
</div>
