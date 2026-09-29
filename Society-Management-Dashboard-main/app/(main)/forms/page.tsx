'use client';

import { Form, FormSubmission, User, UserRole } from '@/utils/types';
import { useState, useEffect } from 'react';
import FormsModule from './_components/FormsModule';
import { formService } from '@/lib/api';

export default function FormsPage() {
    const [user] = useState<User>({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.ADMIN,
        apartment: 'A-101'
    });

    const [forms, setForms] = useState<Form[]>([]);
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const response = await formService.list({ pageNo: 1, pageSize: 20 });
                const items = response?.items || response?.data || response || [];
                const mappedForms = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    title: item.name || item.title || 'Untitled',
                    description: item.description || '',
                    status: (item.status || 'Draft') as Form['status'],
                    fields: [],
                    totalSubmissions: 0,
                    newSubmissions: 0,
                    createdDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
                }));
                setForms(mappedForms);
                setSubmissions([]);
            } catch (error) {
                console.error('Error loading forms:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleUpdateForms = (updatedForms: typeof forms) => {
        setForms(updatedForms);
    };

    const handleUpdateSubmissions = (updatedSubmissions: typeof submissions) => {
        setSubmissions(updatedSubmissions);
    };

    if (isLoading) {
        return (
            <div className="">
                <div className="">
                    <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                            Loading Form Registry...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                <FormsModule
                    user={user}
                    forms={forms}
                    submissions={submissions}
                    onUpdateForms={handleUpdateForms}
                    onUpdateSubmissions={handleUpdateSubmissions}
                />
            </div>
        </div>
    );
}