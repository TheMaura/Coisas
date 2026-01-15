-- ============================================
-- ADICIONAR COLUNAS FALTANTES NA TABELA PROFILES
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Adicionar coluna bio (biografia do usuário)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Adicionar coluna full_name (nome completo)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Adicionar coluna favorite_legend_id (ID da lenda favorita)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS favorite_legend_id UUID REFERENCES legends(id);

-- Adicionar coluna stats (estatísticas do usuário em formato JSON)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{"favorites_count": 0, "stories_read": 0}'::jsonb;

-- Adicionar coluna preferences (preferências do usuário em formato JSON)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"notifications_enabled": true, "theme": "dark"}'::jsonb;

-- Adicionar coluna website (site pessoal)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website TEXT;

-- Adicionar coluna social_links (links sociais em formato JSON)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se as colunas foram criadas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profiles'
  AND column_name IN ('bio', 'full_name', 'favorite_legend_id', 'stats', 'preferences', 'website', 'social_links')
ORDER BY column_name;

-- ============================================
-- FIM
-- ============================================

