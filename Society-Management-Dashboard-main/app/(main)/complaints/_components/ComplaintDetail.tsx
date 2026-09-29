'use client';

import React, { useState } from 'react';
import {
    Shield, Clock, Tag, User, AlertTriangle,
    FileText, Upload, MapPin, MessageSquare,
    Send, History, Flag, ArrowLeft, MoreHorizontal,
    CheckCircle2, XCircle, Wrench
} from 'lucide-react';
import DetailInfo from './DetailInfo';
import ActionButton from '../ActionButton';
import { Complaint, ComplaintStatus, HistoryItem } from '@/utils/types';


interface ComplaintDetailProps {
    complaint: Complaint;
    history: HistoryItem[];
    onBack: () => void;
    onUpdateStatus: (status: ComplaintStatus) => void;
}

const ComplaintDetail: React.FC<ComplaintDetailProps> = ({
    complaint,
    history,
    onBack,
    onUpdateStatus
}) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            // Handle sending message
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                <div className="quartz-card rounded-[3rem] bg-white border border-slate-100 shadow-2xl p-10 md:p-14 relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-10">
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center ${complaint.priority === 'HIGH' || complaint.priority === 'CRITICAL'
                            ? 'bg-rose-50 text-rose-500'
                            : 'bg-indigo-50 text-indigo-500'
                            }`}>
                            <Shield size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                    TICKET_ID: {complaint.id}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${complaint.priority === 'HIGH' || complaint.priority === 'CRITICAL'
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {complaint.priority}_PRIORITY
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                                {complaint.title}
                            </h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-slate-100 mb-10">
                        <DetailInfo label="Category" value={complaint.category} icon={<Tag size={16} />} />
                        <DetailInfo label="Status" value={complaint.status} icon={<Clock size={16} />} />
                        <DetailInfo label="Assigned" value={complaint.assignedTo || 'Unassigned'} icon={<User size={16} />} />
                        <DetailInfo label="SLA_Clock" value="12h Remaining" icon={<AlertTriangle size={16} />} />
                    </div>

                    <div className="space-y-10">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <FileText size={14} className="text-indigo-600" /> INCIDENT_DESCRIPTION
                            </h4>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                {complaint.description || 'No description provided.'}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <Upload size={14} className="text-indigo-600" /> VERIFICATION_MEDIA
                            </h4>
                            <div className="flex gap-4">
                                <div className="w-32 h-32 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                                    <MapPin size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="quartz-card rounded-[3rem] bg-white border border-slate-100 shadow-xl p-10 space-y-8">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <MessageSquare size={16} className="text-indigo-600" /> Resolution Stream
                    </h4>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black">
                                AD
                            </div>
                            <div className="flex-1 p-5 bg-slate-50 rounded-[2rem] rounded-tl-none">
                                <p className="text-sm font-medium text-slate-700">
                                    Team has been notified. Electrician is currently auditing the main junction box. Standby for updates.
                                </p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">
                                    10:45 AM // ADMIN
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-8">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message to the team..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-6 pr-14 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <div className="quartz-card p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                        <History size={120} />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2 relative">
                        <History size={14} className="text-indigo-400" /> Propagation History
                    </h4>
                    <div className="space-y-8 relative">
                        {history.map((item, i) => (
                            <div key={item.id} className="flex gap-4 relative">
                                {i !== history.length - 1 && (
                                    <div className="absolute left-2.5 top-6 bottom-[-32px] w-[1px] bg-slate-800"></div>
                                )}
                                <div className={`w-5 h-5 rounded-full border-2 ${i === 0 ? 'bg-indigo-600 border-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-slate-800 border-slate-700'
                                    } relative z-10 shrink-0`}></div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight">{item.action}</p>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                        {item.actor} // {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="quartz-card p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                        Management_Actions
                    </h4>
                    <div className="space-y-4">
                        <ActionButton
                            label="Mark as In-Progress"
                            icon={<Wrench size={16} />}
                            color="indigo"
                            onClick={() => onUpdateStatus('In-Progress')}
                        />
                        <ActionButton
                            label="Resolve Ticket"
                            icon={<CheckCircle2 size={16} />}
                            color="emerald"
                            onClick={() => onUpdateStatus('Resolved')}
                        />
                        <ActionButton
                            label="Re-open Ticket"
                            icon={<XCircle size={16} />}
                            color="amber"
                            onClick={() => onUpdateStatus('Open')}
                        />
                        <ActionButton
                            label="Flag As Critical"
                            icon={<Flag size={16} />}
                            color="rose"
                            onClick={() => alert('Flagged as critical!')}
                        />
                        <div className="pt-6 border-t border-slate-50 mt-6">
                            <button
                                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                                onClick={() => {
                                    onUpdateStatus('Resolved');
                                    alert('Incident closed successfully!');
                                }}
                            >
                                CLOSE_INCIDENT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetail;