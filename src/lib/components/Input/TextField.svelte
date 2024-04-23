<script lang="ts">
  // Exports
  export let value: string | number | undefined = undefined;
  export let label: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let multiline: boolean = false;

  // Reactive
  $: hasErrors = errors != null;
</script>

<label class="label">
  <!-- Label -->
  {#if label}
    <p class="font-medium">{label}</p>
  {/if}

  <!-- Input -->
  {#if multiline}
    <textarea class="input" aria-invalid={hasErrors} {...$$restProps} bind:value on:input />
  {:else}
    <input class="input" aria-invalid={hasErrors} {...$$restProps} bind:value on:input />
  {/if}

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
