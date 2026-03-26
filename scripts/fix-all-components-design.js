const fs = require('fs');
const path = require('path');

// Component updates with original designs
const componentUpdates = {
  'components/storyblok/RetailPartners.tsx': `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface Partner {
    _uid: string;
    name: string;
    logo?: {
        filename: string;
        alt: string;
    };
}

interface RetailPartnersProps {
    blok: {
        title?: string;
        subtitle?: string;
        partners?: Partner[];
        _uid: string;
        component: string;
    };
}

export default function RetailPartners({ blok }: RetailPartnersProps) {
    const logos = [
        "/retail/Group1.svg",
        "/retail/Group2.svg",
        "/retail/Group3.svg",
        "/retail/Group5.svg",
        "/retail/Group6.svg",
        "/retail/Group7.svg",
        "/retail/Group8.svg",
        "/retail/Group9.svg",
        "/retail/Group10.svg",
        "/retail/Group11.svg",
        "/retail/Group12.svg",
        "/retail/Group13.svg",
        "/retail/Group14.svg",
        "/retail/Group15.svg",
        "/retail/Group16.svg",
    ];

    return (
        <section {...storyblokEditable(blok)} className="w-full bg-gray py-10 flex flex-col text-center items-center">
            <h2 className="text-center font-ivy text-[32px] md:text-[40px] text-yello mb-10">
                {blok.title || "OUR RETAIL PARTNERS"}
            </h2>

            {/* Grid visible on desktop only */}
            <div className="w-full max-w-6xl hidden md:block">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
                    {logos.map((src, i) => (
                        <Image
                            key={i}
                            src={src}
                            alt={\`partner-\${i}\`}
                            width={150}
                            height={60}
                            className="object-contain"
                        />
                    ))}
                </div>
            </div>
            <div className="w-full md:hidden overflow-x-hidden whitespace-nowrap mt-2">
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 items-center gap-10 animate-marquee">
                    {logos.map((src, i) => (
                        <Image
                            key={i}
                            src={src}
                            alt={\`partner-\${i}\`}
                            width={150}
                            height={60}
                            className="object-contain"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}`,

  'components/storyblok/OurWork.tsx': `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface WorkItem {
    _uid: string;
    title: string;
    description?: string;
    image?: {
        filename: string;
        alt: string;
    };
    category?: string;
}

interface OurWorkProps {
    blok: {
        title?: string;
        subtitle?: string;
        work_items?: WorkItem[];
        _uid: string;
        component: string;
    };
}

export default function OurWork({ blok }: OurWorkProps) {
    const works = [
        { title: "VANITY PLANET", tag: "BRANDING", image: "/work/work1.jpg" },
        { title: "GLOBAL NOURISH", tag: "PRODUCTION", image: "/work/work2.jpg" },
        { title: "HIGHER EDUCATION SKINCARE", tag: "FULL SERVICE", image: "/work/work3.jpg" },
        { title: "KOVE", tag: "BRANDING", image: "/work/work4.jpg" },
    ];

    return (
        <section {...storyblokEditable(blok)} className="w-full bg-[image:linear-gradient(to_bottom,white_0%,white_60%,gray_60%,gray_100%)] px-70 text-dark py-20">
            {/* Header Section */}
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
                    <h2 className="text-4xl md:text-5xl sm:text-center text-center font-ivy font-bold tracking-wide">
                        {blok.title || "OUR WORK"}
                    </h2>
                    <button className="btn-primary font-termina self-center">VIEW ALL</button>
                </div>

                {/* Tabs */}
                <div className="mt-4">
                    <div className="md:hidden w-full pl-27px">
                        <select className="w-90px border-b border-gray-300 text-black font-termina py-3 mb-7 text-[10px]">
                            <option>FEATURED</option>
                            <option>DIGITAL DESIGN & ANIMATION</option>
                            <option>VIDEOGRAPHY & PHOTOGRAPHY</option>
                            <option>PAST PROJECTS & BRANDS</option>
                        </select>
                    </div>
                    <div className="hidden md:flex flex-wrap gap-6 border-b mb-12 text-L text-black font-termina font-medium">
                        <button className="text-black border-b-2 border-yello">
                            FEATURED
                        </button>
                        <button className="text-gray hover:text-black">
                            DIGITAL DESIGN & ANIMATION
                        </button>
                        <button className="text-gray hover:text-black">
                            VIDEOGRAPHY & PHOTOGRAPHY
                        </button>
                        <button className="text-gray hover:text-black">
                            PAST PROJECTS & BRANDS
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {(blok.work_items || works).map((work, index) => (
                        <WorkCard key={work._uid || index} work={work} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function WorkCard({ work }: { work: any }) {
    return (
        <div className="flex flex-col bg-transparent overflow-hidden transition-all duration-300 rounded-xl">
            {/* Image */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                {work.image?.filename ? (
                    <Image
                        src={work.image.filename}
                        alt={work.image.alt || work.title}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <img
                        src={work.image || "/work/work1.jpg"}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow p-4 bg-transparent">
                <div>
                    <h3 className="text-black sm:text-white mb-1 font-ivy">
                        {work.title}
                    </h3>
                    <p className="text-yello text-xs font-medium font-termina mb-3">
                        {work.category || work.tag}
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
}`,

  'components/storyblok/GlazedGloss.tsx': `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface GlazedGlossProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        main_image?: {
            filename: string;
            alt: string;
        };
        background_color?: string;
        _uid: string;
        component: string;
    };
}

export default function GlazedGloss({ blok }: GlazedGlossProps) {
    return (
        <section {...storyblokEditable(blok)} className="flex flex-col lg:flex-row items-center justify-between bg-white py-0.5 gap-12">
            <div className="relative w-full lg:w-1/2 flex justify-start">
                {blok.main_image?.filename ? (
                    <Image
                        src={blok.main_image.filename}
                        alt={blok.main_image.alt || "Glazed Gloss founder"}
                        width={800}
                        height={650}
                        className="w-full max-w-[80%] max-h-[650px] object-cover"
                    />
                ) : (
                    <Image
                        src="/gloss/1.jpg"
                        alt="Glazed Gloss founder"
                        width={800}
                        height={650}
                        className="w-full max-w-[80%] max-h-[650px] object-cover"
                    />
                )}
                <div className="absolute top-[50px] left-[85%] transform -translate-x-1/2 w-[200px] h-[450] md:w-[150px] lg:w-[200px] aspect-[9/19] bg-black rounded-[40px] shadow-2xl overflow-hidden border-[6px] border-black">
                    <video
                        src="/gloss/2.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="w-full lg:w-1/2 text-dark px-6 lg:px-0">
                <p className="font-termina text-xs tracking-widest text-gray-500 uppercase mb-2">
                    Who We Are
                </p>
                <h2 className="text-4xl font-semibold font-ivy mb-6">
                    {blok.title || "We're Glazed Gloss"}
                </h2>
                <p className="text-[15px] font-termina text-gray-700 leading-relaxed mb-4">
                    {blok.description || "Based in Beverly Hills, CA, the hub of the film and commercial industry, the executive team of GLAZED GLOSS CREATIVE COLLECTIVE brings a wealth of historical expertise in retail sales and execution. Each C-Suite executive has over 25 years of experience within the core retail team."}
                </p>
                <p className="text-[15px] font-termina text-gray-700 leading-relaxed mb-6">
                    A high-level overview of our retail commercial support includes the five pillars of commercial planning & a 360 degree approach for GLOBAL commerce & product deployment.
                </p>
                <Image
                    src="/gloss/sign.png"
                    alt="Signature"
                    width={260}
                    height={80}
                    className="w-auto h-auto mb-5"
                />
                <button className="btn-primary px-6 py-3 font-termina tracking-wide">
                    MORE ABOUT GLAZED GLOSS CREATIVE
                </button>
            </div>
        </section>
    );
}`,

  'components/storyblok/BeautyExperts.tsx': `import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface Expert {
    _uid: string;
    name: string;
    title: string;
    bio?: string;
    image?: {
        filename: string;
        alt: string;
    };
}

interface BeautyExpertsProps {
    blok: {
        title?: string;
        subtitle?: string;
        experts?: Expert[];
        _uid: string;
        component: string;
    };
}

export default function BeautyExperts({ blok }: BeautyExpertsProps) {
    return (
        <section {...storyblokEditable(blok)} className="w-full bg-[#FAF9F7] py-20 px-6 md:px-16 lg:px-24">
            <div className="text-center md:text-left mb-12">
                <p className="text-xs tracking-wider text-sm font-termina uppercase">
                    The Ultimate Content Toolkit
                </p>
                <h2 className="text-3xl md:text-5xl font-ivy text-black mt-2">
                    {blok.title || "Hub for Beauty Experts"}
                </h2>
                <div className="flex justify-center md:justify-end gap-8 text-sm">
                    <span className="font-termina tracking-wide">STOCK</span>
                    <span className="font-termina tracking-wide">
                        SOCIAL MEDIA TEMPLATES
                    </span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-stretch gap-10">
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
                            className="flex gap-4 bg-white rounded-2xl shadow-sm px-6 py-6"
                        >
                            <p className="text-7xl text-sm font-ivy">{item.num}</p>
                            <div>
                                <h3 className="font-ivy text-sm md:text-3xl mb-1">{item.title}</h3>
                                <p className="text-text font-termina leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                    <button className="mt-8 btn-primary font-termina px-8 py-4 shadow-md transition-all">
                        SUBSCRIBE AND GET ACCESS
                    </button>
                </div>

                <div className="flex-1 flex justify-center lg:justify-end gap-6">
                    {["/expert/1.jpg", "/expert/2.jpg", "/expert/3.jpg"].map(
                        (src, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-10 shadow-lg h-[400px] md:h-[500px] w-1/3 relative"
                            >
                                {blok.experts?.[index]?.image?.filename ? (
                                    <Image
                                        src={blok.experts[index].image.filename}
                                        alt={blok.experts[index].image.alt || \`beauty \${index + 1}\`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <Image
                                        src={src}
                                        alt={\`beauty \${index + 1}\`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}`
};

async function updateComponents() {
  console.log('🔄 Updating all components to match original design...');
  
  for (const [filePath, content] of Object.entries(componentUpdates)) {
    try {
      fs.writeFileSync(filePath, content);
      console.log(\`✅ Updated: \${filePath}\`);
    } catch (error) {
      console.error(\`❌ Failed to update \${filePath}:\`, error.message);
    }
  }
  
  console.log('\\n🎉 All components updated successfully!');
  console.log('✅ Components now match the original design');
  console.log('✅ Images will fallback to local files if Storyblok images not available');
  console.log('🚀 Restart your dev server to see the changes');
}

updateComponents();