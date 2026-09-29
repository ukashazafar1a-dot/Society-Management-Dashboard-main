'use client';

import React from 'react';
import { ShieldCheck, TrendingDown, CreditCard, Bell, Lock, CheckCircle } from 'lucide-react';

interface SecurityStatusCardProps {
    autoPayEnabled: boolean;
    autoPayCount: number;
    onManageAutoPay: () => void;
}

export default function SecurityStatusCard({
    autoPayEnabled,
    autoPayCount,
    onManageAutoPay
}: SecurityStatusCardProps) {
    const securityFeatures = [
        {
            icon: <Lock size={14} className="text-emerald-600" />,
            label: 'SSL Encryption Active',
            status: 'active',
            color: 'emerald'
        },
        {
            icon: <CheckCircle size={14} className="text-indigo-600" />,
            label: 'PCI Compliant',
            status: 'active',
            color: 'indigo'
        },
        {
            icon: <Bell size={14} className="text-amber-600" />,
            label: 'Payment Notifications',
            status: 'active',
            color: 'amber'
        }
    ];

    return (
        <div className="quartz-card p-8 rounded-[2rem] bg-white border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-indigo-600" /> Payment Security
                </h4>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black uppercase tracking-wider">
                    Tier 1
                </span>
            </div>

            <div className="space-y-3">
                {securityFeatures.map((feature, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 group hover:bg-white hover:border-indigo-100 transition-all"
                    >
                        <div className={`w-2 h-2 rounded-full bg-${feature.color}-500 animate-pulse`}></div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide flex-1">
                            {feature.label}
                        </span>
                        <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Active
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingDown size={16} className={`${autoPayEnabled ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                            Auto-Pay Status
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase ${autoPayEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {autoPayEnabled ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {autoPayCount} bills
                        </span>
                    </div>
                </div>

                <button
                    onClick={onManageAutoPay}
                    className="w-full py-3 px-4 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                    <CreditCard size={14} />
                    Manage Auto-Pay
                </button>
            </div>
        </div>
    );
}