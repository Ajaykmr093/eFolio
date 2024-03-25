<script lang="ts">
  import { AppBar, Avatar, popup } from '@skeletonlabs/skeleton';
  import logo from '$lib/assets/logo.png';
  import type { User } from '$lib/schema/user';

  export let user: User | undefined;
  let initials: string;

  if (user) initials = user.name.first[0] + user.name.last[0];
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center w-full invisible lg:visible flex items-center justify-center"
  slotTrail="place-content-end"
>
  <svelte:fragment slot="lead">
    <a href="/" class="flex gap-2">
      <img src={logo} alt="Logo" class="w-6 object-contain" />
      <h3 class="h3 font-bold">eFolio</h3>
    </a>
  </svelte:fragment>
  <button
    class="btn variant-soft hover:variant-soft-primary rounded-full w-full justify-start max-w-sm"
    title="Search for Books, Authors and More"
  >
    <i class="fa-solid fa-search" />
    <span class="opacity-70 overflow-hidden text-ellipsis">Search for Books, Authors and More</span>
  </button>
  <svelte:fragment slot="trail">
    <a class="btn-icon lg:hidden" href="/" title="Search">
      <i class="fa-solid fa-search" />
    </a>
    {#if user}
      <div class="relative ml-2">
        <button use:popup={{ event: 'click', target: 'features' }}>
          <Avatar {initials} width="w-10" rounded="rounded-full" />
        </button>
        <!-- popup -->
        <div class="card p-4 w-60 shadow-xl" data-popup="features">
          <nav class="list-nav">
            <ul>
              <li>
                <a href="/profile">
                  <i class="fa-solid fa-user" />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="/library">
                  <i class="fa-solid fa-bookmark" />
                  <span>Library</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <i class="fa-solid fa-shop" />
                  <span>Become a seller</span>
                </a>
              </li>
              <li class="text-error-500">
                <a href="/logout">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    {/if}
  </svelte:fragment>
</AppBar>
