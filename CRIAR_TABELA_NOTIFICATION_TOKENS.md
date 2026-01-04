# Criar Tabela notification_tokens

## ⚠️ Erro Atual
```
ERROR: Could not find the table 'public.notification_tokens' in the schema cache
```

## ✅ Solução

Execute o SQL abaixo no Supabase SQL Editor para criar a tabela `notification_tokens`.

### Passos:

1. **Acesse o Supabase Dashboard**: https://supabase.com/dashboard
2. **Vá para o projeto**: `lrkqhubivgozjkcdbisg`
3. **Abra o SQL Editor**: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/sql/new
4. **Cole e execute o SQL abaixo**:

```sql
-- Tabela para armazenar tokens de notificação push
CREATE TABLE IF NOT EXISTS notification_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Índice para busca rápida por token
CREATE INDEX IF NOT EXISTS idx_notification_tokens_user_id ON notification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_tokens_token ON notification_tokens(token);

-- RLS para notification_tokens
ALTER TABLE notification_tokens ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Users can view own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Users can insert own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Users can update own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Users can delete own tokens" ON notification_tokens;
DROP POLICY IF EXISTS "Admins can view all tokens" ON notification_tokens;

-- Usuários podem ver e gerenciar apenas seus próprios tokens
CREATE POLICY "Users can view own tokens" ON notification_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" ON notification_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" ON notification_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens" ON notification_tokens
  FOR DELETE USING (auth.uid() = user_id);

-- Admins podem ver todos os tokens
-- NOTA: Se a coluna is_admin não existir na tabela profiles, remova esta política
-- ou ajuste conforme a estrutura da sua tabela profiles
CREATE POLICY "Admins can view all tokens" ON notification_tokens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() 
      AND (profiles.is_admin = TRUE OR profiles.admin = TRUE)
    )
  );
```

### ⚠️ Nota Importante

Se você receber um erro sobre `profiles.is_admin` não existir, você tem duas opções:

**Opção 1**: Remover a última política (linha que começa com `CREATE POLICY "Admins can view all tokens"`)

**Opção 2**: Verificar se a coluna de admin tem outro nome na sua tabela `profiles` e ajustar o SQL.

### Verificar se funcionou

Após executar o SQL, você pode verificar se a tabela foi criada:

```sql
SELECT * FROM notification_tokens LIMIT 1;
```

Se não houver erro, a tabela foi criada com sucesso! 🎉

### Próximos Passos

Após criar a tabela:
1. Reinicie o app Expo
2. Faça login novamente
3. O token de notificação será registrado automaticamente

