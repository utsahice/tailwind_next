import Image from "next/image";

export default function BeautyExperts() {
  return (
    <section className="w-full bg-[#FAF9F7] py-20 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <p className="text-xs tracking-wider text-sm font-termina uppercase">
          The Ultimate Content Toolkit
        </p>
        <h2 className="text-3xl md:text-5xl font-ivy text-black mt-2">
          Hub for Beauty Experts
        </h2>
        <div className="flex justify-center md:justify-end pr:50px gap-8 mt-4 text-sm">
          <span className="font-termina tracking-wide">STOCK</span>
          <span className="font-termina tracking-wide">
            SOCIAL MEDIA TEMPLATES
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          {[
            {
              num: "1.",
              title: "Saves Time",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            },
            {
              num: "2.",
              title: "Boosts Engagement",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            },
            {
              num: "3.",
              title: "Gloss Up Your Feed",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white rounded-2xl shadow-sm px-6 py-6"
            >
              <p className="text-7xl text-sm font-ivy">{item.num}</p>
              <div>
                <h3 className="font-ivy text-sm md:text-3xl mb-1">{item.title}</h3>
                <p className="text-text font-termina  leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          <button className="mt-8 btn-primary font-termina px-8 py-4 shadow-md transition-all">
            SUBSCRIBE AND GET ACCESS
          </button>
        </div>

        {/* Right Images */}
        <div className="flex-1 flex justify-center lg:justify-end gap-6">
          {["/expert/1.jpg", "/expert/2.jpg", "/expert/3.jpg"].map(
            (src, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-10 shadow-lg h-[400px] md:h-[500px] w-1/3 relative"
              >
                <Image
                  src={src}
                  alt={`beauty ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
