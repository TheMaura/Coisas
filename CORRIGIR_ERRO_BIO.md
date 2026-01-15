# Corrigir Erro: Coluna 'bio' não encontrada

## Problema
O erro `could not find the bio column of profiles in the schema cache` ocorre porque a coluna `bio` (e outras colunas) não existem na tabela `profiles` do banco de dados.

## Solução

### Passo 1: Acessar o SQL Editor do Supabase

1. Acesse: https://supabase.com/dashboard/project/lrkqhubivgozjkcdbisg/sql/new
2. Ou vá para: Dashboard > SQL Editor > New Query

### Passo 2: Executar o SQL

Copie e cole o seguinte SQL no editor:

```sql
-- Adicionar coluna bio (biografia do usuário)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Adicionar coluna full_name (nome completo)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Adicionar coluna favorite_legend_id (ID da lenda favorita)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS favorite_legend_id UUID REFERENCES legends(id);

-- Adicionar coluna stats (estatísticas do usuário em formato JSON)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{"favorites_count": 0, "stories_read": 0}'::jsonb;

-- Adicionar coluna preferences (preferências do usuário em formato JSON)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"notifications_enabled": true, "theme": "dark"}'::jsonb;

-- Adicionar coluna website (site pessoal)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website TEXT;

-- Adicionar coluna social_links (links sociais em formato JSON)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;
```

### Passo 3: Executar

Clique no botão **"Run"** ou pressione `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac).

### Passo 4: Verificar

Execute este SQL para verificar se as colunas foram criadas:

```sql
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profiles'
  AND column_name IN ('bio', 'full_name', 'favorite_legend_id', 'stats', 'preferences', 'website', 'social_links')
ORDER BY column_name;
```

Você deve ver todas as 7 colunas listadas.

## Arquivo SQL Completo

O arquivo `ADICIONAR_COLUNAS_PROFILES.sql` contém o SQL completo com comentários e verificação.

## Após Executar

Após executar o SQL, o erro deve desaparecer e você poderá:
- Editar o perfil do usuário
- Adicionar biografia (bio)
- Adicionar nome completo
- Configurar outras informações do perfil

