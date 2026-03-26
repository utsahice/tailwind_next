"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
          <span className="font-ivy font-bold text-xl uppercase tracking-widest text-black">ADMIN</span>
        </div>
        <nav className="p-4 space-y-2 mt-4">
          <Link href="/admin/orders" 
            className={`block px-4 py-3 rounded-md text-sm font-termina uppercase tracking-wide transition-colors ${pathname.includes('/orders') ? 'bg-black text-yello' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
            Manage Orders
          </Link>
          <Link href="/admin/users" 
            className={`block px-4 py-3 rounded-md text-sm font-termina uppercase tracking-wide transition-colors ${pathname.includes('/users') ? 'bg-black text-yello' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
            Users
          </Link>
          <Link href="/admin/contacts" 
            className={`block px-4 py-3 rounded-md text-sm font-termina uppercase tracking-wide transition-colors ${pathname.includes('/contacts') ? 'bg-black text-yello' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
            Contact Us Leads
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
           <button onClick={handleLogout} className="w-full btn-outline font-termina py-2 text-xs">
             LOGOUT
           </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
