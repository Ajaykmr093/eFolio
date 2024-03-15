<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Item from './Item.svelte';

	export let data: PageData;

	const user = data.locals.user!;
	const initials = user.name.first[0] + user.name.last[0];
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="card w-full sm:max-w-sm m-4 p-6 space-y-4 md:space-y-6 sm:p-8">
		<h3 class="h3 font-bold">Profile</h3>
		<div class="flex justify-center">
			<Avatar {initials} width="w-32" rounded="rounded-full" />
		</div>
		<Item key="Name" value={user.name.full}></Item>
		<Item key="Username" value={user.username}></Item>
		<Item key="Email" value={user.email}></Item>
		<Item key="User Since" value={new Date(user.created_at).toLocaleDateString()}></Item>
		<form action="logout">
			<button type="submit" class="w-full btn variant-filled">Logout</button>
		</form>
	</div>
</div>
