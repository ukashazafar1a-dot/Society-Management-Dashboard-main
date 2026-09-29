'use client';

import React from 'react';
import { Users, CheckCircle, Star, Clock, TrendingUp, Briefcase } from 'lucide-react';

interface ServiceStatsProps {
    totalProviders: number;
    verifiedProviders: number;
    totalBookings: number;
    averageRating: number;
    responseTime: string;
}

export default function ServiceStats({
    totalProviders,
    verifiedProviders,
    totalBookings,
    averageRating,
    responseTime
}: ServiceStatsProps) {
    const stats = [
        {
            label: 'Total Providers',
            value: totalProviders,
            icon: <Users size={20} className="text-indigo-600" />,
            bgColor: 'bg-indigo-50',
            trend: '+12 this month'
        },
        {
            label: 'Verified',
            value: verifiedProviders,
            icon: <CheckCircle size={20} className="text-emerald-600" />,
            bgColor: 'bg-emerald-50',
            trend: `${Math.round((verifiedProviders / totalProviders) * 100)}% of all providers`
        },
        {
            label: 'Jobs Completed',
            value: totalBookings,
            icon: <Briefcase size={20} className="text-amber-600" />,
            bgColor: 'bg-amber-50',
            trend: '+23% vs last month'
        },
        {
            label: 'Avg. Rating',
            value: averageRating.toFixed(1),
            icon: <Star size={20} className="text-purple-600 fill-purple-600" />,
            bgColor: 'bg-purple-50',
            suffix: '/5.0',
            trend: 'Based on 550+ reviews'
        },
        {
            label: 'Avg. Response',
            value: responseTime,
            icon: <Clock size={20} className="text-cyan-600" />,
            bgColor: 'bg-cyan-50',
            trend: 'Faster than 95% of cities'
        },
        {
            label: 'Satisfaction',
            value: '98%',
            icon: <TrendingUp size={20} className="text-rose-600" />,
            bgColor: 'bg-rose-50',
            trend: 'Would recommend'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-fadeIn">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className={`p-2.5 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                            {stat.trend}
                        </span>
                    </div>
                    <div className="mt-2">
                        <p className="text-2xl font-black text-slate-900 tracking-tight">
                            {stat.value}
                            {stat.suffix && <span className="text-xs font-medium text-slate-400 ml-1">{stat.suffix}</span>}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {stat.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}