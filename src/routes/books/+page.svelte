<script lang="ts">
  import { page } from '$app/stores';
  import HorizontalScroll from '$lib/components/HorizontalScroll.svelte';
  import type { Book } from '$lib/schema/book';

  $: popularBooks = $page.data.popularBooks as Book[];
  $: trendingBooks = $page.data.trendingBooks as Book[];
  $: mostSoldBooks = $page.data.mostSoldBooks as Book[];
  $: booksByFavouriteAuthor = $page.data.booksByFavouriteAuthor as Book[];
</script>

<div class="mt-12"></div>
<div>
  <div class="px-5 xl:px-14">
    <h4 class="cursor-pointer text-lg font-bold xl:text-[20px]">Trending Books</h4>
  </div>
  <HorizontalScroll>
    {#each trendingBooks as book (book.id)}
      <a
        href="/"
        class="flex w-[135px] shrink-0 flex-col gap-3 duration-300 ease-out hover:-translate-y-1 hover:brightness-125 xl:w-[185px]"
      >
        <div class="h-[190px] overflow-hidden rounded-lg xl:h-[265px]">
          <img
            class="object-cover brightness-90"
            src={book.cover?.medium}
            alt="cover"
            title={book.title}
            loading="lazy"
          />
        </div>
        <p class="line-clamp-2 text-[15px] xl:text-base">
          {book.title}
        </p>
      </a>
    {/each}
  </HorizontalScroll>
</div>
<div class="mt-12"></div>
<div class="mt-12"></div>
<div>
  <div class="px-5 xl:px-14">
    <h4 class="cursor-pointer text-lg font-bold xl:text-[20px]">Popular Books</h4>
  </div>
  <HorizontalScroll>
    {#each popularBooks as book (book.id)}
      <a
        href="/"
        class="flex w-[135px] shrink-0 flex-col gap-3 duration-300 ease-out hover:-translate-y-1 hover:brightness-125 xl:w-[185px]"
      >
        <div class="h-[190px] overflow-hidden rounded-lg xl:h-[265px]">
          <img
            class="object-cover brightness-90"
            src={book.cover?.medium}
            alt="cover"
            title={book.title}
            loading="lazy"
          />
        </div>
        <p class="line-clamp-2 text-[15px] xl:text-base">
          {book.title}
        </p>
      </a>
    {/each}
  </HorizontalScroll>
</div>
<div class="mt-12"></div>
<div>
  <div class="px-5 xl:px-14">
    <h4 class="cursor-pointer text-lg font-bold xl:text-[20px]">Most Sold Books</h4>
  </div>
  <HorizontalScroll>
    {#each mostSoldBooks as book (book.id)}
      <a
        href="/"
        class="flex w-[135px] shrink-0 flex-col gap-3 duration-300 ease-out hover:-translate-y-1 hover:brightness-125 xl:w-[185px]"
      >
        <div class="h-[190px] overflow-hidden rounded-lg xl:h-[265px]">
          <img
            class="object-cover brightness-90"
            src={book.cover?.medium}
            alt="cover"
            title={book.title}
            loading="lazy"
          />
        </div>
        <p class="line-clamp-2 text-[15px] xl:text-base">
          {book.title}
        </p>
      </a>
    {/each}
  </HorizontalScroll>
</div>
<div class="mt-12"></div>
<div>
  <div class="px-5 xl:px-14">
    <h4 class="cursor-pointer text-lg font-bold xl:text-[20px]">By your favourite authors</h4>
  </div>
  <HorizontalScroll>
    {#each booksByFavouriteAuthor as book (book.id)}
      <a
        href="/"
        class="flex w-[135px] shrink-0 flex-col gap-3 duration-300 ease-out hover:-translate-y-1 hover:brightness-125 xl:w-[185px]"
      >
        <div class="h-[190px] overflow-hidden rounded-lg xl:h-[265px]">
          <img
            class="object-cover brightness-90"
            src={book.cover?.medium}
            alt="cover"
            title={book.title}
            loading="lazy"
          />
        </div>
        <p class="line-clamp-2 text-[15px] xl:text-base">
          {book.title}
        </p>
      </a>
    {/each}
  </HorizontalScroll>
</div>
<div class="mt-12"></div>
