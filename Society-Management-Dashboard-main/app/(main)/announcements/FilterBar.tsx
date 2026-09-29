'use client';

import React from 'react';
import { FilterType } from '@/utils/types';

interface FilterBarProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
    const filters: FilterType[] = ['ALL', 'ALERT', 'INFO', 'EVENT'];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${currentFilter === filter
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                        : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                        }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;