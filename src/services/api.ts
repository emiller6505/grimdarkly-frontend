import axios from 'axios';
import type {
  ApiResponse,
  SearchResponse,
  Unit,
  Weapon,
  Faction,
  UnitSearchParams,
  WeaponSearchParams,
} from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Faction API calls
export const factionApi = {
  getAll: async (): Promise<ApiResponse<Faction[]>> => {
    const response = await api.get('/factions');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Faction>> => {
    const response = await api.get(`/factions/${id}`);
    return response.data;
  },
};

// Unit API calls
export const unitApi = {
  search: async (params: UnitSearchParams): Promise<SearchResponse<Unit>> => {
    const response = await api.get('/units/search', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Unit>> => {
    const response = await api.get(`/units/${id}`);
    return response.data;
  },

  getByName: async (name: string): Promise<ApiResponse<Unit>> => {
    const response = await api.get(`/units/name/${encodeURIComponent(name)}`);
    return response.data;
  },
};

// Weapon API calls
export const weaponApi = {
  search: async (params: WeaponSearchParams): Promise<SearchResponse<Weapon>> => {
    const response = await api.get('/weapons/search', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Weapon>> => {
    const response = await api.get(`/weapons/${id}`);
    return response.data;
  },

  getByName: async (name: string): Promise<ApiResponse<Weapon>> => {
    const response = await api.get(`/weapons/name/${encodeURIComponent(name)}`);
    return response.data;
  },
};

export default api;
