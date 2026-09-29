'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, Terminal } from 'lucide-react';
import { Complaint, CreateComplaintData, HistoryItem, User } from '@/utils/types';
import ComplaintDetail from './ComplaintDetail';
import CreateComplaintModal from './CreateComplaintModal';
import ComplaintList from './ComplaintList';
import { complaintService } from '@/lib/api';

const mockHistory: HistoryItem[] = [
    { id: 'h1', action: 'Incident Reported', date: '2023-11-20 09:00', actor: 'Resident' },
    { id: 'h2', action: 'Priority Assigned: High', date: '2023-11-20 09:15', actor: 'System' },
    { id: 'h3', action: 'Assigned to Electrical Team', date: '2023-11-20 10:30', actor: 'Admin' },
    { id: 'h4', action: 'Technician Dispatched', date: '2023-11-20 14:00', actor: 'Staff' },
];

interface ComplaintsModuleProps {
    user: User;
}

const ComplaintsModule: React.FC<ComplaintsModuleProps> = ({ user }) => {
    const [view, setView] = useState<'list' | 'details'>('list');
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadComplaints = async () => {
            try {
                setLoading(true);
                const response = await complaintService.list({ pageNo: 1, pageSize: 20 });
                const items = response?.items || response?.data || response || [];
                const mapped = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? item.ticketId ?? ''),
                    title: item.subject || item.title || 'Untitled',
                    category: (item.category || 'Maintenance') as Complaint['category'],
                    status: (item.status || 'Open') as Complaint['status'],
                    residentId: String(item.residentId ?? user.id),
                    priority: (item.priority || 'MEDIUM').toUpperCase() as Complaint['priority'],
                    date: item.reportedAt ? new Date(item.reportedAt).toLocaleDateString() : new Date().toLocaleDateString(),
                    description: item.description || '',
                    assignedTo: item.assignedTo || '',
                    location: item.location || '',
                }));
                setComplaints(mapped);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadComplaints();
    }, [user.id]);

    const openDetails = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setView('details');
    };

    const handleCreateComplaint = async (data: CreateComplaintData) => {
        try {
            await complaintService.create({
                residentId: user.id,
                subject: data.title,
                description: data.description,
                category: data.category,
                priority: data.priority,
                location: data.location,
            });
            const response = await complaintService.list({ pageNo: 1, pageSize: 20 });
            const items = response?.items || response?.data || response || [];
            const mapped = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                id: String(item.id ?? item.Id ?? item.ticketId ?? ''),
                title: item.subject || item.title || 'Untitled',
                category: (item.category || 'Maintenance') as Complaint['category'],
                status: (item.status || 'Open') as Complaint['status'],
                residentId: String(item.residentId ?? user.id),
                priority: (item.priority || 'MEDIUM').toUpperCase() as Complaint['priority'],
                date: item.reportedAt ? new Date(item.reportedAt).toLocaleDateString() : new Date().toLocaleDateString(),
                description: item.description || '',
                assignedTo: item.assignedTo || '',
                location: item.location || '',
            }));
            setComplaints(mapped);
        } catch (error) {
            console.error(error);
        } finally {
            setIsRaiseModalOpen(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: Complaint['status']) => {
        try {
            await complaintService.updateStatus(id, { status, performedBy: user.name });
            setComplaints(prev => prev.map(c =>
                c.id === id ? { ...c, status } : c
            ));

            if (selectedComplaint?.id === id) {
                setSelectedComplaint(prev => prev ? { ...prev, status } : null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredComplaints = complaints.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {view === 'list' ? 'Incident Terminal' : 'Ticket Intelligence'}
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                        Monitoring_Node: <span className="text-indigo-600">Active_Telemetry</span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {view === 'details' && (
                        <button
                            onClick={() => setView('list')}
                            className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">BACK_TO_LOGS</span>
                        </button>
                    )}

                    <button
                        onClick={() => setIsRaiseModalOpen(true)}
                        className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3 uppercase"
                    >
                        <Plus size={16} /> RAISE_TICKET
                    </button>
                </div>
            </div>

            {loading && (
                <div className="rounded-[2.5rem] bg-white border border-slate-100 shadow-lg p-8 text-center text-sm font-bold text-slate-500">
                    Loading complaints...
                </div>
            )}

            {!loading && view === 'list' ? (
                <ComplaintList
                    complaints={filteredComplaints}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onComplaintClick={openDetails}
                />
            ) : (
                selectedComplaint && (
                    <ComplaintDetail
                        complaint={selectedComplaint}
                        history={mockHistory}
                        onBack={() => setView('list')}
                        onUpdateStatus={(status) => handleUpdateStatus(selectedComplaint.id, status)}
                    />
                )
            )}

            {/* Create Complaint Modal */}
            <CreateComplaintModal
                isOpen={isRaiseModalOpen}
                onClose={() => setIsRaiseModalOpen(false)}
                onSubmit={handleCreateComplaint}
            />
        </div>
    );
};

export default ComplaintsModule;