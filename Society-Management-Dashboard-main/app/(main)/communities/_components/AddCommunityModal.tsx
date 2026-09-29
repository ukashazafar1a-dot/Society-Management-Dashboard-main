'use client';

import React, { useState } from 'react';
import { X, Globe, MapPin, Calendar, Sparkles, Image as ImageIcon, Shield, User, Target } from 'lucide-react';
import { Community } from '@/utils/types';
import FormInput from './FormInput';

interface AddCommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (community: Omit<Community, 'id'>) => void;
}

const AddCommunityModal: React.FC<AddCommunityModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Omit<Community, 'id'>>({
        name: '',
        location: '',
        residentCount: 0,
        staffCount: 0,
        status: 'Active',
        description: '',
        establishedDate: '',
        image: '',
        category: 'Social_Welfare',
        missionStatement: '',
        accessProtocol: 'Open_Membership',
        primaryOrganizer: ''
    });

    const handleInputChange = (field: keyof Omit<Community, 'id'>, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            location: '',
            residentCount: 0,
            staffCount: 0,
            status: 'Active',
            description: '',
            establishedDate: '',
            image: '',
            category: 'Social_Welfare',
            missionStatement: '',
            accessProtocol: 'Open_Membership',
            primaryOrganizer: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 md:p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Create Activity</h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                            Social Infrastructure Protocol
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-rose-500 hover:border-rose-100 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Globe size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Basic Parameters
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Activity Name"
                                    placeholder="e.g. Blood Hub"
                                    icon={<Target size={14} />}
                                    value={formData.name}
                                    onChange={(value) => handleInputChange('name', value)}
                                    required
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Social_Welfare">Social_Welfare</option>
                                        <option value="Health_Emergency">Health_Emergency</option>
                                        <option value="Environmental">Environmental</option>
                                        <option value="Skill_Exchange">Skill_Exchange</option>
                                    </select>
                                </div>
                                <FormInput
                                    label="Operating Location"
                                    placeholder="e.g. Clubhouse Lounge"
                                    icon={<MapPin size={14} />}
                                    value={formData.location}
                                    onChange={(value) => handleInputChange('location', value)}
                                    required
                                />
                                <FormInput
                                    label="Foundation Date"
                                    placeholder="Oct 2023"
                                    icon={<Calendar size={14} />}
                                    value={formData.establishedDate}
                                    onChange={(value) => handleInputChange('establishedDate', value)}
                                />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Sparkles size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Identity & Vision
                                </h4>
                            </div>
                            <div className="space-y-6">
                                {/*<div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Mission Statement (Short)
                                    </label>
                                    <input
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                        placeholder="Concise statement of impact..."
                                        value={formData.missionStatement}
                                        onChange={(e) => handleInputChange('missionStatement', e.target.value)}
                                    />
                                </div>*/}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Detailed Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                        placeholder="Elaborate on the community goals, meeting frequency, and resources required..."
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <ImageIcon size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Visual Assets
                                </h4>
                            </div>
                            <div className="p-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-200 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:shadow-lg transition-all mb-4">
                                    <ImageIcon size={24} />
                                </div>
                                <p className="text-sm font-black text-slate-900 tracking-tight">Select Cover Image</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                                    High resolution landscape preferred (Max 10MB)
                                </p>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={formData.image}
                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                    className="mt-4 w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-xs font-medium outline-none"
                                />
                            </div>
                        </section>

                        <section className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <Shield size={16} className="text-indigo-600" />
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                    Governance & Access
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Primary Organizer"
                                    placeholder="e.g. Sarah Jenkins"
                                    icon={<User size={14} />}
                                    value={formData.primaryOrganizer || ''}
                                    onChange={(value) => handleInputChange('primaryOrganizer', value)}
                                    required
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Access Protocol
                                    </label>
                                    <select
                                        value={formData.accessProtocol}
                                        onChange={(e) => handleInputChange('accessProtocol', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                                    >
                                        <option value="Open_Membership">Open_Membership</option>
                                        <option value="Approval_Required">Approval_Required</option>
                                        <option value="Invite_Only">Invite_Only</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-4">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:text-slate-900 transition-all shadow-sm"
                    >
                        CANCEL_DEPLOYMENT
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                        LAUNCH_HUB_NODE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCommunityModal;