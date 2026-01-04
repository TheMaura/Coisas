import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

interface AuthContextType {
  session: Session | null;
  user: SupabaseUser | null;
  profile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<{ requiresEmailVerification?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Ouvir mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Usar maybeSingle() ao invés de single() para não dar erro se não existir

      if (error) {
        // Se for erro de perfil não encontrado, criar um perfil básico
        if (error.code === 'PGRST116' || error.message.includes('0 rows')) {
          console.log('Profile not found, creating new profile for user:', userId);
          await createProfile(userId);
          // Tentar buscar novamente após criar
          const { data: newData, error: newError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
          
          if (newError) {
            console.error('Error fetching newly created profile:', newError);
            setProfile(null);
          } else {
            setProfile(newData as User | null);
          }
        } else {
          throw error;
        }
      } else {
        // Se não encontrou perfil, criar um
        if (!data) {
          console.log('Profile not found, creating new profile for user:', userId);
          await createProfile(userId);
          // Tentar buscar novamente após criar
          const { data: newData, error: newError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
          
          if (newError) {
            console.error('Error fetching newly created profile:', newError);
            setProfile(null);
          } else {
            setProfile(newData as User | null);
          }
        } else {
          setProfile(data as User);
        }
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      // Se não conseguir criar o perfil, definir como null mas não bloquear o app
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        // Se já existe, não é um erro crítico
        if (error.code !== '23505') { // 23505 = unique_violation
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // Melhorar mensagens de erro
      let errorMessage = error.message;
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
        errorMessage = 'Por favor, verifique seu email antes de fazer login. Verifique sua caixa de entrada e spam.';
      } else if (error.status === 400) {
        errorMessage = 'Dados inválidos. Verifique seu email e senha';
      }
      
      const customError = new Error(errorMessage);
      (customError as any).originalError = error;
      throw customError;
    }
    
    // Aguardar um pouco para garantir que a sessão está estabelecida
    if (data.session) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || null,
        },
        emailRedirectTo: undefined, // Não usar redirect para mobile
      },
    });
    
    if (error) {
      let errorMessage = error.message;
      
      if (error.message.includes('User already registered')) {
        errorMessage = 'Este email já está cadastrado. Faça login ou recupere sua senha';
      } else if (error.status === 400) {
        errorMessage = 'Dados inválidos. Verifique seu email e senha (mínimo 6 caracteres)';
      }
      
      const customError = new Error(errorMessage);
      (customError as any).originalError = error;
      throw customError;
    }

    // O perfil é criado automaticamente pelo trigger no Supabase
    // Apenas atualizamos o nome se fornecido
    if (data.user && name) {
      // Aguardar um pouco para o trigger criar o perfil
      setTimeout(async () => {
        try {
          await supabase
            .from('profiles')
            .update({ full_name: name })
            .eq('id', data.user!.id);
        } catch (err) {
          console.error('Error updating profile name:', err);
        }
      }, 500);
    }
    
    // Se o email precisa ser verificado, retornar informação
    if (data.user && !data.session) {
      return { requiresEmailVerification: true };
    }
    
    return { requiresEmailVerification: false };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'futebol-legends://reset-password',
    });
    if (error) throw error;
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    // Converter 'name' para 'full_name' se necessário
    const updateData: any = { ...data };
    if (updateData.name !== undefined) {
      updateData.full_name = updateData.name;
      delete updateData.name;
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id);

    if (error) throw error;
    fetchProfile(user.id);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

