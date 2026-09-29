'use client';


import { Wallet, ArrowUpRight, TrendingUp, Calendar } from 'lucide-react';

interface BalanceCardProps {
    balance: number;
    dueDate?: string;
    onReconcile: () => void;
}

export default function BalanceCard({ balance, dueDate, onReconcile }: BalanceCardProps) {
    return (
        <div className="quartz-card  overflow-hidden p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white border-none group relative overflow-hidden hover:shadow-3xl transition-all duration-500 animate-fadeIn"
            style={{ backgroundColor: '#4f46e5' }}>
            {/* Background Decoration */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                        <Wallet size={30} />
                    </div>
                    <div className="flex items-center gap-2">
                        {dueDate && (
                            <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
                                <Calendar size={12} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Due {dueDate}</span>
                            </div>
                        )}
                        <ArrowUpRight className="text-white/40 group-hover:text-white/60 transition-colors" size={20} />
                    </div>
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-2 flex items-center gap-1">
                    <TrendingUp size={12} /> Payable Balance
                </p>
                <h3 className="text-5xl font-black tracking-tighter mb-2">
                    ${balance.toFixed(2)}
                </h3>
                <p className="text-[10px] text-indigo-200 mb-10">
                    Outstanding across {balance > 0 ? '2' : '0'} bills
                </p>

                <button
                    onClick={onReconcile}
                    className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-[10px] tracking-widest hover:bg-slate-50 hover:scale-[1.02] transition-all uppercase shadow-lg flex items-center justify-center gap-2 group/reconcile"
                >
                    RECONCILE_NOW
                    <ArrowUpRight size={14} className="group/reconcile:hover:translate-x-1 group/reconcile:hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}