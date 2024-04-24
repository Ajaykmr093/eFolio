<script lang="ts">
  import { enhance } from '$app/forms';
  import type { User } from '$lib/schema/User';
  import { Avatar, popup } from '@skeletonlabs/skeleton';

  export let user: User;
  export let isSeller: boolean;

  let initials: string;
  $: if (user) initials = user.name.first[0] + user.name.last[0];
</script>

<div class="relative ml-2 flex items-center">
  <button use:popup={{ event: 'click', target: 'features' }}>
    <Avatar {initials} background="variant-soft-surface" width="w-10" rounded="rounded-full" />
  </button>

  <!-- popup -->
  <div class="card w-60 p-4 shadow-xl" data-popup="features">
    <nav class="list-nav">
      <ul>
        <li>
          <a href="/profile">
            <i class="fa fa-user" />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="/library">
            <i class="fa fa-bookmark" />
            <span>Library</span>
          </a>
        </li>
        <li>
          {#if isSeller}
            <a href="/seller">
              <i class="fa-solid fa-shop" />
              <span>Seller Portal</span>
            </a>
          {:else}
            <a href="/seller/application">
              <i class="fa-solid fa-shop" />
              <span>Become a seller</span>
            </a>
          {/if}
        </li>
        {#if user.isAdmin}
          <li>
            <a href="/admin">
              <i class="fa-solid fa-user-tie" />
              <span>Admin Portal</span>
            </a>
          </li>{/if}
      </ul>
    </nav>
    <hr class="my-2" />
    <form action="/signout" method="post" use:enhance>
      <button class="variant-filled btn w-full justify-start" type="submit">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Sign out</span>
      </button>
    </form>
  </div>
</div>
