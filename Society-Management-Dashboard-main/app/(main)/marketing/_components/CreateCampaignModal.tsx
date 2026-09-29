'use client';

import { useState } from 'react';
import {
    X, Globe, Briefcase, Tag, Calendar,
    CreditCard, Plus, Send, DollarSign,
    Image as ImageIcon, MessageSquare
} from 'lucide-react';
import FormGroup from './FormGroup';
import { CreateCampaignData } from '@/utils/types';

interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCampaignData) => void;
}

export default function CreateCampaignModal({
    isOpen,
    onClose,
    onSubmit
}: CreateCampaignModalProps) {
    const [formData, setFormData] = useState<CreateCampaignData>({
        businessName: '',
        title: '',
        description: '',
        type: 'Discount',
        startDate: '',
        endDate: '',
        fee: 249,
        image: ''
    });

    const handleInputChange = (field: keyof CreateCampaignData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        // Reset form
        setFormData({
            businessName: '',
            title: '',
            description: '',
            type: 'Discount',
            startDate: '',
            endDate: '',
            fee: 249,
            image: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp">
                <div className="p-8 md:p-10 border-b border-slate-100 flex items-center justify-between bg-amber-50/30">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Campaign Provisioning
                        </h3>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-1">
                            Strategic Exposure Node
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-rose-500 hover:border-rose-100 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10">
                    <div className="space-y-12">
                        <section className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Globe size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Deployment Specification
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormGroup
                                    label="Business Name"
                                    placeholder="e.g. Metro Mart"
                                    icon={<Briefcase size={14} />}
                                    value={formData.businessName}
                                    onChange={(value) => handleInputChange('businessName', value)}
                                />

                                <FormGroup
                                    label="Target Headline"
                                    placeholder="Ad heading..."
                                    icon={<Tag size={14} />}
                                    value={formData.title}
                                    onChange={(value) => handleInputChange('title', value)}
                                />

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Campaign_Class
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-amber-100 appearance-none cursor-pointer"
                                    >
                                        <option value="Discount">Discount</option>
                                        <option value="Banner">Banner_Ad</option>
                                        <option value="Sponsored Event">Sponsored_Event</option>
                                        <option value="Popup_Alert">Popup_Alert</option>
                                    </select>
                                </div>

                                <FormGroup
                                    label="Campaign Fee ($)"
                                    placeholder="0"
                                    icon={<DollarSign size={14} />}
                                    type="number"
                                    value={formData.fee.toString()}
                                    onChange={(value) => handleInputChange('fee', parseFloat(value) || 0)}
                                />

                                <FormGroup
                                    label="Commencement"
                                    placeholder="Select Date"
                                    icon={<Calendar size={14} />}
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(value) => handleInputChange('startDate', value)}
                                />

                                <FormGroup
                                    label="Termination"
                                    placeholder="Select Date"
                                    icon={<Calendar size={14} />}
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(value) => handleInputChange('endDate', value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <MessageSquare size={12} /> Offer Narrative
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Elaborate on the campaign details and community benefit..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                                />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <CreditCard size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Visual & Financial Terminal
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-amber-200 transition-all">
                                    <ImageIcon className="text-slate-300 group-hover:text-amber-500 mb-2" size={24} />
                                    <p className="text-[9px] font-black uppercase text-slate-400">Upload Ad Interface</p>
                                </div>

                                <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex flex-col justify-center">
                                    <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">
                                        Calculated Propagation Fee
                                    </p>
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                                        ${formData.fee.toLocaleString()}
                                    </h3>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-2">
                                        Standard Weekly Engagement Cycle
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between mt-8">
                        <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Globe size={14} className="text-indigo-500" /> Multi-Channel Broadcast Ready
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:text-slate-900 transition-all shadow-sm"
                            >
                                CANCEL_MISSION
                            </button>
                            <button
                                type="submit"
                                className="px-10 py-4 bg-amber-500 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-amber-100 hover:bg-amber-600 transition-all flex items-center gap-3"
                            >
                                PAY_FEE_&_DEPLOY <Send size={14} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}