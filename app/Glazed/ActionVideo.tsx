"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function VideoSlider() {
  const videos = [
    { src: "/gloss/action.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
    { src: "/gloss/action.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
    { src: "/gloss/action.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
    { src: "/gloss/action.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
    { src: "/gloss/2.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
    { src: "/gloss/action.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
    { src: "/gloss/action.mp4", text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”" },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-auto mx-auto px-6">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1.2}
          initialSlide={2} 
          centeredSlides={true}
          
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <VideoCard src={video.src} text={video.text} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function VideoCard({ src, text }: { src: string; text: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative rounded-10 overflow-hidden gap-40 shadow-lg group">
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-70 left-1/2 -translate-x-1/2 bg-white text-expert text-xs font-termina font-light-2 py-3 px-5 rounded-lg shadow-md w-[85%]">
        {text}
      </div>
      <div className="absolute bottom-6 right-6 flex gap-3">
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center bg-black/70 text-white rounded-full hover:bg-black transition"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={toggleMute}
          className="w-8 h-8 flex items-center justify-center bg-black/70 text-white rounded-full hover:bg-black transition"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}
