'use client';

import { useState } from 'react';
import { X, FileText, Tag } from 'lucide-react';
import { Form } from '@/utils/types';

interface CreateFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (form: Form) => void;
}

export default function CreateFormModal({ isOpen, onClose, onSubmit }: CreateFormModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleAddTag = () => {
        if (tags.trim() && !tagList.includes(tags.trim())) {
            setTagList([...tagList, tags.trim()]);
            setTags('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTagList(tagList.filter(t => t !== tag));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newForm: Form = {
            id: `f${Date.now()}`,
            title,
            description,
            status: 'Draft',
            fields: [],
            totalSubmissions: 0,
            newSubmissions: 0,
            createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            createdBy: 'Admin',
            tags: tagList.length > 0 ? tagList : undefined
        };

        onSubmit(newForm);
        setTitle('');
        setDescription('');
        setTags('');
        setTagList([]);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-slideUp">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                            <FileText size={20} className="text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Initialize Form Node</h3>
                            <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-1">Registry Provisioning Protocol</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Form Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. Maintenance Request Pool"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Context / Description <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            placeholder="Elaborate on the form objective..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-medium focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                            <Tag size={12} /> Tags (Optional)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                placeholder="Add tags..."
                                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-medium focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all"
                            >
                                ADD
                            </button>
                        </div>
                        {tagList.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {tagList.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-bold uppercase flex items-center gap-2">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-500">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                        >
                            ABORT
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                            PROVISION_NODE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}