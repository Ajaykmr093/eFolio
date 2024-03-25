<script lang="ts">
  import logo from '$lib/assets/logo.png';
</script>

<div class="bg-surface-800 flex flex-col items-center">
  <div
    class="p-4 max-w-screen-xl w-full flex flex-col md:flex-row md:items-center justify-between gap-4"
  >
    <div>
      <div class="flex gap-2">
        <img src={logo} alt="Logo" class="w-6 object-contain" />
        <h3 class="h3 font-bold">eFolio</h3>
      </div>
      <p class="text-sm opacity-50 font-light mt-2">Carry Your Stories Everywhere with eFolio</p>
    </div>
    <div class="space-x-2">
      <a href="/" class="anchor">Home</a>
      <a href="/" class="anchor">Explore</a>
      <a href="/" class="anchor">Your Library</a>
      <a href="/" class="anchor">Profile</a>
    </div>
  </div>
  <hr class="w-full" />
  <p class="p-4 w-full text-sm max-w-screen-xl opacity-90">
    Built by <a class="anchor" href="https://github.com/Ajaykmr093">Ajay</a> and
    <a class="anchor" href="https://github.com/VipulOG">Vipul</a>. The source code is available on
    <a class="anchor" href="https://github.com/Ajaykmr093/library-management">GitHub</a>.
  </p>
</div>
