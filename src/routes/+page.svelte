<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import books from '$lib/assets/books.png';
  import devices from '$lib/assets/devices.png';
  import reader from '$lib/assets/reader.png';
  import { Avatar } from '@skeletonlabs/skeleton';
</script>

<header class="w-full h-70v p-4 flex flex-col justify-center items-center bg-surface-700">
  <img src={logo} alt="Logo" class="mb-8 w-32 h-32 filter drop-shadow-lg" />
  <h3 class="h3 font-semibold text-center">Carry Your Stories Everywhere with eFolio</h3>
  <div class="flex flex-row gap-4 justify-center mt-8">
    <a href="/auth/signup" class="btn variant-filled">
      <i class="fa-solid fa-user-plus" />
      <span>Get Started</span>
    </a>
    <a href="/" class="btn variant-filled">
      <i class="fa-solid fa-book-open" />
      <span>Explore</span>
    </a>
  </div>
</header>
<h2 class="h2 text-center font-bold my-8">About</h2>
<div class="flex flex-col items-center">
  <div class="max-w-screen-lg flex flex-col items-center justify-center gap-12 px-4">
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
<hr class="mt-12 mx-4" />
<h2 class="h2 text-center font-bold my-8">Features</h2>
<div class="flex flex-col items-center mx-4">
  <div
    class="w-3/5 md:w-full md:max-w-screen-xl flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6"
  >
    <div class="card overflow-hidden">
      <header>
        <img src={books} alt="Books" />
      </header>
      <section class="p-4 space-y-4">
        <h5 class="h5 font-semibold">Millions of titles at your fingertips</h5>
        <p>Browse books, magazines, and comics, and sample them before you buy.</p>
      </section>
    </div>
    <div class="card overflow-hidden">
      <header>
        <img src={devices} alt="Devices" />
      </header>
      <section class="p-4 space-y-4">
        <h5 class="h5 font-semibold">Read on all your devices</h5>
        <p>Sign in with your account to access your books and other content on any device.</p>
      </section>
    </div>
    <div class="card overflow-hidden">
      <header>
        <img src={reader} alt="Reader" />
      </header>
      <section class="p-4 space-y-4">
        <h5 class="h5 font-semibold">Designed for every reader</h5>
        <p>Customize your eFolio experience to fit your reading needs and preferences.</p>
      </section>
    </div>
  </div>
</div>
<hr class="mt-12 mx-4" />
<h2 class="h2 text-center font-bold my-8">Team</h2>
<div class="flex flex-col items-center">
  <div class="max-w-screen-xl flex flex-col md:flex-row justify-center items-center gap-12">
    <a href="https://github.com/Ajaykmr093" target="_blank">
      <div class="flex items-center gap-4">
        <Avatar initials="AK" />
        <div>
          <h2 class="text-lg font-semibold">Ajay Kumar</h2>
          <p class="opacity-50">Maintainer</p>
        </div>
      </div>
    </a>
    <a href="https://github.com/VipulOG" target="_blank">
      <div class="flex items-center gap-4">
        <Avatar initials="VT" />
        <div>
          <h2 class="text-lg font-semibold">Vipul Tyagi</h2>
          <p class="opacity-50">Contributor</p>
        </div>
      </div>
    </a>
  </div>
</div>
<div class="mb-12"></div>
