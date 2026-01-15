# Corrigir Tabela notifications

## ⚠️ Problema Identificado

A tabela `notifications` pode ter inconsistências entre o schema e o código:

1. **Coluna `read` vs `is_read`**: O schema usa `read`, mas o código pode estar usando `is_read`
2. **`user_id` NOT NULL**: O schema define `user_id` como NOT NULL, mas o código tenta criar notificações sem `user_id`

## ✅ Solução

Execute o SQL abaixo para garantir que a tabela está correta:

```sql
-- Verificar estrutura atual
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;

-- Se a coluna for 'read', renomear para 'is_read' para consistência
ALTER TABLE notifications RENAME COLUMN read TO is_read;

-- Se user_id for NOT NULL mas precisamos permitir NULL para notificações gerais
ALTER TABLE notifications ALTER COLUMN user_id DROP NOT NULL;

-- Adicionar coluna legend_id se não existir
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS legend_id UUID REFERENCES legends(id) ON DELETE SET NULL;

-- Verificar novamente
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;
```

## 🔍 Verificar Dados Existentes

```sql
-- Ver todas as notificações
SELECT id, user_id, title, message, is_read, created_at
FROM notifications
ORDER BY created_at DESC
LIMIT 10;

-- Ver notificações sem user_id (gerais)
SELECT COUNT(*) FROM notifications WHERE user_id IS NULL;

-- Ver notificações por usuário
SELECT user_id, COUNT(*) 
FROM notifications 
WHERE user_id IS NOT NULL
GROUP BY user_id;
```

