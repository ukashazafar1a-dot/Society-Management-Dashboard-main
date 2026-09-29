'use client';

import { useState } from 'react';
import { X, Type, Layout, List, CheckSquare, Plus, Trash2 } from 'lucide-react';
import { FieldType, FormField } from '@/utils/types';

interface AddFieldModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (field: FormField) => void;
}

export default function AddFieldModal({ isOpen, onClose, onSubmit }: AddFieldModalProps) {
    const [label, setLabel] = useState('');
    const [type, setType] = useState<FieldType>('text');
    const [required, setRequired] = useState(false);
    const [options, setOptions] = useState<string[]>(['Option 1']);
    const [optionInput, setOptionInput] = useState('');

    if (!isOpen) return null;

    const handleAddOption = () => {
        if (optionInput.trim()) {
            setOptions([...options, optionInput.trim()]);
            setOptionInput('');
        }
    };

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newField: FormField = {
            id: `fd${Date.now()}`,
            label,
            type,
            required,
            visible: true,
            order: 0
        };

        if (type === 'select' && options.length > 0) {
            newField.options = options;
        }

        if (type === 'text' || type === 'textarea') {
            newField.placeholder = `Enter ${label.toLowerCase()}`;
        }

        onSubmit(newField);

        // Reset form
        setLabel('');
        setType('text');
        setRequired(false);
        setOptions(['Option 1']);
        setOptionInput('');
        onClose();
    };

    const getFieldIcon = () => {
        switch (type) {
            case 'text': return <Type size={18} />;
            case 'textarea': return <Layout size={18} />;
            case 'select': return <List size={18} />;
            case 'checkbox': return <CheckSquare size={18} />;
            default: return <Type size={18} />;
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-slideUp">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                            {getFieldIcon()}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Field Provisioning</h3>
                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">Data Input Infrastructure</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Field Label <span className="text-rose-500">*</span>
                        </label>
                        <input
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                            placeholder="e.g. Unit Number"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Input Type</label>
                            <div className="relative">
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as FieldType)}
                                    className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-4 focus:ring-emerald-100 cursor-pointer"
                                >
                                    <option value="text">Text_Input</option>
                                    <option value="textarea">Paragraph</option>
                                    <option value="select">Dropdown_Menu</option>
                                    <option value="checkbox">Binary_Toggle</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <List size={14} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Validation</label>
                            <label className="flex items-center gap-3 cursor-pointer group bg-slate-50 border border-slate-100 rounded-xl py-3 px-4">
                                <input
                                    type="checkbox"
                                    checked={required}
                                    onChange={(e) => setRequired(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600">
                                    Strictly_Required
                                </span>
                            </label>
                        </div>
                    </div>

                    {type === 'select' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dropdown Options</label>
                            <div className="space-y-3">
                                {options.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-2 px-4 text-xs font-medium text-slate-700">
                                            {option}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOption(index)}
                                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                            disabled={options.length === 1}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={optionInput}
                                        onChange={(e) => setOptionInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOption())}
                                        placeholder="Add option..."
                                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-2 px-4 text-xs font-medium focus:ring-4 focus:ring-emerald-100 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddOption}
                                        className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center gap-1"
                                    >
                                        <Plus size={14} /> ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                        >
                            COMMIT_FIELD
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}