'use client';

import React from 'react';
import { ShieldCheck, Star, Zap, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

interface ProviderRegistrationCardProps {
    onRegister: () => void;
}

export default function ProviderRegistrationCard({ onRegister }: ProviderRegistrationCardProps) {
    const benefits = [
        { icon: <ShieldCheck size={18} />, text: 'Get verified badge on your profile' },
        { icon: <Star size={18} />, text: 'Build community reputation' },
        { icon: <Zap size={18} />, text: 'Direct leads from residents' },
        { icon: <TrendingUp size={18} />, text: 'Grow your local business' },
        { icon: <Award size={18} />, text: 'Earn trust badges for quality' },
        { icon: <Users size={18} />, text: 'Join exclusive provider network' }
    ];

    return (
        <div className="rounded-3xl bg-indigo-500 p-8 text-white relative overflow-hidden! flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
            {/* Background Decoration */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-500/20 rounded-2xl backdrop-blur-sm">
                        <Award size={28} className="text-indigo-300" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-1">Are you a provider?</h3>
                        <p className="text-indigo-200 text-sm">Join our verified network of service professionals</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm group/benefit">
                            <div className="text-indigo-400 mt-0.5 group-hover/benefit:text-indigo-300 transition-colors">
                                {benefit.icon}
                            </div>
                            <span className="text-indigo-100 text-xs leading-relaxed">{benefit.text}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-indigo-200">Active providers this month</span>
                        <span className="text-lg font-black text-white">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-indigo-200">Jobs completed</span>
                        <span className="text-lg font-black text-white">1,247</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span className="text-xs text-indigo-200">Free registration - Limited spots available</span>
                </div>
            </div>

            <button
                onClick={onRegister}
                className="relative z-10 bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
            >
                <Users size={18} />
                Register as Provider
                <span className="text-xs bg-indigo-100 px-2 py-1 rounded-lg ml-2 group-hover:bg-indigo-200 transition-colors">
                    Free
                </span>
            </button>
        </div>
    );
}