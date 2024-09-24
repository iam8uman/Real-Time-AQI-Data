import { redirect } from "next/navigation"

import { routes } from "@/config/routes"
import { FormState, SignupFormSchema } from "@/lib/definition"
import { createSession, deleteSession } from "@/lib/mainlib"

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const response = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedFields.data),
  })
  if (!response.ok) {
    throw new Error("Failed to sign up")
  }
  const data = await response.json()
  // 4. Create user session
  await createSession(data.user.id)
  // 5. Redirect user
  redirect(routes.admin.dashboard)
  return { message: "Signed up successfully" }
}

export async function logout() {
  deleteSession()
  redirect(routes.auth.login)
}
