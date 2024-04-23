<script lang="ts">
  import { enhance } from '$app/forms';
  import TextField from '$lib/components/Input/TextField.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: applications = data.applications;

  const cViewBtn = 'variant-glass btn-icon absolute bottom-2 right-2 brightness-200';
</script>

<div class="m-auto flex min-h-dvh max-w-screen-xl p-4">
  <div class="">
    {#each applications as item (item.id)}
      <div class="card flex w-72 flex-col gap-2 overflow-hidden p-4">
        <div class="relative">
          <img src={item.document} class="cover h-64 rounded-xl" alt="document" />
          <a class={cViewBtn} href={item.document} target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <div>
          <p class="text-sm">{item.name}</p>
          <p class="text-xs">{item.email}</p>
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
  </div>
</div>
