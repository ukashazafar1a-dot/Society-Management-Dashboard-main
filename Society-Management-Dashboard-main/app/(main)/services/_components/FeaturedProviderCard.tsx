'use client';

import React from 'react';
import { Star, Clock, MapPin, Shield, Zap, Wrench, Droplets, Scissors, Sparkles, Thermometer, Bug } from 'lucide-react';
import { ServiceProvider } from '@/utils/types';
interface FeaturedProviderCardProps {
    provider: ServiceProvider;
    onBook: (providerId: string) => void;
}

export default function FeaturedProviderCard({ provider, onBook }: FeaturedProviderCardProps) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Electrical': return <Zap size={16} />;
            case 'Plumbing': return <Droplets size={16} />;
            case 'Maintenance': return <Wrench size={16} />;
            case 'Cleaning': return <Sparkles size={16} />;
            case 'Salon': return <Scissors size={16} />;
            case 'Security': return <Shield size={16} />;
            case 'HVAC': return <Thermometer size={16} />;
            case 'Pest Control': return <Bug size={16} />;
            default: return <Wrench size={16} />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-md group animate-fadeIn">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-2xl overflow-hidden">
                            {provider.avatar ? (
                                <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                            ) : (
                                provider.businessName.charAt(0)
                            )}
                        </div>
                        {provider.availableToday && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">{provider.businessName}</h4>
                            {provider.verified && (
                                <div className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[8px] font-black uppercase tracking-wider flex items-center gap-0.5">
                                    <Shield size={10} /> Verified
                                </div>
                            )}
                            {provider.featured && (
                                <div className="px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[8px] font-black uppercase tracking-wider">
                                    Featured
                                </div>
                            )}
                        </div>

                        <p className="text-xs text-slate-500 font-medium mb-2">{provider.name}</p>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center text-amber-500">
                                <Star size={14} fill="currentColor" />
                                <span className="ml-1 text-xs font-bold text-slate-800">{provider.rating}</span>
                            </div>
                            <span className="text-slate-300 text-[10px]">•</span>
                            <span className="text-xs text-slate-500 font-medium">{provider.reviews} reviews</span>
                            <span className="text-slate-300 text-[10px]">•</span>
                            <span className="text-xs text-slate-500 font-medium">{provider.completedJobs}+ jobs</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            {provider.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-[8px] font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        <Clock size={12} />
                        <span className="text-[9px] font-bold uppercase">{provider.responseTime}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-black text-slate-900">
                            {provider.basePrice ? `$${provider.basePrice}` : provider.priceRange}
                        </span>
                        <span className="text-[9px] text-slate-400 ml-1">/visit</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-400">
                        <MapPin size={12} />
                        <span className="text-[9px] font-medium">{provider.serviceAreas.length} blocks</span>
                    </div>
                    {provider.emergencyService && (
                        <div className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                            <Zap size={10} />
                            <span className="text-[7px] font-black uppercase">24/7 Emergency</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => onBook(provider.id)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm shadow-indigo-100"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}