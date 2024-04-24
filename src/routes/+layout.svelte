<script lang="ts">
  import '../app.postcss';

  import '@fortawesome/fontawesome-free/css/fontawesome.css';
  import '@fortawesome/fontawesome-free/css/brands.css';
  import '@fortawesome/fontawesome-free/css/solid.css';

  import { AppShell, initializeStores, Modal, Toast, type ModalComponent } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  import Appbar from '$lib/components/MainAppbar.svelte';
  import Footer from '$lib/components/MainFooter.svelte';
    import AuthorSelectionModal from './book/add/modal/AuthorSelectionModal.svelte';

  export let data;

  $: user = data.user;
  $: isSeller = data.isSeller;

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


const modalRegistry: Record<string, ModalComponent> = {
	authorSelectionModal: { ref: AuthorSelectionModal },
};
</script>

<Toast rounded="rounded-xl" />
<Modal {modalRegistry} />

<AppShell>
  <!-- Appbar -->
  <svelte:fragment slot="header">
    <Appbar {user} {isSeller} />
  </svelte:fragment>

  <!-- Page -->
  <slot />

  <!-- Footer -->
  <svelte:fragment slot="pageFooter">
    <Footer />
  </svelte:fragment>
</AppShell>
