# Como Criar Conta Admin

Para criar uma conta de administrador, você precisa atualizar o campo `is_admin` na tabela `profiles` do Supabase.

## Método 1: Via Supabase Dashboard

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Vá para o projeto: `lrkqhubivgozjkcdbisg`
3. Navegue até **Table Editor** > **profiles**
4. Encontre o usuário que deseja tornar admin
5. Edite o campo `is_admin` e defina como `true`
6. Salve as alterações

## Método 2: Via SQL Editor

Execute o seguinte SQL no Supabase SQL Editor:

```sql
-- Tornar um usuário específico admin pelo email
UPDATE profiles 
SET is_admin = TRUE 
WHERE email = 'seu-email@exemplo.com';

-- Ou tornar o primeiro usuário criado admin
UPDATE profiles 
SET is_admin = TRUE 
WHERE id IN (
  SELECT id FROM auth.users 
  ORDER BY created_at ASC 
  LIMIT 1
);
```

## Verificar Admin

Para verificar se um usuário é admin:

```sql
SELECT id, email, full_name, is_admin 
FROM profiles 
WHERE is_admin = TRUE;
```

## Importante

- Apenas usuários com `is_admin = TRUE` podem acessar o painel admin
- O painel admin está protegido e redireciona usuários não autorizados
- Certifique-se de criar pelo menos uma conta admin antes de fazer deploy

