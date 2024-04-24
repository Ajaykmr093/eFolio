<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { loadStripe, type Stripe, type StripeError, type StripeElements } from '@stripe/stripe-js';
  import { PUBLIC_STRIPE_KEY } from '$env/static/public';
  import { Address, Elements, PaymentElement } from 'svelte-stripe';

  export let data;
  $: book = data.book;
  $: clientSecret = data.clientSecret;

  let stripe: Stripe | null;
  let error: StripeError;
  let elements: StripeElements;
  let processing = false;

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY);
  });

  async function submit() {
    if (processing) return;
    processing = true;
    const result = await stripe!.confirmPayment({ elements, redirect: 'if_required' });
    if (result.error) {
      error = result.error;
      processing = false;
    } else {
      goto(`/book/${book.id}`);
    }
  }
</script>

<div class="flex h-dvh w-full items-center justify-center">
  <div class="card m-4 flex w-full max-w-lg flex-col gap-4 p-6 sm:p-8 md:gap-6">
    <p class="font-bold">
      Buy {book.title} at
      <span>
        {#if book.discount > 0}
          <s>₹{book.price}</s>
        {/if}
        <span class="mx-1">
          ₹{book.price - book.price * (book.discount / 100)}
        </span>
      </span>
    </p>

    {#if error}
      <div class="text-error-700-200-token text-sm">{error.message} Please try again.</div>
    {/if}

    {#if clientSecret && stripe}
      <Elements {stripe} {clientSecret} bind:elements>
        <form on:submit|preventDefault={submit}>
          <PaymentElement />
          <Address mode="billing" />
          <button class="variant-filled btn mt-4 w-full" disabled={processing}>
            {#if processing}
              Processing...
            {:else}
              Pay
            {/if}
          </button>
        </form>
      </Elements>
    {:else}
      Loading...
    {/if}
  </div>
</div>
