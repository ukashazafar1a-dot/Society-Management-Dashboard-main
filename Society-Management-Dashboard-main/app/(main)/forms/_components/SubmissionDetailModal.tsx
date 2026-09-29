'use client';

import { FormField, FormSubmission } from '@/utils/types';
import { X, Clock, User, CheckCircle2, XCircle, Trash2, Download } from 'lucide-react';


interface SubmissionDetailModalProps {
    submission: FormSubmission | null;
    formFields: FormField[];
    onClose: () => void;
    onDelete: () => void;
}

export default function SubmissionDetailModal({
    submission,
    formFields,
    onClose,
    onDelete
}: SubmissionDetailModalProps) {
    if (!submission) return null;

    const handleDownloadJSON = () => {
        const data = {
            ...submission,
            formFields
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `submission_${submission.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-slideUp">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                            <User size={20} className="text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Submission Detail</h3>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                Node: {submission.submittedBy} // {submission.id}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownloadJSON}
                            className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors"
                            title="Download JSON"
                        >
                            <Download size={18} />
                        </button>
                        <button
                            onClick={() => {
                                onDelete();
                                onClose();
                            }}
                            className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-rose-500 transition-colors"
                            title="Delete Submission"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Submission Status</span>
                        <span className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase flex items-center gap-1.5 ${submission.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : submission.status === 'Rejected'
                                ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                            {submission.status === 'Approved' && <CheckCircle2 size={12} />}
                            {submission.status === 'Rejected' && <XCircle size={12} />}
                            {submission.status === 'Pending' && <Clock size={12} />}
                            {submission.status || 'Pending'}
                        </span>
                    </div>

                    {/* Form Fields Data */}
                    {Object.entries(submission.data).map(([key, value]) => {
                        const field = formFields.find(f => f.label === key);
                        return (
                            <div key={key} className="space-y-2">
                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-l-2 border-indigo-500 pl-3">
                                    {key}
                                    {field?.required && <span className="ml-2 text-rose-500 text-[8px]">*</span>}
                                </p>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                        {value || <span className="text-slate-400 italic">No response provided</span>}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    <div className="pt-6 border-t border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-300" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Received: {submission.submittedAt}
                            </span>
                        </div>
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all">
                            FLAG_REACTION
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}