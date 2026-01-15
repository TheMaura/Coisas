-- ============================================
-- CRIAR TABELA notification_tokens (VERSÃO FINAL)
-- Execute este SQL no Supabase SQL Editor
-- Esta versão NÃO depende de colunas de admin
-- ============================================

-- Tabela para armazenar tokens de notificação push
CREATE TABLE IF NOT EXISTS notification_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Índice para busca rápida por token
CREATE INDEX IF NOT EXISTS idx_notification_tokens_user_id ON notification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_tokens_token ON notification_tokens(token);

-- RLS para notification_tokens
ALTER TABLE notification_tokens ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem (para evitar erros de duplicação)
DROP POLICY IF EXISTS "Users can view own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Users can insert own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Users can update own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Users can delete own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Admins can view all tokens" ON notification_tokens;

-- Usuários podem ver e gerenciar apenas seus próprios tokens
CREATE POLICY "Users can view own tokens" ON notification_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" ON notification_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" ON notification_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens" ON notification_tokens
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se a tabela foi criada
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'notification_tokens'
ORDER BY ordinal_position;

-- Verificar se as políticas foram criadas
SELECT
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'notification_tokens';

-- ============================================
-- FIM
-- ============================================

