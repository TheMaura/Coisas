-- ============================================
-- LIMPAR NOTIFICAÇÕES COM MAIS DE 24 HORAS
-- Execute este SQL periodicamente ou configure como função agendada
-- ============================================

-- Opção 1: Deletar notificações com mais de 24 horas
DELETE FROM notifications
WHERE created_at < NOW() - INTERVAL '24 hours';

-- Opção 2: Criar uma função para limpar notificações antigas
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
  DELETE FROM notifications
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Opção 3: Criar um trigger que limpa automaticamente (mais complexo)
-- Nota: Isso pode ser pesado para o banco, use com cuidado

-- ============================================
-- EXECUTAR LIMPEZA MANUALMENTE
-- ============================================
-- SELECT cleanup_old_notifications();

-- ============================================
-- VERIFICAR NOTIFICAÇÕES ANTIGAS ANTES DE DELETAR
-- ============================================
-- SELECT 
--   id, 
--   title, 
--   created_at, 
--   NOW() - created_at AS age,
--   EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 AS hours_old
-- FROM notifications
-- WHERE created_at < NOW() - INTERVAL '24 hours'
-- ORDER BY created_at DESC;

