"use client";

import Image from "next/image";

export default function GlosAction() {
  return (
    <main className="w-full">
      <section className="relative w-full h-[560px] md:h-[500px] overflow-hidden">
        {/* Background Video or GIF */}
        <div className="absolute inset-0 w-100vh h-100vh overflow-hidden">
          <video
            src="/gloss/action.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/12"></div>
        </div>

        {/* Center GIF + Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-[78%] md:w-[60%] lg:w-[48%] max-w-[980px] text-center">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-ivy text-yello mb-4 leading-snug">
          Experience Glazed Gloss in Action
        </h2>
        <p className="text-white font-termina text-[13px] md:white-sm max-w-2xl mx-auto mb-14">A glimpse into our creative process, impact, passion and strategic creativity for transforming brands
        </p>
          </div>

          {/* Button positioned 50px below the GIF */}
          <div className="pointer-events-auto mt-[50px]">
            <button className="px-9 py-2 bg-yello rounded-10 text-black font-termina font-semibold shadow hover:opacity-95">
              Your Brand: Elevated
            </button>
          </div>
        </div>

      
</section>

    </main>
  );
}
