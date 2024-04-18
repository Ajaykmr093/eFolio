<script lang="ts">
  import type { PageData } from './$types';
  import ApplicationApproved from './ApplicationApproved.svelte';
  import ApplicationRejected from './ApplicationRejected.svelte';
  import ApplicationPending from './ApplicationPending.svelte';
  import ApplicationForm from './ApplicationForm.svelte';
  import ApplicationUnknown from './ApplicationUnknown.svelte';

  // Exports
  export let data: PageData;

  // Reactive
  $: remark = data.remark ?? 'No Remark';
  $: applicationStatus = data.applicationStatus;
  $: title = applicationStatus == null ? 'Apply for seller account' : 'Application status';
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 w-full max-w-sm space-y-4 p-6 sm:p-8 md:space-y-6">
    <h3 class="h3 font-bold">{title}</h3>

    {#if applicationStatus == 'approved'}
      <ApplicationApproved />
    {:else if applicationStatus == 'rejected'}
      <ApplicationRejected {remark} />
    {:else if applicationStatus == 'pending'}
      <ApplicationPending />
    {:else if applicationStatus == undefined}
      <ApplicationForm applicationForm={data.form} />
    {:else}
      <ApplicationUnknown {applicationStatus} />
    {/if}
  </div>
</div>
