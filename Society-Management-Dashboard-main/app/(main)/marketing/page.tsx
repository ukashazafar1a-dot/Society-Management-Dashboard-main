'use client';

import { MarketingCampaign, User, UserRole } from '@/utils/types';
import { useEffect, useState } from 'react';
import MarketingModule from './_components/MarketingPage';
import { marketingService } from '@/lib/api';

const MOCK_USER: User = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.ADMIN,
    apartment: 'A-101'
};

const MarketingPage = () => {
    const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);

    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                const response = await marketingService.list({ pageNo: 1, pageSize: 20 });
                const items = response?.items || response?.data || response || [];
                const mapped = (Array.isArray(items) ? items : items?.items || []).map((item: any) => ({
                    id: String(item.id ?? item.Id ?? ''),
                    businessName: item.businessName || 'Unknown',
                    title: item.title || item.targetHeadline || 'Untitled',
                    description: item.description || '',
                    type: (item.category || 'Discount') as MarketingCampaign['type'],
                    status: (item.status || 'Pending') as MarketingCampaign['status'],
                    startDate: item.validFrom ? new Date(item.validFrom).toISOString().split('T')[0] : '',
                    endDate: item.validTo ? new Date(item.validTo).toISOString().split('T')[0] : '',
                    fee: Number(item.fee || 0),
                    image: item.imageUrl || 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=800&auto=format&fit=crop&q=60',
                    reach: 0,
                    engagement: 0,
                }));
                setCampaigns(mapped);
            } catch (error) {
                console.error(error);
            }
        };

        loadCampaigns();
    }, []);

    const handleUpdateCampaigns = (updatedCampaigns: MarketingCampaign[]) => {
        setCampaigns(updatedCampaigns);
    };

    return (
        <div className="">
            <MarketingModule
                user={MOCK_USER}
                campaigns={campaigns}
                onUpdateCampaigns={handleUpdateCampaigns}
            />
        </div>
    );
};

export default MarketingPage;