"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Layout from "@/components/Layout";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      await signIn("credentials", { email, password, redirect: false });
      router.push("/profile");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-40 pb-20">
        <div className="w-full max-w-md bg-white p-10 border border-gray-100 shadow-sm">
          <h2 className="text-4xl font-ivy font-bold text-black text-center mb-8 uppercase tracking-wide">
            REGISTER
          </h2>
          {error && <p className="text-red-500 font-termina text-xs bg-red-50 p-3 mb-4 text-center">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <input 
                type="text" 
                required
                className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-yello transition-colors" 
                placeholder="FULL NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="email" 
                required
                className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-yello transition-colors" 
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                required 
                className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-yello transition-colors" 
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full btn-primary font-termina py-3 mt-4">
              CREATE ACCOUNT
            </button>
          </form>
          <p className="mt-8 text-center text-xs font-termina uppercase text-black">
            Already have an account? <Link href="/login" className="text-yello font-bold hover:underline ml-2">Sign in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
