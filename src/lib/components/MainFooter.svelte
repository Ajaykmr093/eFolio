<script lang="ts">
  import logo from '$lib/assets/logo.png';
</script>

<div class="bg-surface-100-800-token border-t border-surface-500/10 text-sm md:text-base">
  <div class="mx-auto w-full max-w-screen-xl space-y-10 p-4 py-16 md:py-24">
    <section class="flex flex-col items-start justify-start space-y-5 md:flex-row md:justify-between md:space-y-0">
      <div class="grid grid-cols-1 place-content-start place-items-start gap-2">
        <div class="flex gap-2">
          <img src={logo} alt="Logo" class="w-6 object-contain" />
          <h3 class="h3 font-bold">eBook</h3>
        </div>
        <p class="!text-sm opacity-80">Carry Your Stories Everywhere with eBook</p>
        <span class="variant-soft badge">0.0.1</span>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ul class="space-y-3">
          <li><a href="/" class="anchor">Home</a></li>
          <li><a href="/" class="anchor">Explore</a></li>
          <li><a href="/" class="anchor">Your Library</a></li>
          <li><a href="/" class="anchor">Profile</a></li>
        </ul>
        <ul class="space-y-3">
          <li><a href="/" class="anchor">Admin portal</a></li>
          <li><a href="/seller/application" class="anchor">Become a seller</a></li>
          <li><a href="/seller" class="anchor">Seller portal</a></li>
        </ul>
      </div>
    </section>
  </div>
</div>
