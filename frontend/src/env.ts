import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
  // Add other required env vars here
});

// Create a mock process.env for Vite strictly client-side validation
const envProcess = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};

const parsedEnv = envSchema.safeParse(envProcess);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
