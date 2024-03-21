<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import logo from '$lib/assets/logo.png';
	import { type User } from '$types';

	export let user: User | undefined;
	let initials: string;

	$: if (user) initials = user.name.first[0] + user.name.last[0];
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<strong class="text-xl">
			<a href="/" class="flex gap-2">
				<img src={logo} alt="Logo" class="w-6 filter drop-shadow-lg" />
				<span>eFolio</span>
			</a>
		</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex md:hidden space-x-2">
			<a class="btn-icon" href="/" title="Browse">
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
			<a class="btn" href="/" title="Browse">
				<i class="fa-solid fa-book-open" />
				<span>Browse</span>
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
			<a href="profile"><Avatar {initials} width="w-12" rounded="rounded-full" /></a>
		{/if}
	</svelte:fragment>
</AppBar>
