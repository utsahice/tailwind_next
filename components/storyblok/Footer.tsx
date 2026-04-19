import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaHeart,
    FaInstagram,
    FaLinkedinIn,
    FaTiktok,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

interface FooterLink {
    _uid: string;
    title: string;
    url: string;
    is_external?: boolean;
}

interface SocialLink {
    _uid: string;
    platform: string;
    url: string;
    icon?: {
        filename: string;
        alt: string;
    };
}

interface FooterProps {
    blok: {
        logo?: {
            filename: string;
            alt: string;
        };
        description?: string;
        contact_info?: {
            address?: string;
            phone?: string;
            email?: string;
        };
        footer_links?: FooterLink[];
        social_links?: SocialLink[];
        newsletter_title?: string;
        newsletter_description?: string;
        copyright_text?: string;
        _uid: string;
        component: string;
    };
}

export default function Footer({ blok }: FooterProps) {
    // Handle both "Footer" and "Global" component names
    if (!blok || (blok.component !== 'Footer' && blok.component !== 'Global')) {
        console.log('⚠️ Footer component not found or wrong type, using fallback');
    }
    // Fallback footer images from original design (keep img2 and logo only)
    const footerImages = [
        "/img2.jpg",
        "/logo.jpg",
        "/img2.jpg",
        "/logo.jpg",
        "/img2.jpg",
        "/logo.jpg"
    ];

    const socialIcons = [
        FaInstagram,
        FaFacebookF,
        FaTiktok,
        FaTwitter,
        FaYoutube,
        FaLinkedinIn,
    ];

    // Fallback footer links
    const fallbackLinks = [
        { _uid: "link_1", title: "About", url: "/about", is_external: false },
        { _uid: "link_2", title: "Services", url: "/services", is_external: false },
        { _uid: "link_3", title: "Work", url: "/work", is_external: false },
        { _uid: "link_4", title: "Contact", url: "/contact", is_external: false },
        { _uid: "link_5", title: "Privacy Policy", url: "/privacy", is_external: false },
        { _uid: "link_6", title: "Terms", url: "/terms", is_external: false }
    ];

    const footerLinks = blok.footer_links?.length ? blok.footer_links : fallbackLinks;

    return (
        <footer {...storyblokEditable(blok)} className="w-full py-20 bg-white">
            {/* Social Media Gallery */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-ivy text-black font-semibold mb-6">
                    JOIN OUR MOVEMENT ON SOCIAL
                </h2>
            </div>
            <div className="w-full px-12 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                    <div>
                        <Image
                            src={footerImages[0]}
                            alt="Social Image 1"
                            width={500}
                            height={700}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Image
                            src={footerImages[3]}
                            alt="Social Image 2"
                            width={500}
                            height={350}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                        <Image
                            src={footerImages[4]}
                            alt="Social Image 3"
                            width={500}
                            height={350}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div>
                        <Image
                            src={footerImages[2]}
                            alt="Social Image 4"
                            width={500}
                            height={700}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Image
                            src={footerImages[1]}
                            alt="Social Image 5"
                            width={500}
                            height={350}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                        <Image
                            src={footerImages[5]}
                            alt="Social Image 6"
                            width={500}
                            height={350}
                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="py-12 px-6 md:px-16 lg:px-24 border-t border-gray-200">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-[20px] text-sm font-ivy tracking-wider mb-3">
                            {blok.newsletter_title || "JOIN OUR NEWSLETTER"}
                        </h3>
                        <p className="text-black text-[14px] font-termina mb-4">
                            {blok.newsletter_description || "Download your Free Beauty Content Calendar when you sign up"}
                        </p>

                        <form className="space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:border-yello transition-colors"
                            />
                            <div className="flex items-center border-b border-gray-400 focus-within:border-yello transition-colors">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 bg-transparent py-2 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="btn-primary font-termina px-4 py-2 rounded-md ml-3 hover:opacity-90 transition-opacity"
                                >
                                    SUBSCRIBE
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Logo */}
                    <div className="flex flex-col items-center justify-center">
                        <Link href="/">
                            <Image
                                src={blok.logo?.filename || "/logo.jpg"}
                                alt={blok.logo?.alt || "Glazed Gloss Logo"}
                                width={140}
                                height={100}
                                className="mb-2 hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        {blok.description && (
                            <p className="text-center text-sm text-gray-600 font-termina">
                                {blok.description}
                            </p>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 font-termina uppercase text-[8px] text-black gap-y-2">
                        <div className="space-y-2 mr-9">
                            <h4 className="font-ivy text-[12px] text-2XL mb-2">
                                EXPLORE GLAZED GLOSS
                            </h4>
                            {footerLinks.slice(0, Math.ceil(footerLinks.length / 2)).map((link) => (
                                <p key={link._uid}>
                                    {link.is_external ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-yello transition-colors"
                                        >
                                            {link.title}
                                        </a>
                                    ) : (
                                        <Link href={link.url} className="hover:text-yello transition-colors">
                                            {link.title}
                                        </Link>
                                    )}
                                </p>
                            ))}
                        </div>

                        <div className="space-y-2 mt-4 md:mt-8">
                            {footerLinks.slice(Math.ceil(footerLinks.length / 2)).map((link) => (
                                <p key={link._uid}>
                                    {link.is_external ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-yello transition-colors"
                                        >
                                            {link.title}
                                        </a>
                                    ) : (
                                        <Link href={link.url} className="hover:text-yello transition-colors">
                                            {link.title}
                                        </Link>
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-ivy text-[12px] mb-4">CONTACT INFO</h4>
                        <div className="space-y-2 text-[10px] font-termina text-black">
                            <p>{blok.contact_info?.address || "Beverly Hills, CA 90210"}</p>
                            <p>{blok.contact_info?.phone || "858.353.3220"}</p>
                            <p>{blok.contact_info?.email || "hello@glazedgloss.com"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full mt-20 px-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 pt-8">
                <p className="flex items-center gap-2 text-black uppercase font-termina text-[10px]">
                    <FaHeart className="inline-block w-3.5 h-3.5 text-yello" />
                    <span>{blok.copyright_text || "2024 Glazed Gloss. All Rights Reserved."}</span>
                </p>

                <div className="flex items-center gap-3">
                    {blok.social_links?.length ? (
                        blok.social_links.map((social, i) => {
                            const IconComponent = socialIcons[i] || FaInstagram;
                            return (
                                <a
                                    key={social._uid}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-yello transition-colors group"
                                >
                                    <IconComponent
                                        className="text-white group-hover:text-black transition-colors"
                                        size={18}
                                    />
                                </a>
                            );
                        })
                    ) : (
                        socialIcons.map((Icon, i) => (
                            <div
                                key={i}
                                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-yello transition-colors group"
                            >
                                <Icon
                                    className="text-white group-hover:text-black transition-colors"
                                    size={18}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </footer>
    );
}