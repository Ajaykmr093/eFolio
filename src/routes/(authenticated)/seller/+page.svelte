<script lang="ts">
  import { page } from '$app/stores';
  import type { SellerBookEntry } from './schema';

  $: entries = $page.data.entries as SellerBookEntry[];
  $: verifiedWarn = !$page.data.isVerfied as boolean;
</script>

<div class="mt-12"></div>

{#if verifiedWarn}
  <aside class="alert variant-ghost mx-5">
    <div><i class="fa-solid fa-triangle-exclamation text-3xl"></i></div>
    <div class="alert-message">
      <h3 class="h3">Warning</h3>
      <p>
        Your seller account is not verified. Your entries will be posted after your account gets
        verified.
      </p>
    </div>
    <div class="alert-actions">
      <button class="variant-filled-surface btn" on:click={() => (verifiedWarn = false)}>
        OK
      </button>
    </div>
  </aside>
{/if}

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
            src={entry.book.cover?.medium}
            alt="cover"
            title={entry.book.title}
            loading="lazy"
          />
        </div>
        <p class="line-clamp-2 text-[15px] xl:text-base">
          {entry.book.title}
        </p>
      </a>
    {/each}
  </div>
</div>
