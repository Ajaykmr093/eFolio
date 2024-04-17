<script lang="ts">
  import InputField from '$lib/components/InputField.svelte';

  // Locals
  let files: FileList;
  let src: string | undefined | null;
  let fileInput: HTMLInputElement;

  // Classes
  const cForm = 'flex flex-col gap-4 md:gap-6 max-w-xl m-auto';
  const cCard =
    'card card-hover m-auto h-32 w-32 flex items-center justify-center overflow-hidden rounded-full';

  // Functions
  function handleChange() {
    const file = files?.item(0);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        src = e.target?.result?.toString();
      };
    }
  }
</script>

<form class={cForm}>
  <button class={cCard} on:click={() => fileInput.click()}>
    <input bind:this={fileInput} type="file" bind:files on:change={handleChange} hidden />
    {#if src}
      <img alt="avatar" {src} class="h-full object-cover" />
    {:else}
      <i class="fa fa-user text-4xl" />
    {/if}
  </button>
  <InputField label="Name" />
  <InputField label="About" multiline />
</form>
