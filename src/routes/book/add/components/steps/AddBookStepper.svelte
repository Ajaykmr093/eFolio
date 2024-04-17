<script lang="ts">
  import { getContext } from 'svelte';
  import type { SuperForm } from 'sveltekit-superforms';
  import type { z } from 'zod';
  
  import { Step, Stepper } from '$lib/components/Stepper';
  import type { AddBookSchema } from '../../schema';
  import StepAuthor from './StepAuthor.svelte';
  import StepBook from './StepBook.svelte';
  import StepPricing from './StepPricing.svelte';
  import StepPublication from './StepPublication.svelte';
  import StepResources from './StepResources.svelte';

  // Get Context
  type AddBook = z.infer<typeof AddBookSchema>;
  const sf: SuperForm<AddBook, App.Superforms.Message> = getContext('addBookSf');

  // Locals
  let currentStep = 0;
  let stepOnError = false;

  let steps: { [key: number]: string } = {
    0: 'book',
    1: 'publication',
    2: 'pricing',
    3: 'resources',
    4: 'author'
  };

  const { allErrors } = sf;

  // Functions
  function complete() {
    stepOnError = true;
  }

  // Reactive
  // Navigate to first step with error
  $: for (const [index, step] of Object.entries(steps)) {
    if (!stepOnError) break;
    let hasError = $allErrors.some((error) => error.path.split('.')[0].includes(step));
    if (hasError) {
      currentStep = parseInt(index);
      stepOnError = false;
      break;
    }
  }

  // Lock step if there are error on current step
  $: locked = $allErrors.some((e) => e.path.includes(steps[currentStep]));
</script>

<Stepper
  {currentStep}
  on:next={() => currentStep++}
  on:back={() => currentStep--}
  on:complete={complete}
  buttonCompleteType="submit"
>
  <Step {locked} regionHeader="text-lg">
    <svelte:fragment slot="header">Book</svelte:fragment>
    <StepBook />
  </Step>

  <Step {locked} regionHeader="text-lg">
    <svelte:fragment slot="header">Publication</svelte:fragment>
    <StepPublication />
  </Step>

  <Step {locked} regionHeader="text-lg">
    <svelte:fragment slot="header">Pricing</svelte:fragment>
    <StepPricing />
  </Step>

  <Step {locked} regionHeader="text-lg">
    <svelte:fragment slot="header">Resources</svelte:fragment>
    <StepResources />
  </Step>

  <Step {locked} regionHeader="text-lg">
    <svelte:fragment slot="header">Author</svelte:fragment>
    <StepAuthor />
  </Step>
</Stepper>
