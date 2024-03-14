<script lang="ts">
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	export let data: PageData;
	const toastStore = getToastStore();

	const { form, enhance, errors, message } = superForm(data.form, {
		validators: zod(schema),
		taintedMessage: false
	});

	message.subscribe(() => {
		if ($message) {
			const t: ToastSettings = { message: $message, background: 'variant-filled-error' };
			toastStore.trigger(t);
		}
	});
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="card w-full sm:max-w-sm m-4">
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h3 class="h3 font-bold">Log in to your account</h3>
			<form use:enhance class="space-y-4 md:space-y-6" method="post">
				<label class="label">
					<p class="font-medium">Username or email</p>
					<input
						class="input"
						class:variant-ghost-error={$errors.uid}
						title="Enter your username or email"
						type="text"
						name="uid"
						placeholder="name@company.com"
						bind:value={$form.uid}
						required
					/>
					{#if $errors.uid}
						<div class="text-error-500 text-sm">{$errors.uid}</div>
					{/if}
				</label>
				<label class="label">
					<p class="font-medium">Password</p>
					<input
						class="input"
						class:variant-ghost-error={$errors.password}
						title="Enter your password"
						type="password"
						name="password"
						placeholder="••••••••"
						bind:value={$form.password}
						required
					/>
					{#if $errors.password}
						<div class="text-error-500 text-sm">{$errors.password}</div>
					{/if}
				</label>
				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<label class="flex items-center space-x-2">
							<input name="remember" class="checkbox" type="checkbox" bind:checked={$form.remember} />
							<p class="text-sm">Remember me</p>
						</label>
					</div>
					<!-- <a href="/" class="anchor text-sm font-medium">Forgot password?</a> -->
				</div>
				<button type="submit" class="w-full btn variant-filled">Login</button>
			</form>
			<p>
				<span class="text-sm font-light">Don't have an account yet?</span>
				<a href="signup" class="anchor text-sm font-medium">Create Account</a>
			</p>
		</div>
	</div>
</div>
