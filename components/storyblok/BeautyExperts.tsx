import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface Feature {
    _uid: string;
    number: string;
    title: string;
    description: string;
}

interface ExpertImage {
    _uid: string;
    image: {
        filename: string;
        alt: string;
    };
}

interface BeautyExpertsProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        features?: Feature[];
        expert_images?: ExpertImage[];
        cta_text?: string;
        _uid: string;
        component: string;
    };
}

export default function BeautyExperts({ blok }: BeautyExpertsProps) {
    // Fallback features from original design
    const fallbackFeatures = [
        {
            _uid: "feature_1",
            number: "1.",
            title: "Saves Time",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
        },
        {
            _uid: "feature_2",
            number: "2.",
            title: "Boosts Engagement",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
        },
        {
            _uid: "feature_3",
            number: "3.",
            title: "Gloss Up Your Feed",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
        }
    ];

    // Fallback expert images
    const fallbackImages = ["/img2.jpg", "/logo.jpg"];

    const features = blok.features?.length ? blok.features : fallbackFeatures;
    const expertImages = blok.expert_images?.length ? blok.expert_images : fallbackImages.map((src, i) => ({
        _uid: `expert_${i}`,
        image: { filename: src, alt: `Beauty Expert ${i + 1}` }
    }));

    return (
        <section {...storyblokEditable(blok)} className="w-full bg-[#FAF9F7] py-20 px-6 md:px-16 lg:px-24">
            <div className="text-center md:text-left mb-12">
                <p className="text-xs tracking-wider text-sm font-termina uppercase">
                    {blok.subtitle || "The Ultimate Content Toolkit"}
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
                {/* Features Section */}
                <div className="flex-1 space-y-6">
                    {features.map((item, index) => (
                        <div
                            key={item._uid}
                            className="flex gap-4 bg-white rounded-2xl shadow-sm px-6 py-6"
                        >
                            <p className="text-7xl text-sm font-ivy">{item.number}</p>
                            <div>
                                <h3 className="font-ivy text-sm md:text-3xl mb-1">{item.title}</h3>
                                <p className="text-text font-termina leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    <button className="mt-8 btn-primary font-termina px-8 py-4 shadow-md transition-all">
                        {blok.cta_text || "SUBSCRIBE AND GET ACCESS"}
                    </button>
                </div>

                {/* Expert Images Section */}
                <div className="flex-1 flex justify-center lg:justify-end gap-6">
                    {expertImages.map((expertImg, index) => (
                        <div
                            key={expertImg._uid}
                            className="overflow-hidden rounded-10 shadow-lg h-[400px] md:h-[500px] w-1/3 relative"
                        >
                            <Image
                                src={expertImg.image.filename}
                                alt={expertImg.image.alt}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}