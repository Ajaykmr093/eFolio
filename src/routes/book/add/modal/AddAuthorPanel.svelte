<script lang="ts">
  import { TextField, FileField } from '$lib/components/Input';
  import { AddAuthorSchema } from '$lib/schema/Author';
  import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import type { SvelteComponent } from 'svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';

  // Exports
  export let addAuthorForm: SuperValidated<Infer<typeof AddAuthorSchema>>;
  export let parent: SvelteComponent;

  // Locals
  const modalStore = getModalStore();
  const toastStore = getToastStore();

  let files: FileList;
  let src: string | undefined | null;
  let fileInput: FileField;

  const sf = superForm(addAuthorForm, {
    validators: zodClient(AddAuthorSchema),
    invalidateAll: false,
    dataType: 'json',
    onUpdated: ({ form }) => {
      if (form.message?.type == 'success') {
        const authorId = form.message.data!.result;
        if ($modalStore[0].response) $modalStore[0].response(authorId);
        modalStore.close();
      }
    },
    onError({ result }) {
      const message = result.error.message || 'Unknown error';
      const background = 'variant-filled-error';
      const t: ToastSettings = { message, background };
      toastStore.trigger(t);
    }
  });

  const { form, errors, enhance, submit: submitForm } = sf;

  // Classes
  const cForm = 'flex flex-col gap-4 md:gap-6 max-w-xl m-auto';
  const cCard = 'card card-hover m-auto h-32 w-32 flex items-center justify-center overflow-hidden rounded-full';

  // Functions
  function handleChange() {
    const file = files?.item(0);

    if (file) {
      $form.photo = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        src = e.target?.result?.toString();
      };
    }
  }
</script>

<form class={cForm} use:enhance method="post" action="?/addAuthor">
  <div class="flex flex-col items-center justify-center gap-2">
    <button class={cCard} on:click={() => fileInput.click()}>
      <FileField bind:this={fileInput} accept="image/*" bind:files on:change={handleChange} hidden />
      {#if src}
        <img alt="avatar" {src} class="h-full object-cover" />
      {:else}
        <i class="fa fa-user text-4xl" />
      {/if}
    </button>
    {#if $errors.photo}
      <div class="text-error-700-200-token text-sm">{$errors.photo}</div>
    {/if}
  </div>
  <TextField label="Name" bind:value={$form.name} errors={$errors.name} />
  <TextField label="About" bind:value={$form.about} errors={$errors.about} multiline />
</form>

<footer class="modal-footer {parent.regionFooter} mt-4 p-2">
  <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
  <button class="btn {parent.buttonPositive}" on:click={submitForm}>Create and select</button>
</footer>
