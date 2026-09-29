'use client';

import { MarketingCampaign } from '@/utils/types';
import {
    ArrowLeft, Clock, Eye, Share2, Calendar,
    DollarSign, TrendingUp, Tag, CreditCard,
    CheckCircle2, XCircle, MapPin, Users,
    Download, Trash2, Edit3, BarChart3, X
} from 'lucide-react';
import { useState } from 'react';

interface CampaignDetailProps {
    campaign: MarketingCampaign;
    onBack: () => void;
    onDelete: () => void;
    onUpdate: (updates: Partial<MarketingCampaign>) => void;
}

export default function CampaignDetail({
    campaign,
    onBack,
    onDelete,
    onUpdate
}: CampaignDetailProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCampaign, setEditedCampaign] = useState(campaign);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleSave = () => {
        onUpdate(editedCampaign);
        setIsEditing(false);
    };

    const handleToggleStatus = () => {
        const newStatus = campaign.status === 'Active' ? 'Completed' : 'Active';
        onUpdate({ status: newStatus });
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadReport = () => {
        const content = `
      Campaign Report: ${campaign.title}
      
      Business: ${campaign.businessName}
      Type: ${campaign.type}
      Status: ${campaign.status}
      Duration: ${campaign.startDate} to ${campaign.endDate}
      
      Performance Metrics:
      - Investment: ${formatCurrency(campaign.fee)}
      - Reach: ${campaign.reach.toLocaleString()} views
      - Engagement: ${campaign.engagement} interactions
      
      ${campaign.description}
    `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${campaign.title.replace(/\s+/g, '_')}_report.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="quartz-card rounded-[3rem] bg-white border border-slate-100 shadow-2xl p-8 md:p-14 relative overflow-hidden animate-fadeIn">
            {/* Action Buttons */}
            <div className="absolute top-0 right-0 p-8 flex items-center gap-3">
                <button
                    onClick={handleDownloadReport}
                    className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-2xl hover:bg-emerald-100 transition-all"
                    title="Download report"
                >
                    <Download size={18} />
                </button>
                <button
                    onClick={handleToggleStatus}
                    className={`p-3 rounded-2xl border transition-all ${campaign.status === 'Active'
                        ? 'bg-amber-50 border-amber-100 text-amber-500 hover:bg-amber-100'
                        : 'bg-emerald-50 border-emerald-100 text-emerald-500 hover:bg-emerald-100'
                        }`}
                    title={campaign.status === 'Active' ? 'Mark as completed' : 'Activate campaign'}
                >
                    {campaign.status === 'Active' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                </button>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-500 rounded-2xl hover:bg-indigo-100 transition-all"
                    title={isEditing ? 'Cancel editing' : 'Edit campaign'}
                >
                    {isEditing ? <X size={18} /> : <Edit3 size={18} />}
                </button>
                <button
                    onClick={onDelete}
                    className="p-3 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl hover:bg-rose-100 transition-all"
                    title="Delete campaign"
                >
                    <Trash2 size={18} />
                </button>
                <button
                    onClick={onBack}
                    className="p-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all flex items-center gap-2 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">EXIT_DETAILS</span>
                </button>
            </div>

            <div className="max-w-4xl">
                {/* Header Info */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-500 rounded-xl border border-amber-100">
                        <Tag size={16} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                            {campaign.type}
                        </span>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${campaign.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-500 border-emerald-100'
                        : campaign.status === 'Pending'
                            ? 'bg-amber-50 text-amber-500 border-amber-100'
                            : 'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                        {campaign.status}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">
                            {campaign.startDate} - {campaign.endDate}
                        </span>
                    </div>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight uppercase italic underline decoration-amber-500 decoration-4 underline-offset-8">
                    {campaign.title}
                </h1>

                {/* Business Name */}
                <div className="flex items-center gap-2 mb-10">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Business: {campaign.businessName}
                    </span>
                </div>

                {/* Campaign Image */}
                <div className="mb-10 rounded-2xl overflow-hidden">
                    <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign size={14} className="text-emerald-600" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">INVESTMENT</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900">{formatCurrency(campaign.fee)}</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Eye size={14} className="text-indigo-600" />
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">REACH</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={14} className="text-amber-600" />
                            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">ENGAGEMENT</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900">{campaign.engagement}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-8 mb-12">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                        <CreditCard size={20} className="text-amber-500" />
                        CAMPAIGN_NARRATIVE
                    </h3>
                    {isEditing ? (
                        <textarea
                            value={editedCampaign.description}
                            onChange={(e) => setEditedCampaign({ ...editedCampaign, description: e.target.value })}
                            className="w-full h-48 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                        />
                    ) : (
                        <p className="text-xl text-slate-600 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-amber-600 first-letter:mr-3 first-letter:float-left">
                            {campaign.description}
                        </p>
                    )}
                </div>

                {/* Footer Actions */}
                {isEditing && (
                    <div className="flex justify-end gap-4 mb-8">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">
                                Community Impact
                            </p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                {campaign.reach.toLocaleString()} Residents Reached
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase">
                            <Eye size={14} /> {campaign.reach.toLocaleString()} Views
                        </div>
                        <button
                            onClick={handleShare}
                            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-amber-600 rounded-xl transition-all"
                            title="Share campaign"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}