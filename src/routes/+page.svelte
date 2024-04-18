<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import books from '$lib/assets/books.png';
  import devices from '$lib/assets/devices.png';
  import reader from '$lib/assets/reader.png';

  export let data;
</script>

<header class="bg-surface-200-700-token flex h-[70vh] w-full flex-col items-center justify-center p-4">
  <img src={logo} alt="Logo" class="mb-8 h-32 w-32 drop-shadow-lg filter" />
  <h3 class="h3 text-center font-semibold">Carry Your Stories Everywhere with eBook</h3>
  <div class="mt-8 flex flex-row justify-center gap-4">
    {#if !data.user}
      <a href="/signup" class="variant-filled btn">
        <i class="fa-solid fa-user-plus" />
        <span>Get Started</span>
      </a>
    {/if}
    <a href="/books" class="variant-filled btn">
      <i class="fa-solid fa-book-open" />
      <span>Explore</span>
    </a>
  </div>
</header>
<div class="m-auto max-w-screen-xl p-6 pt-0">
  <h2 class="h2 my-8 text-center font-bold">Features</h2>
  <div class="m-auto flex w-3/5 flex-col items-center justify-center gap-6 md:w-full md:flex-row md:items-stretch">
    <div class="card overflow-hidden">
      <header>
        <img src={books} alt="Books" />
      </header>
      <section class="space-y-4 p-4">
        <h5 class="h5 font-semibold">Millions of titles at your fingertips</h5>
        <p>Browse books, magazines, and comics, and sample them before you buy.</p>
      </section>
    </div>
    <div class="card overflow-hidden">
      <header>
        <img src={devices} alt="Devices" />
      </header>
      <section class="space-y-4 p-4">
        <h5 class="h5 font-semibold">Read on all your devices</h5>
        <p>Sign in with your account to access your books and other content on any device.</p>
      </section>
    </div>
    <div class="card overflow-hidden">
      <header>
        <img src={reader} alt="Reader" />
      </header>
      <section class="space-y-4 p-4">
        <h5 class="h5 font-semibold">Designed for every reader</h5>
        <p>Customize your eBook experience to fit your reading needs and preferences.</p>
      </section>
    </div>
  </div>
</div>
