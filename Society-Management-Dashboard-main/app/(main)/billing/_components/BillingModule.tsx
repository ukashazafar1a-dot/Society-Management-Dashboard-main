'use client';

import React, { useState, useMemo } from 'react';
import { History, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import BalanceCard from './BalanceCard';
import SecurityStatusCard from './SecurityStatusCard';
import LedgerHistory from './LedgerHistory';
import QuickDepositModal from './QuickDepositModal';
import TransactionHistoryModal from './TransactionHistoryModal';
import { AutoPaySettings, Bill, BillingSummary, SavedPaymentMethod, Transaction, User } from '@/utils/types';
const bills: Bill[] = [
    {
        id: 'B1',
        residentId: 'R1',
        amount: 480.00,
        totalAmount: 480.00,
        month: 'NOV_23',
        type: 'Maintenance',
        status: 'Unpaid',
        dueDate: 'Nov 30, 2023',
        generatedDate: 'Nov 01, 2023',
        lateFee: 0,
        discount: 0,
        autoPayEnabled: false,
        notes: 'Monthly maintenance fee including amenities'
    },
    {
        id: 'B2',
        residentId: 'R1',
        amount: 84.50,
        totalAmount: 84.50,
        month: 'NOV_23',
        type: 'Water',
        status: 'Paid',
        dueDate: 'Nov 30, 2023',
        generatedDate: 'Nov 01, 2023',
        paidDate: 'Nov 05, 2023',
        lateFee: 0,
        discount: 0,
        paymentMethod: 'Credit Card',
        transactionId: 'txn_123456',
        autoPayEnabled: true
    },
    {
        id: 'B3',
        residentId: 'R1',
        amount: 112.00,
        totalAmount: 112.00,
        month: 'OCT_23',
        type: 'Electricity',
        status: 'Paid',
        dueDate: 'Oct 31, 2023',
        generatedDate: 'Oct 01, 2023',
        paidDate: 'Oct 03, 2023',
        lateFee: 0,
        discount: 0,
        paymentMethod: 'Auto-Pay',
        transactionId: 'txn_123789',
        autoPayEnabled: true
    },
    {
        id: 'B4',
        residentId: 'R1',
        amount: 65.00,
        totalAmount: 71.50,
        month: 'NOV_23',
        type: 'Internet',
        status: 'Unpaid',
        dueDate: 'Nov 30, 2023',
        generatedDate: 'Nov 01, 2023',
        lateFee: 6.50,
        discount: 0,
        autoPayEnabled: false,
        notes: 'Includes $6.50 late fee from previous month'
    },
    {
        id: 'B5',
        residentId: 'R1',
        amount: 35.00,
        totalAmount: 35.00,
        month: 'OCT_23',
        type: 'Trash',
        status: 'Paid',
        dueDate: 'Oct 31, 2023',
        generatedDate: 'Oct 01, 2023',
        paidDate: 'Oct 15, 2023',
        paymentMethod: 'Bank Transfer',
        transactionId: 'txn_1234567',
        autoPayEnabled: false
    },
    {
        id: 'B6',
        residentId: 'R1',
        amount: 50.00,
        totalAmount: 47.50,
        month: 'SEP_23',
        type: 'Parking',
        status: 'Paid',
        dueDate: 'Sep 30, 2023',
        generatedDate: 'Sep 01, 2023',
        paidDate: 'Sep 20, 2023',
        discount: 2.50,
        paymentMethod: 'Credit Card',
        transactionId: 'txn_123890',
        autoPayEnabled: false,
        notes: 'Early payment discount applied'
    }
];

/**
 * Transactions data - Complete collection of all transactions
 */
const transactions: Transaction[] = [
    {
        id: 'txn_123456',
        billId: 'B2',
        residentId: 'R1',
        amount: 84.50,
        date: 'Nov 05, 2023, 10:23 AM',
        method: 'Credit Card',
        status: 'Success',
        lastFour: '4242',
        cardType: 'Visa',
        reference: 'REF-20231105-001',
        receiptUrl: '/receipts/txn_123456.pdf'
    },
    {
        id: 'txn_123789',
        billId: 'B3',
        residentId: 'R1',
        amount: 112.00,
        date: 'Oct 03, 2023, 08:15 AM',
        method: 'Auto-Pay',
        status: 'Success',
        lastFour: '1234',
        cardType: 'Mastercard',
        reference: 'REF-20231003-089',
        receiptUrl: '/receipts/txn_123789.pdf'
    },
    {
        id: 'txn_1234567',
        billId: 'B5',
        residentId: 'R1',
        amount: 35.00,
        date: 'Oct 15, 2023, 02:45 PM',
        method: 'Bank Transfer',
        status: 'Success',
        bankName: 'Chase Bank',
        reference: 'REF-20231015-234',
        receiptUrl: '/receipts/txn_1234567.pdf'
    },
    {
        id: 'txn_123890',
        billId: 'B6',
        residentId: 'R1',
        amount: 47.50,
        date: 'Sep 20, 2023, 11:30 AM',
        method: 'Credit Card',
        status: 'Success',
        lastFour: '9876',
        cardType: 'Amex',
        reference: 'REF-20230920-567',
        receiptUrl: '/receipts/txn_123890.pdf'
    }
];

/**
 * Saved payment methods
 */
const savedPaymentMethods: SavedPaymentMethod[] = [
    {
        id: 'pm_1',
        residentId: 'R1',
        type: 'Credit Card',
        name: 'Chase Sapphire Preferred',
        lastFour: '4242',
        expiryDate: '05/26',
        brand: 'Visa',
        isDefault: true,
        addedDate: 'Jan 15, 2023'
    },
    {
        id: 'pm_2',
        residentId: 'R1',
        type: 'Credit Card',
        name: 'American Express Gold',
        lastFour: '9876',
        expiryDate: '08/25',
        brand: 'Amex',
        isDefault: false,
        addedDate: 'Mar 20, 2023'
    },
    {
        id: 'pm_3',
        residentId: 'R1',
        type: 'Bank Transfer',
        name: 'Chase Checking',
        lastFour: '1234',
        isDefault: false,
        addedDate: 'Jun 10, 2023',
        billingAddress: 'Unit A-102'
    }
];

/**
 * Billing summary statistics
 */
const billingSummary: BillingSummary = {
    totalOutstanding: 545.00, // B1 ($480) + B4 ($65)
    paidThisMonth: 84.50, // B2 only in Nov
    paidLastMonth: 147.00, // B3 ($112) + B5 ($35)
    unpaidCount: 2,
    overdueCount: 0,
    paidOnTime: 4,
    averageMonthlyBill: 137.75,
    autoPayEnabled: 2,
    totalSavings: 2.50,
    paymentTrend: -42.5 // Lower spending this month
};

/**
 * Auto-pay settings
 */
const autoPaySettings: AutoPaySettings = {
    residentId: 'R1',
    enabled: true,
    paymentMethodId: 'pm_1',
    billTypes: ['Electricity', 'Water'],
    paymentDay: 5,
    maxAmount: 500,
    emailNotifications: true,
    lastPaymentDate: 'Nov 05, 2023',
    nextPaymentDate: 'Dec 05, 2023'
};
interface BillingModuleProps {
    user: User;
}

export default function BillingModule({ user }: BillingModuleProps) {
    const [isQuickDepositOpen, setIsQuickDepositOpen] = useState(false);
    const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] = useState(false);
    const [userBills, setUserBills] = useState(bills);
    const [userTransactions, setUserTransactions] = useState(transactions);

    // Calculate user-specific data
    const outstandingBalance = useMemo(() => {
        return userBills
            .filter(b => b.status === 'Unpaid')
            .reduce((acc, b) => acc + (b.totalAmount || b.amount), 0);
    }, [userBills]);

    const upcomingDueDate = useMemo(() => {
        const unpaidBills = userBills.filter(b => b.status === 'Unpaid' && b.dueDate);
        if (unpaidBills.length === 0) return undefined;

        // Sort by due date and get the earliest
        return unpaidBills
            .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))[0]
            .dueDate;
    }, [userBills]);

    const handleReconcile = () => {
        console.log('Opening reconciliation');
        // Navigate to payment page or open modal
    };

    const handleManageAutoPay = () => {
        console.log('Managing auto-pay');
        // Open auto-pay settings modal
    };

    const handleDownloadBill = (billId: string) => {
        console.log('Downloading bill:', billId);
        // Generate PDF or download receipt
    };

    const handlePayBill = (billId: string) => {
        console.log('Paying bill:', billId);
        // Open payment modal for specific bill
    };

    const handleQuickDeposit = (amount: number, method: string) => {
        console.log(`Depositing $${amount} via ${method}`);

        // Simulate successful deposit
        const newTransaction = {
            id: `txn_${Date.now()}`,
            billId: 'DEPOSIT',
            residentId: user.id,
            amount: amount,
            date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            method: method === 'card' ? 'Credit Card' : 'Bank Transfer',
            status: 'Success' as const,
            lastFour: method === 'card' ? '4242' : '1234',
            cardType: method === 'card' ? 'Visa' : undefined,
            reference: `DEP-${Date.now().toString().slice(-6)}`
        };

        setUserTransactions([newTransaction, ...userTransactions]);

        // Add to balance (create a negative bill or credit)
        // This would be handled differently in a real app
    };

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic underline decoration-emerald-500 decoration-4 underline-offset-8">
                        Capital Hub
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
                        FINANCIAL_NODE: <span className="text-emerald-600">SECURED_TRANSACTIONS</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsTransactionHistoryOpen(true)}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm group"
                    >
                        <History size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => setIsQuickDepositOpen(true)}
                        className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.02] transition-all flex items-center gap-2 uppercase"
                    >
                        <TrendingUp size={16} />
                        QUICK_DEPOSIT
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-4 space-y-6">
                    <BalanceCard
                        balance={outstandingBalance}
                        dueDate={upcomingDueDate}
                        onReconcile={handleReconcile}
                    />

                    <SecurityStatusCard
                        autoPayEnabled={autoPaySettings.enabled}
                        autoPayCount={autoPaySettings.billTypes.length}
                        onManageAutoPay={handleManageAutoPay}
                    />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-8">
                    <LedgerHistory
                        bills={userBills}
                        onDownloadBill={handleDownloadBill}
                        onPayBill={handlePayBill}
                    />
                </div>
            </div>

            {/* Modals */}
            <QuickDepositModal
                isOpen={isQuickDepositOpen}
                onClose={() => setIsQuickDepositOpen(false)}
                onDeposit={handleQuickDeposit}
            />

            <TransactionHistoryModal
                isOpen={isTransactionHistoryOpen}
                onClose={() => setIsTransactionHistoryOpen(false)}
                transactions={userTransactions}
            />
        </div>
    );
}