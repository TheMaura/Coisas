-- ============================================
-- CORRIGIR POLÍTICAS RLS (VERSÃO SIMPLES)
-- Execute este SQL no Supabase SQL Editor
-- Esta versão permite que qualquer usuário autenticado veja todos os perfis
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
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON profiles;

-- Usuários autenticados podem ver todos os perfis
CREATE POLICY "Authenticated users can view all profiles" ON profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Usuários autenticados podem atualizar qualquer perfil
-- (Isso permite que admins gerenciem usuários)
-- Se quiser mais segurança, remova esta política e use apenas a de cima
CREATE POLICY "Authenticated users can update profiles" ON profiles
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Usuários autenticados podem deletar perfis (exceto o próprio)
CREATE POLICY "Authenticated users can delete profiles" ON profiles
  FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() != id);

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
CREATE POLICY "Authenticated users can insert notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- 3. VERIFICAÇÃO
-- ============================================

-- Verificar políticas de profiles
SELECT
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'profiles'
ORDER BY policyname;

-- Verificar políticas de notifications
SELECT
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'notifications'
ORDER BY policyname;

-- ============================================
-- FIM
-- ============================================

