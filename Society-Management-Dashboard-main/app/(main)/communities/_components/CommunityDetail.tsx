'use client';

import React from 'react';
import { MapPin, Users, HandHelping, TrendingUp, Calendar, LayoutGrid, Mail, UserPlus } from 'lucide-react';
import Stat from './Stat';
import LogItem from './LogItem';
import { Community } from '@/utils/types';
interface CommunityDetailProps {
    community: Community;
    getIcon: (name: string) => React.ReactElement;
    onBack: () => void;
}

const CommunityDetail: React.FC<CommunityDetailProps> = ({ community, getIcon, onBack }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                <div className="quartz-card rounded-[2.5rem] bg-white overflow-hidden shadow-xl shadow-slate-200/40">
                    <div className="h-64 relative">
                        <img
                            src={community.image}
                            alt={community.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white rounded-2xl shadow-lg">
                                    {React.cloneElement(getIcon(community.name) as React.ReactElement)}
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black text-white tracking-tighter mb-1">{community.name}</h2>
                                    <p className="text-white/80 flex items-center gap-2 text-sm font-medium">
                                        <MapPin size={16} /> {community.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-10">
                        <div className="flex flex-wrap gap-8 mb-10 border-b border-slate-100 pb-10">
                            <Stat
                                label="Members"
                                value={community.residentCount.toString()}
                                icon={<Users size={16} />}
                            />
                            <Stat
                                label="Volunteers"
                                value={community.staffCount.toString()}
                                icon={<HandHelping size={16} />}
                            />
                            <Stat
                                label="Impact"
                                value="High"
                                icon={<TrendingUp size={16} />}
                            />
                            <Stat
                                label="Founded"
                                value={community.establishedDate}
                                icon={<Calendar size={16} />}
                            />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                                Our Mission
                            </h4>
                            <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                {community.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="quartz-card p-8 rounded-[2rem] bg-white border border-slate-100">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <LayoutGrid size={14} className="text-indigo-600" /> Recent Activities
                        </h4>
                        <div className="space-y-4">
                            <LogItem title="Emergency Blood Drive" date="Oct 28" status="Complete" />
                            <LogItem title="Awareness Seminar" date="Oct 25" status="Upcoming" />
                        </div>
                    </div>

                    <div className="quartz-card p-8 rounded-[2rem] bg-white border border-slate-100">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <Mail size={14} className="text-indigo-600" /> Member Notices
                        </h4>
                        <div className="space-y-4">
                            <LogItem title="New Volunteer Onboarding" date="Oct 12" status="Global" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="quartz-card p-8 rounded-[2rem] bg-indigo-600! text-white shadow-xl shadow-indigo-200">
                    <UserPlus size={32} className="mb-6 opacity-40" />
                    <h3 className="text-xl font-black tracking-tight mb-2">Be The Change</h3>
                    <p className="text-indigo-200 text-xs font-medium mb-8">
                        Join our community of volunteers and help make a difference in our society.
                    </p>
                    <div className="space-y-3">
                        <button className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-[10px] tracking-widest hover:bg-slate-50 transition-all uppercase shadow-lg">
                            JOIN_COMMUNITY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityDetail;