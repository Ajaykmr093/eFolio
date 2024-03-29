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
  <button
    on:click={left}
    disabled={!canScrollLeft}
    class="absolute left-0 top-0 z-[1] flex h-full w-[30px] items-center justify-center xl:w-[70px]"
  >
    <div
      class="variant-filled-surface btn-icon absolute opacity-0 transition-opacity duration-300 ease-out"
      class:opacity-80={canScrollLeft && hover}
    >
      <i class="fa-solid fa-caret-left"></i>
    </div>
    <div class="h-full w-full bg-gradient-to-r from-surface-900 to-transparent"></div>
  </button>
  <div
    bind:this={scrollContainer}
    on:scroll={parseScroll}
    class={`hide-scrollbar flex ${gap} overflow-x-scroll scroll-smooth px-5 py-5 xl:px-14`}
  >
    <slot />
  </div>
  <button
    on:click={right}
    disabled={!canScrollRight}
    class="absolute right-0 top-0 z-[1] flex h-full w-[30px] items-center justify-center xl:w-[70px]"
  >
    <div
      class="variant-filled-surface btn-icon absolute opacity-0 transition-opacity duration-300 ease-out"
      class:opacity-80={canScrollRight && hover}
    >
      <i class="fa-solid fa-caret-right"></i>
    </div>
    <div class="h-full w-full bg-gradient-to-r from-transparent to-surface-900"></div>
  </button>
</div>
