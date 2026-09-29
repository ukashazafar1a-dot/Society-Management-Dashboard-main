'use client';

import { DollarSign, Eye, Rocket } from 'lucide-react';
import { ReactNode } from 'react';

interface StatsCardProps {
    label: string;
    value: string;
    trend: string;
    icon: 'dollar' | 'eye' | 'rocket';
}

export default function StatsCard({ label, value, trend, icon }: StatsCardProps) {
    const getIcon = (): ReactNode => {
        switch (icon) {
            case 'dollar':
                return <DollarSign className="text-emerald-500" size={24} />;
            case 'eye':
                return <Eye className="text-indigo-500" size={24} />;
            case 'rocket':
                return <Rocket className="text-amber-500" size={24} />;
            default:
                return null;
        }
    };

    return (
        <div className="quartz-card p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 relative group overflow-hidden hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300 animate-fadeIn">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-300">
                {getIcon()}
            </div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                {label}
            </p>
            <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                    {value}
                </h3>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg mb-1">
                    {trend}
                </span>
            </div>
        </div>
    );
}