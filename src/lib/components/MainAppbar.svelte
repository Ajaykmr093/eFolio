<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import logo from '$lib/assets/logo.png';
  import type { User } from '$lib/schema/user';
  import ProfileMenu from './ProfileMenu.svelte';

  // Exports
  export let user: User | undefined;
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center w-full invisible lg:visible flex items-center justify-center"
  slotTrail="place-content-end"
>
  <!-- Logo -->
  <svelte:fragment slot="lead">
    <a href="/" class="flex gap-2">
      <img src={logo} alt="Logo" class="w-6 object-contain" />
      <h3 class="h3 font-bold">eBook</h3>
    </a>
  </svelte:fragment>

  <!-- Search bar -->
  <button class="variant-soft btn w-full max-w-sm justify-start rounded-full hover:variant-soft-primary">
    <i class="fa-solid fa-search" />
    <span class="overflow-hidden text-ellipsis opacity-70">Search for Books, Authors and More</span>
  </button>

  <!-- Menu -->
  <svelte:fragment slot="trail">
    <a class="btn-icon lg:hidden" href="/" title="Search">
      <i class="fa-solid fa-search" />
    </a>

    {#if user}
      <ProfileMenu {user} />
    {:else}
      <a href="/signin" class="variant-filled btn">Sign in</a>
    {/if}
  </svelte:fragment>
</AppBar>
