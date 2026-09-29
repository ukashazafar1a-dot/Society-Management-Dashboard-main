'use client';

import { useState } from 'react';
import {
    Search, Filter, ChevronLeft, ChevronRight,
    Users, Settings, Trash2, CheckCircle2, XCircle,
    FileText
} from 'lucide-react';
import { Form, UserRole } from '@/utils/types';

interface FormListProps {
    forms: Form[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    currentPage: number;
    onPageChange: (page: number) => void;
    onSelectForm: (form: Form) => void;
    onViewSubmissions: (form: Form) => void;
    onDeleteForm: (id: string) => void;
    userRole: UserRole;
}

export default function FormList({
    forms,
    searchTerm,
    onSearchChange,
    currentPage,
    onPageChange,
    onSelectForm,
    onViewSubmissions,
    onDeleteForm,
    userRole
}: FormListProps) {
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'Active' | 'Draft'>('ALL');

    const itemsPerPage = 5;
    const filteredForms = forms.filter(f => {
        if (filterStatus === 'ALL') return true;
        return f.status === filterStatus;
    });

    const totalPages = Math.ceil(filteredForms.length / itemsPerPage);
    const paginatedForms = filteredForms.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Identify form sequence..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setFilterStatus('ALL')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'ALL'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-400 hover:text-indigo-600'
                            }`}
                    >
                        ALL
                    </button>
                    <button
                        onClick={() => setFilterStatus('Active')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'Active'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-400 hover:text-emerald-600'
                            }`}
                    >
                        ACTIVE
                    </button>
                    <button
                        onClick={() => setFilterStatus('Draft')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'Draft'
                            ? 'bg-slate-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        DRAFT
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Form Title</th>
                                <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Analytics</th>
                                <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedForms.map((form, index) => (
                                <tr
                                    key={form.id}
                                    className="group hover:bg-indigo-50/30 transition-colors cursor-pointer animate-fadeIn"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    onClick={() => onSelectForm(form)}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                                    {form.title}
                                                </p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 line-clamp-1">
                                                    {form.description}
                                                </p>
                                                {form.tags && form.tags.length > 0 && (
                                                    <div className="flex gap-1 mt-1">
                                                        {form.tags.slice(0, 2).map(tag => (
                                                            <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[7px] font-bold uppercase rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 w-fit ${form.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                                            }`}>
                                            {form.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                            {form.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-xs font-black text-slate-900">{form.totalSubmissions}</p>
                                                <p className="text-[8px] font-bold text-slate-400 uppercase">Total</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-black text-indigo-600">+{form.newSubmissions}</p>
                                                <p className="text-[8px] font-bold text-slate-400 uppercase">New</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{form.createdDate}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onViewSubmissions(form); }}
                                                className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                                                title="View Submissions"
                                            >
                                                <Users size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onSelectForm(form); }}
                                                className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
                                                title="Settings"
                                            >
                                                <Settings size={16} />
                                            </button>
                                            {userRole === UserRole.ADMIN && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onDeleteForm(form.id); }}
                                                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                    title="Delete Form"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedForms.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <FileText size={48} className="text-slate-200 mb-4" />
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No forms found</p>
                                            <p className="text-xs text-slate-300 mt-2">Try adjusting your search or filter</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Showing <span className="text-slate-900">
                            {filteredForms.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0}
                        </span> - <span className="text-slate-900">
                            {Math.min(currentPage * itemsPerPage, filteredForms.length)}
                        </span> of <span className="text-slate-900">{filteredForms.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-[10px] font-bold text-slate-400 px-2">
                            Page {currentPage} of {totalPages || 1}
                        </span>
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
