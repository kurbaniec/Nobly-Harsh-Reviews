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
</script>

<div class="tab-content">
	<h1 class="pb-1 !text-3xl">{tab}</h1>
	{#if tab === 'Login'}
		<p class="pb-3">Login to your account here.</p>
		{@render LoginForm()}
	{:else}
		<p class="pb-3">Login to your account here.</p>
		{@render RegisterForm()}
	{/if}
</div>

{#snippet LoginForm()}
	{#if $message}<h3>{$message}</h3>{/if}
	<form method="POST" action="?/login" use:enhance>
		<label for="email">Email</label>
		<input name="email" type="email" bind:value={$form.email} />
		<label for="password">Password</label>
		<input name="password" type="password" bind:value={$form.password} />
		<button>Submit</button>
	</form>
{/snippet}

{#snippet RegisterForm()}
	{#if $registerMessage}<h3>{$registerMessage}</h3>{/if}

	<form method="POST" action="?/register" use:registerEnhance>
		E-mail: <input name="email" type="email" bind:value={$registerForm.email} />
		Password:
		<input name="password" type="password" bind:value={$registerForm.password} />
		Confirm password:
		<input name="confirmPassword" type="password" bind:value={$registerForm.confirmPassword} />
		{#if $registerErrors.confirmPassword}
			<p class="error">{$registerErrors.confirmPassword}</p>
		{/if}
		<button>Submit</button>
	</form>
{/snippet}

<style lang="postcss">
	.tab-content {
		@apply px-3 py-1;
		@apply border border-foreground border-opacity-20;
		@apply border-2 rounded-md;
	}
</style>
