<script lang="ts">
  import { afterUpdate } from 'svelte';

  export let gap = 'gap-4';

  let scrollContainer: HTMLDivElement;
  let scrollLeft: number = 0;
  let scrollWidth: number = 0;
  let clientWidth: number = 0;

  let hover = false;

  afterUpdate(() => {
    parseScroll();
  });

  function parseScroll() {
    scrollLeft = scrollContainer.scrollLeft;
    scrollWidth = scrollContainer.scrollWidth;
    clientWidth = scrollContainer.clientWidth;
  }

  $: canScrollLeft = scrollLeft > 0;
  $: canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

  function left(): void {
    if (!canScrollLeft) return;
    let x = scrollLeft - clientWidth;
    scrollContainer.scroll(x, 0);
  }

  function right(): void {
    if (!canScrollRight) return;
    let x = scrollLeft + clientWidth;
    scrollContainer.scroll(x, 0);
  }
</script>

<div
  class="relative"
  class:hidden={!scrollContainer}
  on:mouseenter={() => (hover = true)}
  on:mouseleave={() => (hover = false)}
  role="region"
>
  <div class="absolute left-5 top-0 z-[1] flex h-full items-center justify-center">
    <button
      on:click={left}
      class="variant-glass btn-icon opacity-0 brightness-200 drop-shadow-lg transition-opacity duration-300 ease-out"
      class:opacity-100={canScrollLeft && hover}
    >
      <i class="fa-solid fa-caret-left"></i>
    </button>
  </div>
  <div
    bind:this={scrollContainer}
    on:scroll={parseScroll}
    class={`hide-scrollbar flex ${gap} overflow-x-scroll scroll-smooth py-5`}
  >
    <slot />
  </div>
  <div class="absolute right-5 top-0 z-[1] flex h-full items-center justify-center">
    <button
      on:click={right}
      class="variant-glass btn-icon opacity-0 brightness-200 drop-shadow-lg transition-opacity duration-300 ease-out"
      class:opacity-100={canScrollRight && hover}
    >
      <i class="fa-solid fa-caret-right"></i>
    </button>
  </div>
</div>
