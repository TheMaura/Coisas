-- ============================================
-- CONFIGURAÇÃO COMPLETA DO STORAGE
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- PASSO 1: Criar bucket 'media' (se não existir)
-- Nota: Buckets precisam ser criados manualmente no Dashboard
-- Vá para: Storage > New bucket > Nome: media > Public: true

-- PASSO 2: Remover políticas antigas (se existirem) e criar novas

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can manage media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own media" ON storage.objects;

-- Política para permitir upload para usuários autenticados
CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Política para permitir leitura pública de mídias
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Política para permitir que usuários autenticados gerenciem mídias
CREATE POLICY "Authenticated users can manage media"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar se as políticas foram criadas
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%media%';

-- ============================================
-- FIM
-- ============================================
