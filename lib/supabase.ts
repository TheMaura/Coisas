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
// IMPORTANTE: No build do APK, as variáveis de ambiente devem estar no eas.json
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://lrkqhubivgozjkcdbisg.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxya3FodWJpdmdvemprY2RiaXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNDE0NTksImV4cCI6MjA4MjcxNzQ1OX0.xQxrTGAp3Vod_lvnYwbPdFcmX2iyN7patNQ1OjWEAPU';

// Log para debug (remover em produção se necessário)
if (__DEV__) {
  console.log('🔧 Supabase Config:', {
    url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
    hasKey: !!supabaseAnonKey,
    envUrl: !!process.env.EXPO_PUBLIC_SUPABASE_URL,
    envKey: !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('URL:', supabaseUrl ? 'OK' : 'MISSING');
  console.error('Key:', supabaseAnonKey ? 'OK' : 'MISSING');
  throw new Error('Missing Supabase environment variables. Verifique se as variáveis estão configuradas no eas.json para o build.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce', // Usar PKCE flow para melhor segurança
  },
  // Configurações globais do cliente
  global: {
    headers: {
      'x-client-info': 'futebol-legends',
    },
  },
  // Configurações de realtime (se necessário)
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Função para verificar a conexão com o Supabase
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Tentar uma query simples
    const { data, error } = await supabase
      .from('legends')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Erro ao conectar com Supabase:', error);
      // Se for erro de rede, retornar false
      if (error.message?.includes('Network request failed') || 
          error.message?.includes('Failed to fetch')) {
        return false;
      }
      // Outros erros podem ser aceitáveis (ex: tabela não existe)
      return true; // Se chegou aqui, a conexão funcionou
    }
    return true;
  } catch (error: any) {
    console.error('Erro de conexão com Supabase:', error);
    // Verificar se é erro de rede
    if (error.message?.includes('Network request failed') || 
        error.message?.includes('Failed to fetch') ||
        error.name === 'TypeError') {
      return false;
    }
    return false;
  }
};

// Log das configurações em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase configurado com sucesso');
}

