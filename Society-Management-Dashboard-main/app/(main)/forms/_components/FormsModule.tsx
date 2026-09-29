'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Users, FileText } from 'lucide-react';
import { Form, FormField, FormSubmission, User, UserRole } from '@/utils/types';
import FormList from './FormList';
import FormDetails from './FormDetails';
import FormSubmissions from './FormSubmissions';
import CreateFormModal from './CreateFormModal';


interface FormsModuleProps {
    user: User;
    forms: Form[];
    submissions: FormSubmission[];
    onUpdateForms: (forms: Form[]) => void;
    onUpdateSubmissions: (submissions: FormSubmission[]) => void;
}

export default function FormsModule({
    user,
    forms: initialForms,
    submissions: initialSubmissions,
    onUpdateForms,
    onUpdateSubmissions
}: FormsModuleProps) {
    const [view, setView] = useState<'list' | 'details' | 'submissions'>('list');
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);
    const [forms, setForms] = useState<Form[]>(initialForms);
    const [submissions, setSubmissions] = useState<FormSubmission[]>(initialSubmissions);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setForms(initialForms);
    }, [initialForms]);

    useEffect(() => {
        setSubmissions(initialSubmissions);
    }, [initialSubmissions]);

    const filteredForms = forms.filter(f =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openFormDetails = (form: Form) => {
        setSelectedForm(form);
        setView('details');
    };

    const openSubmissions = (form: Form) => {
        setSelectedForm(form);
        setView('submissions');
    };

    const handleCreateForm = (newForm: Form) => {
        const updatedForms = [newForm, ...forms];
        setForms(updatedForms);
        onUpdateForms(updatedForms);
        setIsCreateModalOpen(false);
        setSelectedForm(newForm);
        setView('details');
    };

    const handleUpdateForm = (formId: string, updates: Partial<Form>) => {
        const updatedForms = forms.map(f =>
            f.id === formId ? {
                ...f,
                ...updates,
                lastUpdated: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                })
            } : f
        );
        setForms(updatedForms);
        onUpdateForms(updatedForms);
        if (selectedForm?.id === formId) {
            setSelectedForm({ ...selectedForm, ...updates });
        }
    };

    const handleDeleteForm = (formId: string) => {
        if (confirm('Are you sure you want to delete this form?')) {
            const updatedForms = forms.filter(f => f.id !== formId);
            setForms(updatedForms);
            onUpdateForms(updatedForms);
            if (selectedForm?.id === formId) {
                setSelectedForm(null);
                setView('list');
            }
        }
    };

    const handleAddField = (formId: string, field: FormField) => {
        const form = forms.find(f => f.id === formId);
        if (form) {
            const updatedForm = {
                ...form,
                fields: [...form.fields, { ...field, id: `fd${Date.now()}` }]
            };
            handleUpdateForm(formId, updatedForm);
        }
    };

    const handleDeleteField = (formId: string, fieldId: string) => {
        const form = forms.find(f => f.id === formId);
        if (form) {
            const updatedForm = {
                ...form,
                fields: form.fields.filter(f => f.id !== fieldId)
            };
            handleUpdateForm(formId, updatedForm);
        }
    };

    const handleToggleFieldVisibility = (formId: string, fieldId: string) => {
        const form = forms.find(f => f.id === formId);
        if (form) {
            const updatedFields = form.fields.map(f =>
                f.id === fieldId ? { ...f, visible: !f.visible } : f
            );
            handleUpdateForm(formId, { fields: updatedFields });
        }
    };

    const handleToggleFormStatus = (formId: string) => {
        const form = forms.find(f => f.id === formId);
        if (form) {
            const newStatus = form.status === 'Active' ? 'Draft' : 'Active';
            handleUpdateForm(formId, { status: newStatus });
        }
    };

    const handleMarkSubmissionRead = (submissionId: string) => {
        const updatedSubmissions = submissions.map(s =>
            s.id === submissionId ? { ...s, isNew: false } : s
        );
        setSubmissions(updatedSubmissions);
        onUpdateSubmissions(updatedSubmissions);
    };

    const handleDeleteSubmission = (submissionId: string) => {
        if (confirm('Are you sure you want to delete this submission?')) {
            const updatedSubmissions = submissions.filter(s => s.id !== submissionId);
            setSubmissions(updatedSubmissions);
            onUpdateSubmissions(updatedSubmissions);
        }
    };

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {view === 'list' && 'Form Architecture'}
                        {view === 'details' && 'Field Configuration'}
                        {view === 'submissions' && 'Submission Stream'}
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                        NODE_HUB: <span className="text-indigo-600">
                            {view === 'list' ? 'SYSTEM_FORMS' : selectedForm?.title.toUpperCase()}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {view !== 'list' && (
                        <button
                            onClick={() => setView('list')}
                            className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">BACK_TO_REGISTRY</span>
                        </button>
                    )}

                    {user.role === UserRole.ADMIN && view === 'list' && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3 uppercase"
                        >
                            <Plus size={16} /> NEW_FORM_NODE
                        </button>
                    )}

                    {view === 'details' && selectedForm && (
                        <button
                            onClick={() => openSubmissions(selectedForm)}
                            className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3 uppercase"
                        >
                            <Users size={16} /> VIEW_DATA
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            {view === 'list' && (
                <FormList
                    forms={filteredForms}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onSelectForm={openFormDetails}
                    onViewSubmissions={openSubmissions}
                    onDeleteForm={handleDeleteForm}
                    userRole={user.role}
                />
            )}

            {view === 'details' && selectedForm && (
                <FormDetails
                    form={selectedForm}
                    onUpdateForm={(updates) => handleUpdateForm(selectedForm.id, updates)}
                    onToggleStatus={() => handleToggleFormStatus(selectedForm.id)}
                    onAddField={(field) => handleAddField(selectedForm.id, field)}
                    onDeleteField={(fieldId) => handleDeleteField(selectedForm.id, fieldId)}
                    onToggleFieldVisibility={(fieldId) => handleToggleFieldVisibility(selectedForm.id, fieldId)}
                    userRole={user.role}
                />
            )}

            {view === 'submissions' && selectedForm && (
                <FormSubmissions
                    form={selectedForm}
                    submissions={submissions.filter(s => s.formId === selectedForm.id)}
                    onMarkRead={handleMarkSubmissionRead}
                    onDeleteSubmission={handleDeleteSubmission}
                />
            )}

            {/* Create Form Modal */}
            <CreateFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateForm}
            />
        </div>
    );
}