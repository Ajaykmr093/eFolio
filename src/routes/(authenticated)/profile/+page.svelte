<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import Item from './Item.svelte';
  import { enhance } from '$app/forms';

  export let data;

  $: user = data.user!;
  $: initials = user.name.first[0] + user.name.last[0];
  $: joinDate = new Date(user.created_at).toLocaleDateString();
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 flex w-full max-w-sm flex-col gap-4 p-6 sm:p-8 md:gap-6">
    <h3 class="h3 font-bold">Profile</h3>
    <div class="flex justify-center">
      <Avatar {initials} width="w-32" rounded="rounded-full" />
    </div>
    <Item key="Name" value={user.name.full}></Item>
    <Item key="Username" value={user.username}></Item>
    <Item key="Email" value={user.email}></Item>
    <Item key="User Since" value={joinDate}></Item>
    <form action="/signout" method="post" use:enhance>
      <button class="variant-filled btn mt-4 w-full" type="submit">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Sign out</span>
      </button>
    </form>
  </div>
</div>
