'use client';

import React from 'react';
import * as Icons from 'lucide-react';
import { ServiceCategory } from '@/utils/types';


interface ServiceCategoryCardProps {
    category: ServiceCategory;
    onClick?: () => void;
}

const colorSchemes = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    yellow: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white',
    slate: 'bg-slate-50 text-slate-600 group-hover:bg-slate-600 group-hover:text-white',
    indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    cyan: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white',
    amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
};

export default function ServiceCategoryCard({ category, onClick }: ServiceCategoryCardProps) {
    // Dynamically import the icon from lucide-react
    const IconComponent = (Icons as any)[category.icon] || Icons.HelpCircle;

    return (
        <button
            onClick={onClick}
            className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center space-y-3 animate-fadeIn"
        >
            <div className={`p-4 rounded-xl transition-all ${colorSchemes[category.colorScheme as keyof typeof colorSchemes] || 'bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                <IconComponent size={28} />
            </div>
            <span className="font-bold text-slate-800 text-sm">{category.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                {category.providers} Providers
            </span>
            {category.avgRating && (
                <div className="flex items-center gap-1 mt-1">
                    <Icons.Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-700">{category.avgRating}</span>
                </div>
            )}
        </button>
    );
}