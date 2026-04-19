import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";
import ScrollReveal from "@/components/admin/ScrollReveal";
import OrderListClient from "@/components/admin/OrderListClient";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return <div className="p-20 text-center font-termina text-red-500 uppercase tracking-widest">Unauthorized</div>;
  }

  // Fetch real orders from DB
  const [orders] = await pool.query<RowDataPacket[]>(
    `SELECT 
      o.id, o.address, o.total_payment, o.status, o.created_at,
      u.name as userName, u.email as userEmail
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`
  );

  async function updateStatus(orderId: number, newStatus: string) {
    "use server";
    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [newStatus, orderId]);
    revalidatePath("/admin/orders");
  }

  return (
    <div className="space-y-8">
        <ScrollReveal>
            <div className="flex justify-between items-end mb-4">
                <div>
                   <h1 className="text-5xl font-ivy font-bold text-black uppercase tracking-tight leading-none mb-3">Manage Orders</h1>
                   <p className="font-termina text-[10px] text-gray-400 uppercase tracking-[0.4em]">Track and process customer transactions</p>
                </div>
                <div className="flex gap-3">
                    {['All', 'Processing', 'Shipped', 'Delivered'].map(tab => (
                        <button key={tab} className={`px-5 py-2.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all ${tab === 'All' ? 'bg-black text-yello' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
            <div className="grid gap-6">
                <OrderListClient 
                    initialOrders={JSON.parse(JSON.stringify(orders))} 
                    onUpdateStatus={updateStatus} 
                />
            </div>
        </ScrollReveal>
    </div>
  );
}
