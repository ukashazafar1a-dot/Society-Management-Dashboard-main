'use client';

import React, { useEffect, useState } from 'react';
import {
    Search, Plus, MapPin, Heart, Gift, Recycle, Sparkles, Globe, ArrowLeft
} from 'lucide-react';
import CommunityDetail from './CommunityDetail';
import CommunityCard from './CommunityCard';
import AddCommunityModal from './AddCommunityModal';
import { Community } from '@/utils/types';
import { communityService } from '@/lib/api';

const mockCommunities: Community[] = [
    {
        id: 'com-1',
        name: 'Lifesaver Blood Hub',
        location: 'Society Health Center',
        residentCount: 154,
        staffCount: 12,
        status: 'Active',
        description: 'A dedicated group for organizing blood donation drives and maintaining a directory of emergency donors within our society.',
        establishedDate: 'Mar 2021',
        image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=60',
        category: 'Health_Emergency'
    },
    {
        id: 'com-2',
        name: 'Kindness Collective',
        location: 'Admin Block - Room 4',
        residentCount: 89,
        staffCount: 25,
        status: 'Active',
        description: 'Our local charity initiative focused on distributing excess food, clothing, and books to underprivileged communities nearby.',
        establishedDate: 'Jan 2022',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60',
        category: 'Social_Welfare'
    },
    {
        id: 'com-3',
        name: 'Green Earth Society',
        location: 'Community Gardens',
        residentCount: 210,
        staffCount: 8,
        status: 'Active',
        description: 'Committed to urban gardening, waste segregation audits, and reducing the carbon footprint of our residential complex.',
        establishedDate: 'Sept 2019',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60',
        category: 'Environmental'
    },
    {
        id: 'com-4',
        name: 'Knowledge Exchange',
        location: 'Library Wing',
        residentCount: 45,
        staffCount: 5,
        status: 'Under Maintenance',
        description: 'Peer-to-peer tutoring and skill-sharing workshops covering everything from coding to classical music for residents.',
        establishedDate: 'Nov 2022',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60',
        category: 'Skill_Exchange'
    }
];

const CommunitiesModule: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [communities, setCommunities] = useState<Community[]>(mockCommunities);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCommunities = async () => {
            try {
                setLoading(true);
                const response = await communityService.list({ pageNo: 1, pageSize: 20, status: 'active' });
                const items = response?.items || response?.data || response || [];
                const mapped = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    name: item.name || item.title || 'Untitled Community',
                    location: item.location || '',
                    residentCount: Number(item.residentCount || item.memberCount || 0),
                    staffCount: Number(item.staffCount || item.leadCount || 0),
                    status: (item.status || 'Active') as Community['status'],
                    description: item.description || '',
                    establishedDate: item.establishedDate || item.createdAt ? new Date(item.establishedDate || item.createdAt).toLocaleDateString() : 'N/A',
                    image: item.imageUrl || 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60',
                    category: item.category || 'Social_Welfare',
                }));
                if (mapped.length) {
                    setCommunities(mapped);
                }
            } catch (error) {
                console.error('Failed to load communities', error);
            } finally {
                setLoading(false);
            }
        };

        loadCommunities();
    }, []);

    const selectedCommunity = communities.find(c => c.id === selectedId);
    const filteredCommunities = communities.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getIcon = (name: string) => {
        if (name.includes('Blood')) return <Heart className="text-rose-500" />;
        if (name.includes('Kindness')) return <Gift className="text-indigo-500" />;
        if (name.includes('Green')) return <Recycle className="text-emerald-500" />;
        return <Sparkles className="text-sky-500" />;
    };

    const handleAddCommunity = (newCommunity: Omit<Community, 'id'>) => {
        const communityWithId: Community = {
            ...newCommunity,
            id: `com-${Date.now()}`,
            status: 'Active' as const
        };
        setCommunities(prev => [...prev, communityWithId]);
        setIsAddModalOpen(false);
    };

    if (selectedId && selectedCommunity) {
        return (
            <div className="space-y-8">
                <button
                    onClick={() => setSelectedId(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-[10px] uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> BACK_TO_SOCIAL_HUB
                </button>

                <CommunityDetail
                    community={selectedCommunity}
                    getIcon={getIcon}
                    onBack={() => setSelectedId(null)}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Social Communities</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Interests & Community Impact</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find a cause or group..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold w-full outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 shrink-0 hover:bg-indigo-700 transition-all"
                    >
                        Add Communites
                        
                    </button>
                </div>
            </div>

            {loading && (
                <div className="rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-8 text-center text-sm font-bold text-slate-500">
                    Loading communities...
                </div>
            )}

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {filteredCommunities.map((community) => (
                    <CommunityCard
                        key={community.id}
                        community={community}
                        getIcon={getIcon}
                        onClick={() => setSelectedId(community.id)}
                    />
                    ))}
                </div>
            )}

            <AddCommunityModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddCommunity}
            />
        </div>
    );
};

export default CommunitiesModule;