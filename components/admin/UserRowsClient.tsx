"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, Shield, MoreVertical } from "lucide-react";
import { useState } from "react";

interface UserRowsClientProps {
  initialUsers: any[];
}

export default function UserRowsClient({ initialUsers }: UserRowsClientProps) {
    const [users] = useState(initialUsers);

    return (
        <AnimatePresence>
            {users.map((user, i) => (
                <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="group hover:bg-gray-50/50 transition-colors"
                >
                    <td className="py-6 px-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-ivy font-bold text-black border border-gray-100 group-hover:bg-yello group-hover:border-yello transition-all duration-500">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-black uppercase tracking-wider">{user.name}</span>
                                <div className="flex items-center gap-1 text-[9px] text-gray-400 font-termina lowercase mt-1">
                                    <Mail className="w-3 h-3" />
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="py-6 px-10">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-black text-yello' : 'bg-gray-100 text-gray-500'}`}>
                            <Shield className="w-3 h-3" />
                            {user.role}
                        </div>
                    </td>
                    <td className="py-6 px-10">
                        <div className="flex items-center gap-2 text-[10px] font-termina text-gray-500 uppercase">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                    </td>
                    <td className="py-6 px-10 text-right">
                        <button className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 shadow-none hover:shadow-sm">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                    </td>
                </motion.tr>
            ))}
        </AnimatePresence>
    );
}
