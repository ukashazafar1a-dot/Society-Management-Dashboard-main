'use client';

import React from 'react';
import { Clock, ArrowLeft, Zap, Info, Calendar, ShieldAlert } from 'lucide-react';
import { Announcement, AnnouncementType } from '@/utils/types';

interface AnnouncementCardProps {
    announcement: Announcement;
    onClick: () => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, onClick }) => {
    const getIcon = (type: AnnouncementType) => {
        switch (type) {
            case 'ALERT': return <Zap size={20} />;
            case 'MAINTENANCE': return <ShieldAlert size={20} />;
            case 'EVENT': return <Calendar size={20} />;
            default: return <Info size={20} />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'text-rose-600 border-rose-100';
            case 'MEDIUM': return 'text-indigo-600 border-indigo-100';
            default: return 'text-slate-600 border-slate-100';
        }
    };

    return (
        <div
            onClick={onClick}
            className="quartz-card p-6 md:p-8 rounded-[2.5rem] bg-white border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:border-indigo-400 transition-all cursor-pointer shadow-lg shadow-slate-200/20"
        >
            <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all shadow-inner ${announcement.priority === 'HIGH' ? 'bg-rose-50 text-rose-500 border border-rose-100' :
                    announcement.priority === 'MEDIUM' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
                        'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                    {getIcon(announcement.type)}
                </div>
                <div className="overflow-hidden">
                    <div className="flex items-center gap-3 mb-1.5">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${getPriorityColor(announcement.priority)}`}>
                            {announcement.type}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={8} /> {announcement.date}
                        </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate max-w-md">
                        {announcement.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 line-clamp-1 max-w-lg mt-1">
                        {announcement.content}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6 mt-6 md:mt-0 ml-auto md:ml-0">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
                        {announcement.author}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        Broadcaster
                    </p>
                </div>
                <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowLeft size={18} className="rotate-180" />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementCard;