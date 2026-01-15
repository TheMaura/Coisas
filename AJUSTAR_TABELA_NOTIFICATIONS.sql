-- ============================================
-- AJUSTAR TABELA notifications
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- 1. Verificar estrutura atual
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;

-- 2. Permitir user_id NULL para notificações gerais (visíveis para todos)
ALTER TABLE notifications ALTER COLUMN user_id DROP NOT NULL;

-- 3. Adicionar coluna legend_id se não existir
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS legend_id UUID REFERENCES legends(id) ON DELETE SET NULL;

-- 4. Renomear coluna 'read' para 'is_read' (opcional, para consistência)
-- Se preferir manter 'read', pule este passo
-- ALTER TABLE notifications RENAME COLUMN read TO is_read;

-- 5. Adicionar coluna is_read se não existir (para compatibilidade)
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- 6. Sincronizar valores: se read=true, então is_read=true
UPDATE notifications 
SET is_read = read 
WHERE is_read IS NULL AND read IS NOT NULL;

-- 7. Verificar estrutura final
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;

-- 8. Verificar dados existentes
SELECT 
  id,
  user_id,
  title,
  message,
  read,
  is_read,
  legend_id,
  created_at
FROM notifications
ORDER BY created_at DESC
LIMIT 10;

-- ============================================
-- FIM
-- ============================================

