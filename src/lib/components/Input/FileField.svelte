<script lang="ts">
  // Exports
  export let files: FileList | undefined = undefined;
  export let label: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;

  export function click() {
    fileInput.click();
  }

  // Locals
  let fileInput: HTMLInputElement;

  // Reactive
  $: hasErrors = errors != null;
</script>

<label class="label">
  <!-- Label -->
  {#if label}
    <p class="font-medium">{label}</p>
  {/if}

  <!-- Input -->
  <input
    bind:this={fileInput}
    class="input"
    aria-invalid={hasErrors}
    {...$$restProps}
    type="file"
    bind:files
    on:change
    on:input
  />

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
