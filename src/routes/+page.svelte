<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import books from '$lib/assets/books.png';
  import devices from '$lib/assets/devices.png';
  import reader from '$lib/assets/reader.png';
  import { page } from '$app/stores';
  import type { User } from '$lib/schema/user';

  $: user = $page.data.user as User;
</script>

<header class="flex h-70v w-full flex-col items-center justify-center bg-surface-700 p-4">
  <img src={logo} alt="Logo" class="mb-8 h-32 w-32 drop-shadow-lg filter" />
  <h3 class="h3 text-center font-semibold">Carry Your Stories Everywhere with eFolio</h3>
  <div class="mt-8 flex flex-row justify-center gap-4">
    {#if !user}
      <a href="/auth/signup" class="variant-filled btn">
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
<h2 class="h2 my-8 text-center font-bold">Features</h2>
<div class="mx-4 flex flex-col items-center">
  <div
    class="flex w-3/5 flex-col items-center justify-center gap-6 md:w-full md:max-w-screen-xl md:flex-row md:items-stretch"
  >
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
        <p>Customize your eFolio experience to fit your reading needs and preferences.</p>
      </section>
    </div>
  </div>
</div>
<hr class="mx-4 mt-12" />
<h2 class="h2 my-8 text-center font-bold">About</h2>
<div class="flex flex-col items-center">
  <div class="flex max-w-screen-lg flex-col items-center justify-center gap-12 px-4">
    <section>
      <p class="h6">
        eFolio is a testament to our exploration and learning journey through the realms of eBooks,
        eCommerce, and web development. Developed as a university project by Vipul and Ajay, eFolio
        encapsulates our efforts to grasp the intricacies of these domains.
      </p>
    </section>
    <section>
      <h5 class="h5 font-bold">Learning Objectives:</h5>
      <p class="h6">
        As students eager to expand our knowledge horizon, we chose the topic of eBooks and
        eCommerce for our project with the aim of gaining hands-on experience in web development,
        understanding data modeling principles, and exploring the dynamics of digital commerce.
      </p>
    </section>
    <section>
      <h5 class="h5 font-bold">Behind the Scenes:</h5>
      <p class="h6">
        Throughout the development phase of eFolio, we dived into the technical intricacies of
        creating a functional eBook platform. From designing user interfaces to implementing backend
        functionalities, every line of code and design choice reflects our journey of discovery and
        learning.
      </p>
    </section>
  </div>
</div>
<div class="mb-12"></div>
