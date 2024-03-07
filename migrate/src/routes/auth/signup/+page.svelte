<script lang="ts">
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="card w-full sm:max-w-sm m-4">
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h3 class="h3 font-bold">Create a new account</h3>
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
				<button type="submit" class="w-full btn variant-filled">Create Account</button>
				<p>
					<span class="text-sm font-light">Already have an account?</span>
					<a href="login" class="anchor text-sm font-medium">Login</a>
				</p>
			</form>
		</div>
	</div>
</div>
