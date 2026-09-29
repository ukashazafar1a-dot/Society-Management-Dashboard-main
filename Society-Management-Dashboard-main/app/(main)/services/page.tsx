'use client';

import { useState, useEffect } from 'react';

import { Droplets, Scissors, ShieldCheck, Wrench, Zap } from 'lucide-react';
import { User, UserRole } from '@/utils/types';
import ServicesModule from './_components/ServicesModule';
import { serviceService } from '@/lib/api';

export default function ServicesPage() {
    const [user] = useState<User>({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.RESIDENT,
        apartment: 'A-102',
        phone: '+1 (555) 123-4567',
        createdAt: '2023-01-15',
        lastLogin: '2023-11-14'
    });

    const [isLoading, setIsLoading] = useState(true);
    const [serviceSummary, setServiceSummary] = useState<any>(null);

    const serviceCategories = [
        { name: 'Plumbing', icon: <Droplets />, providers: 8 },
        { name: 'Electrical', icon: <Zap />, providers: 12 },
        { name: 'Maintenance', icon: <Wrench />, providers: 5 },
        { name: 'Security', icon: <ShieldCheck />, providers: 3 },
        { name: 'Cleaning', icon: <Droplets />, providers: 15 },
        { name: 'Salon', icon: <Scissors />, providers: 6 },
    ];

    const featuredProviders = [
        { name: 'Spark Electricians', rating: 4.8, reviews: 120, tags: ['Quick Service', 'Affordable'] },
        { name: 'Elite Plumbing Co.', rating: 4.9, reviews: 85, tags: ['Professional', '24/7'] },
        { name: 'CleanSweep Solutions', rating: 4.6, reviews: 210, tags: ['Deep Clean'] },
    ];

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await serviceService.terminal();
                setServiceSummary(response?.data || response);
            } catch (error) {
                console.error('Failed to load service directory', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadServices();
    }, []);

    if (isLoading) {
        return (

            <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                    Loading Service Directory...
                </p>
            </div>

        );
    }

    return (

        <ServicesModule user={user} />

    );
}