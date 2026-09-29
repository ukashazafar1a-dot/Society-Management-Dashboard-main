'use client';

import React, { useState } from 'react';
import { X, FileText, MapPin, MessageSquare, Upload, Send } from 'lucide-react';

import FormInput from './FormInput';
import { ComplaintCategory, CreateComplaintData, PriorityLevel } from '@/utils/types';

interface CreateComplaintModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateComplaintData) => void;
}

const CreateComplaintModal: React.FC<CreateComplaintModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [formData, setFormData] = useState<CreateComplaintData>({
        title: '',
        category: 'Maintenance',
        priority: 'MEDIUM',
        location: '',
        description: ''
    });

    const handleInputChange = (field: keyof CreateComplaintData, value: string) => {
        setFormData(prev  => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.trim() && formData.location.trim() && formData.description.trim()) {
            onSubmit(formData);
            setFormData({
                title: '',
                category: 'Maintenance',
                priority: 'MEDIUM',
                location: '',
                description: ''
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 md:p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Incident Provisioning
                        </h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                            Manual Support Request Protocol
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
                                    <FileText size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Core Identifiers
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Incident Title"
                                    placeholder="e.g. Water leakage in A-402"
                                    icon={<FileText size={14} />}
                                    value={formData.title}
                                    onChange={(value) => handleInputChange('title', value)}
                                    required
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Incident_Class
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value as ComplaintCategory)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Security">Security</option>
                                        <option value="Infrastructure">Infrastructure</option>
                                        <option value="Hygiene">Hygiene</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Priority_Scale
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => handleInputChange('priority', e.target.value as PriorityLevel)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Critical">Critical</option>
                                    </select>
                                </div>
                                <FormInput
                                    label="Target Location"
                                    placeholder="e.g. Unit B-205 or Corridor 4"
                                    icon={<MapPin size={14} />}
                                    value={formData.location}
                                    onChange={(value) => handleInputChange('location', value)}
                                    required
                                />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <MessageSquare size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Telemetry Detail
                                </h4>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Incident Narrative
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[2.5rem] p-6 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none leading-relaxed"
                                    placeholder="Elaborate on the detected anomaly and its impact on your unit or the community..."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <Upload size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Visual Telemetry
                                </h4>
                            </div>
                            <div className="p-12 border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-200 transition-all">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:shadow-lg transition-all mb-4">
                                    <Upload size={28} />
                                </div>
                                <p className="text-sm font-black text-slate-900 tracking-tight uppercase">
                                    Upload Proof Interface
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                                    Images/Videos showing the anomaly (Max 20MB)
                                </p>
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
                        ABORT_TICKET
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                        INITIALIZE_REQUEST
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateComplaintModal;