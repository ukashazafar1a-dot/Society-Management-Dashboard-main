'use client';

import React from 'react';
import { Calendar, MoreVertical, Upload } from 'lucide-react';
import { FacilityBooking } from '@/utils/types';
interface ReservationsTableProps {
    reservations: FacilityBooking[];
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({ reservations }) => {
    return (
        <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction_ID</th>
                            <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset_Node</th>
                            <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resident</th>
                            <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time_Log</th>
                            <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {reservations.map((rev) => (
                            <tr key={rev.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <span className="text-xs font-black text-slate-900 uppercase">#{rev.id}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <Calendar size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{rev.resourceName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                                            {rev.residentName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-xs font-bold text-slate-600">{rev.residentName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{rev.date}</span>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{rev.timeSlot}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${rev.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        rev.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            'bg-rose-50 text-rose-500 border border-rose-100'
                                        }`}>
                                        {rev.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active_Node_Logs: {reservations.length} Entries Identified</p>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:text-indigo-800 transition-colors flex items-center gap-2">
                    DOWNLOAD_REPORT <Upload size={14} className="rotate-180" />
                </button>
            </div>
        </div>
    );
};

export default ReservationsTable;