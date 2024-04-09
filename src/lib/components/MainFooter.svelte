<script lang="ts">
  import logo from '$lib/assets/logo.png';
</script>

<div class="flex flex-col items-center bg-surface-800">
  <div
    class="flex w-full max-w-screen-xl flex-col justify-between gap-4 p-4 md:flex-row md:items-center"
  >
    <div>
      <div class="flex gap-2">
        <img src={logo} alt="Logo" class="w-6 object-contain" />
        <h3 class="h3 font-bold">eBook</h3>
      </div>
      <p class="mt-2 text-sm font-light opacity-50">Carry Your Stories Everywhere with eBook</p>
    </div>
    <div class="flex flex-col gap-6 md:flex-row md:gap-16">
      <div class="flex flex-col gap-1">
        <a href="/" class="anchor">Home</a>
        <a href="/" class="anchor">Explore</a>
        <a href="/" class="anchor">Your Library</a>
        <a href="/" class="anchor">Profile</a>
      </div>
      <div class="flex flex-col gap-1">
        <a href="/" class="anchor">Admin portal</a>
        <a href="/seller/application" class="anchor">Become a seller</a>
        <a href="/seller" class="anchor">Seller portal</a>
      </div>
    </div>
  </div>
  <hr class="w-full" />
  <p class="w-full max-w-screen-xl p-4 text-sm opacity-90">
    Built by <a class="anchor" href="https://github.com/Ajaykmr093">Ajay</a>. The source code is
    available on
    <a class="anchor" href="https://github.com/Ajaykmr093/library-management">GitHub</a>.
  </p>
</div>
