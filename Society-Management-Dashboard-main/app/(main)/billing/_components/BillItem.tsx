'use client';

import React from 'react';
import { CreditCard, Download, Clock, CheckCircle, AlertCircle, FileText, Receipt } from 'lucide-react';
import { Bill } from '@/utils/types';

interface BillItemProps {
    bill: Bill;
    index: number;
    onDownload: (billId: string) => void;
    onPay: (billId: string) => void;
}

export default function BillItem({ bill, index, onDownload, onPay }: BillItemProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid':
                return {
                    bg: 'bg-emerald-50',
                    text: 'text-emerald-600',
                    border: 'border-emerald-100',
                    icon: <CheckCircle size={14} className="text-emerald-600" />
                };
            case 'Unpaid':
                return {
                    bg: 'bg-amber-50',
                    text: 'text-amber-600',
                    border: 'border-amber-100',
                    icon: <Clock size={14} className="text-amber-600" />
                };
            case 'Overdue':
                return {
                    bg: 'bg-rose-50',
                    text: 'text-rose-600',
                    border: 'border-rose-100',
                    icon: <AlertCircle size={14} className="text-rose-600" />
                };
            case 'Processing':
                return {
                    bg: 'bg-indigo-50',
                    text: 'text-indigo-600',
                    border: 'border-indigo-100',
                    icon: <Receipt size={14} className="text-indigo-600" />
                };
            default:
                return {
                    bg: 'bg-slate-50',
                    text: 'text-slate-600',
                    border: 'border-slate-100',
                    icon: <FileText size={14} className="text-slate-600" />
                };
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Maintenance':
                return <CreditCard size={20} />;
            case 'Water':
                return <FileText size={20} />;
            case 'Electricity':
                return <FileText size={20} />;
            case 'Internet':
                return <FileText size={20} />;
            case 'Trash':
                return <FileText size={20} />;
            case 'Parking':
                return <FileText size={20} />;
            default:
                return <CreditCard size={20} />;
        }
    };

    const statusStyle = getStatusColor(bill.status);
    const isPaid = bill.status === 'Paid';
    const displayAmount = bill.totalAmount || bill.amount;

    return (
        <div
            className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-300 hover:bg-white transition-all shadow-sm hover:shadow-md animate-fadeIn"
            style={{ animationDelay: `${index * 75}ms` }}
        >
            <div className="flex items-center gap-5 mb-4 md:mb-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPaid ? 'bg-emerald-50' : 'bg-indigo-50'} group-hover:scale-110 transition-transform`}>
                    <div className={isPaid ? 'text-emerald-600' : 'text-indigo-600'}>
                        {getTypeIcon(bill.type)}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                            {bill.type}
                        </p>
                        {bill.autoPayEnabled && (
                            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[7px] font-black uppercase tracking-wider">
                                Auto
                            </span>
                        )}
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span>{bill.month}</span>
                        <span className="text-slate-300">//</span>
                        <span>REF_{bill.id}</span>
                        {bill.dueDate && !isPaid && (
                            <>
                                <span className="text-slate-300">•</span>
                                <span className="text-amber-600">Due {bill.dueDate}</span>
                            </>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6">
                <div className="text-right">
                    <p className="text-xl font-black text-slate-900 tracking-tighter">
                        ${displayAmount.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                            {statusStyle.icon}
                            {bill.status}
                        </span>
                        {bill.discount ? (
                            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                -${bill.discount.toFixed(2)}
                            </span>
                        ) : null}
                        {bill.lateFee ? (
                            <span className="text-[8px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                +${bill.lateFee.toFixed(2)}
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {!isPaid && (
                        <button
                            onClick={() => onPay(bill.id)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-100"
                        >
                            Pay Now
                        </button>
                    )}
                    <button
                        onClick={() => onDownload(bill.id)}
                        className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-xl transition-all shadow-sm"
                        title="Download Receipt"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}