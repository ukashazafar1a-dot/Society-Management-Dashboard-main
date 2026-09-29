'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, Clock, ChevronRight, Droplets, Zap, Wrench, ShieldCheck, Scissors } from 'lucide-react';
import ServiceCategoryCard from './ServiceCategoryCard';
import FeaturedProviderCard from './FeaturedProviderCard';
import ProviderRegistrationCard from './ProviderRegistrationCard';
import ServiceStats from './ServiceStats';
import { ServiceBooking, ServiceCategory, ServiceProvider, ServiceReview, User } from '@/utils/types';
interface ServicesModuleProps {
    user: User;
}
export const serviceCategories: ServiceCategory[] = [
    {
        id: 'cat-1',
        name: 'Plumbing',
        icon: 'Droplets',
        providers: 8,
        description: 'Pipe repairs, fixture installation, drain cleaning',
        avgRating: 4.7,
        colorScheme: 'blue'
    },
    {
        id: 'cat-2',
        name: 'Electrical',
        icon: 'Zap',
        providers: 12,
        description: 'Wiring, lighting, panel upgrades, appliance installation',
        avgRating: 4.8,
        colorScheme: 'yellow'
    },
    {
        id: 'cat-3',
        name: 'Maintenance',
        icon: 'Wrench',
        providers: 5,
        description: 'General repairs, furniture assembly, handyman services',
        avgRating: 4.6,
        colorScheme: 'slate'
    },
    {
        id: 'cat-4',
        name: 'Security',
        icon: 'ShieldCheck',
        providers: 3,
        description: 'Camera installation, access control, security systems',
        avgRating: 4.9,
        colorScheme: 'indigo'
    },
    {
        id: 'cat-5',
        name: 'Cleaning',
        icon: 'Sparkles',
        providers: 15,
        description: 'Deep cleaning, carpet cleaning, window washing',
        avgRating: 4.5,
        colorScheme: 'emerald'
    },
    {
        id: 'cat-6',
        name: 'Salon',
        icon: 'Scissors',
        providers: 6,
        description: 'Hair cutting, styling, coloring, grooming',
        avgRating: 4.7,
        colorScheme: 'purple'
    },
    {
        id: 'cat-7',
        name: 'HVAC',
        icon: 'Thermometer',
        providers: 4,
        description: 'AC repair, heating service, ventilation',
        avgRating: 4.8,
        colorScheme: 'cyan'
    },
    {
        id: 'cat-8',
        name: 'Pest Control',
        icon: 'Bug',
        providers: 2,
        description: 'Roach control, rodent removal, termite treatment',
        avgRating: 4.4,
        colorScheme: 'amber'
    }
];


