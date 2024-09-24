// forgotPasswordValidators.ts
import { z } from "zod"

export const forgotPasswordValidatorSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})
