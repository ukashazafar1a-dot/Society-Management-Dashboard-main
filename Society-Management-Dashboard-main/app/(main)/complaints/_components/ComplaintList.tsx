'use client';

import React from 'react';
import { Search, Filter, Clock, AlertTriangle, CheckCircle2, MoreHorizontal } from 'lucide-react';

import ComplaintCard from './ComplaintCard';
import { Complaint } from '@/utils/types';

interface ComplaintListProps {
    complaints: Complaint[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onComplaintClick: (complaint: Complaint) => void;
}

const ComplaintList: React.FC<ComplaintListProps> = ({
    complaints,
    searchTerm,
    onSearchChange,
    onComplaintClick
}) => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Identify ticket sequence..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    />
                </div>
                <button className="p-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all">
                    <Filter size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {complaints.map((complaint) => (
                    <ComplaintCard
                        key={complaint.id}
                        complaint={complaint}
                        onClick={() => onComplaintClick(complaint)}
                    />
                ))}

                {complaints.length === 0 && (
                    <div className="quartz-card p-12 rounded-[2rem] bg-white border border-slate-100 text-center">
                        <AlertTriangle size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight mb-2">
                            No Complaints Found
                        </h3>
                        <p className="text-slate-400 text-sm">
                            No tickets match your search criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintList;