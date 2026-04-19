"use client";

import { ShoppingBag, Users, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/admin/ScrollReveal";

interface DashboardClientProps {
  stats: {
    orders: number;
    users: number;
    leads: number;
    revenue: number;
  };
  recentActivities: any[];
  userName: string;
}

export default function DashboardClient({ stats, recentActivities, userName }: DashboardClientProps) {
  const statCards = [
    { name: "Total Orders", value: stats.orders.toString(), icon: ShoppingBag, trend: "+12.5%", isPositive: true, color: "bg-blue-500" },
    { name: "Website Leads", value: stats.leads.toString(), icon: MessageSquare, trend: "+5.2%", isPositive: true, color: "bg-emerald-500" },
    { name: "Registered Users", value: stats.users.toString(), icon: Users, trend: "+18.4%", isPositive: true, color: "bg-violet-500" },
    { name: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: TrendingUp, trend: "-2.1%", isPositive: false, color: "bg-yello" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-ivy font-bold text-black uppercase tracking-tight leading-none mb-3">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yello animate-pulse"></span>
            <p className="font-termina text-[10px] text-gray-400 uppercase tracking-[0.4em]">
              Welcome, {userName} • System Live
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
            <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                Download Report
            </button>
            <button className="px-6 py-3 bg-black text-yello rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:shadow-xl hover:shadow-black/10 transition-all">
                System Config
            </button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat) => (
          <motion.div 
            key={stat.name} 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden group"
          >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${stat.color === 'bg-yello' ? 'bg-yello text-black' : stat.color + ' text-white'} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <stat.icon className="w-8 h-8" />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-full ${stat.isPositive ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                        {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.trend}
                    </div>
                </div>
                <p className="text-[10px] font-termina uppercase tracking-[0.2em] text-gray-400 mb-2">{stat.name}</p>
                <h3 className="text-4xl font-ivy font-bold text-black tracking-tight">{stat.value}</h3>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <ScrollReveal>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 h-full relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="font-ivy font-bold text-2xl uppercase tracking-tight">Revenue Analytics</h3>
                            <p className="text-[10px] font-termina text-gray-400 uppercase tracking-widest mt-1">Monthly performance overview</p>
                        </div>
                        <div className="flex gap-2">
                            {['7D', '1M', '3M', '1Y'].map(t => (
                                <button key={t} className={`px-4 py-2 rounded-xl text-[9px] font-bold transition-all ${t === '1M' ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="h-64 w-full flex items-end gap-2 group">
                        {[40, 70, 45, 90, 65, 80, 50, 85, 40, 100, 75, 95].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.5 + (i * 0.05), duration: 1 }}
                                className={`flex-1 rounded-t-lg transition-all duration-300 relative group/bar ${h > 80 ? 'bg-yello' : 'bg-black/5 hover:bg-black/20'}`}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                    ${h * 124}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="flex justify-between mt-6 px-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <span key={m} className="text-[8px] font-termina text-gray-300 uppercase">{m}</span>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>

        <div className="space-y-8">
            <ScrollReveal delay={0.2} direction="right">
                <div className="bg-[#0D0D0D] text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-yello/10 rounded-xl flex items-center justify-center">
                                <Activity className="w-7 h-7 text-yello" />
                            </div>
                            <h3 className="font-ivy font-bold text-xl italic text-yello">Live Engine</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { label: "Server Load", val: "24%", color: "bg-yello" },
                                { label: "Database", val: "Active", color: "bg-emerald-500" },
                                { label: "API Sync", val: "100%", color: "bg-violet-500" }
                            ].map(item => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-[10px] font-termina uppercase tracking-widest mb-2 opacity-60">
                                        <span>{item.label}</span>
                                        <span>{item.val}</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: item.val.includes('%') ? item.val : '100%' }}
                                            transition={{ delay: 1, duration: 1.5 }}
                                            className={`h-full ${item.color}`}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <p className="text-[9px] font-termina text-gray-500 uppercase tracking-widest leading-relaxed mt-10">
                            Systems are operational. All nodes synced.
                        </p>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-yello opacity-[0.03] rounded-full blur-3xl"></div>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="right">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                    <h3 className="font-ivy font-bold text-lg mb-6 uppercase tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yello"></div>
                        Recent Activity
                    </h3>
                    <div className="space-y-6">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex gap-4 items-start group cursor-default">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-yello/10 transition-colors">
                                    <ShoppingBag className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-black">{activity.title}</p>
                                    <p className="text-[9px] text-gray-400 font-termina uppercase mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-2xl border border-gray-100 text-[9px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                        View All Activity
                    </button>
                </div>
            </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
