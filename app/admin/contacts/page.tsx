import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import fs from "fs";
import path from "path";
import ScrollReveal from "@/components/admin/ScrollReveal";
import { Search, Filter } from "lucide-react";
import ContactListClient from "@/components/admin/ContactListClient";

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return <div className="p-20 text-center font-termina text-red-500 uppercase tracking-widest">Unauthorized Access</div>;
  }

  // Fetch real data from JSON
  let contacts = [];
  try {
    const filePath = path.join(process.cwd(), "data", "contacts.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      contacts = JSON.parse(fileData).sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
  } catch (error) {
    console.error("Error loading contacts:", error);
  }

  return (
    <div className="space-y-8">
        <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
                <div>
                   <h1 className="text-5xl font-ivy font-bold text-black uppercase tracking-tight leading-none mb-3">Contact Leads</h1>
                   <p className="font-termina text-[10px] text-gray-400 uppercase tracking-[0.4em]">Manage inbound inquiries and sales prospects</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Search leads..." className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-black w-32 placeholder:text-gray-300" />
                    </div>
                    <button className="bg-white border border-gray-100 px-5 py-2.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                        <Filter className="w-5 h-5" /> Filter
                    </button>
                </div>
            </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 gap-6">
                <ContactListClient initialContacts={JSON.parse(JSON.stringify(contacts))} />
            </div>
        </ScrollReveal>
    </div>
  );
}
