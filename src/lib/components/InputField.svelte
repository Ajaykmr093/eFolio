<script lang="ts">
  import type { CssClasses } from '@skeletonlabs/skeleton';

  export let label: string;
  export let errorClasses: CssClasses = 'variant-ghost-error';
  export let errors: string[] | undefined = undefined;
  export let value: any | undefined = undefined;
  export let type: 'text' | 'number' | 'date' | 'file' = 'text';
  export let multiline: boolean = false;

  export let files: FileList | null | undefined = undefined;
  export let multiple: boolean = false;
  export let accept: string[] = [''];

  $: hasErrors = errors != null;
  $: _errorClasses = hasErrors ? errorClasses : '';
</script>

<label class="label">
  <p class="font-medium">{label}</p>

  {#if multiline}
    <textarea class={`input ${_errorClasses}`} bind:value aria-invalid={hasErrors} />
  {:else if type == 'text'}
    <input class={`input ${_errorClasses}`} type="text" bind:value aria-invalid={hasErrors} />
  {:else if type == 'number'}
    <input class={`input ${_errorClasses}`} type="number" bind:value aria-invalid={hasErrors} />
  {:else if type == 'date'}
    <input class={`input ${_errorClasses}`} type="date" bind:value aria-invalid={hasErrors} />
  {:else if type == 'file'}
    <input
      class={`input ${_errorClasses}`}
      type="file"
      bind:files
      aria-invalid={hasErrors}
      {multiple}
      accept={accept.join(', ')}
    />
  {/if}

  {#if errors}
    {#each errors as err}
      <div class="text-error-700-200-token text-sm">{err}</div>
    {/each}
  {/if}
</label>
