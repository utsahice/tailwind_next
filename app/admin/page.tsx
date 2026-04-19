import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import fs from "fs";
import path from "path";
import DashboardClient from "@/components/admin/DashboardClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return <div className="p-20 text-center font-termina text-red-500 uppercase tracking-widest">Unauthorized Access</div>;
  }

  // Fetch real stats from DB
  const [userCountResult] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM users");
  const [orderCountResult] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM orders");
  const [revenueResult] = await pool.query<RowDataPacket[]>("SELECT SUM(total_payment) as total FROM orders");
  
  // Fetch Leads from JSON (keep existing logic)
  let contactCount = 0;
  try {
    const contactPath = path.join(process.cwd(), "data", "contacts.json");
    if (fs.existsSync(contactPath)) {
      const contacts = JSON.parse(fs.readFileSync(contactPath, "utf-8"));
      contactCount = contacts.length;
    }
  } catch (e) {}

  const stats = {
    users: userCountResult[0].count || 0,
    orders: orderCountResult[0].count || 0,
    revenue: revenueResult[0].total || 0,
    leads: contactCount
  };

  // Fetch real activities
  const [recentOrders] = await pool.query<RowDataPacket[]>(
    "SELECT o.id, u.name, o.created_at FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC LIMIT 3"
  );
  const [recentUsers] = await pool.query<RowDataPacket[]>(
    "SELECT name, created_at FROM users ORDER BY created_at DESC LIMIT 2"
  );

  const recentActivities = [
    ...recentOrders.map(o => ({ title: `Order #${o.id} - ${o.name}`, time: new Date(o.created_at).toLocaleTimeString() })),
    ...recentUsers.map(u => ({ title: `Member ${u.name} joined`, time: new Date(u.created_at).toLocaleTimeString() }))
  ].sort((a, b) => b.time.localeCompare(a.time)).slice(0, 5);

  return (
    <DashboardClient 
      stats={stats} 
      recentActivities={recentActivities} 
      userName={session.user.name || "Admin"} 
    />
  );
}
