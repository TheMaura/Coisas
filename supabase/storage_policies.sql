-- Políticas de Storage para permitir upload de imagens
-- Execute este SQL no Supabase SQL Editor

-- IMPORTANTE: Certifique-se de que o bucket 'media' existe e é público
-- Se não existir, crie em Storage > New bucket > Nome: media > Public: true

-- Política para permitir upload para usuários autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Política para permitir leitura pública de mídias
CREATE POLICY IF NOT EXISTS "Public can view media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Política para permitir que usuários autenticados gerenciem mídias
-- Esta política permite upload, update e delete para qualquer usuário autenticado
CREATE POLICY IF NOT EXISTS "Authenticated users can manage media"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- Se as políticas acima não funcionarem, você pode temporariamente desabilitar RLS:
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
-- Mas isso não é recomendado para produção!
