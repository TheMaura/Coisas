# Configurar Autenticação do Supabase

## Problema: Erro 400 Bad Request no Login/Cadastro

O erro 400 geralmente ocorre por:

1. **Verificação de email obrigatória** - Supabase pode estar configurado para exigir verificação
2. **Credenciais inválidas**
3. **Configuração de Auth no Supabase**

## ✅ Soluções Aplicadas no Código

1. Melhor tratamento de erros com mensagens em português
2. Suporte para verificação de email
3. Melhor sincronização de sessão após login

## 🔧 Configurar Supabase Auth (No Painel do Supabase)

### Opção 1: Desabilitar Verificação de Email (Para Desenvolvimento)

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Vá em **Authentication** > **Settings**
3. Em **Email Auth**, desabilite:
   - ✅ "Enable email confirmations" (desmarque)
   - Ou configure para não exigir confirmação

### Opção 2: Configurar Email Templates

Se quiser manter verificação de email:

1. Vá em **Authentication** > **Email Templates**
2. Configure os templates de confirmação
3. Configure SMTP se necessário

### Opção 3: Verificar Configurações de Auth

1. Vá em **Authentication** > **Settings**
2. Verifique:
   - Site URL está configurado
   - Redirect URLs estão configuradas
   - Email confirmations estão configuradas corretamente

## 🧪 Testar Autenticação

### Criar Usuário de Teste Diretamente no Supabase

1. Vá em **Authentication** > **Users**
2. Clique em **Add User**
3. Crie um usuário manualmente
4. Use esse usuário para testar login

### Verificar Logs

1. Vá em **Logs** > **Auth Logs**
2. Veja os erros detalhados das tentativas de login

## 📝 Código Atualizado

O código agora:
- Mostra mensagens de erro mais claras
- Trata verificação de email
- Aguarda sincronização de sessão antes de redirecionar

## 🔄 Próximos Passos

1. **Verificar configuração do Supabase Auth** no painel
2. **Desabilitar verificação de email** se estiver em desenvolvimento
3. **Testar login** novamente
4. **Verificar logs** no Supabase se o problema persistir

## 💡 Dica

Para desenvolvimento rápido, desabilite a verificação de email no Supabase. Para produção, mantenha habilitada e configure os templates de email corretamente.

