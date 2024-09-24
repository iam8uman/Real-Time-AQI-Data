// signupFormSchema.ts
import { z } from "zod"

export const signupFormSchema = z.object({
  firstName: z.string().min(3, { message: "First name is required." }),
  lastName: z.string().min(3, { message: "Last name is required." }),
  email: z.string().email({ message: "Please provide a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (e.g., @$!%*?&).",
    }),
})

export type SignupFormType = z.infer<typeof signupFormSchema>
