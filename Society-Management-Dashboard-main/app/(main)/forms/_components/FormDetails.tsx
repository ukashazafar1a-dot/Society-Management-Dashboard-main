'use client';

import { useState } from 'react';
import {
    FileText, Settings, PlusCircle, Layers, Trash2,
    Type, Layout, List, CheckSquare, ToggleRight, ToggleLeft,
    Users, Clock, Save, Edit3, X, ArrowLeft
} from 'lucide-react';
import { FieldType, Form, FormField, UserRole } from '@/utils/types';
import AddFieldModal from './AddFieldModal';


interface FormDetailsProps {
    form: Form;
    onUpdateForm: (updates: Partial<Form>) => void;
    onToggleStatus: () => void;
    onAddField: (field: FormField) => void;
    onDeleteField: (fieldId: string) => void;
    onToggleFieldVisibility: (fieldId: string) => void;
    userRole: UserRole;
}

export default function FormDetails({
    form,
    onUpdateForm,
    onToggleStatus,
    onAddField,
    onDeleteField,
    onToggleFieldVisibility,
    userRole
}: FormDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(form.title);
    const [editedDescription, setEditedDescription] = useState(form.description);
    const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

    const handleSaveForm = () => {
        onUpdateForm({
            title: editedTitle,
            description: editedDescription
        });
        setIsEditing(false);
    };

    const handleAddField = (newField: FormField) => {
        onAddField({
            ...newField,
            id: `fd${Date.now()}`,
            order: form.fields.length + 1
        });
        setIsAddFieldModalOpen(false);
    };

    const getFieldIcon = (type: FieldType) => {
        switch (type) {
            case 'text': return <Type size={18} />;
            case 'textarea': return <Layout size={18} />;
            case 'select': return <List size={18} />;
            case 'checkbox': return <CheckSquare size={18} />;
            default: return <Type size={18} />;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
                <div className="quartz-card p-10 md:p-14 rounded-[3rem] bg-white border border-slate-100 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <FileText size={180} />
                    </div>

                    {/* Form Header */}
                    <div className="mb-10">
                        {isEditing ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="w-full text-3xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-indigo-100 outline-none"
                                    placeholder="Form Title"
                                />
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    className="w-full text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-indigo-100 outline-none resize-none"
                                    rows={3}
                                    placeholder="Form Description"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveForm}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2"
                                    >
                                        <Save size={14} /> Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                                            {form.title}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xl">
                                            {form.description}
                                        </p>
                                        {form.tags && form.tags.length > 0 && (
                                            <div className="flex gap-2 mt-3">
                                                {form.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-bold uppercase rounded-lg">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {userRole === UserRole.ADMIN && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                                            title="Edit Form"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Fields Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <Settings size={14} className="text-indigo-600" /> FIELD_ORCHESTRATION
                            </h4>
                            {userRole === UserRole.ADMIN && (
                                <button
                                    onClick={() => setIsAddFieldModalOpen(true)}
                                    className="text-[9px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:underline hover:scale-105 transition-transform"
                                >
                                    <PlusCircle size={12} /> ADD_NEW_FIELD
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {form.fields.length === 0 ? (
                                <div className="p-20 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300">
                                    <Layers size={48} className="mb-4 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No fields identified in this node</p>
                                    {userRole === UserRole.ADMIN && (
                                        <button
                                            onClick={() => setIsAddFieldModalOpen(true)}
                                            className="mt-4 text-[9px] font-black text-indigo-600 uppercase tracking-widest underline underline-offset-4"
                                        >
                                            Provision First Field
                                        </button>
                                    )}
                                </div>
                            ) : (
                                form.fields
                                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                                    .map((field, index) => (
                                        <div
                                            key={field.id}
                                            className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group animate-fadeIn ${field.visible
                                                ? 'bg-white border-slate-100 shadow-sm hover:border-indigo-200'
                                                : 'bg-slate-50 border-slate-50 opacity-60'
                                                }`}
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${field.visible ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-400'
                                                    }`}>
                                                    {getFieldIcon(field.type)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">
                                                        {field.label}
                                                        {field.required && <span className="ml-2 text-rose-500 text-[10px]">*</span>}
                                                    </p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                        {field.type.toUpperCase()} // {field.required ? 'REQUIRED' : 'OPTIONAL'}
                                                    </p>
                                                    {field.options && field.options.length > 0 && (
                                                        <p className="text-[8px] font-medium text-slate-400 mt-1">
                                                            Options: {field.options.slice(0, 3).join(', ')}
                                                            {field.options.length > 3 && '...'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {userRole === UserRole.ADMIN && (
                                                    <>
                                                        <button
                                                            onClick={() => onToggleFieldVisibility(field.id)}
                                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${field.visible
                                                                ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                                                                : 'text-slate-400 bg-slate-200 hover:bg-slate-300'
                                                                }`}
                                                        >
                                                            {field.visible ? (
                                                                <><ToggleRight size={14} /> Visible</>
                                                            ) : (
                                                                <><ToggleLeft size={14} /> Hidden</>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => onDeleteField(field.id)}
                                                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                <div className="quartz-card p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl overflow-hidden">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Form Governance</h4>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400">Public Status</span>
                            {userRole === UserRole.ADMIN ? (
                                <button
                                    onClick={onToggleStatus}
                                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase flex items-center gap-1.5 transition-all ${form.status === 'Active'
                                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                                        }`}
                                >
                                    {form.status === 'Active' ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
                                    {form.status}
                                </button>
                            ) : (
                                <span className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase ${form.status === 'Active'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {form.status}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400">Total Fields</span>
                            <span className="font-black text-xs bg-slate-800 px-3 py-1 rounded-lg">{form.fields.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400">Auto-Approval</span>
                            <span className="font-black text-[9px] text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-lg">ENABLED</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400">Created</span>
                            <span className="text-[9px] font-bold text-slate-300">{form.createdDate}</span>
                        </div>
                        {form.lastUpdated && (
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-slate-400">Last Updated</span>
                                <span className="text-[9px] font-bold text-slate-300">{form.lastUpdated}</span>
                            </div>
                        )}
                        <div className="pt-6 border-t border-slate-800 space-y-3">
                            {userRole === UserRole.ADMIN && (
                                <button
                                    onClick={onToggleStatus}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {form.status === 'Active' ? 'DEACTIVATE_FORM' : 'ACTIVATE_FORM'}
                                </button>
                            )}
                            <button className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-white/20 transition-all">
                                DUPLICATE_NODE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="quartz-card p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <Clock size={14} className="text-indigo-600" /> Recent Activity
                    </h4>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-900 uppercase">New Submission Received</p>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">2 Minutes Ago</p>
                            </div>
                        </div>
                        {form.newSubmissions > 0 && (
                            <div className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-900 uppercase">+{form.newSubmissions} Unread Responses</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Requires Attention</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Field Modal */}
            <AddFieldModal
                isOpen={isAddFieldModalOpen}
                onClose={() => setIsAddFieldModalOpen(false)}
                onSubmit={handleAddField}
            />
        </div>
    );
}