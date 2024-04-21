import { z } from 'zod';
import { fail, type Actions } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { login, register } from '$lib/login.server';
import { errorMessage } from '$lib/error';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
	errorMessage: z.string().optional() // Only used to display custom error messages
});

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
	confirmPassword: z.string().min(4),
	errorMessage: z.string().optional()
});

export async function load() {
	const loginForm = await superValidate(zod(loginSchema));
	const registerForm = await superValidate(zod(registerSchema));

	return { loginForm, registerForm };
}

export const actions: Actions = {
	login: async ({ request }) => {
		const loginForm = await superValidate(request, zod(loginSchema));

		if (!loginForm.valid) return fail(400, { loginForm });

		const { email, password } = loginForm.data;
		try {
			await login(email, password);
			return { loginForm };
		} catch (ex) {
			console.log(ex);
			return setError(loginForm, 'errorMessage', errorMessage(ex));
		}
	},

	register: async ({ request }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) return fail(400, { registerForm });

		const { email, password, confirmPassword } = registerForm.data;
		if (password !== confirmPassword) {
			return setError(registerForm, 'confirmPassword', 'Passwords do not match');
		}

		try {
			await register(email, password);
			return { registerForm };
		} catch (ex) {
			return setError(registerForm, 'errorMessage', errorMessage(ex));
		}
	}
};
