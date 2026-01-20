# 📚 Documentação Técnica Completa - Futebol Legends

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Especificações Técnicas](#especificações-técnicas)
4. [Estrutura de Dados](#estrutura-de-dados)
5. [Padrões de Design e Arquitetura](#padrões-de-design-e-arquitetura)
6. [Segurança](#segurança)
7. [Performance e Otimização](#performance-e-otimização)
8. [Testes e Qualidade](#testes-e-qualidade)
9. [Deploy e Build](#deploy-e-build)
10. [Manutenção e Evolução](#manutenção-e-evolução)
11. [Contribuição](#contribuição)
12. [Referências e Dependências](#referências-e-dependências)

---

## 1. Visão Geral

### 1.1 Descrição do Projeto

**Futebol Legends** é uma aplicação mobile multiplataforma desenvolvida para apresentar histórias inspiradoras de lendas do futebol mundial. O aplicativo oferece uma experiência rica em conteúdo, permitindo que usuários explorem biografias, conquistas, mídias históricas e histórias motivacionais de seus ídolos do futebol.

### 1.2 Objetivos do Projeto

- **Objetivo Principal**: Criar uma plataforma educacional e inspiradora sobre lendas do futebol
- **Objetivos Secundários**:
  - Fornecer conteúdo histórico e educativo de qualidade
  - Permitir interação social através de favoritos e compartilhamento
  - Oferecer experiência administrativa completa para gestão de conteúdo
  - Garantir performance e usabilidade em dispositivos móveis

### 1.3 Escopo do Projeto

**Funcionalidades Principais**:
- Sistema de autenticação e perfis de usuário
- Catálogo de lendas do futebol com informações detalhadas
- Sistema de histórias inspiradoras categorizadas
- Galeria de mídias (imagens e vídeos)
- Sistema de favoritos
- Busca e filtros avançados
- Painel administrativo completo
- Sistema de notificações push
- Compartilhamento em redes sociais

**Plataformas Suportadas**:
- Android (APK)
- iOS (planejado)
- Web (suporte básico)

### 1.4 Público-Alvo

- **Usuários Finais**: Fãs de futebol, estudantes, entusiastas de história esportiva
- **Administradores**: Gestores de conteúdo, moderadores

---

## 2. Arquitetura do Sistema

### 2.1 Arquitetura Geral

O projeto segue uma **arquitetura em camadas** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                │
│  (React Native Components, Screens, Navigation)         │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  CAMADA DE CONTEXTO                      │
│  (AuthContext, NotificationProvider, State Management)  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  CAMADA DE SERVIÇOS                       │
│  (Supabase Client, Utils, API Calls)                    │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  CAMADA DE DADOS                          │
│  (Supabase Database, Storage, Realtime)                  │
└──────────────────────────────────────────────────────────┘
```

### 2.2 Stack Tecnológico

#### Frontend
- **Framework**: React Native 0.81.5
- **Runtime**: Expo SDK 54
- **Linguagem**: TypeScript 5.1.3
- **Navegação**: Expo Router 6.0.21 (file-based routing)
- **Estado Global**: React Context API
- **Animações**: React Native Reanimated 4.1.1
- **UI Components**: Expo Vector Icons, Expo Linear Gradient

#### Backend
- **BaaS**: Supabase
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Autenticação**: Supabase Auth (JWT, PKCE flow)
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime (configurado)

#### Ferramentas de Desenvolvimento
- **Build System**: EAS Build (Expo Application Services)
- **Package Manager**: npm
- **Linting**: TypeScript strict mode
- **Versionamento**: Git

### 2.3 Padrão de Navegação

O projeto utiliza **Expo Router** com file-based routing:

```
app/
├── _layout.tsx              # Root layout
├── index.tsx                # Entry point (redirect)
├── (auth)/                  # Auth group (não autenticado)
│   ├── _layout.tsx
│   ├── login.tsx
│   ├── register.tsx
│   └── forgot-password.tsx
├── (tabs)/                  # Main tabs (autenticado)
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── search.tsx
│   ├── favorites.tsx
│   ├── notifications.tsx
│   └── profile.tsx
├── legend/[id]/             # Dynamic route para lendas
│   ├── index.tsx
│   ├── stories.tsx
│   ├── media.tsx
│   └── story/[storyId].tsx
├── admin/                   # Admin routes
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── create.tsx
│   └── edit/[id].tsx
└── profile/edit.tsx         # Profile edit
```

### 2.4 Fluxo de Dados

#### Autenticação
```
User Action → AuthContext → Supabase Auth → Session → Profile Fetch → State Update
```

#### Busca de Lendas
```
User Input → Search Screen → Supabase Query → Filter/Transform → UI Update
```

#### Upload de Mídia
```
User Select → Image Picker → Image Processing → Supabase Storage → Database Insert → UI Update
```

---

## 3. Especificações Técnicas

### 3.1 Requisitos do Sistema

#### Desenvolvimento
- **Node.js**: 18.x ou superior (recomendado: 20.x LTS)
- **npm**: 9.x ou superior
- **Expo CLI**: 54.x
- **Git**: 2.x ou superior

#### Produção
- **Android**: API Level 21+ (Android 5.0+)
- **iOS**: iOS 13.0+ (planejado)
- **Memória**: Mínimo 2GB RAM
- **Armazenamento**: 50MB+ livre

### 3.2 Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração:

```typescript
// Variáveis obrigatórias
EXPO_PUBLIC_SUPABASE_URL=<supabase-project-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>

// Variáveis opcionais
NODE_ENV=development|production
```

**Localização das Variáveis**:
- Desenvolvimento: `.env` (não versionado)
- Build: `eas.json` (perfil específico)
- Exemplo: `env.example.txt`

### 3.3 Configurações do Projeto

#### app.json
```json
{
  "expo": {
    "name": "Futebol Legends",
    "slug": "futebol-legends",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "scheme": "futebol-legends",
    "ios": {
      "bundleIdentifier": "com.futebollegends.app"
    },
    "android": {
      "package": "com.futebollegends.app",
      "permissions": [
        "INTERNET",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_MEDIA_IMAGES",
        "CAMERA"
      ]
    }
  }
}
```

#### tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 3.4 Scripts NPM

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "dev": "expo start",
  "dev:win": "powershell -ExecutionPolicy Bypass -File ./start-expo.ps1",
  "build:android": "eas build --platform android --profile preview",
  "build:android:local": "eas build --platform android --profile preview --local",
  "build:apk": "powershell -ExecutionPolicy Bypass -File ./build-apk.ps1",
  "update:deps": "powershell -ExecutionPolicy Bypass -File ./atualizar-deps.ps1",
  "fix:deps": "npx expo install --fix"
}
```

---

## 4. Estrutura de Dados

### 4.1 Schema do Banco de Dados

#### Tabela: `profiles`
Armazena informações de perfil dos usuários.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  favorite_legend_id UUID REFERENCES legends(id),
  is_admin BOOLEAN DEFAULT FALSE,
  stats JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices**:
- `idx_profiles_email` em `email`
- `idx_profiles_is_admin` em `is_admin`

#### Tabela: `legends`
Armazena informações das lendas do futebol.

```sql
CREATE TABLE legends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  full_name TEXT,
  nationality TEXT NOT NULL,
  position TEXT NOT NULL,
  current_club TEXT,
  birth_date DATE,
  biography TEXT NOT NULL,
  achievements TEXT[],
  image_url TEXT,
  video_url TEXT,
  gallery TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices**:
- `idx_legends_nationality` em `nationality`
- `idx_legends_position` em `position`
- `idx_legends_is_active` em `is_active`
- `idx_legends_name_fts` (Full-Text Search) em `name, full_name, biography`

#### Tabela: `stories`
Armazena histórias inspiradoras relacionadas às lendas.

```sql
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('career', 'achievement', 'inspiration', 'challenge', 'legacy')),
  image_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  reading_time INTEGER,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices**:
- `idx_stories_legend_id` em `legend_id`
- `idx_stories_category` em `category`
- `idx_stories_is_featured` em `is_featured`
- `idx_stories_created_at` em `created_at DESC`

#### Tabela: `media`
Armazena mídias (imagens e vídeos) relacionadas às lendas.

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  source TEXT,
  year INTEGER,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices**:
- `idx_media_legend_id` em `legend_id`
- `idx_media_type` em `type`
- `idx_media_is_featured` em `is_featured`

#### Tabela: `favorites`
Armazena favoritos dos usuários.

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, legend_id)
);
```

**Índices**:
- `idx_favorites_user_id` em `user_id`
- `idx_favorites_legend_id` em `legend_id`
- `idx_favorites_user_legend` (único) em `(user_id, legend_id)`

#### Tabela: `notifications`
Armazena notificações do sistema.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('new_legend', 'update', 'general', 'story', 'media', 'legend')),
  is_read BOOLEAN DEFAULT FALSE,
  legend_id UUID REFERENCES legends(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices**:
- `idx_notifications_user_id` em `user_id`
- `idx_notifications_is_read` em `is_read`
- `idx_notifications_created_at` em `created_at DESC`

#### Tabela: `trophies`
Armazena troféus e conquistas das lendas.

```sql
CREATE TABLE trophies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  competition TEXT NOT NULL,
  year INTEGER NOT NULL,
  season TEXT,
  description TEXT,
  image_url TEXT,
  category TEXT CHECK (category IN ('club', 'national', 'individual', 'youth')),
  is_major BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices**:
- `idx_trophies_legend_id` em `legend_id`
- `idx_trophies_year` em `year DESC`
- `idx_trophies_category` em `category`

### 4.2 Relacionamentos

```
profiles (1) ──< (N) favorites (N) >── (1) legends
legends (1) ──< (N) stories
legends (1) ──< (N) media
legends (1) ──< (N) trophies
profiles (1) ──< (N) notifications
```

### 4.3 Tipos TypeScript

O projeto utiliza tipos TypeScript estritos definidos em `types/index.ts`:

```typescript
// Principais interfaces
- User: Informações básicas do usuário
- Profile: Perfil completo com estatísticas e preferências
- Legend: Dados completos da lenda
- Story: História inspiradora
- Media: Mídia (imagem/vídeo)
- Favorite: Favorito do usuário
- Notification: Notificação do sistema
- Trophy: Troféu/conquista
- CareerMilestone: Marco da carreira
- YouTubeVideo: Vídeo do YouTube
- QuizResult: Resultado de quiz
```

---

## 5. Padrões de Design e Arquitetura

### 5.1 Padrões de Arquitetura

#### 5.1.1 Component-Based Architecture
O projeto segue o padrão de componentes do React, com componentes reutilizáveis e isolados:

```
components/
├── AnimatedCard.tsx          # Card com animações
├── GradientButton.tsx        # Botão com gradiente
├── ImagePickerButton.tsx     # Botão de seleção de imagem
├── LegendCard.tsx            # Card de lenda
├── MediaGallery.tsx          # Galeria de mídias
├── NotificationProvider.tsx  # Provider de notificações
├── ShareMenu.tsx             # Menu de compartilhamento
└── StoryCard.tsx             # Card de história
```

#### 5.1.2 Context API Pattern
Gerenciamento de estado global através de Context API:

```typescript
// contexts/AuthContext.tsx
- AuthProvider: Fornece contexto de autenticação
- useAuth: Hook customizado para acessar contexto
- Estado: session, user, profile, loading
- Métodos: signIn, signUp, signOut, resetPassword, updateProfile
```

#### 5.1.3 Repository Pattern (via Supabase)
Abstração de acesso a dados através do cliente Supabase:

```typescript
// lib/supabase.ts
- Cliente Supabase configurado
- Storage adapter multiplataforma
- Funções utilitárias de conexão
```

### 5.2 Padrões de Código

#### 5.2.1 Nomenclatura
- **Componentes**: PascalCase (`LegendCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth`)
- **Utilitários**: camelCase (`imageUpload.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`Colors.ts`)
- **Tipos/Interfaces**: PascalCase (`Legend`, `Profile`)

#### 5.2.2 Estrutura de Arquivos
```
app/                    # Telas (file-based routing)
components/             # Componentes reutilizáveis
contexts/               # Contextos React
lib/                    # Bibliotecas e configurações
types/                  # Definições TypeScript
utils/                  # Funções utilitárias
constants/              # Constantes e temas
supabase/               # Scripts SQL
```

#### 5.2.3 Convenções de Código
- **TypeScript Strict Mode**: Habilitado
- **Componentes Funcionais**: Uso exclusivo de hooks
- **Imports**: Path aliases (`@/components/...`)
- **Error Handling**: Try-catch com mensagens descritivas
- **Loading States**: Estados de carregamento explícitos

### 5.3 Design Patterns Implementados

#### 5.3.1 Provider Pattern
```typescript
<AuthProvider>
  <NotificationProvider>
    <App />
  </NotificationProvider>
</AuthProvider>
```

#### 5.3.2 Custom Hooks Pattern
```typescript
// Hooks customizados para lógica reutilizável
const { user, signIn, signOut } = useAuth();
```

#### 5.3.3 Higher-Order Components (HOC)
Não utilizado diretamente, mas padrão similar via layouts aninhados.

#### 5.3.4 Factory Pattern
```typescript
// Storage adapter factory baseado em plataforma
if (Platform.OS === 'web') {
  storageAdapter = createWebAdapter();
} else {
  storageAdapter = createMobileAdapter();
}
```

---

## 6. Segurança

### 6.1 Autenticação

#### 6.1.1 Supabase Auth
- **Método**: JWT (JSON Web Tokens)
- **Flow**: PKCE (Proof Key for Code Exchange) para segurança adicional
- **Storage**: AsyncStorage (mobile) / localStorage (web)
- **Refresh Token**: Auto-refresh habilitado
- **Session Persistence**: Habilitado

#### 6.1.2 Políticas de Senha
- Mínimo 6 caracteres (configurável no Supabase)
- Validação no frontend e backend
- Recuperação de senha via email

### 6.2 Autorização

#### 6.2.1 Row Level Security (RLS)
Todas as tabelas possuem RLS habilitado:

```sql
-- Exemplo: Política de leitura pública para legends
CREATE POLICY "Legends are viewable by everyone"
  ON legends FOR SELECT
  USING (true);

-- Exemplo: Política de escrita apenas para admins
CREATE POLICY "Only admins can insert legends"
  ON legends FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
```

#### 6.2.2 Controle de Acesso por Perfil
```typescript
// Verificação de admin no frontend
const { profile } = useAuth();
const isAdmin = profile?.is_admin === true;
```

### 6.3 Proteção de Dados

#### 6.3.1 Storage Seguro
- **Supabase Storage**: Buckets com políticas de acesso
- **Uploads**: Validação de tipo e tamanho
- **URLs**: Assinadas e temporárias quando necessário

#### 6.3.2 Variáveis de Ambiente
- Credenciais não versionadas no código
- Uso de variáveis de ambiente
- Chaves anon do Supabase (seguras para frontend)

### 6.4 Validação de Dados

#### 6.4.1 Frontend
- Validação de formulários
- Sanitização de inputs
- TypeScript para type safety

#### 6.4.2 Backend (Supabase)
- Constraints de banco de dados
- Validação de tipos
- Triggers para integridade

### 6.5 Boas Práticas de Segurança

- ✅ RLS habilitado em todas as tabelas
- ✅ Autenticação JWT com PKCE
- ✅ Validação de inputs
- ✅ Sanitização de dados
- ✅ HTTPS obrigatório (Supabase)
- ✅ Tokens não expostos no código
- ✅ Políticas de acesso granulares

---

## 7. Performance e Otimização

### 7.1 Otimizações de Renderização

#### 7.1.1 React.memo
Componentes pesados podem usar `React.memo` para evitar re-renders desnecessários.

#### 7.1.2 useMemo e useCallback
```typescript
// Exemplo de uso de useMemo para cálculos pesados
const filteredLegends = useMemo(() => {
  return legends.filter(/* ... */);
}, [legends, filters]);
```

#### 7.1.3 Lazy Loading
- Imagens com `expo-image` (otimização automática)
- Lazy loading de rotas (Expo Router)

### 7.2 Otimizações de Rede

#### 7.2.1 Paginação
```typescript
// Exemplo de query paginada
const { data } = await supabase
  .from('legends')
  .select('*')
  .range(0, 19) // Primeira página
  .limit(20);
```

#### 7.2.2 Cache
- Cache de imagens via `expo-image`
- Cache de sessão via AsyncStorage
- Cache de queries (planejado)

#### 7.2.3 Otimização de Queries
- Índices no banco de dados
- Seleção de colunas específicas
- Uso de `maybeSingle()` quando apropriado

### 7.3 Otimizações de Imagens

#### 7.3.1 Expo Image
```typescript
import { Image } from 'expo-image';

// Otimizações automáticas:
// - Cache de imagens
// - Lazy loading
// - Placeholder enquanto carrega
// - Transições suaves
```

#### 7.3.2 Thumbnails
- Uso de thumbnails para galerias
- Carregamento progressivo
- Compressão de imagens no upload

### 7.4 Animações

#### 7.4.1 React Native Reanimated
```typescript
// Animações performáticas usando worklets
import Animated from 'react-native-reanimated';

// Animações rodam na UI thread (60fps)
```

#### 7.4.2 Otimização de Animações
- Uso de `useAnimatedStyle` para animações suaves
- Evitar animações em listas grandes
- Debounce em interações do usuário

### 7.5 Métricas de Performance

**Objetivos**:
- Time to Interactive (TTI): < 3s
- First Contentful Paint (FCP): < 1.5s
- Bundle Size: < 50MB (Android APK)
- Frame Rate: 60fps em animações

---

## 8. Testes e Qualidade

### 8.1 Estratégia de Testes

#### 8.1.1 Testes Unitários (Planejado)
```typescript
// Exemplo de estrutura de teste
describe('AuthContext', () => {
  it('should sign in user successfully', async () => {
    // Test implementation
  });
});
```

#### 8.1.2 Testes de Integração (Planejado)
- Testes de fluxos completos
- Testes de API
- Testes de navegação

#### 8.1.3 Testes E2E (Planejado)
- Testes de usuário completo
- Testes em dispositivos reais
- Testes de regressão

### 8.2 Qualidade de Código

#### 8.2.1 TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

#### 8.2.2 Linting (Recomendado)
- ESLint configurado
- Prettier para formatação
- Husky para pre-commit hooks

#### 8.2.3 Code Review
- Revisão de código obrigatória
- Checklist de qualidade
- Documentação de mudanças

### 8.3 Monitoramento

#### 8.3.1 Error Tracking (Recomendado)
- Sentry ou similar
- Logging estruturado
- Crash reports

#### 8.3.2 Analytics (Recomendado)
- Tracking de eventos
- Métricas de uso
- Performance monitoring

---

## 9. Deploy e Build

### 9.1 Configuração de Build

#### 9.1.1 EAS Build
```json
// eas.json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

#### 9.1.2 Perfis de Build
- **development**: Build de desenvolvimento
- **preview**: Build de preview (APK)
- **production**: Build de produção

### 9.2 Processo de Build

#### 9.2.1 Build Local
```bash
# Requer Android Studio configurado
npm run build:android:local
```

#### 9.2.2 Build na Nuvem (EAS)
```bash
# Build na nuvem do Expo
npm run build:android
```

### 9.3 Distribuição

#### 9.3.1 Android APK
- Geração via EAS Build
- Assinatura automática
- Download direto

#### 9.3.2 Android AAB (Planejado)
- Para publicação na Play Store
- Assinatura com keystore

#### 9.3.3 iOS (Planejado)
- Build via EAS
- TestFlight para testes
- App Store para produção

### 9.4 CI/CD (Recomendado)

#### 9.4.1 GitHub Actions
```yaml
# Exemplo de workflow
name: Build APK
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build:android
```

---

## 10. Manutenção e Evolução

### 10.1 Versionamento

#### 10.1.1 Semantic Versioning
```
MAJOR.MINOR.PATCH
1.0.0
```

- **MAJOR**: Mudanças incompatíveis
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs

#### 10.1.2 Changelog
Manter `CHANGELOG.md` com:
- Novas funcionalidades
- Correções de bugs
- Mudanças que quebram compatibilidade
- Depreciações

### 10.2 Gerenciamento de Dependências

#### 10.2.1 Atualização de Dependências
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências do Expo
npm run fix:deps

# Atualizar todas as dependências
npm run update:deps
```

#### 10.2.2 Auditoria de Segurança
```bash
# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades
npm audit fix
```

### 10.3 Documentação

#### 10.3.1 Documentação de Código
- Comentários JSDoc para funções complexas
- README atualizado
- Documentação de APIs

#### 10.3.2 Documentação de Usuário
- Guias de uso
- FAQ
- Tutoriais

### 10.4 Roadmap

#### 10.4.1 Funcionalidades Futuras
- [ ] Sistema de comentários
- [ ] Sistema de quiz interativo
- [ ] Comparação de lendas
- [ ] Modo offline
- [ ] Suporte a múltiplos idiomas
- [ ] Integração com redes sociais
- [ ] Sistema de conquistas

#### 10.4.2 Melhorias Técnicas
- [ ] Testes automatizados
- [ ] CI/CD completo
- [ ] Monitoramento e analytics
- [ ] Otimização de bundle size
- [ ] PWA (Progressive Web App)

---

## 11. Contribuição

### 11.1 Processo de Contribuição

#### 11.1.1 Fork e Clone
```bash
# Fazer fork do repositório
# Clonar o fork
git clone https://github.com/seu-usuario/futebol-legends.git
cd futebol-legends
```

#### 11.1.2 Branch de Desenvolvimento
```bash
# Criar branch para feature
git checkout -b feature/nova-funcionalidade

# Ou para correção
git checkout -b fix/correcao-bug
```

#### 11.1.3 Desenvolvimento
1. Desenvolver a funcionalidade
2. Testar localmente
3. Commitar com mensagens descritivas
4. Push para o fork
5. Criar Pull Request

#### 11.1.4 Convenções de Commit
```
feat: Adiciona nova funcionalidade
fix: Corrige bug
docs: Atualiza documentação
style: Formatação de código
refactor: Refatoração
test: Adiciona testes
chore: Tarefas de manutenção
```

### 11.2 Padrões de Código

#### 11.2.1 TypeScript
- Sempre usar tipos explícitos
- Evitar `any`
- Usar interfaces para objetos

#### 11.2.2 Componentes
- Componentes funcionais
- Hooks customizados quando apropriado
- Props tipadas

#### 11.2.3 Nomenclatura
- Componentes: PascalCase
- Funções: camelCase
- Constantes: UPPER_SNAKE_CASE
- Arquivos: PascalCase para componentes, camelCase para utilitários

### 11.3 Code Review

#### 11.3.1 Checklist
- [ ] Código segue padrões do projeto
- [ ] TypeScript sem erros
- [ ] Testes passando (quando aplicável)
- [ ] Documentação atualizada
- [ ] Sem console.logs desnecessários
- [ ] Performance considerada

---

## 12. Referências e Dependências

### 12.1 Dependências Principais

#### 12.1.1 Core
```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo": "~54.0.0",
  "typescript": "^5.1.3"
}
```

#### 12.1.2 Navegação
```json
{
  "expo-router": "~6.0.21",
  "@react-navigation/native": "^7.1.8",
  "@react-navigation/bottom-tabs": "^7.4.0",
  "@react-navigation/native-stack": "^7.3.16"
}
```

#### 12.1.3 Backend
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@react-native-async-storage/async-storage": "2.2.0"
}
```

#### 12.1.4 UI/UX
```json
{
  "@expo/vector-icons": "^15.0.3",
  "expo-linear-gradient": "~15.0.8",
  "expo-image": "~3.0.11",
  "expo-blur": "~15.0.8",
  "react-native-reanimated": "~4.1.1"
}
```

#### 12.1.5 Funcionalidades
```json
{
  "expo-notifications": "~0.32.15",
  "expo-image-picker": "~17.0.10",
  "expo-sharing": "~14.0.8",
  "expo-clipboard": "~8.0.8",
  "expo-video": "~2.0.0"
}
```

### 12.2 Documentação Externa

#### 12.2.1 Expo
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

#### 12.2.2 React Native
- [React Native Documentation](https://reactnative.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

#### 12.2.3 Supabase
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

#### 12.2.4 TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 12.3 Ferramentas Recomendadas

#### 12.3.1 Desenvolvimento
- **VS Code**: Editor recomendado
- **Expo Go**: App para testes rápidos
- **React Native Debugger**: Debug avançado
- **Flipper**: Ferramenta de debugging

#### 12.3.2 Design
- **Figma**: Design de UI/UX
- **React Native Paper**: Biblioteca de componentes (opcional)

#### 12.3.3 Testes
- **Jest**: Framework de testes
- **React Native Testing Library**: Testes de componentes
- **Detox**: Testes E2E

### 12.4 Licença

**ISC License**

```
Copyright (c) 2024 Lizender Mendonça

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

### 12.5 Autor

**Lizender Mendonça** - Turma A1 5° ano

---

## Apêndices

### A. Glossário

- **BaaS**: Backend as a Service
- **RLS**: Row Level Security
- **PKCE**: Proof Key for Code Exchange
- **JWT**: JSON Web Token
- **APK**: Android Package Kit
- **AAB**: Android App Bundle
- **EAS**: Expo Application Services
- **HOC**: Higher-Order Component
- **TTI**: Time to Interactive
- **FCP**: First Contentful Paint

### B. Troubleshooting Comum

#### B.1 Erro node:sea no Windows
**Problema**: Erro `ENOENT: no such file or directory, mkdir 'node:sea'`

**Solução**: Usar Node.js v20.x LTS
```bash
nvm install 20.11.1
nvm use 20.11.1
```

#### B.2 npm não reconhecido
**Solução**: Reiniciar PowerShell ou adicionar Node.js ao PATH

#### B.3 Erro de build Android
**Solução**: Verificar credenciais no `eas.json` e configuração do projeto

#### B.4 Erro de conexão Supabase
**Solução**: Verificar variáveis de ambiente e credenciais

### C. Contatos e Suporte

- **Repositório**: [GitHub Repository URL]
- **Issues**: [GitHub Issues URL]
- **Documentação**: Este arquivo e README.md

---

**Última Atualização**: 2024
**Versão da Documentação**: 1.0.0

