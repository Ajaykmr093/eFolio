<script lang="ts">
  import { afterUpdate } from 'svelte';

  // Exports
  export let gap = 'gap-4';

  // Locals
  let scrollContainer: HTMLDivElement;
  let scrollLeft: number = 0;
  let scrollWidth: number = 0;
  let clientWidth: number = 0;

  let hover = false;

  // Reactive
  $: canScrollLeft = scrollLeft > 0;
  $: canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

  // Functions
  function parseScroll() {
    scrollLeft = scrollContainer.scrollLeft;
    scrollWidth = scrollContainer.scrollWidth;
    clientWidth = scrollContainer.clientWidth;
  }

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

  function mouseenter() {
    hover = true;
  }

  function mouseleave() {
    hover = false;
  }

  // Classes
  const cButtonWrapper = 'absolute top-0 z-[1] flex h-full items-center justify-center';
  const cButtonBase = 'variant-glass btn-icon opacity-0 brightness-200 drop-shadow-lg';
  const cButtonAnim = 'transition-opacity duration-300 ease-out';
  const cButton = `${cButtonBase} ${cButtonAnim}`;

  // Events
  afterUpdate(() => parseScroll());
</script>

<div
  class="relative"
  class:hidden={!scrollContainer}
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
  role="region"
>
  <!-- Left button -->
  <div class="left-5 {cButtonWrapper}">
    <button on:click={left} class={cButton} class:opacity-100={canScrollLeft && hover}>
      <i class="fa-solid fa-caret-left"></i>
    </button>
  </div>

  <!-- Content -->
  <div
    bind:this={scrollContainer}
    on:scroll={parseScroll}
    class="hide-scrollbar flex overflow-x-scroll scroll-smooth py-5 {gap}"
  >
    <slot />
  </div>

  <!-- Right button -->
  <div class="right-5 {cButtonWrapper}">
    <button on:click={right} class={cButton} class:opacity-100={canScrollRight && hover}>
      <i class="fa-solid fa-caret-right"></i>
    </button>
  </div>
</div>
