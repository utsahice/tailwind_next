"use client"
interface MarqueeProps {
  text: string;
  speed?: number; // optional, default speed
}

export default function Marquee({ text, speed = 100 }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden font-termina uppercase relative bg-yello py-2">
      <div
        className="whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
