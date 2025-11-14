"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

export default function OurWork() {
  const works = [
    { title: "VANITY PLANET", tag: "BRANDING", image: "/work/work1.jpg" },
    { title: "GLOBAL NOURISH", tag: "PRODUCTION", image: "/work/work2.jpg" },
    {
      title: "HIGHER EDUCATION SKINCARE",
      tag: "FULL SERVICE",
      image: "/work/work3.jpg",
    },
    { title: "KOVE", tag: "BRANDING", image: "/work/work4.jpg" },
  ];

  return (
    <section className="w-full bg-[image:linear-gradient(to_bottom,white_0%,white_60%,gray_60%,gray_100%)] px-70  text-dark py-20">
      {/* Header Section */}
      <div className="max-w-[1400px]  mx-auto px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-ivy font-bold tracking-wide">
            OUR WORK
          </h2>
          <button className="btn-primary font-termina">VIEW ALL</button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 border-b mb-12 text-xs sm:text-sm font-termina font-medium">
          <button className="text-dark border-b-2 border-yello">
            FEATURED
          </button>
          <button className="text-gray hover:text-dark">
            DIGITAL DESIGN & ANIMATION
          </button>
          <button className="text-gray hover:text-dark">
            VIDEOGRAPHY & PHOTOGRAPHY
          </button>
          <button className="text-gray hover:text-dark">
            PAST PROJECTS & BRANDS
          </button>
        </div>
      </div>
      <div className="max-w-[1400px]  mx-auto px-6 sm:px-12">
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {works.map((work) => (
            <WorkCard key={work.title} work={work} />
          ))}
        </div>
        <div className="sm:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1.1}
            className="pb-10"
          >
            {works.map((work) => (
              <SwiperSlide key={work.title}>
                <WorkCard work={work} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style jsx global>{`
      .swiper-pagination {
        position : flex !important;
        padding-top : 10px !important;
      }
        .swiper-pagination-bullet {
          background: #000 !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #c6d302 !important;
        }
      `}</style>
    </section>
  );
}

function WorkCard({ work }: any) {
  return (
    <div className="flex flex-col  bg-transparent overflow-hidden transition-all duration-300 rounded-xl">
      {/* Image */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow p-4 bg-transparent">
        <div>
          <h3 className="text-black sm:text-white mb-1 font-ivy">
            {work.title}
          </h3>
          <p className="text-yello text-xs sm:text-sm font-medium font-termina mb-3">
            {work.tag}
          </p>
        </div>

        <div className="mt-auto">
          <button className="text-black sm:text-white font-termina text-xs underline decoration-yello decoration-2 text-left block">
            VIEW CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
}
