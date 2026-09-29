'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Plus,
    ChevronLeft, ChevronRight,
    Loader,
    AlertCircle,
} from 'lucide-react';
import { Resident } from '@/utils/types';
import { residentService } from '@/lib/api';
import ResidentTable from './_components/ResidentTable';
import AddResidentModal from './_components/AddResidentModel';

const ResidentModule: React.FC = () => {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchResidents();
    }, []);

    const fetchResidents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await residentService.list();
            setResidents(Array.isArray(response) ? response : []);
        } catch (err: any) {
            setError(err.message || 'Failed to load residents');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const itemsPerPage = 6;

    const filtered = residents.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.apartment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const handleModalClose = () => {
        setIsAddModalOpen(false);
        fetchResidents(); // Refresh data after adding
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header Section */}
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
                    
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 shrink-0 hover:bg-indigo-700 transition-all flex items-center gap-2 px-6"
                    >
                        <Plus size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Add_Resident</span>
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                    <Loader className="animate-spin text-indigo-600 mb-4" size={32} />
                    <p className="text-slate-400 font-bold text-sm">Loading residents...</p>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
                    <AlertCircle className="text-rose-600 flex-shrink-0" size={24} />
                    <div>
                        <p className="font-bold text-rose-900">Error Loading Residents</p>
                        <p className="text-sm text-rose-700">{error}</p>
                    </div>
                </div>
            )}

            {/* Table Container */}
            {!loading && !error && (
                <>
                    <ResidentTable residents={currentItems} />

                    {/* Pagination Footer */}
                    <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-slate-900">{residents.length > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="text-slate-900">{Math.min(indexOfLastItem, filtered.length)}</span> of <span className="text-slate-900">{filtered.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button onClick={goToPrevPage} disabled={currentPage === 1} className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 disabled:pointer-events-none transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 disabled:pointer-events-none transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Add Resident Modal */}
            {isAddModalOpen && (
                <AddResidentModal
                    isOpen={isAddModalOpen}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default ResidentModule;