export const serviceProviders: ServiceProvider[] = [
    {
        id: 'sp-1',
        name: 'Robert Chen',
        businessName: 'Spark Electricians',
        category: ['Electrical'],
        rating: 4.8,
        reviews: 120,
        tags: ['Quick Service', 'Affordable', 'Emergency', '24/7'],
        avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=6366f1&color=fff',
        phone: '+1 (555) 123-4567',
        email: 'robert@sparkelectricians.com',
        serviceAreas: ['Block A', 'Block B', 'Block C', 'Block D'],
        description: 'Licensed electrician with 12+ years of experience. Specializing in residential wiring, panel upgrades, and emergency repairs. Available 24/7 for urgent issues.',
        yearsOfExperience: 12,
        verified: true,
        status: 'Verified',
        availableToday: true,
        availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: false
        },
        priceRange: '$$',
        basePrice: 85,
        insurance: true,
        warranty: true,
        emergencyService: true,
        memberSince: 'Jan 2020',
        featured: true,
        responseTime: '< 15 min',
        completedJobs: 450
    },
    {
        id: 'sp-2',
        name: 'Maria Gonzalez',
        businessName: 'Elite Plumbing Co.',
        category: ['Plumbing'],
        rating: 4.9,
        reviews: 85,
        tags: ['Professional', '24/7', 'Licensed', 'Family Owned'],
        avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=8b5cf6&color=fff',
        phone: '+1 (555) 234-5678',
        email: 'maria@eliteplumbing.com',
        serviceAreas: ['Block A', 'Block B', 'Block E', 'Block F'],
        description: 'Master plumber specializing in leak detection, pipe repairs, and water heater installation. Fully licensed and insured. Emergency calls accepted.',
        yearsOfExperience: 15,
        verified: true,
        status: 'Verified',
        availableToday: true,
        availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        },
        priceRange: '$$$',
        basePrice: 95,
        insurance: true,
        warranty: true,
        emergencyService: true,
        memberSince: 'Mar 2019',
        featured: true,
        responseTime: '< 30 min',
        completedJobs: 320
    },
    {
        id: 'sp-3',
        name: 'James Wilson',
        businessName: 'CleanSweep Solutions',
        category: ['Cleaning'],
        rating: 4.6,
        reviews: 210,
        tags: ['Deep Clean', 'Eco-Friendly', 'Pet Friendly'],
        avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=10b981&color=fff',
        phone: '+1 (555) 345-6789',
        email: 'james@cleansweep.com',
        serviceAreas: ['All Blocks'],
        description: 'Professional cleaning service using eco-friendly products. Specializing in deep cleaning, move-in/move-out cleaning, and carpet steam cleaning.',
        yearsOfExperience: 8,
        verified: true,
        status: 'Verified',
        availableToday: false,
        availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false
        },
        priceRange: '$$',
        basePrice: 65,
        insurance: true,
        warranty: false,
        emergencyService: false,
        memberSince: 'Jun 2021',
        featured: true,
        responseTime: '< 1 hour',
        completedJobs: 580
    },
    {
        id: 'sp-4',
        name: 'David Kim',
        businessName: 'SafeGuard Security',
        category: ['Security'],
        rating: 4.9,
        reviews: 45,
        tags: ['Professional', 'High-Tech', 'Reliable'],
        avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=f59e0b&color=fff',
        phone: '+1 (555) 456-7890',
        email: 'david@safeguard.com',
        serviceAreas: ['Block A', 'Block C', 'Block E'],
        description: 'Security system specialist. CCTV installation, access control systems, and smart home security integration. Former law enforcement.',
        yearsOfExperience: 20,
        verified: true,
        status: 'Verified',
        availableToday: true,
        availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false
        },
        priceRange: '$$$$',
        basePrice: 150,
        insurance: true,
        warranty: true,
        emergencyService: true,
        memberSince: 'Aug 2022',
        featured: false,
        responseTime: '< 45 min',
        completedJobs: 120
    },
    {
        id: 'sp-5',
        name: 'Lisa Park',
        businessName: 'Style & Grace Salon',
        category: ['Salon'],
        rating: 4.7,
        reviews: 98,
        tags: ['Women', 'Men', 'Coloring', 'Styling'],
        avatar: 'https://ui-avatars.com/api/?name=Lisa+Park&background=ef4444&color=fff',
        phone: '+1 (555) 567-8901',
        email: 'lisa@stylegrace.com',
        serviceAreas: ['All Blocks'],
        description: 'Master stylist with 10+ years of experience. Specializing in cuts, coloring, balayage, and bridal styling. Mobile salon services available.',
        yearsOfExperience: 10,
        verified: true,
        status: 'Verified',
        availableToday: true,
        availability: {
            monday: false,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: false
        },
        priceRange: '$$$',
        basePrice: 75,
        insurance: false,
        warranty: false,
        emergencyService: false,
        memberSince: 'Nov 2021',
        featured: false,
        responseTime: '< 2 hours',
        completedJobs: 230
    }
];

export const serviceBookings: ServiceBooking[] = [
    {
        id: 'bk-1',
        providerId: 'sp-1',
        residentId: 'user-1',
        serviceType: 'Electrical',
        description: 'Install ceiling fan in living room',
        scheduledDate: '2023-11-20',
        scheduledTime: '10:00 AM',
        status: 'Confirmed',
        price: 120,
        duration: '1.5 hours',
        location: 'Unit A-102',
        residentName: 'John Doe',
        residentPhone: '+1 (555) 123-4567',
        notes: 'Please bring both white and brown fan options',
        createdAt: '2023-11-15',
        updatedAt: '2023-11-15'
    },
    {
        id: 'bk-2',
        providerId: 'sp-2',
        residentId: 'user-2',
        serviceType: 'Plumbing',
        description: 'Fix leaking bathroom sink',
        scheduledDate: '2023-11-18',
        scheduledTime: '2:00 PM',
        status: 'Completed',
        price: 95,
        duration: '1 hour',
        location: 'Unit B-205',
        residentName: 'Jane Smith',
        residentPhone: '+1 (555) 234-5678',
        createdAt: '2023-11-16',
        updatedAt: '2023-11-18',
        completedAt: '2023-11-18',
        rating: 5,
        review: 'Fast and professional. Fixed the leak quickly!'
    }
];

export const serviceReviews: ServiceReview[] = [
    {
        id: 'rev-1',
        bookingId: 'bk-2',
        providerId: 'sp-2',
        residentId: 'user-2',
        residentName: 'Jane Smith',
        residentUnit: 'B-205',
        rating: 5,
        comment: 'Maria was amazing! Fixed our sink leak in under 30 minutes. Very professional and reasonably priced.',
        createdAt: '2023-11-18',
        helpful: 12,
        verified: true
    },
    {
        id: 'rev-2',
        bookingId: 'bk-1',
        providerId: 'sp-1',
        residentId: 'user-1',
        residentName: 'John Doe',
        residentUnit: 'A-102',
        rating: 4,
        comment: 'Good work on the ceiling fan. Took a bit longer than expected but quality is great.',
        createdAt: '2023-11-20',
        helpful: 5,
        verified: true
    }
];

