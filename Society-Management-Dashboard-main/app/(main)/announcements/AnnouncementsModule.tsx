'use client';

import React, { useEffect, useState } from 'react';
import { Search, Plus, Megaphone } from 'lucide-react';
import FilterBar from './FilterBar';
import AnnouncementCard from './AnnouncementCard';
import CreateAnnouncementModal from './CreateAnnouncementModal';
import { Announcement, CreateAnnouncementData, FilterType } from '@/utils/types';
import AnnouncementDetail from './AnnouncementDetail';
import { announcementService } from '@/lib/api';

const AnnouncementsModule: React.FC = () => {
    const [feed, setFeed] = useState<Announcement[]>([]);
    const [selectedAnn, setSelectedAnn] = useState<Announcement | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<FilterType>('ALL');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                setLoading(true);
                const response = await announcementService.list({ pageNo: 1, pageSize: 20 });
                const items = response?.items || response?.data || response || [];
                const mapped = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    type: (item.category || item.type || 'INFO').toUpperCase() as Announcement['type'],
                    priority: (item.priority || 'LOW').toUpperCase() as Announcement['priority'],
                    title: item.title || item.subject || 'Untitled',
                    content: item.content || item.description || '',
                    date: item.publishedAt ? new Date(item.publishedAt).toLocaleString() : new Date(item.createdAt || Date.now()).toLocaleString(),
                    author: item.broadcasterTitle || 'Admin',
                    readCount: item.viewCount || 0,
                }));
                setFeed(mapped);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadAnnouncements();
    }, []);

    const filteredFeed = feed.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'ALL' || item.type === filter;
        return matchesSearch && matchesFilter;
    });

    const handleCreateAnnouncement = async (data: CreateAnnouncementData) => {
        try {
            const response = await announcementService.create({
                title: data.title,
                content: data.content,
                category: data.type,
                priority: data.priority,
                isPinned: false,
                audienceType: 'All',
                isReadRequired: false,
                publishedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            });
            if (response) {
                const created = await announcementService.list({ pageNo: 1, pageSize: 20 });
                const items = created?.items || created?.data || created || [];
                const mapped = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    type: (item.category || item.type || 'INFO').toUpperCase() as Announcement['type'],
                    priority: (item.priority || 'LOW').toUpperCase() as Announcement['priority'],
                    title: item.title || item.subject || 'Untitled',
                    content: item.content || item.description || '',
                    date: item.publishedAt ? new Date(item.publishedAt).toLocaleString() : new Date(item.createdAt || Date.now()).toLocaleString(),
                    author: item.broadcasterTitle || 'Admin',
                    readCount: item.viewCount || 0,
                }));
                setFeed(mapped);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsCreateModalOpen(false);
        }
    };

    const handleDeleteAnnouncement = async (id: string) => {
        if (confirm('Are you sure you want to delete this announcement?')) {
            try {
                await announcementService.remove(id);
                setFeed(prev => prev.filter(item => item.id !== id));
                if (selectedAnn?.id === id) {
                    setSelectedAnn(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Broadcasting Hub</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                        Live Feed Status: <span className="text-emerald-500">SYNCHRONIZED</span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find broadcast..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3 uppercase"
                    >
                        <Plus size={16} /> NEW_BROADCAST
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />

            {/* Content */}
            {loading && (
                <div className="rounded-[2.5rem] bg-white border border-slate-100 shadow-lg p-8 text-center text-sm font-bold text-slate-500">
                    Loading announcements...
                </div>
            )}

            {!loading && selectedAnn ? (
                <AnnouncementDetail
                    announcement={selectedAnn}
                    onBack={() => setSelectedAnn(null)}
                    onDelete={() => handleDeleteAnnouncement(selectedAnn.id)}
                />
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredFeed.map((item) => (
                        <AnnouncementCard
                            key={item.id}
                            announcement={item}
                            onClick={() => setSelectedAnn(item)}
                        />
                    ))}

                    {filteredFeed.length === 0 && (
                        <div className="quartz-card p-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg text-center">
                            <Megaphone size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight mb-2">
                                No Announcements Found
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {`Try adjusting your search or filter to find what you're looking for.`}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Create Announcement Modal */}
            <CreateAnnouncementModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
              
            />
        </div>
    );
};

export default AnnouncementsModule;