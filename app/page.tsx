import Image from "next/image";
import Hero from "@/app/Hero/hero";
import OurServices from "@/app/Service/OurServices";
export default function Home() {
  return (
    <>
      <p className="font-termina">Hello</p>
      <p className="font-ivy">Hey</p>
      <div className="shadow-xl">hi</div>
      <button className="abc">Click here</button>
      <Hero />
      <h1>Hey</h1>
      <OurServices />
    </>
  );
}
