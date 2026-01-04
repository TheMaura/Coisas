# Como Configurar Storage no Supabase

## 📦 Criar Buckets de Storage

Para que o upload de imagens funcione, você precisa criar buckets no Supabase Storage:

### 1. Acesse o Supabase Dashboard
- Vá para: https://supabase.com/dashboard
- Selecione o projeto: `lrkqhubivgozjkcdbisg`

### 2. Criar Bucket `media`
1. Navegue até **Storage** no menu lateral
2. Clique em **New bucket**
3. Nome: `media`
4. **Public bucket**: ✅ Marque como público
5. Clique em **Create bucket**

### 3. Criar Bucket `avatars` (opcional, para fotos de perfil)
1. Clique em **New bucket**
2. Nome: `avatars`
3. **Public bucket**: ✅ Marque como público
4. Clique em **Create bucket**

### 4. Configurar Políticas (Opcional)

Se quiser restringir uploads apenas para usuários autenticados:

```sql
-- Política para permitir upload apenas para usuários autenticados
CREATE POLICY "Users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Política para permitir leitura pública
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');
```

## ✅ Após Configurar

O upload de imagens estará funcionando! Você poderá:
- Selecionar imagens do dispositivo
- Fazer upload automático para Supabase Storage
- Usar as URLs geradas automaticamente

## 🔧 Troubleshooting

Se o upload não funcionar:
1. Verifique se os buckets foram criados
2. Verifique se os buckets são públicos
3. Verifique as permissões do app (Android/iOS)
4. Veja os logs do console para erros

