import { API_URL } from "@/config/env";
import axios from "axios"
import { cookies } from "next/headers"

export async function checkIfLoggedIn() {
    let isLoading = true
    let data = null;

    try {
      const res = await axios.get(
        `${API_URL}/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
          },
          withCredentials: true,
        }
      )
  
      isLoading = false
  
      if (res?.data) {
        data = res.data;
      }
    } catch (e) {
      isLoading = false
      console.error("Error fetching user data:", e)
    }

    return { data, isLoading }
}