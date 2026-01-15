-- ============================================
-- CORRIGIR POLÍTICAS RLS PARA notifications
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Remover políticas antigas
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Users can view general notifications" ON notifications;

-- Política para usuários verem suas próprias notificações
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Política para usuários verem notificações gerais (sem user_id)
CREATE POLICY "Users can view general notifications" ON notifications
  FOR SELECT USING (user_id IS NULL);

-- Política para usuários atualizarem suas próprias notificações
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para admins inserirem notificações
-- NOTA: Se não houver coluna is_admin, remova ou ajuste esta política
-- Alternativa: permitir que qualquer usuário autenticado insira (menos seguro)
CREATE POLICY "Authenticated users can insert notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar políticas criadas
SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'notifications'
ORDER BY policyname;

-- Testar visualização (substitua 'USER_ID_AQUI' pelo ID de um usuário)
-- SELECT * FROM notifications WHERE user_id = 'USER_ID_AQUI' OR user_id IS NULL;

-- ============================================
-- FIM
-- ============================================

