# Futebol Legends

Aplicativo mobile que apresenta as histórias inspiradoras das lendas do futebol de todo o mundo.

## 🚀 Tecnologias

- **React Native** com **Expo**
- **TypeScript**
- **Supabase** (Backend e Banco de Dados)
- **Expo Router** (Navegação)

## 📋 Requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta Expo (gratuita)
- Projeto Supabase configurado

## 🛠️ Configuração

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**

O projeto já está configurado para usar o Supabase existente. As credenciais estão no arquivo `env.example.txt`. 

Se precisar criar um arquivo `.env` manualmente, copie o conteúdo de `env.example.txt` para `.env`.

**Nota:** O projeto já está conectado ao Supabase existente com as tabelas criadas.

3. **Banco de dados:**

O banco de dados já está configurado com as seguintes tabelas:
- `profiles` - Perfis de usuários
- `legends` - Lendas do futebol (9 registros existentes)
- `favorites` - Favoritos dos usuários
- `notifications` - Notificações
- `stories` - Histórias inspiradoras
- `media` - Mídias (imagens e vídeos)

4. **Executar o aplicativo:**

**⚠️ IMPORTANTE - Erro node:sea no Windows:**

Se você estiver usando Node.js v24+ no Windows e encontrar o erro `ENOENT: no such file or directory, mkdir 'node:sea'`, a solução recomendada é usar Node.js v20.x LTS.

**Solução rápida:**
```bash
# Usar nvm-windows para instalar Node.js v20
nvm install 20.11.1
nvm use 20.11.1
npm install
npm run dev
```

**Alternativa temporária:**
```bash
npm run dev:win
```

**Outros sistemas ou Node.js v20:**
```bash
npm run dev
# ou
expo start
```

Veja `SOLUCAO_NODE.md` para mais detalhes sobre o problema e soluções.

## 📱 Funcionalidades

### Usuário Final
- ✅ Cadastro e login de usuário
- ✅ Recuperação de senha
- ✅ Visualização de perfis das lendas
- ✅ Busca e filtragem de lendas
- ✅ Favoritar lendas
- ✅ Compartilhamento em redes sociais
- ✅ Gestão de perfil do usuário
- ✅ Recebimento de notificações

### Administrador
- ✅ Login administrativo seguro
- ✅ Cadastro, edição e exclusão de lendas
- ✅ Gestão de histórias inspiradoras
- ✅ Gestão de imagens e vídeos
- ✅ Envio de notificações

## 🏗️ Build APK

**⚠️ IMPORTANTE:** Se `npm` não for reconhecido:

1. **Reinicie o PowerShell** (feche e abra novo)
2. Ou adicione Node.js ao PATH manualmente:
   ```powershell
   $env:PATH += ";C:\Program Files\nodejs"
   ```

**Veja `COMO_GERAR_APK.md` para instruções completas passo a passo.**

Para gerar um APK, você tem duas opções:

### Opção 1: Script Automatizado (Recomendado)

```powershell
npm run build:apk
# ou
powershell -ExecutionPolicy Bypass -File ./build-apk.ps1
```

O script irá:
- Verificar/instalar EAS CLI
- Fazer login no Expo (se necessário)
- Configurar o projeto (se necessário)
- Iniciar o build do APK

### Opção 2: Manual

1. **Instalar EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Fazer login:**
```bash
eas login
```

3. **Configurar projeto (primeira vez):**
```bash
eas build:configure
```

4. **Gerar build Android:**
```bash
npm run build:android
# ou
eas build --platform android --profile preview
```

Para build local (requer Android Studio):
```bash
npm run build:android:local
```

**Nota:** Veja `BUILD_APK.md` para instruções detalhadas e troubleshooting.

## 📁 Estrutura do Projeto

```
futebol-legends/
├── app/                    # Telas do aplicativo
│   ├── (auth)/            # Telas de autenticação
│   ├── (tabs)/            # Telas principais (tabs)
│   ├── admin/             # Telas administrativas
│   ├── legend/            # Detalhes de lendas
│   └── _layout.tsx        # Layout principal
├── contexts/              # Contextos React
├── lib/                   # Bibliotecas e configurações
├── types/                 # Definições TypeScript
└── supabase/              # Scripts SQL do Supabase
```

## 🔐 Segurança

- Row Level Security (RLS) habilitado no Supabase
- Autenticação segura com Supabase Auth
- Políticas de acesso configuradas por perfil


