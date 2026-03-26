import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="p-20 text-center font-termina text-xl text-red-500 uppercase">
        Unauthorized.
      </div>
    );
  }

  // Fetch all orders with user details using SQL JOIN
  const [orders] = await pool.query<RowDataPacket[]>(
    `SELECT 
      o.id, o.address, o.total_payment, o.status, o.salesforce_id, o.created_at,
      u.name as userName, u.email as userEmail
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`
  );

  async function updateStatus(formData: FormData) {
    "use server";
    const orderId = formData.get("orderId");
    const newStatus = formData.get("status");
    
    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [newStatus, orderId]);
    revalidatePath("/admin/orders");
  }

  return (
    <div>
      <h1 className="text-4xl font-ivy font-bold text-black mb-8 uppercase">MANAGE ORDERS</h1>
      
      <div className="bg-white border rounded shadow-sm overflow-hidden text-black font-termina">
        <table className="min-w-full text-left bg-white text-xs">
          <thead className="bg-gray-50 border-b uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b">Order ID</th>
              <th className="py-4 px-6 border-b">Customer</th>
              <th className="py-4 px-6 border-b">Address</th>
              <th className="py-4 px-6 border-b">Total ($)</th>
              <th className="py-4 px-6 border-b">Order Status (Dropdown)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 uppercase tracking-widest text-[#333]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6 text-gray-500">#ORD-{order.id}</td>
                <td className="py-4 px-6">
                  <span className="font-bold block">{order.userName}</span>
                  <span className="text-gray-400 text-[10px]">{order.userEmail}</span>
                </td>
                <td className="py-4 px-6 text-gray-500 max-w-xs truncate">{order.address}</td>
                <td className="py-4 px-6 font-bold text-black">${order.total_payment}</td>
                <td className="py-4 px-6">
                  <form action={updateStatus} className="flex gap-2 items-center">
                    <input type="hidden" name="orderId" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:border-yello uppercase tracking-widest text-xs font-termina"
                    >
                      <option value="Placed">Placed / Processing</option>
                      <option value="Prepared">Order Prepared</option>
                      <option value="Packed">Ready & Packed</option>
                      <option value="Received">Received / Completed</option>
                    </select>
                    <button type="submit" className="btn-primary font-termina px-4 py-2 text-[10px]">
                      UPDATE
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">NO ORDERS FOUND.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
