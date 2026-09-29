
export enum UserRole {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
    RESIDENT = 'RESIDENT',
    PROVIDER = 'PROVIDER'
}

export interface User {
    id: string;
    name: string;
    role: UserRole;
    apartment?: string;
    email?: string;
    phone?: string;
    createdAt?: string;
    lastLogin?: string;
}
export type AnnouncementType = 'ALERT' | 'INFO' | 'EVENT' | 'MAINTENANCE';
export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';

export type ComplaintStatus = 'Open' | 'In-Progress' | 'Resolved';
export type ComplaintCategory = 'Maintenance' | 'Security' | 'Infrastructure' | 'Hygiene' | 'Other';

export interface Complaint {
    id: string;
    title: string;
    category: ComplaintCategory;
    status: ComplaintStatus;
    residentId: string;
    priority: PriorityLevel;
    date: string;
    description?: string;
    assignedTo?: string;
    location?: string;
}

export interface HistoryItem {
    id: string;
    action: string;
    date: string;
    actor: string;
}

export interface CreateComplaintData {
    title: string;
    category: ComplaintCategory;
    priority: PriorityLevel;
    location: string;
    description: string;
}

export type FilterType = 'ALL' | AnnouncementType;

export interface Announcement {
    id: string;
    type: AnnouncementType;
    priority: PriorityLevel;
    title: string;
    content: string;
    date: string;
    author: string;
    readCount: number;
}

export interface CreateAnnouncementData {
    title: string;
    content: string;
    type: AnnouncementType;
    priority: PriorityLevel;
}

export interface Resident {
    id: string;
    name: string;
    apartment: string;
    phone: string;
    status: 'Active' | 'Pending' | 'Inactive';
}

export interface ResidentFormData {
    name: string;
    email: string;
    phone: string;
    apartment: string;
    occupation?: string;
    vehicleRegistration?: string;
    emergencyContact?: string;
    residentType?: string;
    remarks?: string;
}


export interface MarketingCampaign {
    id: string;
    businessName: string;
    title: string;
    description: string;
    type: 'Banner' | 'Popup' | 'Sponsored Event' | 'Discount';
    status: 'Active' | 'Pending' | 'Expired' | 'Rejected' | 'Completed';
    startDate: string;
    endDate: string;
    fee: number;
    image: string;
    reach: number;
    engagement: number;
}
export interface CreateCampaignData {
    businessName: string;
    title: string;
    description: string;
    type: 'Discount' | 'Banner' | 'Sponsored Event' | 'Popup_Alert';
    startDate: string;
    endDate: string;
    fee: number;
    image?: string;
}


export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';

export interface FormField {
    id: string;
    label: string;
    type: FieldType;
    options?: string[];
    required: boolean;
    visible: boolean;
    placeholder?: string;
    defaultValue?: string;
    order?: number;
}

export interface Form {
    id: string;
    title: string;
    description: string;
    status: 'Active' | 'Draft' | 'Archived';
    fields: FormField[];
    totalSubmissions: number;
    newSubmissions: number;
    createdDate: string;
    lastUpdated?: string;
    createdBy?: string;
    tags?: string[];
}

export interface FormSubmission {
    id: string;
    formId: string;
    data: Record<string, any>;
    submittedBy: string;
    submittedAt: string;
    isNew: boolean;
    status?: 'Pending' | 'Approved' | 'Rejected';
}

export type ServiceCategoryType =
    | 'Plumbing'
    | 'Electrical'
    | 'Maintenance'
    | 'Security'
    | 'Cleaning'
    | 'Salon'
    | 'HVAC'
    | 'Carpentry'
    | 'Painting'
    | 'Pest Control'
    | 'Appliance Repair'
    | 'Moving';

export type ProviderStatus = 'Verified' | 'Pending' | 'Suspended';

export interface ServiceCategory {
    id: string;
    name: ServiceCategoryType;
    icon: string; // Icon name from lucide-react
    providers: number;
    description?: string;
    avgRating?: number;
    colorScheme?: string;
}

export interface ServiceProvider {
    id: string;
    name: string;
    businessName: string;
    category: ServiceCategoryType[];
    rating: number;
    reviews: number;
    tags: string[];
    image?: string;
    avatar?: string;
    phone: string;
    email: string;
    address?: string;
    serviceAreas: string[]; // Block/Tower numbers
    description: string;
    yearsOfExperience: number;
    verified: boolean;
    status: ProviderStatus;
    availableToday: boolean;
    availability: {
        monday?: boolean;
        tuesday?: boolean;
        wednesday?: boolean;
        thursday?: boolean;
        friday?: boolean;
        saturday?: boolean;
        sunday?: boolean;
    };
    priceRange: '$' | '$$' | '$$$' | '$$$$';
    basePrice?: number;
    insurance: boolean;
    warranty: boolean;
    emergencyService: boolean;
    memberSince: string;
    featured: boolean;
    responseTime: string; // e.g., "< 30 min"
    completedJobs: number;
}

export interface ServiceBooking {
    id: string;
    providerId: string;
    residentId: string;
    serviceType: ServiceCategoryType;
    description: string;
    scheduledDate: string;
    scheduledTime: string;
    status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rescheduled';
    price: number;
    duration: string; // e.g., "2 hours"
    location: string;
    residentName: string;
    residentPhone: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    rating?: number;
    review?: string;
    completedAt?: string;
}

