<script lang="ts">
  // Exports
  export let checked: boolean | undefined = undefined;
  export let label: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;

  // Reactive
  $: hasErrors = errors != null;
</script>

<label class="label">
  <div class="flex gap-2">
    <!-- Input -->
    <input class="checkbox" aria-invalid={hasErrors} {...$$restProps} type="checkbox" bind:checked />
    <!-- Label -->
    {#if label}
      <p class="font-medium">{label}</p>
    {/if}
  </div>

  <!-- Description -->
  {#if description}
    <p class="text-sm">{description}</p>
  {/if}

  <!-- Errors -->
  {#if errors}
    {#each errors as err}
      <div class="text-error-700-200-token text-sm">{err}</div>
    {/each}
  {/if}
</label>
