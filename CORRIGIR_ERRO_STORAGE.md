# 🔧 Corrigir Erro de Upload: Row Level Security Policy

## ❌ Erro Encontrado

```
StorageApiError: new row violates row-level security policy
```

Este erro ocorre porque o Supabase Storage tem Row Level Security (RLS) habilitado, mas não há políticas que permitam upload.

## ✅ Solução Rápida

### Passo 1: Criar Bucket (se não existir)

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard
2. Vá para o projeto: `lrkqhubivgozjkcdbisg`
3. Navegue até **Storage**
4. Se o bucket `media` não existir:
   - Clique em **New bucket**
   - Nome: `media`
   - ✅ Marque como **Public bucket**
   - Clique em **Create bucket**

### Passo 2: Aplicar Políticas SQL

1. No Supabase Dashboard, vá para **SQL Editor**
2. Cole e execute o seguinte SQL:

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

3. Clique em **Run** para executar

### Passo 3: Verificar Políticas

1. Vá para **Storage** → Clique no bucket `media`
2. Vá para a aba **Policies**
3. Você deve ver 3 políticas criadas:
   - ✅ "Authenticated users can upload media"
   - ✅ "Public can view media"
   - ✅ "Authenticated users can manage media"

## 🔄 Alternativa: Desabilitar RLS Temporariamente

Se as políticas não funcionarem, você pode temporariamente desabilitar RLS:

1. Vá para **Storage** → Clique no bucket `media`
2. Vá para **Policies**
3. Clique em **Disable RLS**
4. ⚠️ **Atenção**: Isso permite que qualquer pessoa faça upload (use apenas para teste)

## ✅ Após Aplicar

O upload de imagens deve funcionar corretamente!

**Teste:**
1. Vá para **Admin** → **Nova Lenda**
2. Toque em **"Selecionar Imagem"**
3. Escolha uma foto da galeria
4. O upload deve funcionar sem erros

## 📝 O Que as Políticas Fazem

- ✅ **Upload**: Usuários autenticados podem fazer upload
- ✅ **Visualização**: Qualquer pessoa pode ver as imagens (público)
- ✅ **Gerenciamento**: Usuários autenticados podem atualizar/deletar

Isso garante segurança mantendo a funcionalidade!

## 🆘 Se Ainda Não Funcionar

1. Verifique se está logado como admin
2. Verifique se o bucket `media` existe e é público
3. Tente desabilitar RLS temporariamente para testar
4. Veja os logs do Supabase para mais detalhes do erro
