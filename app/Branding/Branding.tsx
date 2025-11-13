"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function Branding() {
  const testimonials = [
    {
      image: "/branding/user1.jpg",
      name: "NAME GOES HERE",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    },
    {
      image: "/Branding/user2.jpg",
      name: "NAME GOES HERE",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    },
    {
      image: "/Branding/user3.jpg",
      name: "NAME GOES HERE",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    },
    {
      image: "/Branding/user4.jpg",
      name: "NAME GOES HERE",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    },
    {
      image: "/Branding/user4.jpg",
      name: "NAME GOES HERE",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    },
    {
      image: "/Branding/user4.jpg",
      name: "NAME GOES HERE",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    },
  ];

  return (
    <section className="w-full bg-gray py-24 text-center">
      <div className="max-w-auto mx-auto">
        {/* Headings */}
        <p className="text-[11px] uppercase tracking-[0.15em] text-white font-ivy mb-3">
          See what global leading brands are saying about us
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-ivy text-yello mb-4 leading-snug">
          Branding and Sales is in our DNA
        </h2>
        <p className="text-white font-termina text-[13px] md:white-sm max-w-2xl mx-auto mb-14">With thousands of retail partnerships—niche boutiques, spas, lifestyle destinations, and big-box retailers—our team is ready to build and optimize your business Globally.
        </p>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
          initialSlide={2} 
          centeredSlides={true}
          spaceBetween={24}
          slidesPerView={'auto'}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white shadow-sm rounded-md p-6 h-full flex flex-col text-left">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[80px] h-[80px] rounded-10 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-ivy text-black uppercase mb-1 tracking-wide">
                      {item.name}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yello">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs font-termina text-gray-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
