import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Adapter de storage que funciona em todas as plataformas
let storageAdapter: any;

if (Platform.OS === 'web') {
  // Para web, usar localStorage
  storageAdapter = {
    getItem: async (key: string) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return null;
    },
    setItem: async (key: string, value: string) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    },
    removeItem: async (key: string) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    },
  };
} else {
  // Para mobile, usar AsyncStorage (mais confiável que SecureStore para Supabase)
  storageAdapter = {
    getItem: async (key: string) => {
      try {
        return await AsyncStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from storage:', error);
        return null;
      }
    },
    setItem: async (key: string, value: string) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting item in storage:', error);
      }
    },
    removeItem: async (key: string) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from storage:', error);
      }
    },
  };
}

// Credenciais do Supabase - projeto existente
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://lrkqhubivgozjkcdbisg.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxya3FodWJpdmdvemprY2RiaXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNDE0NTksImV4cCI6MjA4MjcxNzQ1OX0.xQxrTGAp3Vod_lvnYwbPdFcmX2iyN7patNQ1OjWEAPU';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce', // Usar PKCE flow para melhor segurança
  },
});

