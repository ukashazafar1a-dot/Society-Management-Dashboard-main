'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, MoreVertical, Shield } from 'lucide-react';
import { Resident } from '@/utils/types';
import { residentService } from '@/lib/api';

interface ResidentTableProps {
    residents?: Resident[];
}

const ResidentTable: React.FC<ResidentTableProps> = ({ residents: propResidents }) => {

    const [residents, setResidents] = useState<Resident[]>(propResidents || []);
    const [loading, setLoading] = useState(false);

    const fetchResidents = async () => {
        try {
            setLoading(true);

            const response = await residentService.list();

            const data = response?.items || response?.data || response;
            const mapped = (Array.isArray(data) ? data : data?.items || []).map((item: any) => ({
                id: String(item.id ?? item.Id ?? ''),
                name: item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown',
                apartment: item.house || item.address?.houseNo || 'N/A',
                status: item.status || 'Active'
            }));

            setResidents(mapped);

        } catch (error: any) {
            console.error('Error fetching residents:', error?.message || error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // If parent provided residents, use them; otherwise fetch from API
        if (!propResidents || propResidents.length === 0) {
            fetchResidents();
        } else {
            setResidents(propResidents);
        }
    }, [propResidents]);

    return (
        <div className="quartz-card rounded-[2rem] bg-white border border-slate-100 shadow-xl overflow-hidden">

            {loading && (
                <div className="p-6 text-center text-sm font-bold text-slate-400">
                    Loading residents...
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b">
                            <th className="px-8 py-5 text-xs font-bold">Resident</th>
                            <th className="px-6 py-5 text-xs font-bold">Unit</th>
                            <th className="px-6 py-5 text-xs font-bold">Status</th>
                            <th className="px-6 py-5 text-xs font-bold">Contact</th>
                            <th className="px-8 py-5 text-right text-xs font-bold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {residents.map((res) => (
                            <tr key={res.id} className="hover:bg-indigo-50">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold">
                                            {res.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{res.name}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <Shield size={12} />
                                        <span className="text-xs font-bold">{res.apartment}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-5">
                                    <span className="text-xs font-bold">{res.status}</span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex gap-2">
                                        <MessageCircle size={14} />
                                        <Phone size={14} />
                                    </div>
                                </td>

                                <td className="px-8 py-5 text-right">
                                    <MoreVertical size={18} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResidentTable;