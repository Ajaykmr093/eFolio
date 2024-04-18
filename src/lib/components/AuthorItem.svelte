<script lang="ts">
  // Exports
  export let photo: string;
  export let name: string;
  export let selected: boolean = false;

  // Classes
  const cBase = 'w-[125px] rounded-lg overflow-hidden card';
  const cBaseAmin = 'transition-all duration-150 ease-out';
  $: cSelected = selected ? 'scale-115 shadow-lg border-4 border-surface-400-500-token' : '';
</script>

<button on:click class="{cBase} {cBaseAmin} {cSelected}">
  <img class="aspect-square object-cover" loading="lazy" src={photo} alt="author" title={name} />
  <p class="line-clamp-2 text-[15px]">{name}</p>
</button>
