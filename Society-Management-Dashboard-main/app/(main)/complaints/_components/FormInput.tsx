import React from 'react';

interface FormInputProps {
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, icon, value, onChange, required }) => {
    return (
        <div className="space-y-2 group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                    {icon}
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all"
                />
            </div>
        </div>
    );
};

export default FormInput;