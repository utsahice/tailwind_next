"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, MapPin, DollarSign, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface OrderListClientProps {
  initialOrders: any[];
  onUpdateStatus: (orderId: number, status: string) => Promise<void>;
}

export default function OrderListClient({ initialOrders, onUpdateStatus }: OrderListClientProps) {
    const [orders, setOrders] = useState(initialOrders);

    const statusSequence = ['Placed', 'Prepared', 'Packed', 'Received'];

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'Placed': return { color: 'text-blue-500', bg: 'bg-blue-50', icon: Clock };
            case 'Prepared': return { color: 'text-amber-500', bg: 'bg-amber-50', icon: Package };
            case 'Packed': return { color: 'text-violet-500', bg: 'bg-violet-50', icon: Truck };
            case 'Received': return { color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle };
            default: return { color: 'text-gray-500', bg: 'bg-gray-50', icon: Clock };
        }
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        if (newStatus === "Received" && !confirm("Once marked as Received, the status cannot be changed. Proceed?")) return;
        await onUpdateStatus(orderId, newStatus);
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const isStatusDisabled = (currentStatus: string, optionStatus: string) => {
        if (currentStatus === 'Received') return true;
        const currentIndex = statusSequence.indexOf(currentStatus);
        const optionIndex = statusSequence.indexOf(optionStatus);
        return optionIndex < currentIndex;
    };

    return (
        <AnimatePresence>
            {orders.map((order, i) => {
                const statusStyle = getStatusStyle(order.status);
                const currentStatusIndex = statusSequence.indexOf(order.status);
                
                return (
                    <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.6 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className={`w-24 h-24 rounded-3xl ${statusStyle.bg} flex items-center justify-center transition-transform duration-500 group-hover:rotate-6`}>
                                    <statusStyle.icon className={`w-12 h-12 ${statusStyle.color}`} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">#ORD-{order.id}</span>
                                        <select 
                                            value={order.status}
                                            disabled={order.status === 'Received'}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest outline-none border-none cursor-pointer transition-all ${order.status === 'Received' ? 'opacity-50 cursor-not-allowed' : ''} ${statusStyle.bg} ${statusStyle.color}`}
                                        >
                                            {statusSequence.map(opt => (
                                                <option key={opt} value={opt} disabled={isStatusDisabled(order.status, opt)}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <h4 className="text-xl font-ivy font-bold text-black">{order.userName}</h4>
                                    <div className="flex items-center gap-4 text-[10px] font-termina text-gray-400 uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {order.address}</span>
                                        <span>•</span>
                                        <span>{new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between lg:justify-end gap-12 border-t lg:border-t-0 pt-6 lg:pt-0 border-gray-50">
                                <div className="text-right">
                                    <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="text-3xl font-ivy font-bold text-black flex items-center justify-end gap-1">
                                        <DollarSign className="w-6 h-6 text-yello" />
                                        {parseFloat(order.total_payment).toFixed(2)}
                                    </p>
                                </div>
                                <Link href={`/admin/orders/${order.id}`} className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-yello transition-all">
                                    <ChevronRight className="w-8 h-8" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </AnimatePresence>
    );
}
