# 🚀 Configuração Completa do Storage - Passo a Passo

## ⚡ Configuração Rápida (5 minutos)

### 📋 Checklist

- [ ] Criar bucket `media` no Supabase Storage
- [ ] Aplicar políticas SQL
- [ ] Testar upload de imagem

---

## 📦 PASSO 1: Criar Bucket `media`

### Opção A: Via Dashboard (Recomendado)

1. **Acesse**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets
2. Clique no botão **"New bucket"** (canto superior direito)
3. Preencha:
   - **Name**: `media`
   - ✅ **Public bucket**: Marque esta opção (IMPORTANTE!)
4. Clique em **"Create bucket"**

### Opção B: Via SQL (Alternativa)

Se preferir criar via SQL, execute:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;
```

---

## 🔐 PASSO 2: Aplicar Políticas SQL

### Método Rápido

1. **Acesse**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/sql/new
2. **Abra o arquivo**: `EXECUTAR_AGORA.sql` neste projeto
3. **Cole todo o conteúdo** no SQL Editor
4. Clique em **"Run"** (ou Ctrl+Enter)

### Ou Cole Este SQL Diretamente:

```sql
-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can manage media" ON storage.objects;

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
```

---

## ✅ PASSO 3: Verificar Configuração

### Verificar Bucket

1. Vá para: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets
2. Você deve ver o bucket `media` listado
3. Clique nele e verifique se está marcado como **Public**

### Verificar Políticas

1. Vá para: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets/media/policies
2. Você deve ver 3 políticas:
   - ✅ "Authenticated users can upload media"
   - ✅ "Public can view media"
   - ✅ "Authenticated users can manage media"

---

## 🧪 PASSO 4: Testar Upload

1. Abra o app: `npm run dev`
2. Faça login como admin
3. Vá para **Admin** → **Nova Lenda**
4. Toque em **"Selecionar Imagem"**
5. Escolha uma foto da galeria
6. O upload deve funcionar sem erros! ✅

---

## 🔗 Links Diretos

- **Criar Bucket**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets
- **SQL Editor**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/sql/new
- **Ver Políticas**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/storage/buckets/media/policies

---

## ❌ Se Ainda Não Funcionar

### Erro: "bucket does not exist"
- ✅ Certifique-se de que o bucket `media` foi criado
- ✅ Verifique se o nome está correto (minúsculas)

### Erro: "row-level security policy"
- ✅ Execute o SQL das políticas novamente
- ✅ Verifique se as políticas aparecem na aba Policies

### Erro: "permission denied"
- ✅ Certifique-se de estar logado como admin
- ✅ Verifique se o bucket é público

---

## 📝 Notas

- O bucket precisa ser **público** para que as imagens sejam acessíveis
- As políticas permitem que qualquer usuário autenticado faça upload
- Apenas usuários autenticados podem gerenciar (update/delete) arquivos

---

## ✅ Após Configurar

O upload de imagens estará funcionando perfeitamente! 🎉

Você poderá:
- ✅ Selecionar imagens do dispositivo
- ✅ Fazer upload automático
- ✅ Ver preview das imagens
- ✅ Usar as imagens nas lendas

