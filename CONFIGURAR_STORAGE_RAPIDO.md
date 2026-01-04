# ⚡ Configuração Rápida do Storage

## 🎯 Passo a Passo Visual

### 1️⃣ Criar Bucket `media`

1. Acesse: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets
2. Clique no botão **"New bucket"** (canto superior direito)
3. Preencha:
   - **Name**: `media`
   - ✅ **Public bucket**: Marque esta opção
4. Clique em **"Create bucket"**

### 2️⃣ Aplicar Políticas SQL

1. Acesse: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/sql/new
2. Cole o seguinte SQL:

```sql
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
CREATE POLICY IF NOT EXISTS "Authenticated users can manage media"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');
```

3. Clique em **"Run"** (ou pressione Ctrl+Enter)

### 3️⃣ Verificar

1. Vá para: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets/media/policies
2. Você deve ver 3 políticas criadas:
   - ✅ Authenticated users can upload media
   - ✅ Public can view media
   - ✅ Authenticated users can manage media

## ✅ Pronto!

Agora o upload de imagens deve funcionar!

**Teste:**
- Vá para Admin → Nova Lenda
- Toque em "Selecionar Imagem"
- Escolha uma foto
- O upload deve funcionar! 🎉

## 🔗 Links Diretos

- **Criar Bucket**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets
- **SQL Editor**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/sql/new
- **Ver Políticas**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets/media/policies

