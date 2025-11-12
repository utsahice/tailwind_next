"use client";
import Image from "next/image";

export default function GlazedGlossPage() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-white py-0.5 gap-12">
      {/* LEFT SIDE */}
      <div className="relative w-full lg:w-1/2 flex justify-start">
        {/* Background Image */}
        <Image
          src="/gloss/1.jpg"
          alt="Glazed Gloss founder"
          width={800}
          height={650}
          className="w-full max-w-[80%] max-h-[650px] object-cover"
        />

        {/* PHONE FRAME */}
        <div className="absolute top-[50px] left-[85%] transform -translate-x-1/2 w-[200px] h-[450] md:w-[150px] lg:w-[200px] aspect-[9/19] bg-black rounded-[40px] shadow-2xl overflow-hidden border-[6px] border-black">
          {/* Video inside the phone */}
          <video
            src="/gloss/2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT SIDE TEXT */}
      <div className="w-full lg:w-1/2 text-dark px-6 lg:px-0">
        <p className="font-termina text-xs tracking-widest text-gray-500 uppercase mb-2">
          Who We Are
        </p>
        <h2 className="text-4xl font-semibold font-ivy mb-6">We’re Glazed Gloss</h2>
        <p className="text-[15px] font-termina text-gray-700 leading-relaxed mb-4">
          Based in Beverly Hills, CA, the hub of the film and commercial industry, the executive team of GLAZED GLOSS CREATIVE COLLECTIVE brings a wealth of historical expertise in retail sales and execution. Each C-Suite executive has over 25 years of experience within the core retail team. Previous brand launches & employers of team members include renowned beauty industry giants such as TOM FORD, Tom Ford Beauty, Estée Lauder, L'Oréal, Clarins, Chanel, LVMH, NuFace, Bloomingdales, Sephora, ULTA, Neiman Marcus, Saks 5th Ave., New York Fashion Commission, and Hearst Group Publications.
        </p>
        <p className="text-[15px] font-termina text-gray-700 leading-relaxed mb-6">
          A high-level overview of our retail commercial support includes the five pillars of commercial planning & a 360 degree approach for GLOBAL commerce & product deployment.
        </p>
        <Image
          src="/gloss/sign.png"
          alt="Signature"
          width={260}
          height={80}
          className="w-auto h-auto mb-5"
        />
        <button className="btn-primary px-6 py-3 font-termina tracking-wide">
          MORE ABOUT GLAZED GLOSS CREATIVE
        </button>
      </div>
    </section>
  );
}
