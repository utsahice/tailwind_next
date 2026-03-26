import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface Milestone {
    _uid: string;
    year: string;
    title: string;
    description: string;
    image?: {
        filename: string;
        alt: string;
    };
}

interface CompanyHistoryProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        milestones?: Milestone[];
        _uid: string;
        component: string;
    };
}

export default function CompanyHistory({ blok }: CompanyHistoryProps) {
    // Fallback milestones
    const fallbackMilestones = [
        {
            _uid: "milestone_1",
            year: "1998",
            title: "Foundation",
            description: "Founded in Beverly Hills with a vision to transform beauty brands into global icons.",
            image: { filename: "/work/work1.jpg", alt: "Foundation" }
        },
        {
            _uid: "milestone_2",
            year: "2005",
            title: "Global Expansion",
            description: "Expanded operations internationally, establishing partnerships with major retailers worldwide.",
            image: { filename: "/work/work2.jpg", alt: "Global Expansion" }
        },
        {
            _uid: "milestone_3",
            year: "2015",
            title: "Digital Innovation",
            description: "Launched digital-first approach, pioneering e-commerce strategies for beauty brands.",
            image: { filename: "/work/work3.jpg", alt: "Digital Innovation" }
        },
        {
            _uid: "milestone_4",
            year: "2020",
            title: "Sustainable Future",
            description: "Committed to sustainable beauty practices and eco-conscious brand development.",
            image: { filename: "/work/work4.jpg", alt: "Sustainable Future" }
        }
    ];

    const milestones = blok.milestones?.length ? blok.milestones : fallbackMilestones;

    return (
        <section {...storyblokEditable(blok)} className="w-full py-20 bg-lime">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-termina tracking-widest uppercase mb-4 text-text">
                        {blok.subtitle || "Our Journey"}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-ivy text-black mb-8">
                        {blok.title || "25+ Years of Beauty Excellence"}
                    </h2>
                    <p className="text-lg font-termina text-text max-w-3xl mx-auto leading-relaxed">
                        {blok.description || "From our humble beginnings in Beverly Hills to becoming a global leader in beauty brand development, our journey has been marked by innovation, growth, and unwavering commitment to excellence."}
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-yello h-full"></div>

                    {/* Milestones */}
                    <div className="space-y-16">
                        {milestones.map((milestone, index) => (
                            <div key={milestone._uid} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                {/* Content */}
                                <div className="flex-1 lg:max-w-md">
                                    <div className={`bg-white rounded-2xl p-8 shadow-lg relative ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                        {/* Timeline Connector */}
                                        <div className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-1 bg-yello ${index % 2 === 0 ? '-right-8' : '-left-8'}`}></div>

                                        <div className="text-3xl font-ivy text-yello mb-4">
                                            {milestone.year}
                                        </div>
                                        <h3 className="text-xl font-ivy text-black mb-4">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-700 font-termina leading-relaxed">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="hidden lg:block w-6 h-6 bg-yello rounded-full border-4 border-white shadow-lg z-10"></div>

                                {/* Image */}
                                <div className="flex-1 lg:max-w-md">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src={milestone.image?.filename || `/work/work${index + 1}.jpg`}
                                            alt={milestone.image?.alt || milestone.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-ivy text-black mb-2">500+</div>
                        <div className="text-sm font-termina text-text uppercase tracking-wide">Brands Launched</div>
                    </div>
                    <div>
                        <div className="text-3xl font-ivy text-black mb-2">50+</div>
                        <div className="text-sm font-termina text-text uppercase tracking-wide">Countries</div>
                    </div>
                    <div>
                        <div className="text-3xl font-ivy text-black mb-2">$2B+</div>
                        <div className="text-sm font-termina text-text uppercase tracking-wide">Revenue Generated</div>
                    </div>
                    <div>
                        <div className="text-3xl font-ivy text-black mb-2">98%</div>
                        <div className="text-sm font-termina text-text uppercase tracking-wide">Client Retention</div>
                    </div>
                </div>
            </div>
        </section>
    );
}