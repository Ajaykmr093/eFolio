<script lang="ts">
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="card w-full sm:max-w-sm m-4">
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h3 class="h3 font-bold">Log in to your account</h3>
			<form class="space-y-4 md:space-y-6" action="#">
				<label class="label">
					<p class="font-medium">Your email</p>
					<input
						class="input"
						title="Enter your email"
						type="email"
						name="email"
						placeholder="name@company.com"
						required
					/>
				</label>
				<label class="label">
					<p class="font-medium">Password</p>
					<input
						class="input"
						title="Enter your password"
						type="password"
						name="password"
						placeholder="••••••••"
						required
					/>
				</label>
				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" />
							<p class="text-sm">Remember me</p>
						</label>
					</div>
					<a href="/" class="anchor text-sm font-medium">Forgot password?</a>
				</div>
				<button type="submit" class="w-full btn variant-filled">Login</button>
				<p>
					<span class="text-sm font-light">Don't have an account yet?</span>
					<a href="signup" class="anchor text-sm font-medium">Create Account</a>
				</p>
			</form>
		</div>
	</div>
</div>
