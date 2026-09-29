'use client';

import { MarketingCampaign } from '@/utils/types';
import { ShoppingBag, Sparkles, ArrowUpRight, Eye, Calendar } from 'lucide-react';


interface CampaignCardProps {
    campaign: MarketingCampaign;
    index: number;
    onClick: () => void;
}

export default function CampaignCard({ campaign, index, onClick }: CampaignCardProps) {
    const animationDelay = index * 100;

    return (
        <div
            style={{
                animationDelay: `${animationDelay}ms`,
                animationFillMode: 'both'
            }}
            onClick={onClick}
            className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl overflow-hidden flex flex-col group hover:border-amber-400 transition-all cursor-pointer hover:shadow-2xl hover:shadow-amber-100/50 animate-fadeInUp"
        >
            <div className="h-48 relative overflow-hidden">
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/90 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-sm flex items-center gap-1.5">
                    <Sparkles size={10} /> COMMUNITY_OFFER
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
                    <Eye size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">
                        {campaign.reach.toLocaleString()} views
                    </span>
                </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar size={12} className="text-amber-500" />
                        <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">
                            {campaign.startDate} - {campaign.endDate}
                        </span>
                    </div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {campaign.businessName}
                    </h4>
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
                        {campaign.title}
                    </h3>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2 mb-8">
                    {campaign.description}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <ShoppingBag size={12} className="text-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{campaign.type}</span>
                    </div>
                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all flex items-center gap-2 group">
                        VIEW_OFFER <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}