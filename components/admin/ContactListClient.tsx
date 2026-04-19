"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Building2, Calendar, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ContactListClientProps {
  initialContacts: any[];
}

export default function ContactListClient({ initialContacts }: ContactListClientProps) {
    const [contacts] = useState(initialContacts);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <AnimatePresence>
            {contacts.map((contact, i) => {
                const isExpanded = expandedId === contact.id;
                
                return (
                    <motion.div 
                        key={contact.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.6 }}
                        className={`bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-black/5 transition-all overflow-hidden group ${isExpanded ? 'ring-2 ring-yello ring-offset-4' : ''}`}
                    >
                        <div 
                            className="p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                            onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center font-ivy font-bold text-xl text-black border border-gray-100 transition-all duration-500 ${isExpanded ? 'bg-yello border-yello' : 'group-hover:bg-gray-100'}`}>
                                    {contact.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-ivy font-bold text-black">{contact.name}</h3>
                                    <div className="flex items-center gap-4 text-[9px] font-termina text-gray-400 uppercase tracking-widest mt-1">
                                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {contact.email}</span>
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(contact.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-black uppercase tracking-widest">{contact.service || "General"}</span>
                                    <span className="text-[8px] text-gray-400 font-termina uppercase mt-1">Request Type</span>
                                </div>
                                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-black text-yello' : 'group-hover:bg-yello group-hover:text-black'}`}>
                                    <MoreHorizontal className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-10 pb-10 border-t border-gray-50 bg-gray-50/30"
                                >
                                    <div className="pt-10 grid lg:grid-cols-3 gap-12">
                                        <div className="lg:col-span-2 space-y-8">
                                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                                                <p className="text-[10px] font-termina text-gray-400 uppercase tracking-[0.2em] mb-4">Message Content</p>
                                                <p className="text-sm font-termina text-gray-700 leading-relaxed italic">
                                                    "{contact.message}"
                                                </p>
                                            </div>
                                            
                                            <div className="flex gap-4">
                                                <a 
                                                    href={`mailto:${contact.email}?subject=Reply to your inquiry - Gloss&body=Hi ${contact.name},`}
                                                    className="flex-1 py-4 bg-black text-yello rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:shadow-xl hover:shadow-black/20 transition-all text-center flex items-center justify-center gap-2"
                                                >
                                                    <Mail className="w-4 h-4" /> Send Email Reply
                                                </a>
                                                <button className="px-6 py-4 bg-white border border-gray-100 text-black rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                                                    Archive Lead
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                             <div>
                                                <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mb-2">Company</p>
                                                <div className="flex items-center gap-3 text-sm font-bold text-black uppercase">
                                                    <Building2 className="w-5 h-5 text-yello" />
                                                    {contact.company || "Individual"}
                                                </div>
                                             </div>
                                             <div>
                                                <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mb-2">Phone</p>
                                                <div className="flex items-center gap-3 text-sm font-bold text-black">
                                                    <Phone className="w-5 h-5 text-yello" />
                                                    {contact.phone || "Not provided"}
                                                </div>
                                             </div>
                                             <div className="pt-4 border-t border-gray-50">
                                                <p className="text-[8px] font-termina text-gray-300 uppercase tracking-widest italic leading-relaxed">
                                                    This lead was captured via the main contact form. Pre-filled data may be available from session.
                                                </p>
                                             </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </AnimatePresence>
    );
}
