<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props();

	const { form, errors, enhance, message } = superForm(data.loginForm, {
		resetForm: true
	});

	const {
		form: registerForm,
		errors: registerErrors,
		enhance: registerEnhance,
		message: registerMessage
	} = superForm(data.registerForm, {
		resetForm: true
	});

	let tab = $state('Login');
	let isLogin = $derived(tab === 'Login');

	function switchTab() {
		if (tab === 'Login') tab = 'Register';
		else tab = 'Login';
	}
</script>

<div class="tab-header">
	<button onclick={switchTab} class="tab-button {isLogin ? 'tab-button-selected' : ''}"
		><b>Login</b></button
	>
	<button onclick={switchTab} class="tab-button {isLogin ? '' : 'tab-button-selected'}"
		><b>Register</b></button
	>
</div>

<div class="tab-content">
	<h1 class="pb-1 !text-3xl">{tab}</h1>
	{#if tab === 'Login'}
		<p class="pb-3">Login to your account here.</p>
		{@render LoginForm()}
	{:else}
		<p class="pb-3">Register a new account here.</p>
		{@render RegisterForm()}
	{/if}
</div>

{#snippet LoginForm()}
	<form method="POST" action="?/login" use:enhance>
		<div class="flex flex-1 flex-col">
			<p>Email</p>
			<input name="email" type="email" bind:value={$form.email} />
			{#if $errors.email}
				<p class="error">{$errors.email}</p>
			{/if}
			<p>Password</p>
			<input name="password" type="password" bind:value={$form.password} />
			{#if $errors.password}
				<p class="error">{$errors.password}</p>
			{/if}
			<button class="mt-5">Submit</button>
			{#if $errors.errorMessage}
				<p class="error mt-5">{$errors.errorMessage}</p>
			{/if}
			{#if $message}<h3 class="mt-5">{$message}</h3>{/if}
		</div>
	</form>
{/snippet}

{#snippet RegisterForm()}
	<form method="POST" action="?/register" use:registerEnhance>
		<div class="flex flex-1 flex-col">
			<p>Email</p>
			<input name="email" type="email" bind:value={$registerForm.email} />
			{#if $registerErrors.email}
				<p class="error">{$registerErrors.email}</p>
			{/if}
			<p>Password</p>
			<input name="password" type="password" bind:value={$registerForm.password} />
			{#if $registerErrors.password}
				<p class="error">{$registerErrors.password}</p>
			{/if}
			<p>Confirm Password</p>
			<input name="confirmPassword" type="password" bind:value={$registerForm.confirmPassword} />
			{#if $registerErrors.confirmPassword}
				<p class="error">{$registerErrors.confirmPassword}</p>
			{/if}
			<button class="mt-5">Submit</button>
			{#if $registerErrors.errorMessage}
				<p class="error mt-5">{$registerErrors.errorMessage}</p>
			{/if}
			{#if $registerMessage}<h3 class="mt-5">{$registerMessage}</h3>{/if}
		</div>
	</form>
{/snippet}

<style lang="postcss">
	.tab-header {
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
		@apply flex flex-1 items-center justify-center px-1 py-1 gap-1 mb-5;
	}

	.tab-content {
		@apply px-3 py-2;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}

	.tab-button {
		@apply flex flex-1 items-center justify-center !border-0;
		@apply text-center;
	}

	.tab-button-selected {
		@apply !bg-foreground !bg-opacity-10;
	}
</style>
