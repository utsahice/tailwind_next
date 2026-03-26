import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="p-20 text-center font-termina text-xl text-red-500 uppercase">
        Unauthorized.
      </div>
    );
  }

  // Fetch all users
  const [users] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
  );

  return (
    <div>
      <h1 className="text-4xl font-ivy font-bold text-black mb-8">REGISTERED USERS</h1>
      
      <div className="bg-white border rounded shadow-sm overflow-hidden">
        <table className="min-w-full text-left bg-white font-termina text-xs">
          <thead className="bg-gray-50 text-black border-b uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b">ID</th>
              <th className="py-4 px-6 border-b">Name</th>
              <th className="py-4 px-6 border-b">Email</th>
              <th className="py-4 px-6 border-b">Role</th>
              <th className="py-4 px-6 border-b">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 uppercase tracking-widest text-[#333]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6">{u.id}</td>
                <td className="py-4 px-6 font-bold">{u.name}</td>
                <td className="py-4 px-6">{u.email}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 bg-black text-yello rounded font-bold`}>{u.role}</span>
                </td>
                <td className="py-4 px-6 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
