import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { redirect } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Get orders using raw SQL for the current logged-in user
  const [orders] = await pool.query<RowDataPacket[]>(
    "SELECT id, address, total_payment, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [session.user.id]
  );

  return (
    <Layout>
      <div className="min-h-screen bg-white pb-20 pt-40 md:pt-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row gap-12">

            {/* Sidebar / User Info */}
            <div className="lg:w-1/3 xl:w-1/4">
              <div className="sticky top-40 bg-lime/30 border border-gray-100 p-8 rounded-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-yello rounded-full flex items-center justify-center text-3xl font-termina font-bold text-black shadow-sm mb-4">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <h1 className="text-xl font-termina font-bold text-black uppercase tracking-[0.2em] leading-tight">
                    {session.user.name}
                  </h1>
                  <p className="font-termina text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                    {session.user.email}
                  </p>

                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin/orders" className="mt-4 inline-block btn-outline w-full py-2">
                      ADMIN PANEL
                    </Link>
                  )}
                </div>

                <div className="mt-10 space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-yello text-black font-termina text-[10px] font-bold tracking-widest uppercase rounded-lg">
                    DASHBOARD
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-white/50 text-gray-600 font-termina text-[10px] font-bold tracking-widest uppercase rounded-lg transition-colors">
                    EDIT PROFILE
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-white/50 text-gray-600 font-termina text-[10px] font-bold tracking-widest uppercase rounded-lg transition-colors">
                    MY ORDERS
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-2/3 xl:w-3/4">
              <div className="mb-12">
                <h2 className="text-3xl font-termina font-bold text-black uppercase tracking-[0.15em] mb-2 leading-tight">Member Dashboard</h2>
                <div className="h-0.5 w-20 bg-yello"></div>
                <p className="font-termina text-[10px] text-gray-400 mt-6 uppercase tracking-[0.2em]">Manage your orders and account details below.</p>
              </div>

              {/* Stats / Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
                  <p className="font-termina text-[10px] text-gray-400 uppercase tracking-widest mb-2">Total Orders</p>
                  <p className="text-3xl font-termina font-bold text-black">{orders.length}</p>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
                  <p className="font-termina text-[10px] text-gray-400 uppercase tracking-widest mb-2">Membership</p>
                  <p className="text-3xl font-termina font-bold text-black">-</p>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
                  <p className="font-termina text-[10px] text-gray-400 uppercase tracking-widest mb-2">Status</p>
                  <p className="text-3xl font-termina font-bold text-black uppercase tracking-tight">ACTIVE</p>
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30">
                  <h3 className="font-termina text-[10px] font-bold text-black uppercase tracking-widest">Recent Orders</h3>
                </div>

                {orders.length === 0 ? (
                  <div className="p-16 text-center">
                    <p className="font-termina text-[10px] text-gray-400 uppercase tracking-widest italic leading-loose">
                      You haven't placed any orders yet.
                    </p>
                    <Link href="/products" className="mt-8 inline-block btn-primary">
                      START SHOPPING
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <div key={order.id} className="p-8 hover:bg-lime/5 transition-colors group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                          {/* ID and Date */}
                          <div className="space-y-1">
                            <p className="text-[10px] font-termina font-bold text-yello uppercase tracking-widest">Order #{String(order.id).padStart(5, '0')}</p>
                            <p className="text-gray-400 font-termina text-[10px] uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          </div>

                          {/* Address */}
                          <div className="max-w-xs">
                            <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mb-1">Shipping To</p>
                            <p className="text-sm font-termina text-black font-medium truncate">{order.address}</p>
                          </div>

                          {/* Price */}
                          <div className="text-center md:text-right">
                            <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mb-1">Total</p>
                            <p className="text-xl font-ivy font-bold text-black">${order.total_payment}</p>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-4">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest
                              ${order.status === 'Placed' ? 'bg-blue-50 text-blue-600' : ''}
                              ${order.status === 'Prepared' ? 'bg-yellow-50 text-yellow-600' : ''}
                              ${order.status === 'Packed' ? 'bg-orange-50 text-orange-600' : ''}
                              ${order.status === 'Received' ? 'bg-green-50 text-green-600' : ''}
                              border border-current/10
                            `}>
                              {order.status}
                            </span>
                            <button className="text-gray-300 hover:text-black transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

