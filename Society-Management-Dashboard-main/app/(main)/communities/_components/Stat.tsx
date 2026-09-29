import React from 'react';

interface StatProps {
    label: string;
    value: string;
    icon: React.ReactNode;
}

const Stat: React.FC<StatProps> = ({ label, value, icon }) => {
    return (
        <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                {icon} {label}
            </p>
            <p className="text-lg font-black text-slate-900 tracking-tight">{value}</p>
        </div>
    );
};

export default Stat;