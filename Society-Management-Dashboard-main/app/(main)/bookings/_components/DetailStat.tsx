import React from 'react';

interface DetailStatProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const DetailStat: React.FC<DetailStatProps> = ({ icon, label, value }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-indigo-600 flex items-center justify-center border border-slate-100">
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default DetailStat;