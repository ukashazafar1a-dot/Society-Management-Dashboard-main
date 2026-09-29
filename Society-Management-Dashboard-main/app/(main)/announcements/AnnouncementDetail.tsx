'use client';

import React from 'react';
import { ArrowLeft, Clock, Eye, Share2, User, Trash2, Zap, Info, Calendar, ShieldAlert } from 'lucide-react';
import { Announcement, AnnouncementType } from '@/utils/types';

interface AnnouncementDetailProps {
    announcement: Announcement;
    onBack: () => void;
    onDelete: () => void;
}

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({
    announcement,
    onBack,
    onDelete
}) => {
    const getIcon = (type: AnnouncementType) => {
        switch (type) {
            case 'ALERT': return <Zap size={20} />;
            case 'MAINTENANCE': return <ShieldAlert size={20} />;
            case 'EVENT': return <Calendar size={20} />;
            default: return <Info size={20} />;
        }
    };

    return (
        <div className="quartz-card rounded-[3rem] bg-white border border-slate-100 shadow-2xl p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 flex items-center gap-3">
                <button
                    onClick={onDelete}
                    className="p-3 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl hover:bg-rose-100 transition-all"
                    title="Delete announcement"
                >
                    <Trash2 size={18} />
                </button>
                <button
                    onClick={onBack}
                    className="p-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all flex items-center gap-2 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">EXIT_STREAM</span>
                </button>
            </div>

            <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-500 rounded-xl border border-indigo-100">
                        {getIcon(announcement.type)}
                        <span className="text-[9px] font-black uppercase tracking-widest">
                            {announcement.type}
                        </span>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${announcement.priority === 'HIGH'
                        ? 'bg-rose-50 text-rose-500 border-rose-100'
                        : 'bg-indigo-50 text-indigo-500 border-indigo-100'
                        }`}>
                        {announcement.priority}_PRIORITY
                    </span>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">
                            {announcement.date}
                        </span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-10 leading-tight uppercase italic underline decoration-indigo-500 decoration-4 underline-offset-8">
                    {announcement.title}
                </h1>

                <div className="space-y-8">
                    <p className="text-xl text-slate-600 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left">
                        {announcement.content}
                    </p>
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">
                                {announcement.author}
                            </p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                Verified_Broadcaster
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase">
                            <Eye size={14} /> {announcement.readCount} Views
                        </div>
                        <button
                            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }}
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetail;