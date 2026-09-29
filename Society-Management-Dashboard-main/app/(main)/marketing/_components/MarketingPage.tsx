'use client';

import { useState, useEffect } from 'react';
import {
    BarChart3, Plus, Search, Megaphone, Filter, X
} from 'lucide-react';
import CampaignCard from './CampaignCard';
import CampaignsTable from './CampaignsTable';
import StatsCard from './StatsCard';
import CampaignDetail from './CampaignDetail';
import CreateCampaignModal from './CreateCampaignModal';
import { MarketingCampaign, User, UserRole } from '@/utils/types';

interface MarketingModuleProps {
    user: User;
    campaigns: MarketingCampaign[];
    onUpdateCampaigns: (campaigns: MarketingCampaign[]) => void;
}

export default function MarketingModule({
    user,
    campaigns: initialCampaigns,
    onUpdateCampaigns
}: MarketingModuleProps) {
    const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);
    const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaign | null>(null);
    const [view, setView] = useState<'feed' | 'dashboard'>('feed');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'ALL' | 'Active' | 'Pending' | 'Completed'>('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const itemsPerPage = 5;

    // Update local campaigns when prop changes
    useEffect(() => {
        setCampaigns(initialCampaigns);
    }, [initialCampaigns]);

    // Set initial view based on user role
    useEffect(() => {
        const defaultView = (user.role === UserRole.ADMIN || user.role === UserRole.STAFF)
            ? 'dashboard'
            : 'feed';
        setView(defaultView);
    }, [user.role]);

    // Calculate stats
    const totalRevenue = campaigns.reduce((acc, c) => acc + (c.status === 'Active' ? c.fee : 0), 0);
    const totalReach = campaigns.reduce((acc, c) => acc + c.reach, 0);
    const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;

    // Filter campaigns
    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch =
            campaign.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'ALL' || campaign.status === filter;

        return matchesSearch && matchesFilter;
    });

    // Active campaigns for feed view
    const activeFeedCampaigns = filteredCampaigns.filter(c => c.status === 'Active');
    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    const paginatedCampaigns = filteredCampaigns.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Campaign actions
    const handleCreateCampaign = (data: any) => {
        const newCampaign: MarketingCampaign = {
            id: `camp-${Date.now()}`,
            ...data,
            status: 'Pending' as const,
            reach: 0,
            engagement: 0,
            image: data.image || 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=800&auto=format&fit=crop&q=60'
        };

        const updatedCampaigns = [newCampaign, ...campaigns];
        setCampaigns(updatedCampaigns);
        onUpdateCampaigns(updatedCampaigns);
        setIsCreateModalOpen(false);
    };

    const handleDeleteCampaign = (id: string) => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            const updatedCampaigns = campaigns.filter(c => c.id !== id);
            setCampaigns(updatedCampaigns);
            onUpdateCampaigns(updatedCampaigns);
            if (selectedCampaign?.id === id) {
                setSelectedCampaign(null);
            }
        }
    };

    const handleApproveCampaign = (id: string) => {
        const updatedCampaigns = campaigns.map(c =>
            c.id === id ? { ...c, status: 'Active' as const } : c
        );
        setCampaigns(updatedCampaigns);
        onUpdateCampaigns(updatedCampaigns);
    };

    const handleUpdateCampaign = (id: string, updates: Partial<MarketingCampaign>) => {
        const updatedCampaigns = campaigns.map(c =>
            c.id === id ? { ...c, ...updates } : c
        );
        setCampaigns(updatedCampaigns);
        onUpdateCampaigns(updatedCampaigns);
    };

    if (selectedCampaign) {
        return (
            <CampaignDetail
                campaign={selectedCampaign}
                onBack={() => setSelectedCampaign(null)}
                onDelete={() => handleDeleteCampaign(selectedCampaign.id)}
                onUpdate={(updates) => handleUpdateCampaign(selectedCampaign.id, updates)}
            />
        );
    }

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic underline decoration-amber-500 decoration-4 underline-offset-8">
                        {view === 'feed' ? 'COMMUNITY_OFFERS' : 'CAMPAIGN_CONSOLE'}
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
                        MARKETING_NODE: <span className="text-amber-500">
                            {view === 'feed' ? 'LIVE_STREAM' : 'ADMIN_CONTROL'}
                        </span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                    {/* View Toggle Button */}
                    {(user.role === UserRole.ADMIN || user.role === UserRole.STAFF) && (
                        <button
                            onClick={() => setView(view === 'feed' ? 'dashboard' : 'feed')}
                            className="px-6 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[10px] tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 uppercase shadow-sm"
                        >
                            <BarChart3 size={16} /> {view === 'feed' ? 'GO_TO_DASHBOARD' : 'VIEW_AS_RESIDENT'}
                        </button>
                    )}

                    {/* Create Campaign Button */}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-8 py-3.5 bg-amber-500 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-amber-100 hover:bg-amber-600 transition-all flex items-center gap-3 uppercase"
                    >
                        <Plus size={16} /> REQUEST_CAMPAIGN
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
                <button
                    onClick={() => setFilter('ALL')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'ALL'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-50 text-slate-400 hover:text-amber-500'
                        }`}
                >
                    ALL_STREAMS
                </button>
                <button
                    onClick={() => setFilter('Active')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'Active'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-50 text-slate-400 hover:text-emerald-500'
                        }`}
                >
                    ACTIVE_NOW
                </button>
                <button
                    onClick={() => setFilter('Pending')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'Pending'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-50 text-slate-400 hover:text-amber-500'
                        }`}
                >
                    PENDING_REVIEW
                </button>
                <button
                    onClick={() => setFilter('Completed')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'Completed'
                        ? 'bg-slate-500 text-white'
                        : 'bg-slate-50 text-slate-400 hover:text-slate-500'
                        }`}
                >
                    COMPLETED
                </button>
            </div>

            {/* Content Area */}
            {view === 'dashboard' ? (
                <div className="space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            label="TOTAL_MARKETING_REVENUE"
                            value={`$${totalRevenue}`}
                            trend="+12.4%"
                            icon="dollar"
                        />
                        <StatsCard
                            label="COMMUNITY_REACH"
                            value={totalReach.toLocaleString()}
                            trend="+40%"
                            icon="eye"
                        />
                        <StatsCard
                            label="ACTIVE_CAMPAIGNS"
                            value={activeCampaigns.toString()}
                            trend="STABLE"
                            icon="rocket"
                        />
                    </div>

                    {/* Campaigns Table */}
                    <CampaignsTable
                        campaigns={paginatedCampaigns}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onSelect={setSelectedCampaign}
                        onDelete={handleDeleteCampaign}
                        onApprove={handleApproveCampaign}
                        userRole={user.role}
                    />
                </div>
            ) : (
                /* Campaign Feed Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeFeedCampaigns.map((campaign, idx) => (
                        <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            index={idx}
                            onClick={() => setSelectedCampaign(campaign)}
                        />
                    ))}

                    {activeFeedCampaigns.length === 0 && (
                        <div className="col-span-3 quartz-card p-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg text-center">
                            <Megaphone size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight mb-2">
                                No Active Campaigns
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {searchTerm ? 'Try adjusting your search to find what you\'re looking for.' : 'Create your first campaign to get started!'}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Create Campaign Modal */}
            {isCreateModalOpen && (
                <CreateCampaignModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateCampaign}
                />
            )}
        </div>
    );
}