'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { residentService } from '@/lib/api';

interface AddResidentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddResidentModal: React.FC<AddResidentModalProps> = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState<any>({
        FirstName: '',
        LastName: '',
        Email: '',
        ContactNumber: '',
        ResidentType: 'Owner',
        Address: ''
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors([]);
        setSuccess(false);

        try {
            const payload = {
                firstName: formData.FirstName?.trim(),
                lastName: formData.LastName?.trim(),
                profileImage: '',
                email: formData.Email?.trim(),
                cnic: '',
                password: '',
                primaryNo: formData.ContactNumber?.trim(),
                secondaryNo: '',
                emergencyContact: '',
                residentType: formData.ResidentType,
                address: {
                    isDefault: true,
                    houseNo: '',
                    line: formData.Address?.trim(),
                    street: '',
                    block: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: 'Pakistan',
                    longitude: null,
                    latitude: null
                },
                documents: []
            };

            console.log('Submitting payload:', payload);

            const response = await residentService.create(payload);
            console.log('Response:', response);
            setSuccess(true);
            setFormData({
                FirstName: '',
                LastName: '',
                Email: '',
                ContactNumber: '',
                ResidentType: 'Owner',
                Address: ''
            });
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 1500);

        } catch (error: any) {
            console.error('Full error:', error);
            if (error.messages && Array.isArray(error.messages)) {
                setErrors(error.messages);
            } else if (error.response?.data?.messages) {
                setErrors(error.response.data.messages);
            } else if (error.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else if (error.message) {
                setErrors([error.message]);
            } else {
                setErrors(['Failed to add resident. Please try again.']);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* HEADER */}
                <div className="p-8 border-b flex justify-between items-center bg-gradient-to-r from-indigo-50 to-slate-50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">Add Resident</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Register_a_new_resident</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* FORM */}
                <div className="p-8 overflow-y-auto space-y-6 flex-1">

                    {/* ERROR MESSAGES */}
                    {errors.length > 0 && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                            <div className="flex items-center gap-2 text-rose-700">
                                <AlertCircle size={18} />
                                <p className="font-bold text-sm">Validation Errors:</p>
                            </div>
                            <ul className="space-y-1 ml-6">
                                {errors.map((error, idx) => (
                                    <li key={idx} className="text-xs text-rose-600 font-medium">• {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* SUCCESS MESSAGE */}
                    {success && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                            <CheckCircle size={18} className="text-emerald-600" />
                            <p className="text-emerald-700 font-bold text-sm">Resident added successfully!</p>
                        </div>
                    )}

                    {/* FORM FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                First Name <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                    <User size={16} />
                                </div>
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                Last Name <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                    <User size={16} />
                                </div>
                                <input
                                    type="text"
                                    name="LastName"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                Email <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                Contact Number <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                    <Phone size={16} />
                                </div>
                                <input
                                    type="tel"
                                    name="ContactNumber"
                                    value={formData.ContactNumber}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Resident Type */}
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                Resident Type <span className="text-rose-500">*</span>
                            </label>
                            <select
                                name="ResidentType"
                                value={formData.ResidentType}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="Owner">Owner</option>
                                <option value="Tenant">Tenant</option>
                                <option value="Co-owner">Co-owner</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div className="space-y-2 group md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                Address <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-3 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <textarea
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                    placeholder="Enter complete address"
                                    rows={3}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 focus:bg-white transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-6 border-t flex justify-end gap-3 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Adding...' : 'Add Resident'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddResidentModal;