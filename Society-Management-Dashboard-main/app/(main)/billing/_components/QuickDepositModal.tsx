'use client';

import React, { useState } from 'react';
import { X, CreditCard, Landmark, Shield, CheckCircle, Zap, Lock } from 'lucide-react';

interface QuickDepositModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeposit: (amount: number, paymentMethod: string) => void;
}

export default function QuickDepositModal({ isOpen, onClose, onDeposit }: QuickDepositModalProps) {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleDeposit = () => {
        if (!amount || parseFloat(amount) <= 0) return;

        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            onDeposit(parseFloat(amount), selectedMethod);
            setIsProcessing(false);
            onClose();
        }, 1500);
    };

    const presetAmounts = [50, 100, 200, 500];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center">
                            <Zap size={24} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                                Quick Deposit
                            </h3>
                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">
                                Instant Account Credit
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

                {/* Body */}
                <div className="p-8 space-y-6">
                    {/* Preset Amounts */}
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">
                            Select Amount
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {presetAmounts.map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setAmount(preset.toString())}
                                    className={`py-3 px-2 rounded-xl border text-sm font-bold transition-all ${amount === preset.toString()
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                                        }`}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Amount */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Custom Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                min="1"
                                step="0.01"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-8 pr-4 text-lg font-bold text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                            Payment Method
                        </label>

                        <button
                            onClick={() => setSelectedMethod('card')}
                            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedMethod === 'card'
                                ? 'border-emerald-500 bg-emerald-50/50'
                                : 'border-slate-100 hover:border-emerald-200'
                                }`}
                        >
                            <div className={`p-3 rounded-xl ${selectedMethod === 'card' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                <CreditCard size={20} />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Credit / Debit Card</p>
                                <p className="text-[9px] font-bold text-slate-400">Instant processing • 2.5% fee</p>
                            </div>
                            {selectedMethod === 'card' && (
                                <CheckCircle size={20} className="text-emerald-600" />
                            )}
                        </button>

                        <button
                            onClick={() => setSelectedMethod('bank')}
                            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedMethod === 'bank'
                                ? 'border-emerald-500 bg-emerald-50/50'
                                : 'border-slate-100 hover:border-emerald-200'
                                }`}
                        >
                            <div className={`p-3 rounded-xl ${selectedMethod === 'bank' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                <Landmark size={20} />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Bank Transfer</p>
                                <p className="text-[9px] font-bold text-slate-400">1-2 business days • No fee</p>
                            </div>
                            {selectedMethod === 'bank' && (
                                <CheckCircle size={20} className="text-emerald-600" />
                            )}
                        </button>
                    </div>

                    {/* Security Notice */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                        <Lock size={16} className="text-slate-400 mt-0.5" />
                        <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                                Secure Transaction
                            </p>
                            <p className="text-[8px] text-slate-400 mt-0.5">
                                Your payment information is encrypted and protected. We never store full card details.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-white border border-slate-200 text-slate-400 rounded-xl font-black text-[10px] tracking-widest uppercase hover:text-slate-600 hover:border-slate-300 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeposit}
                        disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
                        className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                PROCESSING...
                            </>
                        ) : (
                            <>
                                <Zap size={14} />
                                DEPOSIT ${amount ? parseFloat(amount).toFixed(2) : '0.00'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}