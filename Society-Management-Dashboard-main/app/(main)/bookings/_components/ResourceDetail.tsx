'use client';

import React from 'react';
import { MapPin, CreditCard, Shield, Info, CheckCircle2 } from 'lucide-react';
import { BookingResource } from '@/utils/types';
import DetailStat from './DetailStat';

interface ResourceDetailProps {
    resource: BookingResource;
    onBack: () => void;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource, onBack }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                <div className="quartz-card rounded-[3rem] bg-white border border-slate-100 shadow-2xl overflow-hidden">
                    <div className="h-80 relative">
                        <img src={resource.image} alt={resource.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-10">
                            <div>
                                <span className="px-3 py-1 bg-indigo-600! text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                                    {resource.category}
                                </span>
                                <h3 className="text-4xl font-black text-white tracking-tighter">{resource.name}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 space-y-10">
                        <div className="grid grid-cols-3 gap-8 pb-10 border-b border-slate-100">
                            <DetailStat icon={<MapPin size={18} />} label="Location" value={resource.location} />
                            <DetailStat icon={<CreditCard size={18} />} label="Rate_Scale" value={resource.price} />
                            <DetailStat icon={<Shield size={18} />} label="Security" value="High_Access" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <Info size={14} className="text-indigo-600" /> RESOURCE_CORE_DESCRIPTION
                            </h4>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg">
                                {resource.description}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">PROTOCOL_RULES</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {resource.rules.map((rule, i) => (
                                    <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-700 uppercase tracking-tight">
                                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <div className="quartz-card p-10 rounded-[3rem] bg-indigo-600! text-white shadow-2xl shadow-indigo-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-6">Reservation Terminal</h4>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-indigo-200 ml-1">Target_Date</label>
                            <input type="date" className="w-full bg-indigo-500 border border-indigo-400 rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-white transition-all appearance-none text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-indigo-200 ml-1">Access_Window</label>
                            <select className="w-full bg-indigo-500 border border-indigo-400 rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-white transition-all appearance-none cursor-pointer text-white">
                                <option>09:00 - 11:00 AM</option>
                                <option>12:00 - 02:00 PM</option>
                                <option>03:00 - 05:00 PM</option>
                                <option>06:00 - 08:00 PM</option>
                            </select>
                        </div>
                        <div className="pt-6 border-t border-indigo-500 mt-6">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-black uppercase text-indigo-200">Processing Fee</span>
                                <span className="font-black">{resource.price}</span>
                            </div>
                            <button className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-[12px] tracking-[0.2em] uppercase hover:bg-slate-50 transition-all shadow-xl">
                                INITIATE_BOOKING
                            </button>
                        </div>
                    </div>
                </div>

                <div className="quartz-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Internal Status</h4>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-4">
                        <span className="text-[9px] font-black text-slate-500 uppercase">Registry Status</span>
                        <span className="text-[9px] font-black text-emerald-600 uppercase bg-emerald-100 px-2 py-0.5 rounded">ONLINE</span>
                    </div>
                    <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 rounded-2xl hover:text-rose-500 hover:border-rose-100 transition-all">
                        REPORT_NODE_ISSUE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;