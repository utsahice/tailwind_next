import Image from "next/image";
import Hero from "@/app/Hero/hero";
import OurServices from "@/app/Service/OurServices";
import RetailPartners from "./Retail/RetailPartner";
export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <RetailPartners/>
    </>
  );
}
