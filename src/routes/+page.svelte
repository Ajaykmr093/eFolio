<script>
	import logo from '$lib/assets/logo.png';
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="text-center space-y-4 m-4">
		<img src={logo} alt="Logo" class="mx-auto mb-4 w-32 h-32 filter drop-shadow-lg" />
		<h1 class="text-2xl font-semibold mb-4">Carry Your Stories Everywhere with eFolio</h1>
		<div class="flex flex-row gap-4 justify-center">
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
</div>
