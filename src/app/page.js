
import HeroSection from "@/Components/Home/HeroSection";
import { getUserSession } from "@/lib/ReuseableFunc/session";
import Image from "next/image";

export default async function Home() {
  const user = await getUserSession();

  console.log(user);
  return (
 <>
 <HeroSection></HeroSection>

 

 </>
  );
}
