-- ============================================
-- CORRIGIR POLÍTICAS RLS PARA profiles E notifications
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CORRIGIR POLÍTICAS DE profiles
-- ============================================

-- Remover políticas antigas de profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON profiles;

-- Usuários podem ver seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins podem ver todos os perfis
-- NOTA: Se não houver coluna is_admin, ajuste ou remova esta política
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    -- Permitir se for admin OU se for o próprio perfil
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() 
      AND (
        -- Verificar se existe coluna is_admin e se é TRUE
        (SELECT COUNT(*) FROM information_schema.columns 
         WHERE table_schema = 'public' 
         AND table_name = 'profiles' 
         AND column_name = 'is_admin') > 0
        AND (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
      )
    )
  );

-- Alternativa mais simples: permitir que qualquer usuário autenticado veja todos os perfis
-- Descomente se a política acima não funcionar
-- CREATE POLICY "Authenticated users can view all profiles" ON profiles
--   FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admins podem atualizar todos os perfis
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() 
      AND (
        (SELECT COUNT(*) FROM information_schema.columns 
         WHERE table_schema = 'public' 
         AND table_name = 'profiles' 
         AND column_name = 'is_admin') > 0
        AND (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
      )
    )
  );

-- Admins podem deletar perfis (exceto o próprio)
CREATE POLICY "Admins can delete profiles" ON profiles
  FOR DELETE USING (
    auth.uid() != id AND
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() 
      AND (
        (SELECT COUNT(*) FROM information_schema.columns 
         WHERE table_schema = 'public' 
         AND table_name = 'profiles' 
         AND column_name = 'is_admin') > 0
        AND (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
      )
    )
  );

-- ============================================
-- 2. CORRIGIR POLÍTICAS DE notifications
-- ============================================

-- Remover políticas antigas de notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can view general notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can insert notifications" ON notifications;

-- Usuários podem ver suas próprias notificações
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem ver notificações gerais (sem user_id)
CREATE POLICY "Users can view general notifications" ON notifications
  FOR SELECT USING (user_id IS NULL);

-- Usuários podem atualizar suas próprias notificações
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Qualquer usuário autenticado pode inserir notificações
-- (Isso permite que o admin envie notificações)
CREATE POLICY "Authenticated users can insert notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- 3. VERIFICAÇÃO
-- ============================================

-- Verificar políticas de profiles
SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'profiles'
ORDER BY policyname;

-- Verificar políticas de notifications
SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'notifications'
ORDER BY policyname;

-- ============================================
-- FIM
-- ============================================

