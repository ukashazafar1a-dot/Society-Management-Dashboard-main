'use client';

import React, { useState } from 'react';
import { X, Plus, MapPin, CreditCard, Info, Upload, CalendarCheck, Settings, UserIcon } from 'lucide-react';
import { BookingResource } from '@/utils/types';
import FormInput from './FormInput';
interface CreateResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (resource: Omit<BookingResource, 'id'>) => void;
}

const CreateResourceModal: React.FC<CreateResourceModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [formData, setFormData] = useState<Omit<BookingResource, 'id'>>({
        name: '',
        category: 'Sport',
        price: '',
        location: '',
        description: '',
        rules: [],
        image: '',
        status: 'Available'
    });

    const [rulesText, setRulesText] = useState('');

    const handleInputChange = (field: keyof Omit<BookingResource, 'id'>, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert rules text to array
        const rulesArray = rulesText
            .split('\n')
            .filter(rule => rule.trim() !== '')
            .map(rule => rule.trim());

        const newResource: Omit<BookingResource, 'id'> = {
            ...formData,
            rules: rulesArray
        };

        onSubmit(newResource);

        // Reset form
        setFormData({
            name: '',
            category: 'Sport',
            price: '',
            location: '',
            description: '',
            rules: [],
            image: '',
            status: 'Available'
        });
        setRulesText('');
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
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Asset Deployment</h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                            Infrastructure Provisioning Wizard
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
                                    <Plus size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Core Identifiers
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Resource Name"
                                    placeholder="e.g. Zen Rooftop Garden"
                                    icon={<CalendarCheck size={14} />}
                                    value={formData.name}
                                    onChange={(value) => handleInputChange('name', value)}
                                    required
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Category_Class
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Sport">Sport</option>
                                        <option value="Event">Event</option>
                                        <option value="Utility">Utility</option>
                                        <option value="Leisure">Leisure</option>
                                    </select>
                                </div>
                                <FormInput
                                    label="Registry Location"
                                    placeholder="e.g. Block C, Level 4"
                                    icon={<MapPin size={14} />}
                                    value={formData.location}
                                    onChange={(value) => handleInputChange('location', value)}
                                    required
                                />
                                <FormInput
                                    label="Price_Rate"
                                    placeholder="e.g. $25/hr or Free"
                                    icon={<CreditCard size={14} />}
                                    value={formData.price}
                                    onChange={(value) => handleInputChange('price', value)}
                                    required
                                />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Info size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Capabilities & Rules
                                </h4>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Technical Specs (Description)
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                        placeholder="Elaborate on hardware availability, capacity, and spatial features..."
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Protocol Rules (One per line)
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                        placeholder="Rule 01: No hazardous materials&#10;Rule 02: Return keys to Admin..."
                                        value={rulesText}
                                        onChange={(e) => setRulesText(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Upload size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Visual Telemetry
                                </h4>
                            </div>
                            <div className="p-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-200 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:shadow-lg transition-all mb-4">
                                    <Upload size={24} />
                                </div>
                                <p className="text-sm font-black text-slate-900 tracking-tight">Upload Asset Visual</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                                    Resolution 1920x1080 preferred (Max 15MB)
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
                                <Settings size={16} className="text-indigo-600" />
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                    Management Governance
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Assigned Manager"
                                    placeholder="e.g. Tech Support Team"
                                    icon={<UserIcon size={14} />}
                                    value=""
                                    onChange={() => { }}
                                    required
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Auto-Approval
                                    </label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="auto_approve" className="w-4 h-4 text-indigo-600 border-slate-300" defaultChecked />
                                            <span className="text-[10px] font-black uppercase text-slate-600">Enabled</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="auto_approve" className="w-4 h-4 text-indigo-600 border-slate-300" />
                                            <span className="text-[10px] font-black uppercase text-slate-600">Manual_Gate</span>
                                        </label>
                                    </div>
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
                        ABORT_PROVISIONING
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                        DEPLOY_INFRA_NODE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateResourceModal;