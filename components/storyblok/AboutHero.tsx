import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface AboutHeroProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        hero_image?: {
            filename: string;
            alt: string;
        };
        background_image?: {
            filename: string;
            alt: string;
        };
        stats?: Array<{
            _uid: string;
            number: string;
            label: string;
        }>;
        _uid: string;
        component: string;
    };
}

export default function AboutHero({ blok }: AboutHeroProps) {
    const fallbackStats = [
        { _uid: "stat_1", number: "25+", label: "Years Experience" },
        { _uid: "stat_2", number: "500+", label: "Brands Launched" },
        { _uid: "stat_3", number: "50+", label: "Countries Reached" },
        { _uid: "stat_4", number: "98%", label: "Client Satisfaction" }
    ];

    const stats = blok.stats?.length ? blok.stats : fallbackStats;

    return (
        <section {...storyblokEditable(blok)} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={blok.background_image?.filename || "/hero_bg.gif"}
                    alt={blok.background_image?.alt || "About Background"}
                    fill
                    className="w-full h-full object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-white">
                        <p className="text-sm font-termina tracking-widest uppercase mb-4 text-yello">
                            {blok.subtitle || "About Glazed Gloss"}
                        </p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-ivy mb-8 leading-tight">
                            {blok.title || "Transforming Beauty Brands Into Global Icons"}
                        </h1>
                        <p className="text-lg font-termina leading-relaxed mb-12 max-w-2xl">
                            {blok.description || "Based in Beverly Hills, CA, we bring over 25 years of combined expertise in beauty retail, brand development, and global distribution. Our team has launched hundreds of successful beauty brands worldwide."}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat._uid} className="text-center">
                                    <div className="text-3xl md:text-4xl font-ivy text-yello mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm font-termina uppercase tracking-wide">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={blok.hero_image?.filename || "/gloss/1.jpg"}
                                alt={blok.hero_image?.alt || "About Us"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Floating Element */}
                        <div className="absolute -bottom-8 -left-8 bg-yello text-black p-6 rounded-xl shadow-lg">
                            <div className="text-2xl font-ivy mb-1">Beverly Hills</div>
                            <div className="text-sm font-termina">Headquarters</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}