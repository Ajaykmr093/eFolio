<script lang="ts">
  // Global Stylesheets
  import '../app.postcss';

  // Font Awesome
  import '@fortawesome/fontawesome-free/css/fontawesome.css';
  import '@fortawesome/fontawesome-free/css/brands.css';
  import '@fortawesome/fontawesome-free/css/solid.css';

  // Components & Utilities
  import { AppShell, initializeStores, Toast } from '@skeletonlabs/skeleton';
  initializeStores();

  // Dependency: Floating UI
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  // SvelteKit Imports
  import { page } from '$app/stores';

  // Local Components
  import Appbar from '$lib/components/MainAppbar.svelte';
  import Footer from '$lib/components/MainFooter.svelte';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
  const user = data.locals.user;
</script>

<!-- Overlays -->
<Toast />

<!-- App Shell -->
<AppShell>
  <!-- Header -->
  <svelte:fragment slot="header">
    <Appbar {user} />
  </svelte:fragment>

  <!-- Page Content -->
  <slot />

  <!-- Page Footer -->
  <svelte:fragment slot="pageFooter">
    <Footer />
  </svelte:fragment>
</AppShell>
