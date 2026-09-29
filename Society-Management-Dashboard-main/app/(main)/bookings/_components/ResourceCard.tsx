'use client';

import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { BookingResource } from '@/utils/types';

interface ResourceCardProps {
    resource: BookingResource;
    onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
    return (
        <div
            className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden flex flex-col group cursor-pointer hover:border-indigo-300 transition-all"
            onClick={onClick}
        >
            <div className="h-48 relative overflow-hidden">
                <img
                    src={resource.image}
                    alt={resource.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                    {resource.price}
                </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight line-clamp-1">{resource.name}</h3>
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${resource.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                        {resource.status}
                    </div>
                </div>
                <p className="text-slate-500 text-xs font-medium line-clamp-2 mt-2 leading-relaxed mb-6">
                    {resource.description}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={12} className="text-indigo-400" />
                        <span className="text-[10px] font-black uppercase tracking-tight">{resource.location.split(',')[0]}</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;