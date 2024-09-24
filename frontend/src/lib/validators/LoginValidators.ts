// loginFormSchema.ts
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;


