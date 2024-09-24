import { LoginFormType } from "@/lib/validators/LoginValidators"
import axios from "axios"

const loginMutationAction = async (formData: LoginFormType) => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await axios.post(`${backendUrl}/auth/login`, formData)
    return response
  } catch (error) {
    throw error
  }
}

export default loginMutationAction