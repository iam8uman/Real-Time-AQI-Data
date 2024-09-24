import Blog from "@/components/Blog"
import Movingcard from "@/components/card/Movingcard"
import Feature from "@/components/Feature"
import Footer from "@/components/footer/Footer"
import HyperHero from "@/components/Hero/HyperHero"
import Lambpage from "@/components/Lamp/Lambpage"
import Navbarcn from "@/components/Navbar/Navbarcn"
import { API_URL } from "@/config/env"
import axios from "axios"
import { cookies } from "next/headers"

async function checkIfLoggedIn() {
  let isLoading = true;

  try {
    const res = await axios.get(
      `${API_URL}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      }
    );
    
    isLoading = false;

    if (res?.data?.id) {
      return { data: res.data, isLoading };
    } else {
      return { data: null, isLoading };
    }
  } catch (e) {
    isLoading = false;
    return { data: null, isLoading };
  }
}

export default async function Home() {

  const { data: userData, isLoading } = await checkIfLoggedIn()

  return (
    <div className="gap-y-40 bg-gray-950">
      <Navbarcn userData={userData} />
      <div className="relative">
        <Lambpage />
        <HyperHero />
      </div>
      <Feature />
      <div className="relative">
        <Movingcard />
      </div>
      <Blog />
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}
