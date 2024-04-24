<script lang="ts">
  import { enhance } from '$app/forms';
  import TextField from '$lib/components/Input/TextField.svelte';
  import { type Seller } from '$lib/schema/Seller';
  import type { PageData } from './$types';

  export let data: PageData;

  $: applications = data.applications.map((e) => ({ ...e, seller: e.seller as Seller }));

  const cViewBtn = 'variant-glass btn-icon absolute bottom-2 right-2 brightness-200';
</script>

<div class="m-auto min-h-dvh max-w-screen-xl p-4">
  <div class="flex flex-wrap">
    {#each applications as item (item.id)}
      <div class="card flex w-72 flex-col gap-2 overflow-hidden p-4">
        <div class="relative">
          <img src={item.document} class="h-64 w-full rounded-xl object-scale-down" alt="document" />
          <a class={cViewBtn} href={item.document} target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <div>
          <p class="text-sm">{item.seller.name}</p>
          <p class="text-xs">{item.seller.email}</p>
        </div>
        <form method="post" use:enhance>
          <TextField label="Remark" name="remark" />
          <div class="mt-4 flex gap-2">
            <input name="id" value={item.id} hidden />
            <button class="variant-filled btn w-full" formaction="?/approve">Approve</button>
            <button class="variant-filled-error btn w-full" formaction="?/reject">Reject</button>
          </div>
        </form>
      </div>
    {/each}
    {#if applications.length == 0}
      No applications available.
    {/if}
  </div>
</div>
