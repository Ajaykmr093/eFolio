<script lang="ts">
  // Exports
  export let cover: string;
  export let title: string;
  export let price: number;
  export let discount: number;

  // Classes
  const cBase = 'flex w-[135px] shrink-0 flex-col gap-3  xl:w-[185px]';
  const cBaseAnim = 'duration-300 ease-out hover:-translate-y-1 hover:brightness-125';
</script>

<button on:click class="{cBase} {cBaseAnim}">
  <div class="h-[190px] overflow-hidden rounded-lg xl:h-[265px]">
    <img class="h-full w-full object-contain brightness-90" loading="lazy" src={cover} alt="cover" {title} />
  </div>
  <div>
    <p class="line-clamp-2 text-start text-[15px] xl:text-base">{title}</p>
    <p>
      {#if discount > 0}
        <s>₹{price}</s>
      {/if}
      <span class="mx-1">
        ₹{price - price * (discount / 100)}
      </span>
    </p>
  </div>
</button>
