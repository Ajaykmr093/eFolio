<script lang="ts">
  import logo from '$lib/assets/logo.png';
</script>

<div class="bg-surface-800">
  <div class="mx-auto px-4 flex max-w-screen-xl gap-6 py-6 flex-col items-start justify-start md:flex-row md:justify-between md:items-center">
    <div>
      <strong class="text-xl">
        <div class="flex gap-2">
          <img src={logo} alt="Logo" class="w-6 filter drop-shadow-lg" />
          <span>eFolio</span>
        </div>
      </strong>
      <p class="text-sm opacity-50 font-light mt-2">Carry Your Stories Everywhere with eFolio</p>
    </div>
    <div class="space-x-2 opacity-80 font-semibold">
      <a href="/" class="hover:text-primary-500">Home</a>
      <a href="/" class="hover:text-primary-500">Explore</a>
      <a href="/" class="hover:text-primary-500">Your Library</a>
      <a href="/" class="hover:text-primary-500">Profile</a>
    </div>
  </div>
  <hr />
  <p class="text-sm px-4 py-3 max-w-screen-xl m-auto opacity-90">
    Built by <a class="anchor" href="https://github.com/Ajaykmr093">Ajay</a> and
    <a class="anchor" href="https://github.com/VipulOG">Vipul</a>. The source code is available on
    <a class="anchor" href="https://github.com/Ajaykmr093/library-management">GitHub</a>.
  </p>
</div>
