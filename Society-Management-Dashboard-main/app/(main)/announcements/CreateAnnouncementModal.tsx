'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Define types locally
type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH';
type AudienceType = 'ALL' | 'STUDENTS' | 'FACULTY' | 'STAFF' | 'PARENTS';

interface CreateAnnouncementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

// Zod validation schema
const announcementSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    isPinned: z.boolean(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    audienceType: z.enum(['ALL', 'STUDENTS', 'FACULTY', 'STAFF', 'PARENTS']),
    audienceFilter: z.string().optional(),
    isReadRequired: z.boolean(),
    broadcasterTitle: z.string().min(1, 'Broadcaster title is required'),
    publishedAt: z.string().optional(),
    expiresAt: z.string().optional(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm<AnnouncementFormData>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            title: '',
            content: '',
            category: '',
            isPinned: false,
            priority: 'LOW',
            audienceType: 'ALL',
            audienceFilter: '',
            isReadRequired: false,
            broadcasterTitle: '',
            publishedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        }
    });

    const onSubmit = async (data: AnnouncementFormData) => {
        setIsSubmitting(true);

        const toastId = toast.loading('Broadcasting announcement...');

        try {
            // Prepare data for API
            const apiData = {
                title: data.title,
                content: data.content,
                category: data.category,
                isPinned: data.isPinned,
                priority: data.priority,
                audienceType: data.audienceType,
                audienceFilter: data.audienceFilter || undefined,
                isReadRequired: data.isReadRequired,
                broadcasterTitle: data.broadcasterTitle,
                publishedAt: data.publishedAt,
                expiresAt: data.expiresAt,
            };
            console.log('Prepared API data:', apiData); // Debug log

            // Get the base URL dynamically
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
            const url = `${baseUrl}/api/Announcements`;

            console.log('Sending request to:', url); // Debug log

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to create announcement';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {
                    errorMessage = response.statusText || errorMessage;
                }

                // Special handling for 404
                if (response.status === 404) {
                    errorMessage = 'API endpoint not found. Please check if the server is running.';
                }

                throw new Error(errorMessage);
            }

            const result = await response.json();

            toast.success('Announcement broadcasted successfully!', {
                id: toastId,
                duration: 5000,
                icon: '📢',
                description: `"${result.title}" has been published.`,
            });

            reset();
            onSuccess?.();

            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error('Submission error:', error);
            toast.error(
                error instanceof Error ? error.message : 'Failed to broadcast announcement',
                { id: toastId, duration: 5000 }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            reset();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div
                onClick={handleClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 md:p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Broadcast Genesis
                        </h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                            Multi-Channel Propagation Node
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-rose-500 hover:border-rose-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-8 md:p-10 space-y-8">
                        {/* Title and Priority Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-2 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Transmission Title
                                </label>
                                <input
                                    {...register('title')}
                                    placeholder="Headline of the announcement..."
                                    className={`w-full bg-slate-50 border rounded-xl py-3 px-6 text-xs font-bold outline-none transition-all ${errors.title
                                        ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/5'
                                        : 'border-slate-100 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {errors.title && (
                                    <p className="text-rose-500 text-[9px] font-black uppercase tracking-wider mt-1 ml-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Priority
                                </label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer disabled:opacity-50"
                                            disabled={isSubmitting}
                                        >
                                            <option value="LOW">LOW</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="HIGH">HIGH</option>
                                        </select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Category and Audience */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Category
                                </label>
                                <input
                                    {...register('category')}
                                    placeholder="e.g., Academic, Event, Emergency..."
                                    className={`w-full bg-slate-50 border rounded-xl py-3 px-6 text-xs font-bold outline-none transition-all ${errors.category
                                        ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/5'
                                        : 'border-slate-100 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {errors.category && (
                                    <p className="text-rose-500 text-[9px] font-black uppercase tracking-wider mt-1 ml-1">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Audience Type
                                </label>
                                <Controller
                                    name="audienceType"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer disabled:opacity-50"
                                            disabled={isSubmitting}
                                        >
                                            <option value="ALL">ALL</option>
                                            <option value="STUDENTS">STUDENTS</option>
                                            <option value="FACULTY">FACULTY</option>
                                            <option value="STAFF">STAFF</option>
                                            <option value="PARENTS">PARENTS</option>
                                        </select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Audience Filter */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                Audience Filter (Optional)
                            </label>
                            <input
                                {...register('audienceFilter')}
                                placeholder="e.g., Grade 10, Department of CS..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all disabled:opacity-50"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Broadcaster Title */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                Broadcaster Title
                            </label>
                            <input
                                {...register('broadcasterTitle')}
                                placeholder="e.g., Administration, Student Council..."
                                className={`w-full bg-slate-50 border rounded-xl py-3 px-6 text-xs font-bold outline-none transition-all ${errors.broadcasterTitle
                                    ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/5'
                                    : 'border-slate-100 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200'
                                    }`}
                                disabled={isSubmitting}
                            />
                            {errors.broadcasterTitle && (
                                <p className="text-rose-500 text-[9px] font-black uppercase tracking-wider mt-1 ml-1">
                                    {errors.broadcasterTitle.message}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                Payload Content
                            </label>
                            <textarea
                                {...register('content')}
                                rows={6}
                                placeholder="Detail the full information here..."
                                className={`w-full bg-slate-50 border rounded-[2rem] p-6 text-sm font-medium outline-none transition-all resize-none leading-relaxed ${errors.content
                                    ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/5'
                                    : 'border-slate-100 focus:ring-4 focus:ring-indigo-500/5'
                                    }`}
                                disabled={isSubmitting}
                            ></textarea>
                            {errors.content && (
                                <p className="text-rose-500 text-[9px] font-black uppercase tracking-wider mt-1 ml-1">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>

                        {/* Checkboxes Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Controller
                                name="isPinned"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                            className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                                            disabled={isSubmitting}
                                        />
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Pin Announcement
                                        </span>
                                    </label>
                                )}
                            />

                            <Controller
                                name="isReadRequired"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                            className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                                            disabled={isSubmitting}
                                        />
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Require Read Confirmation
                                        </span>
                                    </label>
                                )}
                            />
                        </div>

                        {/* Hidden fields for dates */}
                        <input type="hidden" {...register('publishedAt')} />
                        <input type="hidden" {...register('expiresAt')} />
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            {isSubmitting ? 'Broadcasting...' : 'Auto-Save Active'}
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleClose}
                                type="button"
                                disabled={isSubmitting}
                                className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:text-slate-900 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ABORT
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        BROADCASTING...
                                    </>
                                ) : (
                                    <>
                                        INITIATE_BROADCAST <Send size={14} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAnnouncementModal;