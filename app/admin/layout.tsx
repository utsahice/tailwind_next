"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LayoutDashboard, ShoppingBag, Users, MessageSquare, LogOut, ExternalLink, Menu, Bell, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    { name: "Summary", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Contact Leads", href: "/admin/contacts", icon: MessageSquare },
  ];

  const sidebarVariants = {
    open: { width: 280, opacity: 1 },
    closed: { width: 80, opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-termina">
      {/* Sidebar */}
      <motion.aside 
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-[#0D0D0D] text-white flex flex-col sticky top-0 h-screen z-50 overflow-hidden shadow-2xl"
      >
        <div className="p-6 h-24 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div 
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-yello rounded-xl flex items-center justify-center overflow-hidden rotate-3">
                    <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="object-cover grayscale brightness-50" />
                </div>
                <div className="flex flex-col">
                    <span className="font-ivy font-bold text-xl tracking-tight text-white leading-none">GLOSS</span>
                    <span className="text-[7px] font-termina uppercase tracking-[0.4em] text-yello/80 mt-1">Admin HQ</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="logo-small"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-10 h-10 bg-yello rounded-xl flex items-center justify-center mx-auto"
              >
                <span className="font-ivy font-bold text-black">G</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={itemVariants}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group relative ${
                    isActive
                      ? "bg-yello text-black shadow-[0_10px_20px_-10px_rgba(223,246,36,0.5)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-black" : "text-gray-500 group-hover:text-yello"}`} />
                  {isSidebarOpen && (
                    <span className="font-bold truncate">{item.name}</span>
                  )}
                  {isActive && !isSidebarOpen && (
                    <div className="absolute left-0 w-1 h-6 bg-yello rounded-r-full" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest group">
            <ExternalLink className="w-6 h-6 group-hover:text-yello transition-colors" />
            {isSidebarOpen && <span>View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group uppercase tracking-widest"
          >
            <LogOut className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            {isSidebarOpen && <span className="font-bold">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-10 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-black"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 w-80 group focus-within:border-yello/50 transition-all">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search anything..." 
                      className="bg-transparent border-none outline-none text-[11px] w-full text-black placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-yello rounded-full border-2 border-white group-hover:scale-120 transition-transform"></span>
                </button>
                <div className="h-10 w-px bg-gray-100 mx-2"></div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-[11px] font-bold text-black uppercase tracking-wider">Admin User</span>
                        <span className="text-[9px] text-yello bg-black px-2 py-0.5 rounded-full font-bold">PRO</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#0D0D0D] text-yello flex items-center justify-center font-ivy font-bold text-lg border-2 border-yello/20 hover:border-yello transition-all cursor-pointer shadow-lg shadow-black/5">
                        AU
                    </div>
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 pt-16 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={pathname}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #DFF624;
        }
      `}</style>
    </div>
  );
}
