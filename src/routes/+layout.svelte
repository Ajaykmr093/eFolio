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

  import Appbar from '../lib/components/MainAppbar.svelte';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  function matchFooterBlacklist(pageUrlPath: string): boolean {
    if (pageUrlPath.includes('/auth')) return true;
    return false;
  }

  // Disable footer on auth page
  $: footerVisible = matchFooterBlacklist($page.url.pathname) ? 'hidden' : '';
</script>

<!-- Overlays -->
<Toast />

<!-- App Shell -->
<AppShell>
  <!-- Header -->
  <svelte:fragment slot="header">
    <Appbar user={data.locals.user}></Appbar>
  </svelte:fragment>

  <!-- Page Content -->
  <slot />

  <!-- Page Footer -->
  <svelte:fragment slot="pageFooter">
    <div class="text-center bg-surface-800 p-6">
      Built by
      <a class="anchor" href="https://github.com/Ajaykmr093">Ajay</a>
      and
      <a class="anchor" href="https://github.com/VipulOG">Vipul</a>. The source code is available on
      <a class="anchor" href="https://github.com/Ajaykmr093/library-management">GitHub</a>.
    </div>
  </svelte:fragment>
</AppShell>
