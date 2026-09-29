'use client';

import React from 'react';
import { Search, Filter, MapPin, ChevronRight } from 'lucide-react';
import { BookingResource } from '@/utils/types';
import ResourceCard from './ResourceCard';

interface ResourceGridProps {
    resources: BookingResource[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onResourceSelect: (resource: BookingResource) => void;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({
    resources,
    searchTerm,
    onSearchChange,
    onResourceSelect
}) => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search Infrastructure Node..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    />
                </div>
                <button className="p-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all">
                    <Filter size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {resources.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        resource={resource}
                        onClick={() => onResourceSelect(resource)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ResourceGrid;
