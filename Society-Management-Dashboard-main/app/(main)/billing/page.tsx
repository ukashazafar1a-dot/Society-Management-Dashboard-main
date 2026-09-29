'use client';

import { User, UserRole } from '@/utils/types';
import { CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import BillingModule from './_components/BillingModule';


export default function BillingPage() {
    const [user] = useState<User>({
        id: 'R1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: UserRole.RESIDENT,
        apartment: 'A-102',
        phone: '+1 (555) 123-4567',
        createdAt: '2023-01-15',
        lastLogin: '2023-11-14'
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="">
                <div className="">
                    <div className="quartz-card  rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-12 text-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-100 border-t-emerald-600 mx-auto"></div>
                            <CreditCard size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600" />
                        </div>
                        <p className="mt-6 text-slate-400 text-sm font-black uppercase tracking-widest">
                            Securing Financial Node...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                <BillingModule user={user} />
            </div>
        </div>
    );
}