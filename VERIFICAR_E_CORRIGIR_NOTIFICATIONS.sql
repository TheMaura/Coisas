-- ============================================
-- VERIFICAR E CORRIGIR TABELA notifications
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- 1. Verificar estrutura atual da tabela
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'notifications'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar se a coluna 'read' existe
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'notifications' 
    AND column_name = 'read'
) AS has_read_column;

-- 3. Verificar se a coluna 'is_read' existe
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'notifications' 
    AND column_name = 'is_read'
) AS has_is_read_column;

-- 4. Se 'read' não existir e 'is_read' também não existir, criar 'is_read'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'notifications' 
      AND column_name = 'is_read'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'notifications' 
      AND column_name = 'read'
  ) THEN
    ALTER TABLE notifications ADD COLUMN is_read BOOLEAN DEFAULT FALSE;
    RAISE NOTICE 'Coluna is_read criada';
  END IF;
END $$;

-- 5. Se 'read' existir mas 'is_read' não existir, criar 'is_read' e copiar valores
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'notifications' 
      AND column_name = 'read'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'notifications' 
      AND column_name = 'is_read'
  ) THEN
    ALTER TABLE notifications ADD COLUMN is_read BOOLEAN DEFAULT FALSE;
    UPDATE notifications SET is_read = read WHERE read IS NOT NULL;
    RAISE NOTICE 'Coluna is_read criada e valores copiados de read';
  END IF;
END $$;

-- 6. Permitir user_id NULL para notificações gerais
ALTER TABLE notifications ALTER COLUMN user_id DROP NOT NULL;

-- 7. Adicionar coluna legend_id se não existir
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS legend_id UUID REFERENCES legends(id) ON DELETE SET NULL;

-- 8. Verificar estrutura final
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'notifications'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================
-- FIM
-- ============================================

