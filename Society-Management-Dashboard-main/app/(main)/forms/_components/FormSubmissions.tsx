'use client';

import { useState } from 'react';
import {
    Eye, ChevronLeft, ArrowLeft, Clock,
    CheckCircle2, XCircle, Download, Filter,
    Trash2,
    ChevronRight
} from 'lucide-react';
import { Form, FormSubmission } from '@/utils/types';
import SubmissionDetailModal from './SubmissionDetailModal';

interface FormSubmissionsProps {
    form: Form;
    submissions: FormSubmission[];
    onMarkRead: (id: string) => void;
    onDeleteSubmission: (id: string) => void;
}

export default function FormSubmissions({
    form,
    submissions,
    onMarkRead,
    onDeleteSubmission
}: FormSubmissionsProps) {
    const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
    const [filter, setFilter] = useState<'ALL' | 'Pending' | 'Approved' | 'Rejected'>('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredSubmissions = submissions.filter(s => {
        if (filter === 'ALL') return true;
        return s.status === filter;
    });

    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    const paginatedSubmissions = filteredSubmissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleExportCSV = () => {
        const headers = ['Submitted By', 'Submitted At', 'Status', ...form.fields.map(f => f.label)];
        const rows = filteredSubmissions.map(s => {
            const row = [
                s.submittedBy,
                s.submittedAt,
                s.status || 'Pending',
                ...form.fields.map(f => s.data[f.label] || '')
            ];
            return row.join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${form.title.replace(/\s+/g, '_')}_submissions.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                            Submission Stream: {form.title}
                        </h3>
                        <p className="text-[9px] font-medium text-slate-400 mt-1">
                            {filteredSubmissions.length} total submissions • {submissions.filter(s => s.isNew).length} new
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('ALL')}
                                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'ALL'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:text-indigo-600'
                                    }`}
                            >
                                ALL
                            </button>
                            <button
                                onClick={() => setFilter('Pending')}
                                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'Pending'
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:text-amber-600'
                                    }`}
                            >
                                PENDING
                            </button>
                            <button
                                onClick={() => setFilter('Approved')}
                                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'Approved'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:text-emerald-600'
                                    }`}
                            >
                                APPROVED
                            </button>
                        </div>
                        <button
                            onClick={handleExportCSV}
                            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:underline px-4 py-2 bg-indigo-50 rounded-xl"
                        >
                            <Download size={14} /> EXPORT_CSV
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Submitted By</th>
                                <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Response Digest</th>
                                <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedSubmissions.map((sub, index) => (
                                <tr
                                    key={sub.id}
                                    className="group hover:bg-slate-50/50 transition-colors cursor-pointer animate-fadeIn"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    onClick={() => {
                                        setSelectedSubmission(sub);
                                        onMarkRead(sub.id);
                                    }}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                                                {sub.submittedBy.split(' ')[1]?.charAt(0) || sub.submittedBy.charAt(0)}
                                            </div>
                                            <span className="text-xs font-black text-slate-900 uppercase tracking-tight">
                                                {sub.submittedBy}
                                            </span>
                                            {sub.isNew && (
                                                <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase bg-rose-50 text-rose-500 border border-rose-100 animate-pulse">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="text-[10px] font-medium text-slate-600 leading-relaxed max-w-xs">
                                            {Object.entries(sub.data).slice(0, 2).map(([k, v]) => (
                                                <div key={k} className="flex gap-2">
                                                    <span className="font-black text-slate-400 uppercase tracking-tighter shrink-0">{k}:</span>
                                                    <span className="truncate">{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                        {sub.submittedAt}
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 w-fit ${sub.status === 'Approved'
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : sub.status === 'Rejected'
                                                ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                            {sub.status === 'Approved' && <CheckCircle2 size={10} />}
                                            {sub.status === 'Rejected' && <XCircle size={10} />}
                                            {sub.status === 'Pending' && <Clock size={10} />}
                                            {sub.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedSubmission(sub);
                                                    onMarkRead(sub.id);
                                                }}
                                                className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteSubmission(sub.id);
                                                }}
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                title="Delete Submission"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedSubmissions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <Clock size={48} className="text-slate-200 mb-4" />
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No submissions found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Stream_Buffer: {filteredSubmissions.length} Active Data Records
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-[10px] font-bold text-slate-400 px-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Submission Detail Modal */}
            <SubmissionDetailModal
                submission={selectedSubmission}
                formFields={form.fields}
                onClose={() => setSelectedSubmission(null)}
                onDelete={() => {
                    if (selectedSubmission) {
                        onDeleteSubmission(selectedSubmission.id);
                        setSelectedSubmission(null);
                    }
                }}
            />
        </div>
    );
}