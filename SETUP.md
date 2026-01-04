# Guia de Configuração - Futebol Legends

## 🚀 Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

1. **Criar projeto no Supabase:**
   - Acesse https://supabase.com
   - Crie uma nova conta ou faça login
   - Crie um novo projeto

2. **Configurar variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione suas credenciais do Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

3. **Executar script SQL:**
   - No painel do Supabase, vá em SQL Editor
   - Copie o conteúdo do arquivo `supabase/schema.sql`
   - Execute o script completo

4. **Configurar primeiro usuário admin:**
   - Após criar sua conta no app, execute este SQL no Supabase para tornar um usuário admin:

```sql
UPDATE profiles
SET is_admin = TRUE
WHERE email = 'seu-email@exemplo.com';
```

### 3. Executar o App

```bash
npm run dev
# ou
expo start
```

Escaneie o QR code com o app Expo Go no seu dispositivo móvel.

## 📦 Build APK

### Opção 1: Build na nuvem (recomendado)

1. **Instalar EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Fazer login:**
```bash
eas login
```

3. **Configurar projeto:**
```bash
eas build:configure
```

4. **Gerar build Android:**
```bash
eas build --platform android --profile preview
```

O APK será gerado na nuvem e você receberá um link para download.

### Opção 2: Build local

```bash
eas build --platform android --profile preview --local
```

**Requisitos para build local:**
- Android Studio instalado
- Android SDK configurado
- Java JDK instalado

## 🎨 Assets Necessários

Você precisará criar os seguintes assets (ou usar placeholders):

- `assets/icon.png` - Ícone do app (1024x1024px)
- `assets/splash.png` - Tela de splash (2048x2048px)
- `assets/adaptive-icon.png` - Ícone adaptativo Android (1024x1024px)
- `assets/favicon.png` - Favicon web (48x48px)
- `assets/notification-icon.png` - Ícone de notificação (96x96px)

## 🔧 Solução de Problemas

### Erro de conexão com Supabase
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o projeto Supabase está ativo
- Verifique se o RLS está configurado corretamente

### Erro ao instalar dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro no build
- Certifique-se de que todas as dependências estão atualizadas
- Verifique se o `eas.json` está configurado corretamente
- Tente limpar o cache: `expo start -c`

## 📝 Próximos Passos

1. Adicionar imagens reais das lendas
2. Configurar notificações push
3. Adicionar upload de imagens
4. Implementar galeria de imagens
5. Testes em dispositivos reais

