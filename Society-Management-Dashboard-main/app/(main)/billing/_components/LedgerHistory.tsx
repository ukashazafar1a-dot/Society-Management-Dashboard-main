'use client';

import React, { useState } from 'react';
import { History, Filter, Calendar, ChevronDown, Download, Search } from 'lucide-react';
import BillItem from './BillItem';
import { Bill } from '@/utils/types';

interface LedgerHistoryProps {
    bills: Bill[];
    onDownloadBill: (billId: string) => void;
    onPayBill: (billId: string) => void;
}

export default function LedgerHistory({ bills, onDownloadBill, onPayBill }: LedgerHistoryProps) {
    const [filter, setFilter] = useState<'ALL' | 'Paid' | 'Unpaid'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'amount' | 'type'>('date');

    const filteredBills = bills
        .filter(bill => {
            if (filter === 'ALL') return true;
            return bill.status === filter;
        })
        .filter(bill =>
            bill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.month.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'amount') return b.amount - a.amount;
            if (sortBy === 'type') return a.type.localeCompare(b.type);
            // Default sort by date (most recent first)
            return b.month.localeCompare(a.month);
        });

    const unpaidTotal = bills
        .filter(b => b.status === 'Unpaid')
        .reduce((acc, b) => acc + (b.totalAmount || b.amount), 0);

    const paidTotal = bills
        .filter(b => b.status === 'Paid')
        .reduce((acc, b) => acc + (b.totalAmount || b.amount), 0);

    return (
        <div className="quartz-card p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 rounded-xl">
                        <History size={20} className="text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                            Ledger History
                        </h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            {bills.length} Transactions • ${paidTotal.toFixed(2)} Paid
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all w-32 sm:w-40"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative group">
                        <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-1">
                            <Filter size={16} />
                            <span className="text-[9px] font-bold uppercase hidden sm:inline">{filter}</span>
                            <ChevronDown size={12} />
                        </button>
                        <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg hidden group-hover:block hover:block z-10 animate-fadeIn">
                            {(['ALL', 'Paid', 'Unpaid'] as const).map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setFilter(option)}
                                    className={`w-full px-4 py-2 text-left text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-50 first:rounded-t-xl last:rounded-b-xl ${filter === option ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                            <Calendar size={16} />
                        </button>
                        <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg hidden group-hover:block hover:block z-10 animate-fadeIn">
                            <button
                                onClick={() => setSortBy('date')}
                                className={`w-full px-4 py-2 text-left text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-50 first:rounded-t-xl ${sortBy === 'date' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'
                                    }`}
                            >
                                Date
                            </button>
                            <button
                                onClick={() => setSortBy('amount')}
                                className={`w-full px-4 py-2 text-left text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-50 ${sortBy === 'amount' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'
                                    }`}
                            >
                                Amount
                            </button>
                            <button
                                onClick={() => setSortBy('type')}
                                className={`w-full px-4 py-2 text-left text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-50 last:rounded-b-xl ${sortBy === 'type' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'
                                    }`}
                            >
                                Type
                            </button>
                        </div>
                    </div>

                    {/* Export Button */}
                    <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all">
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {/* Bills List */}
            <div className="space-y-4">
                {filteredBills.length > 0 ? (
                    filteredBills.map((bill, index) => (
                        <BillItem
                            key={bill.id}
                            bill={bill}
                            index={index}
                            onDownload={onDownloadBill}
                            onPay={onPayBill}
                        />
                    ))
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <History size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                            No transactions found
                        </p>
                        <p className="text-xs text-slate-300 mt-2">
                            Try adjusting your filters
                        </p>
                    </div>
                )}
            </div>

            {/* Summary Footer */}
            {filteredBills.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Showing {filteredBills.length} of {bills.length} entries
                        </span>
                        {unpaidTotal > 0 && (
                            <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                                Unpaid Total: ${unpaidTotal.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                        View All Transactions
                        <ChevronDown size={12} className="rotate-[-90deg]" />
                    </button>
                </div>
            )}
        </div>
    );
}