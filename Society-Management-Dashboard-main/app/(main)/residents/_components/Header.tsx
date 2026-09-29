// components/residents/Header.tsx
import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

type Props = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    setCurrentPage: (value: number) => void;
    setIsAddModalOpen: (value: boolean) => void;
};

const Header: React.FC<Props> = ({ searchTerm, setSearchTerm, setCurrentPage, setIsAddModalOpen }) => (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Member Directory</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Registry node: primary_cluster_01</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                    type="text"
                    placeholder="Identify Node (Name or Unit)..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold w-full outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                />
            </div>
            <button className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                <Filter size={18} />
            </button>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 shrink-0 hover:bg-indigo-700 transition-all flex items-center gap-2 px-6"
            >
                <Plus size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Add Resdient</span>
            </button>
        </div>
    </div>
);

export default Header;
