<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import Item from './Item.svelte';
  import { page } from '$app/stores';
  import type { User } from '$lib/schema/user';

  $: user = $page.data.user as User;
  $: initials = user.name.first[0] + user.name.last[0];
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-md space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">Profile</h3>
    <div class="flex justify-center">
      <Avatar {initials} width="w-32" rounded="rounded-full" />
    </div>
    <Item key="Name" value={user.name.full}></Item>
    <Item key="Username" value={user.username}></Item>
    <Item key="Email" value={user.email}></Item>
    <Item key="User Since" value={new Date(user.created_at).toLocaleDateString()}></Item>
    <form action="logout">
      <button type="submit" class="variant-filled btn mt-4 w-full">Logout</button>
    </form>
  </div>
</div>
