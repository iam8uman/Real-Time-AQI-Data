// otpValidator.ts
import { z } from 'zod';

// Define the schema for the OTP validation
export const otpValidatorSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  otpCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

// Infer the type from the schema
export type OTPValidatorType = z.infer<typeof otpValidatorSchema>;