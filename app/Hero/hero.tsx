"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <main className="w-ful">
      <section className="relative w-full h-[560px] md:h-[600px] overflow-hidden">
        <div className="w-full h-[600px] relative overflow-hidden ">
          <img
            src="/hero_bg.gif"
            alt="Center animated"
            className="w-full h-full object-cover object-center"
          />

          {/* subtle overlay so the gif & top elements pop */}
          <div className="absolute inset-0 bg-black/12"></div>
        </div>
        {/* Center GIF + Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* GIF */}
          <div className="w-[78%] md:w-[60%] lg:w-[48%] max-w-[980px]">
            <img
              src="/hero.gif"
              alt="Center animated"
              className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
          </div>

          <div className="pointer-events-auto pt-40 mt-6 gap-10">
            <button className="px-9  py-2 bg-yello rounded-10 text-black text-sm font-semibold shadow hover:opacity-95">
              OUR SERVICE
            </button>
          </div>
        </div>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white/80 text-xs tracking-wider font-termina">
          This is the first example of a sitewide notice
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white/95 border-t border-slate-200">
            <div className="mx-auto px-6 py-4 flex items-center justify-between  px-6 md:px-12 lg:px-[100px] max-w-[1800px]">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-slate-800">
                  <Image
                    width="18"
                    height="12"
                    src="/menu.png" />
                  
                  <span className="hidden md:inline-block">MENU</span>
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Image
                    src="/logo.png"
                    alt="GG logo"
                    width={72}
                    height={48}
                    className="object-contain"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
                    Glazed Gloss
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-30">
                <div className="hidden sm:flex items-center gap-3 text-slate-800 text-sm">
                  <img src="/phone.png" alt="Arrow" width={24} height={24} />

                  <p className="font-termina">858.353.3220</p>
                </div>

                <button className=" px-14 py-2 bg-limeAccent text-black text-sm font-semibold shadow hover:opacity-95 bg-yello">
                  HIRE GG
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-8 bg-white"></div>
    </main>
  );
}
