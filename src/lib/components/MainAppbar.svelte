<script lang="ts">
  import { AppBar, Avatar } from '@skeletonlabs/skeleton';
  import logo from '$lib/assets/logo.png';
  import type { User } from '$lib/schema/user';

  export let user: User | undefined;
  let initials: string;

  $: if (user) initials = user.name.first[0] + user.name.last[0];
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <div class="flex gap-2">
      <img src={logo} alt="Logo" class="w-6 object-contain" />
      <h3 class="h3 font-bold">eFolio</h3>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <div class="flex md:hidden">
      <a class="btn-icon" href="/" title="Explore">
        <i class="fa-solid fa-book-open" />
      </a>
      <a class="btn-icon" href="/" title="Your Library">
        <i class="fa-solid fa-bookmark" />
      </a>
      <a class="btn-icon" href="/" title="Become a seller">
        <i class="fa-solid fa-shop" />
      </a>
    </div>
    <div class="hidden md:flex">
      <a class="btn" href="/" title="Explore">
        <i class="fa-solid fa-book-open" />
        <span>Explore</span>
      </a>
      <a class="btn" href="/" title="Your Library">
        <i class="fa-solid fa-bookmark" />
        <span>My Library</span>
      </a>
      <a class="btn" href="/" title="Become a seller">
        <i class="fa-solid fa-shop" />
        <span>Become a Seller</span>
      </a>
    </div>
    {#if user}
      <a href="profile"><Avatar {initials} width="w-10" rounded="rounded-full" /></a>
    {/if}
  </svelte:fragment>
</AppBar>