export interface ServiceReview {
    id: string;
    bookingId: string;
    providerId: string;
    residentId: string;
    residentName: string;
    residentUnit: string;
    rating: number;
    comment: string;
    images?: string[];
    tags?: string[];
    createdAt: string;
    helpful: number;
    verified: boolean;
}


export interface ProviderRegistrationDTO {
    businessName: string;
    ownerName: string;
    category: ServiceCategoryType[];
    phone: string;
    email: string;
    description: string;
    yearsOfExperience: number;
    serviceAreas: string[];
    licenseNumber?: string;
    insuranceDocument?: File;
    taxId?: string;
    emergencyService: boolean;
    priceRange: '$' | '$$' | '$$$' | '$$$$';
}

export interface ServiceBookingDTO {
    providerId: string;
    serviceType: ServiceCategoryType;
    description: string;
    scheduledDate: string;
    scheduledTime: string;
    location: string;
    residentName: string;
    residentPhone: string;
    notes?: string;
}

export interface ServiceStatistics {
    totalProviders: number;
    verifiedProviders: number;
    pendingProviders: number;
    totalBookings: number;
    completedBookings: number;
    averageRating: number;
    topCategories: {
        category: ServiceCategoryType;
        count: number;
    }[];
    emergencyJobsToday: number;
    satisfactionRate: number;
}

export type BillStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Pending' | 'Processing';



export interface Bill {
    id: string;
    residentId: string;
    amount: number;
    month: string;
    type: BillType;
    status: BillStatus;
    dueDate?: string;
    generatedDate?: string;
    paidDate?: string;
    lateFee?: number;
    discount?: number;
    totalAmount?: number;
    paymentMethod?: PaymentMethod;
    transactionId?: string;
    notes?: string;
    autoPayEnabled?: boolean;
}
export interface Transaction {
    id: string;
    billId: string;
    residentId: string;
    amount: number;
    date: string;
    method: PaymentMethod;
    status: TransactionStatus;
    lastFour?: string;
    cardType?: string;
    bankName?: string;
    checkNumber?: string;
    receiptUrl?: string;
    reference: string;
}

export interface SavedPaymentMethod {
    id: string;
    residentId: string;
    type: PaymentMethod;
    name: string;
    lastFour: string;
    expiryDate?: string;
    brand?: string;
    isDefault: boolean;
    billingAddress?: string;
    addedDate: string;
}

export interface BillingSummary {
    totalOutstanding: number;
    paidThisMonth: number;
    paidLastMonth: number;
    unpaidCount: number;
    overdueCount: number;
    paidOnTime: number;
    averageMonthlyBill: number;
    autoPayEnabled: number;
    totalSavings: number;
    paymentTrend: number;
}

export interface PaymentRequestDTO {

    billId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    savedPaymentMethodId?: string;
    cardDetails?: {
        cardNumber: string;
        expiryDate: string;
        cvv: string;
        cardholderName: string;
    };
    enableAutoPay?: boolean;
}

export interface PaymentResponseDTO {
    transactionId: string;
    status: TransactionStatus;
    amount: number;
    processedAt: string;
    receiptUrl: string;
    reference: string;
    errorMessage?: string;
}
export interface AutoPaySettings {
    residentId: string;
    enabled: boolean;
    paymentMethodId: string;
    billTypes: BillType[];
    paymentDay: number;
    maxAmount?: number;
    emailNotifications: boolean;
    lastPaymentDate?: string;
    nextPaymentDate?: string;
}
export type BillType =
    | 'Maintenance'
    | 'Water'
    | 'Electricity'
    | 'Gas'
    | 'Internet'
    | 'Trash'
    | 'Security'
    | 'Amenity'
    | 'Parking'
    | 'Special Assessment';
export type PaymentMethod =
    | 'Credit Card'
    | 'Debit Card'
    | 'Bank Transfer'
    | 'Cash'
    | 'Check'
    | 'Auto-Pay'
    | string;
export type TransactionStatus = 'Success' | 'Failed' | 'Pending' | 'Refunded';


export interface BookingResource {
    id: string;
    name: string;
    category: 'Sport' | 'Event' | 'Utility' | 'Leisure';
    price: string;
    location: string;
    description: string;
    rules: string[];
    image: string;
    status: 'Available' | 'Maintenance' | 'Full';
}

export interface FacilityBooking {
    id: string;
    resourceId: string;
    resourceName: string;
    date: string;
    timeSlot: string;
    residentId: string;
    residentName: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
    amount?: number;
}

export interface CommunityEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    category: 'Social' | 'General' | 'Festival';
}

export interface Community {
    id: string;
    name: string;
    location: string;
    residentCount: number;
    staffCount: number;
    status: 'Active' | 'Under Maintenance';
    description: string;
    establishedDate: string;
    image: string;
    category?: string;
    missionStatement?: string;
    accessProtocol?: string;
    primaryOrganizer?: string;
}



export type AuthState = 'splash' | 'login' | 'forgot' | 'reset' | 'success' | 'register';


export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}


export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirm {
    email: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
}

export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    apartment?: string;
    phone?: string;
    role?: 'resident' | 'staff' | 'admin';
}


export interface AuthResponse {
    success: boolean;
    token?: string;
    refreshToken?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        apartment?: string;
    };
    message?: string;
    errors?: Record<string, string[]>;
}


export interface AuthError {
    field?: string;
    message: string;
    code?: string;
}


export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';


export interface PasswordCriteria {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumbers: boolean;
    hasSpecialChar: boolean;
}