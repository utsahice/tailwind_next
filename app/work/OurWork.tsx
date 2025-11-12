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
    <section className="w-full bg-white text-dark">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
          <h2 className="text-5xl font-ivy font-bold tracking-wide">
            OUR WORK
          </h2>
          <button className="btn-primary font-termina">VIEW ALL</button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 border-b mb-12 text-sm font-termina font-medium">
          <button className="text-dark border-b-2 border-yello">
            FEATURED
          </button>
          <button className="text-gray">DIGITAL DESIGN & ANIMATION</button>
          <button className="text-gray">VIDEOGRAPHY & PHOTOGRAPHY</button>
          <button className="text-gray">PAST PROJECTS & BRANDS</button>
        </div>
      </div>

      {/* Full-Width Gray Background Section */}
      <div className="w-full bg-[image:linear-gradient(to_bottom,white_0%,white_50%,gray_50%,gray_100%)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {works.map((work) => (
              <div
                key={work.title}
                className="flex flex-col h-full bg-transparent overflow-hidden hover transition-all duration-300">
                {/* Image */}
                <div className="aspect-[4/5] w-full overflow-hidden ">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-grow p-4 ">
                  <div>
                    <h3 className="text-white mb-1 font-ivy">{work.title}</h3>
                    <p className="text-yello text-sm font-medium font-termina mb-3">
                      {work.tag}
                    </p>
                  </div>

                  {/* Button perfectly left-aligned */}
                  <div className="mt-auto">
                    <button className="text-white font-termina text-xs underline decoration-yello decoration-2 text-left block">
                      VIEW CASE STUDY
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
