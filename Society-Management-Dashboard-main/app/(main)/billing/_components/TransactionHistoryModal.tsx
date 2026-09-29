'use client';

import React, { useState } from 'react';
import { X, CreditCard, Calendar, CheckCircle, XCircle, Clock, Download, Search } from 'lucide-react';
import { Transaction } from '@/utils/types';

interface TransactionHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactions: Transaction[];
}

export default function TransactionHistoryModal({
    isOpen,
    onClose,
    transactions
}: TransactionHistoryModalProps) {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredTransactions = transactions.filter(t =>
        t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm)
    );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Success':
                return <CheckCircle size={14} className="text-emerald-600" />;
            case 'Failed':
                return <XCircle size={14} className="text-rose-600" />;
            case 'Pending':
                return <Clock size={14} className="text-amber-600" />;
            default:
                return <Clock size={14} className="text-slate-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Failed': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

            <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-slideUp">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                            <CreditCard size={24} className="text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                                Transaction History
                            </h3>
                            <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                                {transactions.length} Total Transactions
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by reference, method, or amount..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-xs font-medium focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Transaction List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="space-y-3">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((tx, index) => (
                                <div
                                    key={tx.id}
                                    className="p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all group animate-fadeIn"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-lg ${tx.method === 'Credit Card' ? 'bg-indigo-50' :
                                                tx.method === 'Auto-Pay' ? 'bg-emerald-50' :
                                                    'bg-slate-50'
                                                }`}>
                                                <CreditCard size={16} className={
                                                    tx.method === 'Credit Card' ? 'text-indigo-600' :
                                                        tx.method === 'Auto-Pay' ? 'text-emerald-600' :
                                                            'text-slate-600'
                                                } />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                                                        {tx.method}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${getStatusColor(tx.status)}`}>
                                                        {getStatusIcon(tx.status)}
                                                        {tx.status}
                                                    </span>
                                                </div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {tx.reference} • {tx.date}
                                                </p>
                                                {tx.lastFour && (
                                                    <p className="text-[8px] font-medium text-slate-400 mt-1">
                                                        •••• {tx.lastFour} {tx.cardType}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-lg font-black text-slate-900">
                                                    ${tx.amount.toFixed(2)}
                                                </p>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CreditCard size={24} className="text-slate-300" />
                                </div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                    No transactions found
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                Last 90 days
                            </span>
                        </div>
                        <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                            Download All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}