<script lang="ts">
  import { goto } from '$app/navigation';
  import HorizontalScroll from '$lib/components/HorizontalScroll.svelte';
  import MediaItem from '$lib/components/MediaItem.svelte';
  import type { Author } from '$lib/schema/Author';

  export let data;

  $: book = data.book;
  $: author = book.author as Author;
  $: moreByAuthor = data.moreByAuthor;
</script>

<div class="m-auto mx-6 my-16 max-w-screen-xl justify-between xl:mx-auto">
  <div class="flex">
    <div class="flex-grow">
      <div class="flex">
        <img class="mr-4 rounded-lg md:hidden" src={book.coverUrl} width="96" alt="" />
        <div>
          <h1 class="h1 font-bold">{book.title}</h1>
          <div class="mt-1 md:mt-4">
            <a href="#/" class="anchor font-bold no-underline">{author.name}</a>
            <div class="text-xs">
              <span>{new Date(book.publishDate).toLocaleDateString()}</span> · {book.publication}
            </div>
          </div>
        </div>
      </div>
      <div class="hide-scrollbar mb-6 mt-4 flex h-16 items-stretch overflow-auto whitespace-nowrap py-3">
        <div class="flex w-24 flex-col items-center">
          <p class="h-6 text-sm font-bold">[rating]<i class="fa-solid fa-star" /></p>
          <p class="text-xs">[n] reviews</p>
        </div>
        <span class="divider-vertical m-2" />
        <div class="flex w-24 flex-col items-center">
          <p class="h-6 text-sm font-bold"><i class="fa-solid fa-book" /></p>
          <p class="text-xs">{book.bookType}</p>
        </div>
        <span class="divider-vertical m-2" />
        <div class="flex w-24 flex-col items-center">
          <p class="h-6 text-sm font-bold">{book.totalPages}</p>
          <p class="text-xs">Pages</p>
        </div>
      </div>
      <div class="flex flex-col gap-2 md:flex-row">
        <div class="flex flex-row gap-2">
          <button class="variant-filled-primary btn flex-1 md:flex-initial">Buy</button>
          <button class="variant-soft-primary btn flex-1 md:flex-initial">Free sample</button>
        </div>
        <button class="variant-soft btn">
          <i class="fa-solid fa-heart"></i>
          <p>Add to wishlist</p>
        </button>
      </div>
    </div>
    <div class="relative hidden md:block">
      <img class="rounded-lg" src={book.coverUrl} width="233" height="345" alt="" />
      <img
        class="absolute -bottom-3 left-5 -z-10 rounded-lg opacity-50 blur-md"
        src={book.coverUrl}
        width="233"
        height="345"
        alt=""
      />
    </div>
  </div>
  <div class="card mt-16 p-6">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">About this book</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <p class="mt-4 line-clamp-6 max-h-36 text-ellipsis">{book.description}</p>
  </div>
  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">More by {author.name}</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      {#each moreByAuthor as item}
        <MediaItem {...item} cover={item.coverUrl} on:click={() => goto(`/book/${item.id}`)} />
      {/each}
    </HorizontalScroll>
  </div>
  <div class="mt-16">
    <div class="flex justify-between">
      <h4 class="h4 font-bold">Recommendations</h4>
      <p><i class="fa-solid fa-chevron-right"></i></p>
    </div>
    <HorizontalScroll>
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
      <MediaItem {...book} cover={book.coverUrl} />
    </HorizontalScroll>
  </div>
</div>
