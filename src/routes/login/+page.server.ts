import { z } from 'zod';
import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4)
});

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
	confirmPassword: z.string().min(4)
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

		// TODO: Login user
		return message(loginForm, 'Login form submitted');
	},

	register: async ({ request }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) return fail(400, { registerForm });

		// TODO: Register user
		return message(registerForm, 'Register form submitted');
	}
};


