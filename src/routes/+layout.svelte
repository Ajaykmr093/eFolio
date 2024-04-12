<script lang="ts">
  import '../app.postcss';

  import '@fortawesome/fontawesome-free/css/fontawesome.css';
  import '@fortawesome/fontawesome-free/css/brands.css';
  import '@fortawesome/fontawesome-free/css/solid.css';

  import { AppShell, initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
  initializeStores();

  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  import { page } from '$app/stores';

  import Appbar from '$lib/components/MainAppbar.svelte';
  import Footer from '$lib/components/MainFooter.svelte';

  $: user = $page.data.user;
</script>

<Toast />
<Modal />

<AppShell>
  <svelte:fragment slot="header">
    <Appbar {user} />
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="pageFooter">
    <Footer />
  </svelte:fragment>
</AppShell>
