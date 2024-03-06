<!-- Layout: (root) -->
<script lang="ts">
	// Global Stylesheets
	import '../app.postcss';
	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';

	// Components & Utilities
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	// Dependency: Floating UI
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl">eFolio</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Content -->
	<slot />

	<!-- Page Footer -->
	<svelte:fragment slot="pageFooter">
		<AppBar>
			Built by
			<a class="anchor" href="https://github.com/Ajaykmr093">Ajay</a>
			and
			<a class="anchor" href="https://github.com/VipulOG">Vipul</a>. The source code is available on
			<a class="anchor" href="https://github.com/Ajaykmr093/library-management">GitHub</a>.
		</AppBar>
	</svelte:fragment>
</AppShell>
