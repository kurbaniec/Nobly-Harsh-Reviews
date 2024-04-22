import { OPENAI_API_KEY } from '$env/static/private';
import { OpenAI } from 'openai';

const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function chatGPTPrompt(prompt: string): Promise<string> {
	const response = await openAI.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content: prompt
			}
		]
	});

	return response.choices[0].message.content ?? '';
}
