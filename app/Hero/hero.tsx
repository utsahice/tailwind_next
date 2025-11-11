"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <main className="min-h-screen w-full bg-slate-50">
      {/* Top sitewide notice */}
      <div className="text-[11px] text-slate-200 text-center bg-black/20 py-1">
        This is the first example of a sitewide notice
      </div>

      {/* HERO */}
      <section className="relative w-full h-[560px] md:h-[720px] overflow-hidden">
        {/* Background full-bleed */}
        <div className="absolute inset-0 -z-10">
          {/* Use next/image for optimization; plain <img> also works for GIFs but here background is a JPG */}
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* subtle overlay so the gif & top elements pop */}
          <div className="absolute inset-0 bg-black/12"></div>
        </div>

        {/* Center GIF (the large centered element — user said center is GIF not text) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[78%] md:w-[60%] lg:w-[48%] max-w-[980px] flex justify-center">
            {/* for animated gif use regular img or next/image (next/image supports gifs but can rewrite) */}
            <img
              src="/hero.gif"
              alt="Center animated"
              className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        {/* Decorative top-left "GLAZED GLOSS" text overlay (optional small watermark) */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white/80 text-xs tracking-wider">
          GLAZED GLOSS
        </div>

        {/* bottom white bar (menu / logo / contact) */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white/95 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              {/* left: menu */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-slate-800">
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="2" rx="1" fill="#111827" />
                    <rect y="5" width="18" height="2" rx="1" fill="#111827" />
                    <rect y="10" width="18" height="2" rx="1" fill="#111827" />
                  </svg>
                  <span className="hidden md:inline-block">MENU</span>
                </button>
              </div>

              {/* center: logo */}
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Image src="/logo.png" alt="GG logo" width={72} height={48} className="object-contain" />
                  <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Glazed Gloss</span>
                </div>
              </div>

              {/* right: phone + hire button */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-slate-800 text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 16.5v3a2.5 2.5 0 0 1-2.5 2.5A19.5 19.5 0 0 1 3 5.5 2.5 2.5 0 0 1 5.5 3h3" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>858.353.3220</span>
                </div>

                <button className="rounded-full px-4 py-2 bg-limeAccent text-black text-sm font-semibold shadow hover:opacity-95">
                  HIRE GG
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* small spacer so footer/content don't run into hero */}
      <div className="h-8 bg-white"></div>
    </main>
  );
}
