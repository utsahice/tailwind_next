import Image from "next/image";

export default function GlazedGlossPage() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-white px-12 py-20 gap-12">
      {/* LEFT IMAGE */}
      <div className="relative w-full lg:w-1/2 flex justify-center">
        <img
          src="/gloss/1.jpg"
          alt="Glazed Gloss founder"
          className="w-full max-w-85 object-cover"
        />

        {/* PHONE CONTAINER OVERLAY */}
        
      </div>

      {/* RIGHT TEXT CONTENT */}
      <div className="w-full lg:w-1/2 text-dark">
        <p className="font-termina text-xs tracking-widest text-gray uppercase mb-2">
          Who We Are
        </p>
        <p className="text-4xl font-ivy mb-6">We’re Glazed Gloss</p>
        <p className="text-[15px] font-termina text-text leading-relaxed mb-4">
            Based in Beverly Hills, CA, the hub of the film and commercial industry, the executive team of GLAZED GLOSS CREATIVE COLLECTIVE brings a wealth of historical expertise in retail sales and execution. Each C-Suite executive has over 25 years of experience within the core retail team. Previous brand launches & employers of team members include renowned beauty industry giants such as TOM FORD, Tom Ford Beauty, Estée Lauder, L'Oréal, Clarins, Chanel, LVMH, NuFace, Bloomingdales, Sephora, ULTA, Neiman Marcus, Saks 5th Ave., New York Fashion Commission, and Hearst Group Publications.
        </p>
        <p className="text-[15px] font-termina text-text leading-relaxed mb-6">
          A  high-level overview of our retail commercial support includes the five pillars of commercial planning & a 360 degree approach for GLOBAL commerce & product deployment.
        </p>
        <img
          src="/gloss/sign.png"
          alt="Glazed Gloss founder"
          className="w-full max-w-65 object-cover mb-5"
        />

        <button className="btn-primary font-termina">
          MORE ABOUT GLAZED GLOSS CREATIVE
        </button>
      </div>
    </section>
  );
}
