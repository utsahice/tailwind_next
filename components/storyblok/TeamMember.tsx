import Image from "next/image";

interface TeamMemberProps {
    blok: {
        name: string;
        position: string;
        bio?: string;
        image: {
            filename: string;
            alt: string;
        };
        linkedin_url?: string;
        _uid: string;
        component: string;
    };
}

export default function TeamMember({ blok }: TeamMemberProps) {
    return (
        <div className="group">
            <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className="aspect-[3/4] relative">
                    <Image
                        src={blok.image.filename}
                        alt={blok.image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-xl font-ivy text-white mb-2">
                    {blok.name}
                </h3>
                <p className="text-yello font-termina text-sm mb-4 uppercase tracking-wide">
                    {blok.position}
                </p>
                {blok.bio && (
                    <p className="text-white font-termina text-sm leading-relaxed">
                        {blok.bio}
                    </p>
                )}
            </div>
        </div>
    );
}