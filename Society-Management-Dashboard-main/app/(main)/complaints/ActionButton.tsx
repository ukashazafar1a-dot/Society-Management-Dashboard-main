'use client';

import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ActionButtonProps {
    label: string;
    icon: React.ReactNode;
    color: 'indigo' | 'emerald' | 'rose' | 'amber';
    onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, color, onClick }) => {
    const colorClasses = {
        indigo: 'hover:border-indigo-300 text-indigo-500',
        emerald: 'hover:border-emerald-300 text-emerald-500',
        rose: 'hover:border-rose-300 text-rose-500',
        amber: 'hover:border-amber-300 text-amber-500'
    };

    return (
        <button
            className={`w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl group hover:border-${color}-300 transition-all shadow-sm`}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 bg-slate-50 text-slate-400 group-hover:text-${color}-500 transition-colors`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    {label}
                </span>
            </div>
            <MoreHorizontal size={14} className="text-slate-300" />
        </button>
    );
};

export default ActionButton;