import React from 'react';

interface LogItemProps {
    title: string;
    date: string;
    status: 'Complete' | 'Upcoming' | 'Global';
}

const LogItem: React.FC<LogItemProps> = ({ title, date, status }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-default">
            <div className="overflow-hidden mr-2">
                <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate">{title}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{date}</p>
            </div>
            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded shrink-0 ${status === 'Complete'
                ? 'bg-emerald-50 text-emerald-600'
                : status === 'Upcoming'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-indigo-50 text-indigo-600'
                }`}>
                {status}
            </span>
        </div>
    );
};

export default LogItem;