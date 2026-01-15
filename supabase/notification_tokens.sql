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

-- Usuários podem ver e gerenciar apenas seus próprios tokens
CREATE POLICY "Users can view own tokens" ON notification_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" ON notification_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" ON notification_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens" ON notification_tokens
  FOR DELETE USING (auth.uid() = user_id);

-- Admins podem ver todos os tokens
-- NOTA: Ajuste conforme a estrutura da sua tabela profiles
-- Se não houver coluna is_admin, remova ou ajuste esta política
CREATE POLICY "Admins can view all tokens" ON notification_tokens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() 
      AND (
        (SELECT column_name FROM information_schema.columns 
         WHERE table_name = 'profiles' AND column_name = 'is_admin') IS NOT NULL
        AND (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
      )
    )
  );

