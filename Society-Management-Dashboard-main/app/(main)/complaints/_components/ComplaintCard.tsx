'use client';

import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Complaint, ComplaintStatus, PriorityLevel } from '@/utils/types';


interface ComplaintCardProps {
    complaint: Complaint;
    onClick: () => void;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onClick }) => {
    const getStatusColor = (status: ComplaintStatus) => {
        switch (status) {
            case 'Open': return 'text-rose-500';
            case 'In-Progress': return 'text-indigo-600';
            case 'Resolved': return 'text-emerald-600';
            default: return 'text-slate-500';
        }
    };

    const getPriorityStyles = (priority: PriorityLevel) => {
        switch (priority) {
            case 'HIGH': return 'bg-rose-50 text-rose-500 border border-rose-100';
            case 'MEDIUM': return 'bg-amber-50 text-amber-500 border border-amber-100';
            case 'CRITICAL': return 'bg-rose-100 text-rose-600 border border-rose-200';
            default: return 'bg-slate-50 text-slate-400 border border-slate-100';
        }
    };

    return (
        <div
            onClick={onClick}
            className="quartz-card p-6 rounded-[2rem] bg-white border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:border-indigo-400 transition-all cursor-pointer shadow-lg shadow-slate-200/20"
        >
            <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all ${getPriorityStyles(complaint.priority)}`}>
                    {complaint.status === 'Resolved' ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                </div>
                <div className="overflow-hidden">
                    <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                            #{complaint.id}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {complaint.category}
                        </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight truncate max-w-md">
                        {complaint.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                        <Clock size={10} /> Reported: {complaint.date}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-12 mt-4 md:mt-0">
                <div className="text-right">
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        Propagation_Status
                    </p>
                </div>
                <button
                    className="p-3 bg-slate-50 border border-slate-200 text-slate-300 group-hover:text-indigo-600 rounded-xl transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle menu click
                    }}
                >
                    <MoreHorizontal size={20} />
                </button>
            </div>
        </div>
    );
};

export default ComplaintCard;