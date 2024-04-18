<script lang="ts">
  import '../app.postcss';

  import '@fortawesome/fontawesome-free/css/fontawesome.css';
  import '@fortawesome/fontawesome-free/css/brands.css';
  import '@fortawesome/fontawesome-free/css/solid.css';

  import { AppShell, initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  import Appbar from '$lib/components/MainAppbar.svelte';
  import Footer from '$lib/components/MainFooter.svelte';

  export let data;

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast />
<Modal />

<AppShell>
  <svelte:fragment slot="header"><Appbar user={data.user} /></svelte:fragment>
  <slot />
  <svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
