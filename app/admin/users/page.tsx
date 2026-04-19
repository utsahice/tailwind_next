import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import ScrollReveal from "@/components/admin/ScrollReveal";
import { Users as UsersIcon } from "lucide-react";
import UserRowsClient from "@/components/admin/UserRowsClient";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return <div className="p-20 text-center font-termina text-red-500 uppercase tracking-widest">Unauthorized Access</div>;
  }

  // Fetch all users from DB
  const [users] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
  );

  return (
    <div className="space-y-8">
        <ScrollReveal>
            <div className="flex justify-between items-end mb-4">
                <div>
                   <h1 className="text-5xl font-ivy font-bold text-black uppercase tracking-tight leading-none mb-3">Registered Users</h1>
                   <p className="font-termina text-[10px] text-gray-400 uppercase tracking-[0.4em]">Manage and monitor your community</p>
                </div>
                <div className="flex gap-4">
                     <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
                        <UsersIcon className="w-6 h-6 text-yello" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black">Total: {users.length}</span>
                     </div>
                </div>
            </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="py-8 px-10 text-[10px] font-termina uppercase tracking-[0.3em] text-gray-400 font-bold">User Information</th>
                                <th className="py-8 px-10 text-[10px] font-termina uppercase tracking-[0.3em] text-gray-400 font-bold">Role</th>
                                <th className="py-8 px-10 text-[10px] font-termina uppercase tracking-[0.3em] text-gray-400 font-bold">Joined Date</th>
                                <th className="py-8 px-10 text-[10px] font-termina uppercase tracking-[0.3em] text-gray-400 font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <UserRowsClient initialUsers={JSON.parse(JSON.stringify(users))} />
                        </tbody>
                    </table>
                </div>
            </div>
        </ScrollReveal>
    </div>
  );
}
