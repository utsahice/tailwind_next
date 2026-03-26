"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

interface NavLink {
    _uid: string;
    label: string;
    url: string;
    is_external?: boolean;
}

interface NavbarProps {
    blok: {
        logo?: {
            filename: string;
            alt: string;
        };
        nav_links?: NavLink[];
        cta_text?: string;
        cta_url?: string;
        phone?: string;
        show_auth_links?: boolean;
        _uid: string;
        component: string;
    };
}

export default function Navbar({ blok }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { totalItems, setIsCartOpen } = useCart();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        setIsProfileOpen(false);
        router.push("/");
    };

    // Fallback navigation links
    const fallbackLinks = [
        { _uid: "nav_1", label: "Home", url: "/", is_external: false },
        { _uid: "nav_2", label: "About", url: "/about", is_external: false },
        { _uid: "nav_3", label: "Services", url: "/services", is_external: false },
        { _uid: "nav_4", label: "Work", url: "/work", is_external: false },
        { _uid: "nav_5", label: "Products", url: "/products", is_external: false },
        { _uid: "nav_6", label: "Contact", url: "/contact", is_external: false }
    ];

    const navLinks = blok.nav_links?.length ? blok.nav_links : fallbackLinks;
    const showAuthLinks = blok.show_auth_links !== false; // Default to true

    return (
        <nav {...storyblokEditable(blok)} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 ">
            <div className="mx-auto px-6 md:px-12 lg:px-[100px] py-4 max-w-[1800px] grid grid-cols-3 items-center">
                {/* Left - Menu Button */}
                <div className="flex items-center gap-2 justify-start">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-3 text-[10px] tracking-widest text-slate-800 hover:text-yello transition-colors group"
                    >
                        <Image src="/menu.png" alt="Menu" width={18} height={12} className="group-hover:opacity-70 transition-opacity" />
                        <span className="hidden md:inline-block font-termina font-bold">MENU</span>
                    </button>
                </div>

                {/* Center - Logo */}
                <div className="flex flex-col items-center justify-center">
                    <Link href="/">
                        <Image
                            src={blok.logo?.filename || "/logo.png"}
                            alt={blok.logo?.alt || "Glazed Gloss Logo"}
                            width={72}
                            height={48}
                            className="object-contain hover:opacity-80 transition-opacity"
                        />
                    </Link>
                </div>

                {/* Right - Contact, Auth & CTA */}
                <div className="flex items-center justify-end gap-6">
                    {/* Auth Section */}
                    {showAuthLinks && (
                        <>
                            {status === "authenticated" && session?.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                                    >
                                        <div className="w-8 h-8 bg-yello rounded-full flex items-center justify-center shadow-sm">
                                            <span className="font-termina text-xs font-bold text-black uppercase">
                                                {session.user.name?.charAt(0) || "U"}
                                            </span>
                                        </div>
                                        <span className="hidden md:block font-termina text-[10px] font-bold tracking-widest text-black uppercase">
                                            {session.user.name?.split(' ')[0]}
                                        </span>
                                        <svg className={`w-3 h-3 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-[60] overflow-hidden animate-menu-slide-down">
                                            <div className="px-5 py-4 bg-lime/30 border-b border-gray-100 mb-2">
                                                <p className="font-ivy text-base font-bold text-black leading-tight">{session.user.name}</p>
                                                <p className="font-termina text-[10px] text-gray-500 uppercase tracking-tighter mt-1">{session.user.email}</p>
                                            </div>
                                            
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-4 px-5 py-3 hover:bg-lime/50 transition-colors group"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-termina text-[10px] font-bold text-black uppercase tracking-wider">Profile Dashboard</span>
                                                    <span className="font-termina text-[8px] text-gray-400 uppercase tracking-tight">Orders & Settings</span>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/plans"
                                                className="flex items-center gap-4 px-5 py-3 hover:bg-lime/50 transition-colors group"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-termina text-[10px] font-bold text-black uppercase tracking-wider">Membership</span>
                                                    <span className="font-termina text-[8px] text-gray-400 uppercase tracking-tight">View Your Benefits</span>
                                                </div>
                                            </Link>

                                            <div className="mt-2 pt-2 border-t border-gray-100">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-4 px-5 py-3 hover:bg-red-50 transition-colors w-full text-left group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-red-50/50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-termina text-[10px] font-bold text-red-600 uppercase tracking-wider">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link href="/login">
                                        <button className="px-4 py-2 font-termina text-[10px] font-bold tracking-widest text-black hover:text-yello transition-colors uppercase">
                                            LOGIN
                                        </button>
                                    </Link>
                                    <Link href="/register">
                                        <button className="px-6 py-2 btn-outline font-termina text-[10px] font-bold tracking-widest uppercase">
                                            REGISTER
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    {/* Cart Icon */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-black hover:text-yello transition-colors"
                        aria-label="Open cart"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute top-1 right-1 bg-yello text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center font-termina shadow-sm">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>


            {/* Mobile/Desktop Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
                    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Navigation Links */}
                            <div>
                                <h3 className="font-ivy text-lg mb-4 text-black">Navigation</h3>
                                <ul className="space-y-3">
                                    {navLinks.map((link) => (
                                        <li key={link._uid}>
                                            {link.is_external ? (
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-termina text-sm text-gray-700 hover:text-yello transition-colors uppercase tracking-wide"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.url}
                                                    className="font-termina text-sm text-gray-700 hover:text-yello transition-colors uppercase tracking-wide"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                    {status === "authenticated" && session?.user ? (
                                        <>
                                            <li>
                                                <Link
                                                    href="/profile"
                                                    className="font-termina text-sm text-gray-700 hover:text-yello transition-colors uppercase tracking-wide"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    My Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/plans"
                                                    className="font-termina text-sm text-gray-700 hover:text-yello transition-colors uppercase tracking-wide"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Membership
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link
                                                    href="/login"
                                                    className="font-termina text-sm text-gray-700 hover:text-yello transition-colors uppercase tracking-wide"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/register"
                                                    className="font-termina text-sm text-gray-700 hover:text-yello transition-colors uppercase tracking-wide"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            {/* Services Quick Links */}
                            <div>
                                <h3 className="font-ivy text-lg mb-4 text-black">Services</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/services#creative" className="font-termina text-sm text-gray-700 hover:text-yello transition-colors">Creative & Marketing</Link></li>
                                    <li><Link href="/services#formulation" className="font-termina text-sm text-gray-700 hover:text-yello transition-colors">Product Formulation</Link></li>
                                    <li><Link href="/services#production" className="font-termina text-sm text-gray-700 hover:text-yello transition-colors">Production</Link></li>
                                    <li><Link href="/services#distribution" className="font-termina text-sm text-gray-700 hover:text-yello transition-colors">Sales & Distribution</Link></li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="font-ivy text-lg mb-4 text-black">Contact</h3>
                                <div className="space-y-3">
                                    <p className="font-termina text-sm text-gray-700">Beverly Hills, CA</p>
                                    <p className="font-termina text-sm text-gray-700">{blok.phone || "858.353.3220"}</p>
                                    <p className="font-termina text-sm text-gray-700">hello@glazedgloss.com</p>
                                    <Link href={blok.cta_url || "/contact"}>
                                        <button className="mt-4 px-8 py-2 btn-primary font-termina">
                                            {blok.cta_text || "GET STARTED"}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}