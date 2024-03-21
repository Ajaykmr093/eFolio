<script>
	import logo from '$lib/assets/logo.png';
	import books from '$lib/assets/books.png';
	import devices from '$lib/assets/devices.png';
	import reader from '$lib/assets/reader.png';
</script>

<header class="w-full h-80v flex justify-center items-center bg-surface-700">
	<div class="text-center m-4">
		<img src={logo} alt="Logo" class="mx-auto mb-4 w-32 h-32 filter drop-shadow-lg" />
		<h3 class="h3 font-semibold mt-4">Carry Your Stories Everywhere with eFolio</h3>
		<div class="flex flex-row gap-4 justify-center mt-8">
			<a href="/auth/signup" class="btn variant-filled w-full">
				<i class="fa-solid fa-user-plus" />
				<span>Create Account</span>
			</a>
			<a href="/auth/login" class="btn variant-filled w-full">
				<i class="fa-solid fa-right-to-bracket" />
				<span>Login</span>
			</a>
		</div>
	</div>
</header>
<h2 class="h2 text-center font-bold m-8">Explore what eFolio can do</h2>

<div class="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 mx-12">
	<div class="card overflow-hidden max-w-lg">
		<header>
			<img src={books} alt="Books" />
		</header>
		<section class="p-4 space-y-4">
			<h5 class="h5 font-semibold">Millions of titles at your fingertips</h5>
			<p>Browse books, magazines, and comics, and sample them before you buy.</p>
		</section>
	</div>
	<div class="card overflow-hidden max-w-lg">
		<header>
			<img src={devices} alt="Devices" />
		</header>
		<section class="p-4 space-y-4">
			<h5 class="h5 font-semibold">Read on all your devices</h5>
			<p>Sign in with your account to access your books and other content on any device.</p>
		</section>
	</div>
	<div class="card overflow-hidden max-w-lg">
		<header>
			<img src={reader} alt="Reader" />
		</header>
		<section class="p-4 space-y-4">
			<h5 class="h5 font-semibold">Designed for every reader</h5>
			<p>Customize your eFolio experience to fit your reading needs and preferences.</p>
		</section>
	</div>
</div>

<div class="mb-12"></div>
