import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/admin/ScrollReveal";
import { ArrowLeft, Package, MapPin, User, Calendar, CreditCard, CheckCircle, Truck, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <div className="p-20 text-center font-ivy font-bold text-3xl uppercase tracking-tighter">Order Detail Page Reached. ID: {id}</div>;
/*
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        return <div className="p-20 text-center font-termina text-red-500 uppercase tracking-widest">Unauthorized Access (Role: {session?.user?.role || 'Guest'})</div>;
    }

    const [orderRows] = await pool.query<RowDataPacket[]>(
        `SELECT o.*, u.name as userName, u.email as userEmail 
         FROM orders o 
         JOIN users u ON o.user_id = u.id 
         WHERE o.id = ?`,
        [id]
    );

    if (orderRows.length === 0) {
        return <div className="p-20 text-center font-termina text-gray-500 uppercase tracking-widest">Order ID {id} Not Found in Database</div>;
    }
*/
    const order = orderRows[0];

    // Mock items since we don't have a table yet, but we will show them beautifully
    const mockItems = [
        { id: 1, name: "Premium Leather Watch", price: 299.00, qty: 1, image: "https://images.unsplash.com/photo-1524592093837-8f355b19b565?auto=format&fit=crop&q=80&w=200" },
        { id: 2, name: "Luxury Fountain Pen", price: 151.00, qty: 1, image: "https://images.unsplash.com/photo-1583485002447-380d0f41786c?auto=format&fit=crop&q=80&w=200" }
    ];

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'Placed': return Clock;
            case 'Prepared': return Package;
            case 'Packed': return Truck;
            case 'Received': return CheckCircle;
            default: return Clock;
        }
    };

    const StatusIcon = getStatusIcon(order.status);
    const timeline = [
        { label: 'Order Placed', status: 'Placed', date: order.created_at },
        { label: 'Being Prepared', status: 'Prepared', date: null },
        { label: 'Packed & Shipped', status: 'Packed', date: null },
        { label: 'Delivered', status: 'Received', date: null },
    ];

    return (
        <div className="space-y-10 pb-20">
            <ScrollReveal>
                <div className="flex items-center gap-6 mb-8">
                    <Link href="/admin/orders" className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group">
                        <ArrowLeft className="w-6 h-6 text-black group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-ivy font-bold text-black uppercase tracking-tight">Order #{order.id}</h1>
                        <p className="font-termina text-[10px] text-gray-400 uppercase tracking-[0.4em] mt-1">Transaction Details</p>
                    </div>
                </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column: Items & Timeline */}
                <div className="lg:col-span-2 space-y-10">
                    <ScrollReveal delay={0.1}>
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-yello" />
                                <h3 className="font-ivy font-bold text-xl uppercase tracking-tight">Order Items</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {mockItems.map((item) => (
                                    <div key={item.id} className="p-8 flex items-center gap-8 group">
                                        <div className="w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-500 relative">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-ivy font-bold text-black">{item.name}</h4>
                                            <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mt-1">Ref ID: SK-00{item.id}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-ivy font-bold text-black">${item.price.toFixed(2)}</p>
                                            <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mt-1">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-gray-50 flex justify-between items-center">
                                <span className="font-termina text-[10px] text-gray-400 uppercase tracking-[0.4em]">Subtotal</span>
                                <span className="font-ivy font-bold text-2xl text-black">${order.total_payment}</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                            <h3 className="font-ivy font-bold text-xl uppercase tracking-tight mb-10 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-yello" />
                                Order Timeline
                            </h3>
                            <div className="relative">
                                <div className="absolute left-6 top-2 bottom-2 w-px bg-gray-100"></div>
                                <div className="space-y-12">
                                    {timeline.map((step, i) => {
                                        const isCompleted = timeline.findIndex(s => s.status === order.status) >= i;
                                        return (
                                            <div key={step.status} className="flex gap-8 relative z-10">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-black text-yello shadow-xl shadow-black/10' : 'bg-white border border-gray-100 text-gray-300'}`}>
                                                    <StatusIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className={`font-ivy font-bold text-lg ${isCompleted ? 'text-black' : 'text-gray-300'}`}>{step.label}</p>
                                                    <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mt-1">
                                                        {isCompleted ? (step.date ? new Date(step.date).toLocaleString() : 'Processing...') : 'Pending'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Right Column: Customer & Payment */}
                <div className="space-y-10">
                    <ScrollReveal delay={0.3}>
                        <div className="bg-[#0D0D0D] text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-14 h-14 bg-yello/10 rounded-2xl flex items-center justify-center border border-yello/20">
                                        <User className="w-7 h-7 text-yello" />
                                    </div>
                                    <h3 className="font-ivy font-bold text-2xl tracking-tight">Customer</h3>
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] font-termina text-gray-500 uppercase tracking-widest mb-1 leading-none">Name</p>
                                        <p className="text-xl font-ivy font-bold text-white uppercase tracking-tight">{order.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-termina text-gray-500 uppercase tracking-widest mb-1">Shipping Address</p>
                                        <div className="flex gap-3">
                                            <MapPin className="w-5 h-5 text-yello shrink-0 mt-1" />
                                            <p className="text-sm font-termina text-white/80 leading-relaxed uppercase">{order.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-yello opacity-[0.05] rounded-full blur-3xl"></div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <CreditCard className="w-7 h-7 text-emerald-500" />
                                </div>
                                <h3 className="font-ivy font-bold text-2xl text-black tracking-tight tracking-tight">Payment</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest">Amount Paid</p>
                                    <p className="text-4xl font-ivy font-bold text-black">${order.total_payment}</p>
                                </div>
                                <div className="pt-6 border-t border-gray-50">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest">Status</p>
                                        <div className="flex items-center gap-2 text-emerald-500 px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                            Success
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
