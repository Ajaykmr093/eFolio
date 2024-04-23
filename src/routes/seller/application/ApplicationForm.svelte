<script lang="ts">
  import { FileField, TextField } from '$lib/components/Input';
  import { SellerApplicationPostSchema } from '$lib/schema/seller';
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
  import { fileProxy, superForm, type SuperValidated } from 'sveltekit-superforms/client';

  type ApplicationForm = SuperValidated<Infer<typeof SellerApplicationPostSchema>>;

  // Locals
  const toastStore = getToastStore();
  export let applicationForm: ApplicationForm;

  const { form, enhance, errors } = superForm(applicationForm, {
    validators: zodClient(SellerApplicationPostSchema),
    dataType: 'json',
    onUpdated({ form }) {
      if (form.message?.type == 'error') {
        const message = form.message.text!;
        const background = 'variant-filled-error';
        const t: ToastSettings = { message, background };
        toastStore.trigger(t);
      }
    },
    onError({ result }) {
      const message = result.error.message || 'Unknown error';
      const background = 'variant-filled-error';
      const t: ToastSettings = { message, background };
      toastStore.trigger(t);
    }
  });

  const fileDocument = fileProxy(form, 'document');
</script>

<form use:enhance class="flex flex-col gap-4 md:gap-6" method="post" action="?/apply" enctype="multipart/form-data">
  <TextField label="Name" errors={$errors.name} bind:value={$form.name} />
  <TextField label="Support Email" type="email" errors={$errors.email} bind:value={$form.email} />
  <FileField label="Document" bind:files={$fileDocument} />
  <TextField label="Confirm Password" errors={$errors.password} type="password" bind:value={$form.password} />
  <button type="submit" class="variant-filled btn mt-4 w-full">Apply</button>
</form>
