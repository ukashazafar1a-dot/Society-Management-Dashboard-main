'use client';

import React, { useEffect, useState } from 'react';
import {
    ArrowLeft, Plus, Search, Filter, Upload
} from 'lucide-react';
import { User, BookingResource, FacilityBooking } from '@/utils/types';


import ResourceGrid from './ResourceGrid';
import ResourceDetail from './ResourceDetail';
import ReservationsTable from './ReservationsTable';
import CreateResourceModal from './CreateResourceModal';
import { bookingService } from '@/lib/api';

const mockResources: BookingResource[] = [
    {
        id: 'res-1',
        name: 'Clubhouse Grand Hall',
        category: 'Event',
        price: '$50/hr',
        location: 'Block A, Ground Floor',
        description: 'Perfect for birthday parties, workshops, and community meetings. Equipped with high-end audio systems and AC.',
        rules: ['No smoking inside', 'Cleanup required after event', 'Max 50 guests'],
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=60',
        status: 'Available'
    },
    {
        id: 'res-2',
        name: 'Infinity Pool Side',
        category: 'Leisure',
        price: 'Free',
        location: 'Rooftop, Block B',
        description: 'Breathtaking views of the city. Available for evening small gatherings and individual relaxation.',
        rules: ['Swimming attire mandatory', 'No glassware near pool', 'Residents only'],
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop&q=60',
        status: 'Available'
    },
    {
        id: 'res-3',
        name: 'Pro Tennis Court',
        category: 'Sport',
        price: '$10/hr',
        location: 'East Side Sports Complex',
        description: 'Professional grade clay court with night lighting for evening matches.',
        rules: ['Standard tennis shoes required', 'Max 2 hours per booking'],
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=60',
        status: 'Maintenance'
    },
    {
        id: 'res-4',
        name: 'The Think Tank',
        category: 'Utility',
        price: '$5/hr',
        location: 'Library Wing, Level 1',
        description: 'Co-working space and private meeting room with 1Gbps Fiber and whiteboard facilities.',
        rules: ['Maintain silence in corridors', 'Booking required for meeting room'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60',
        status: 'Available'
    },
];

const mockReservations: FacilityBooking[] = [
    { id: 'rev-1', resourceId: 'res-1', resourceName: 'Clubhouse Grand Hall', date: 'Nov 20, 2023', timeSlot: '10:00 AM - 02:00 PM', residentId: 'u1', residentName: 'Alexander Pierce', status: 'Confirmed', amount: 200 },
    { id: 'rev-2', resourceId: 'res-4', resourceName: 'The Think Tank', date: 'Nov 21, 2023', timeSlot: '09:00 AM - 11:00 AM', residentId: 'u1', residentName: 'Alexander Pierce', status: 'Pending', amount: 10 },
    { id: 'rev-3', resourceId: 'res-2', resourceName: 'Infinity Pool Side', date: 'Nov 18, 2023', timeSlot: '04:00 PM - 06:00 PM', residentId: 'u2', residentName: 'Sarah Jenkins', status: 'Cancelled', amount: 0 },
];

type ViewType = 'grid' | 'details' | 'reservations';

interface BookingModuleProps {
    user: User;
}

const BookingModule: React.FC<BookingModuleProps> = ({ user }) => {
    const [view, setView] = useState<ViewType>('grid');
    const [selectedResource, setSelectedResource] = useState<BookingResource | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [resources, setResources] = useState<BookingResource[]>(mockResources);
    const [reservations, setReservations] = useState<FacilityBooking[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [assetsResponse, reservationsResponse] = await Promise.all([
                    bookingService.list({ pageNo: 1, pageSize: 20 }),
                    bookingService.reservations({ pageNo: 1, pageSize: 20 }),
                ]);

                const assetItems = assetsResponse?.items || assetsResponse?.data || assetsResponse || [];
                const reservationItems = reservationsResponse?.items || reservationsResponse?.data || reservationsResponse || [];

                const mappedAssets = (Array.isArray(assetItems) ? assetItems : assetItems?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    name: item.name || item.title || 'Untitled Asset',
                    category: item.category || 'Event',
                    price: item.price ? `$${item.price}` : 'Free',
                    location: item.location || '',
                    description: item.description || '',
                    rules: item.rules || [],
                    image: item.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=60',
                    status: item.status || 'Available',
                }));

                const mappedReservations = (Array.isArray(reservationItems) ? reservationItems : reservationItems?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    resourceId: String(item.resourceId ?? item.bookingItemId ?? ''),
                    resourceName: item.resourceName || item.assetName || 'Facility',
                    date: item.date || item.bookedDate || '',
                    timeSlot: item.timeSlot || item.timeRange || '',
                    residentId: String(item.residentId ?? ''),
                    residentName: item.residentName || 'Resident',
                    status: item.status || 'Pending',
                    amount: Number(item.amount || item.price || 0),
                }));

                if (mappedAssets.length) {
                    setResources(mappedAssets);
                }
                setReservations(mappedReservations);
            } catch (error) {
                console.error('Failed to load bookings', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleResourceSelect = (res: BookingResource) => {
        setSelectedResource(res);
        setView('details');
    };

    const filteredResources = resources.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddResource = (newResource: Omit<BookingResource, 'id'>) => {
        const resourceWithId: BookingResource = {
            ...newResource,
            id: `res-${Date.now()}`,
            status: 'Available'
        };
        setResources(prev => [...prev, resourceWithId]);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Dynamic Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {view === 'grid' ? 'Resource Terminal' : view === 'details' ? 'Node Specs' : 'Registry Logs'}
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                        {view === 'grid' ? 'System_Asset_Inventory' : view === 'details' ? `Configuring ${selectedResource?.id}` : 'Transaction_History'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {view !== 'grid' && (
                        <button
                            onClick={() => setView('grid')}
                            className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">BACK_TO_GRID</span>
                        </button>
                    )}

                    <button
                        onClick={() => setView('reservations')}
                        className={`px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'reservations' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm'
                            }`}
                    >
                        {user.role === 'ADMIN' ? 'MANAGE_RESERVATIONS' : 'MY_BOOKINGS'}
                    </button>

                    {user.role === 'ADMIN' && view === 'grid' && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 px-6"
                        >
                            <Plus size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">CREATE_ASSET</span>
                        </button>
                    )}
                </div>
            </div>

            {loading && view === 'grid' && (
                <div className="rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-8 text-center text-sm font-bold text-slate-500">
                    Loading resource catalog...
                </div>
            )}

            {/* View Content */}
            {view === 'grid' && !loading && (
                <ResourceGrid
                    resources={filteredResources}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onResourceSelect={handleResourceSelect}
                />
            )}

            {view === 'details' && selectedResource && (
                <ResourceDetail
                    resource={selectedResource}
                    onBack={() => setView('grid')}
                />
            )}

            {view === 'reservations' && (
                <ReservationsTable reservations={reservations} />
            )}

            <CreateResourceModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleAddResource}
            />
        </div>
    );
};

export default BookingModule;