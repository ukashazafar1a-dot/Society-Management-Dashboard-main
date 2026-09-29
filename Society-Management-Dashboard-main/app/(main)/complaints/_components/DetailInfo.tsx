import React from 'react';

interface DetailInfoProps {
    label: string;
    value: string;
    icon: React.ReactNode;
}

const DetailInfo: React.FC<DetailInfoProps> = ({ label, value, icon }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-indigo-400 flex items-center justify-center border border-slate-100 shrink-0">
                {icon}
            </div>
            <div className="overflow-hidden">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    {label}
                </p>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default DetailInfo;