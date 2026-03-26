"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid Email or Password");
    } else {
      // Small check to redirect admin properly if it's the admin email
      if (email === "admin@example.com") {
        router.push("/admin/orders");
      } else {
        router.push("/");
      }
      // router.refresh() is not needed anymore as useSession will update
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-white px-4 pt-40 pb-20">
        <div className="w-full max-w-md bg-lime/10 p-12 border border-lime shadow-sm rounded-2xl">
          <h2 className="text-4xl font-ivy font-bold text-black text-center mb-2 uppercase tracking-tight">
            SIGN IN
          </h2>
          <div className="h-1 w-20 bg-yello mx-auto mb-8"></div>
          
          {error && <p className="text-red-500 font-termina text-[10px] uppercase font-bold bg-red-50 p-4 mb-6 text-center border border-red-100 rounded-lg">{error}</p>}
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-1">
              <label className="font-termina text-[10px] text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-4 focus:outline-none focus:border-yello transition-colors placeholder:text-gray-300" 
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="font-termina text-[10px] text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-4 focus:outline-none focus:border-yello transition-colors placeholder:text-gray-300" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full btn-primary font-termina font-bold text-[10px] tracking-widest py-4 mt-4 transition-all hover:translate-y-[-2px]">
              LOGIN
            </button>
          </form>

          {/* Setup display for Admin strictly so user remembers it */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-center font-termina text-[8px] text-gray-400 uppercase tracking-[0.2em] mb-3">
              Admin Access
            </p>
            <div className="bg-white/50 p-3 rounded-lg border border-lime text-center italic">
               <p className="font-termina text-[9px] text-gray-500 uppercase tracking-widest">
                Email: admin@example.com <br/> 
                Pass: password123
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-[10px] font-termina font-bold uppercase tracking-widest text-black/60">
            Don't have an account? <Link href="/register" className="text-black border-b border-yello hover:bg-yello transition-colors ml-2 px-1">Register Now</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