export default function ServicesModule({ user }: ServicesModuleProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showOnlyVerified, setShowOnlyVerified] = useState(false);
    const [showAvailableToday, setShowAvailableToday] = useState(false);
    const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price_low' | 'price_high'>('rating');

    // Filter providers based on selected category, search, and filters
    const filteredProviders = useMemo(() => {
        let providers = [...serviceProviders];

        // Filter by category
        if (selectedCategory) {
            providers = providers.filter(p =>
                p.category.includes(selectedCategory as any)
            );
        }

        // Filter by search term
        if (searchTerm) {
            providers = providers.filter(p =>
                p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by verified only
        if (showOnlyVerified) {
            providers = providers.filter(p => p.verified);
        }

        // Filter by available today
        if (showAvailableToday) {
            providers = providers.filter(p => p.availableToday);
        }

        // Sort providers
        providers.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'reviews':
                    return b.reviews - a.reviews;
                case 'price_low':
                    return (a.basePrice || 0) - (b.basePrice || 0);
                case 'price_high':
                    return (b.basePrice || 0) - (a.basePrice || 0);
                default:
                    return b.rating - a.rating;
            }
        });

        return providers;
    }, [selectedCategory, searchTerm, showOnlyVerified, showAvailableToday, sortBy]);

    // Get featured providers (top 3 by rating and verified)
    const featuredProviders = useMemo(() => {
        return serviceProviders
            .filter(p => p.verified && p.featured)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
    }, []);

    const handleBookService = (providerId: string) => {
        // Navigate to booking page or open modal
        console.log('Booking service with provider:', providerId);
        // You can implement a modal or navigation here
    };

    const handleRegisterProvider = () => {
        // Navigate to registration page or open modal
        console.log('Opening provider registration');
        // You can implement a modal or navigation here
    };

    // Calculate stats
    const stats = {
        totalProviders: serviceProviders.length,
        verifiedProviders: serviceProviders.filter(p => p.verified).length,
        totalBookings: serviceProviders.reduce((acc, p) => acc + p.completedJobs, 0),
        averageRating: serviceProviders.reduce((acc, p) => acc + p.rating, 0) / serviceProviders.length,
        responseTime: '< 30 min'
    };

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic underline decoration-indigo-500 decoration-4 underline-offset-8">
                        Verified Society Services
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
                        SERVICE_HUB: <span className="text-indigo-600">TRUSTED_PROFESSIONALS</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search providers, services, or specialties..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                    {/* Filter Button */}
                    <button className="p-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 hover:border-indigo-200 transition-all relative group">
                        <SlidersHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Service Stats */}
            <ServiceStats
                totalProviders={stats.totalProviders}
                verifiedProviders={stats.verifiedProviders}
                totalBookings={stats.totalBookings}
                averageRating={stats.averageRating}
                responseTime={stats.responseTime}
            />

            {/* Service Categories */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                        Browse by Category
                    </h3>
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                        >
                            Clear Filter <ChevronRight size={12} />
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {serviceCategories.map((category) => (

                        <ServiceCategoryCard
                            key={category.id}
                            category={category}
                            onClick={() => setSelectedCategory(category.name)}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Provider List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between flex-wrap">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                {selectedCategory ? `${selectedCategory} Providers` : 'Top Rated Professionals'}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                {filteredProviders.length} providers available
                            </p>
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowOnlyVerified(!showOnlyVerified)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1 ${showOnlyVerified
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:text-indigo-600'
                                    }`}
                            >
                                <Star size={12} /> Verified Only
                            </button>
                            <button
                                onClick={() => setShowAvailableToday(!showAvailableToday)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1 ${showAvailableToday
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-50 text-slate-400 hover:text-emerald-600'
                                    }`}
                            >
                                <Clock size={12} /> Available Today
                            </button>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 outline-none focus:border-indigo-500 transition-colors"
                            >
                                <option value="rating">Sort: Top Rated</option>
                                <option value="reviews">Sort: Most Reviews</option>
                                <option value="price_low">Sort: Price Low-High</option>
                                <option value="price_high">Sort: Price High-Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Provider Cards */}
                    <div className="space-y-4">
                        {filteredProviders.slice(0, 5).map((provider) => (
                            <FeaturedProviderCard
                                key={provider.id}
                                provider={provider}
                                onBook={handleBookService}
                            />
                        ))}

                        {filteredProviders.length === 0 && (
                            <div className="p-12 bg-white rounded-2xl border border-slate-100 text-center">
                                <Search size={48} className="mx-auto text-slate-300 mb-4" />
                                <h4 className="text-lg font-bold text-slate-400 mb-2">No providers found</h4>
                                <p className="text-sm text-slate-400">
                                    Try adjusting your filters or search term
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Registration Card */}
                <div className="lg:col-span-1">
                    <ProviderRegistrationCard onRegister={handleRegisterProvider} />
                </div>
            </div>
        </div>
    );
}