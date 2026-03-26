import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface TeamMember {
    _uid: string;
    name: string;
    position: string;
    bio?: string;
    image: {
        filename: string;
        alt: string;
    };
    linkedin_url?: string;
}

interface TeamSectionProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        team_members?: TeamMember[];
        _uid: string;
        component: string;
    };
}

export default function TeamSection({ blok }: TeamSectionProps) {
    // Fallback team members
    const fallbackTeam = [
        {
            _uid: "team_1",
            name: "Sarah Johnson",
            position: "Founder & CEO",
            bio: "25+ years in beauty industry with previous roles at Tom Ford Beauty, Estée Lauder, and Sephora.",
            image: { filename: "/expert/1.jpg", alt: "Sarah Johnson" },
            linkedin_url: "#"
        },
        {
            _uid: "team_2",
            name: "Michael Chen",
            position: "Creative Director",
            bio: "Award-winning creative director with expertise in luxury brand development and global campaigns.",
            image: { filename: "/expert/2.jpg", alt: "Michael Chen" },
            linkedin_url: "#"
        },
        {
            _uid: "team_3",
            name: "Emma Rodriguez",
            position: "VP of Operations",
            bio: "Operations expert with experience scaling beauty brands from startup to $100M+ revenue.",
            image: { filename: "/expert/3.jpg", alt: "Emma Rodriguez" },
            linkedin_url: "#"
        }
    ];

    const teamMembers = blok.team_members?.length ? blok.team_members : fallbackTeam;

    return (
        <section {...storyblokEditable(blok)} className="w-full py-20 bg-gray">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-termina tracking-widest uppercase mb-4 text-white">
                        {blok.subtitle || "Meet Our Team"}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-ivy text-yello mb-8">
                        {blok.title || "The Experts Behind Your Success"}
                    </h2>
                    <p className="text-lg font-termina text-white max-w-3xl mx-auto leading-relaxed">
                        {blok.description || "Our leadership team brings decades of combined experience from the world's most prestigious beauty brands and retailers."}
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {teamMembers.map((member) => (
                        <div key={member._uid} className="group">
                            <div className="relative mb-6 overflow-hidden rounded-2xl">
                                <div className="aspect-[3/4] relative">
                                    <Image
                                        src={member.image.filename}
                                        alt={member.image.alt}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-6 left-6 right-6">
                                        {member.linkedin_url && (
                                            <a
                                                href={member.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-white font-termina text-sm hover:text-yello transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                                Connect on LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-ivy text-white mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-yello font-termina text-sm mb-4 uppercase tracking-wide">
                                    {member.position}
                                </p>
                                {member.bio && (
                                    <p className="text-white font-termina text-sm leading-relaxed">
                                        {member.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}