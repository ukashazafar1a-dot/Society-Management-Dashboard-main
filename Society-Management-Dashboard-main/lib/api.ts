import axios from 'axios';

const AUTH_STORAGE_KEY = 'sms_auth_tokens';
const DEFAULT_API_BASE_URL = 'https://api-sms.rfdevelopers.com';

const getApiBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  // Always use the local proxy in browser context
  if (typeof window !== 'undefined') {
    return '/api';
  }

  return 'https://api-sms.rfdevelopers.com';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function readStoredAuth() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAuth(token: string | null, refreshToken: string | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!token && !refreshToken) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  const auth = readStoredAuth() ?? {};
  const next = {
    ...auth,
    token: token ?? auth.token ?? null,
    refreshToken: refreshToken ?? auth.refreshToken ?? null,
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
}

export function setAuthTokens(token: string | null, refreshToken: string | null) {
  writeStoredAuth(token, refreshToken);

  if (typeof window !== 'undefined' && token) {
    document.cookie = `token=${token}; path=/; SameSite=Lax`;
  }

  if (typeof window !== 'undefined' && refreshToken) {
    document.cookie = `refreshToken=${refreshToken}; path=/; SameSite=Lax`;
  }
}

export function clearAuthTokens() {
  writeStoredAuth(null, null);

  if (typeof window !== 'undefined') {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export function getStoredToken() {
  return readStoredAuth()?.token ?? null;
}

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthTokens();
    }
    return Promise.reject(error);
  }
);

export function unwrapApiResponse<T>(payload: any): T {
  if (!payload || typeof payload !== 'object') {
    return payload as T;
  }

  if (payload.succeeded === false) {
    const error: any = new Error(
      Array.isArray(payload.messages) ? payload.messages[0] : payload.message || 'Request failed'
    );
    error.messages = payload.messages;
    error.response = { data: payload };
    throw error;
  }

  if ('data' in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export const authService = {
  async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
    const response = await api.post('/Auth/login', credentials);
    return unwrapApiResponse<{
      token?: string;
      refreshToken?: string;
      [key: string]: any;
    }>(response.data);
  },
};

export const dashboardService = {
  async get(params?: Record<string, unknown>) {
    const response = await api.get('/Dashboard' , { params: { currentDate: new Date().toISOString(), ...params } });
    return unwrapApiResponse<any>(response.data);
  },
};

export const residentService = {
  async list(params?: Record<string, unknown>) {
    const normalizedParams = {
      type: 'resident',
      filter: 'all',
      ...params,
    };

    const response = await api.get('/Residents', { params: normalizedParams });
    return unwrapApiResponse<any>(response.data);
  },
  async create(payload: Record<string, unknown>) {
    const response = await api.post('/Residents', payload);
    return unwrapApiResponse<any>(response.data);
  },
  async update(id: number | string, payload: Record<string, unknown>) {
    const response = await api.put(`/Residents/${id}/Edit`, payload);
    return unwrapApiResponse<any>(response.data);
  },
};

export const announcementService = {
  async list(params?: Record<string, unknown>) {
    const response = await api.get('/Announcements', { params });
    return unwrapApiResponse<any>(response.data);
  },
  async create(payload: Record<string, unknown>) {
    const response = await api.post('/Announcements', payload);
    return unwrapApiResponse<any>(response.data);
  },
  async update(id: number | string, payload: Record<string, unknown>) {
    const response = await api.put(`/Announcements/${id}`, payload);
    return unwrapApiResponse<any>(response.data);
  },
  async remove(id: number | string) {
    const response = await api.delete(`/Announcements/${id}`);
    return unwrapApiResponse<any>(response.data);
  },
};

export const complaintService = {
  async list(params?: Record<string, unknown>) {
    const response = await api.get('/Complaints', { params });
    return unwrapApiResponse<any>(response.data);
  },
  async create(payload: Record<string, unknown>) {
    const response = await api.post('/Complaints', payload);
    return unwrapApiResponse<any>(response.data);
  },
  async updateStatus(id: number | string, payload: Record<string, unknown>) {
    const response = await api.put(`/Complaints/${id}/status`, payload);
    return unwrapApiResponse<any>(response.data);
  },
};

export const marketingService = {
  async list(params?: Record<string, unknown>) {
    const response = await api.get('/Marketing', { params });
    return unwrapApiResponse<any>(response.data);
  },
  async create(payload: Record<string, unknown>) {
    const response = await api.post('/Marketing', payload);
    return unwrapApiResponse<any>(response.data);
  },
  async approve(id: number | string) {
    const response = await api.post(`/Marketing/${id}/approve`);
    return unwrapApiResponse<any>(response.data);
  },
  async remove(id: number | string) {
    const response = await api.delete(`/Marketing/${id}`);
    return unwrapApiResponse<any>(response.data);
  },
};

export const formService = {
  async list(params?: Record<string, unknown>) {
    const response = await api.get('/Forms', { params });
    return unwrapApiResponse<any>(response.data);
  },
  async create(payload: Record<string, unknown>) {
    const response = await api.post('/Forms', payload);
    return unwrapApiResponse<any>(response.data);
  },
};

export const bookingService = {
  async list(params?: Record<string, unknown>) {
    const response = await api.get('/Bookings', { params });
    return unwrapApiResponse<any>(response.data);
  },
  async reservations(params?: Record<string, unknown>) {
    const response = await api.get('/Bookings/reservations', { params });
    return unwrapApiResponse<any>(response.data);
  },
};

export const serviceService = {
  async terminal() {
    const response = await api.get('/Services/terminal');
    return unwrapApiResponse<any>(response.data);
  },
  async onboard(payload: Record<string, unknown>) {
    const response = await api.post('/Services/onboard', payload);
    return unwrapApiResponse<any>(response.data);
  },
};

export const communityService = {
  async list(params?: Record<string, unknown>) {
    const response = await api.get('/Communities', { params });
    return unwrapApiResponse<any>(response.data);
  },
};

export default api;
