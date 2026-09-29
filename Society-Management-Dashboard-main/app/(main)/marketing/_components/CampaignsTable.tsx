'use client';

import { MarketingCampaign, UserRole } from '@/utils/types';
import {
    CheckCircle2, Trash2, ArrowUpRight,
    ChevronLeft, ChevronRight, Eye, Calendar,
    DollarSign, TrendingUp
} from 'lucide-react';

interface CampaignsTableProps {
    campaigns: MarketingCampaign[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onSelect: (campaign: MarketingCampaign) => void;
    onDelete: (id: string) => void;
    onApprove: (id: string) => void;
    userRole: UserRole;
}

export default function CampaignsTable({
    campaigns,
    currentPage,
    totalPages,
    onPageChange,
    onSelect,
    onDelete,
    onApprove,
    userRole
}: CampaignsTableProps) {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl overflow-hidden animate-fadeIn">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                    Campaign Registry
                </h3>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-700 transition-colors">
                    EXPORT_LEDGER <ArrowUpRight size={14} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Business
                            </th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Status
                            </th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Timeline
                            </th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Performance
                            </th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Fee
                            </th>
                            <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {campaigns.map((campaign) => (
                            <tr
                                key={campaign.id}
                                onClick={() => onSelect(campaign)}
                                className="group hover:bg-slate-50/50 transition-colors cursor-pointer animate-fadeIn"
                                style={{ animationDelay: `${campaigns.indexOf(campaign) * 50}ms` }}
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                            <img
                                                src={campaign.image}
                                                alt={campaign.businessName}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                                                {campaign.businessName}
                                            </p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                {campaign.type}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <span className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getStatusColor(campaign.status)}`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Calendar size={12} />
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                                {campaign.startDate}
                                            </p>
                                            <p className="text-[8px] font-medium text-slate-400">
                                                to {campaign.endDate}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Eye size={10} className="text-indigo-500" />
                                            <span className="text-[9px] font-bold text-slate-600">
                                                {campaign.reach.toLocaleString()} reach
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={10} className="text-emerald-500" />
                                            <span className="text-[9px] font-bold text-slate-600">
                                                {campaign.engagement} engagements
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={12} className="text-amber-500" />
                                        <span className="font-black text-slate-900 text-sm">
                                            {formatCurrency(campaign.fee)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {campaign.status === 'Pending' && userRole !== UserRole.RESIDENT && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onApprove(campaign.id);
                                                }}
                                                className="p-2 text-slate-300 hover:text-emerald-600 transition-colors"
                                                title="Approve campaign"
                                            >
                                                <CheckCircle2 size={16} />
                                            </button>
                                        )}
                                        {userRole !== UserRole.RESIDENT && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(campaign.id);
                                                }}
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                title="Delete campaign"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Showing <span className="text-slate-900">
                        {((currentPage - 1) * campaigns.length) + 1}
                    </span> - <span className="text-slate-900">
                        {Math.min(currentPage * campaigns.length, campaigns.length)}
                    </span> of <span className="text-slate-900">{campaigns.length}</span>
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}