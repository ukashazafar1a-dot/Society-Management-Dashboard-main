'use client';

import { ReactNode } from 'react';

interface FormGroupProps {
    label: string;
    placeholder: string;
    icon: ReactNode;
    type?: string;
    value?: string;
    onChange?: (value: string) => void; // Changed: Only accepts value
}

export default function FormGroup({
    label,
    placeholder,
    icon,
    type = "text",
    value,
    onChange
}: FormGroupProps) {
    return (
        <div className="space-y-2 group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors">
                    {icon}
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all"
                />
            </div>
        </div>
    );
}