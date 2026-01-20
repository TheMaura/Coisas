# 🏗️ Arquitetura Detalhada - Futebol Legends

## 📐 Diagramas de Arquitetura

### 1. Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE MOBILE                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Android    │  │     iOS       │  │     Web      │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └─────────────────┴─────────────────┘                   │
│                           │                                       │
│                  ┌────────▼────────┐                             │
│                  │  React Native   │                             │
│                  │   + Expo SDK    │                             │
│                  └────────┬────────┘                             │
│                           │                                       │
│         ┌─────────────────┼─────────────────┐                     │
│         │                 │                 │                     │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐            │
│  │   Screens   │  │  Components  │  │  Contexts   │            │
│  │  (Router)   │  │  (Reusable)  │  │  (State)    │            │
│  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘            │
│         │                 │                 │                     │
│         └─────────────────┴─────────────────┘                     │
│                           │                                       │
│                  ┌────────▼────────┐                             │
│                  │  Supabase SDK   │                             │
│                  │   (Client)      │                             │
│                  └────────┬────────┘                             │
└───────────────────────────┼───────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│                        SUPABASE BACKEND                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   Auth API    │  │  Database   │  │   Storage   │             │
│  │   (JWT/PKCE)  │  │ (PostgreSQL)│  │   (S3-like)  │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐                               │
│  │   Realtime   │  │   Functions   │                               │
│  │  (WebSocket) │  │  (Edge Fns)   │                               │
│  └──────────────┘  └──────────────┘                               │
└─────────────────────────────────────────────────────────────────────┘
```

### 2. Fluxo de Autenticação

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. signIn(email, password)
     ▼
┌─────────────────┐
│  AuthContext    │
│  signIn()       │
└────┬────────────┘
     │
     │ 2. supabase.auth.signInWithPassword()
     ▼
┌─────────────────┐
│  Supabase Auth  │
│  (PKCE Flow)    │
└────┬────────────┘
     │
     │ 3. JWT Token + Session
     ▼
┌─────────────────┐
│  Storage        │
│  (AsyncStorage) │
└────┬────────────┘
     │
     │ 4. Session Persisted
     ▼
┌─────────────────┐
│  fetchProfile() │
│  (from DB)      │
└────┬────────────┘
     │
     │ 5. Profile Data
     ▼
┌─────────────────┐
│  State Update   │
│  (Context)      │
└────┬────────────┘
     │
     │ 6. UI Rerender
     ▼
┌─────────┐
│  App    │
│ (Auth)  │
└─────────┘
```

### 3. Fluxo de Busca de Lendas

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Input Search Query
     ▼
┌─────────────────┐
│  Search Screen  │
│  (useState)     │
└────┬────────────┘
     │
     │ 2. Debounce (300ms)
     ▼
┌─────────────────┐
│  Query Builder  │
│  (Filters)      │
└────┬────────────┘
     │
     │ 3. supabase.from('legends').select()
     ▼
┌─────────────────┐
│  Supabase DB    │
│  (PostgreSQL)   │
│  - Full-Text    │
│  - Indexes      │
└────┬────────────┘
     │
     │ 4. Filtered Results
     ▼
┌─────────────────┐
│  Transform Data │
│  (useMemo)      │
└────┬────────────┘
     │
     │ 5. Formatted Data
     ▼
┌─────────────────┐
│  Render List    │
│  (FlatList)     │
└────┬────────────┘
     │
     │ 6. User Sees Results
     ▼
┌─────────┐
│  UI     │
└─────────┘
```

### 4. Fluxo de Upload de Mídia

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Select Image/Video
     ▼
┌─────────────────┐
│  Image Picker   │
│  (expo-image-   │
│   picker)       │
└────┬────────────┘
     │
     │ 2. File Selected
     ▼
┌─────────────────┐
│  Image Utils    │
│  - Resize       │
│  - Compress     │
│  - Validate     │
└────┬────────────┘
     │
     │ 3. Processed File
     ▼
┌─────────────────┐
│  Upload to      │
│  Supabase       │
│  Storage        │
└────┬────────────┘
     │
     │ 4. Upload Progress
     ▼
┌─────────────────┐
│  Get Public URL │
│  (Signed URL)   │
└────┬────────────┘
     │
     │ 5. URL + Metadata
     ▼
┌─────────────────┐
│  Insert to DB   │
│  (media table)  │
└────┬────────────┘
     │
     │ 6. Success
     ▼
┌─────────────────┐
│  UI Update      │
│  (Refresh)      │
└─────────────────┘
```

## 🔄 Padrões de Comunicação

### 1. Request/Response Pattern

```typescript
// Padrão usado para todas as operações de banco
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('column', value);

if (error) {
  // Error handling
  throw new Error(error.message);
}

return data;
```

### 2. Observer Pattern (Auth State)

```typescript
// AuthContext observa mudanças de autenticação
supabase.auth.onAuthStateChange((_event, session) => {
  // Atualiza estado quando auth muda
  setSession(session);
  setUser(session?.user ?? null);
});
```

### 3. Provider Pattern (State Management)

```typescript
// Context Providers aninhados
<AuthProvider>
  <NotificationProvider>
    <App />
  </NotificationProvider>
</AuthProvider>
```

## 📦 Estrutura de Componentes

### Hierarquia de Componentes

```
RootLayout
├── AuthProvider
│   └── NotificationProvider
│       └── Stack Navigator
│           ├── (auth) Group
│           │   ├── Login Screen
│           │   ├── Register Screen
│           │   └── Forgot Password Screen
│           │
│           └── (tabs) Group
│               ├── Tab Navigator
│               │   ├── Home Screen
│               │   │   └── LegendCard[]
│               │   │
│               │   ├── Search Screen
│               │   │   ├── SearchBar
│               │   │   └── FilterPanel
│               │   │   └── LegendCard[]
│               │   │
│               │   ├── Favorites Screen
│               │   │   └── LegendCard[]
│               │   │
│               │   ├── Notifications Screen
│               │   │   └── NotificationItem[]
│               │   │
│               │   └── Profile Screen
│               │       ├── ProfileHeader
│               │       ├── StatsCard
│               │       └── SettingsList
│               │
│               └── Stack Screens
│                   ├── Legend Detail
│                   │   ├── LegendHeader
│                   │   ├── MediaGallery
│                   │   ├── StoriesList
│                   │   └── ShareMenu
│                   │
│                   └── Admin Screens
│                       ├── AdminDashboard
│                       ├── CreateLegend
│                       └── EditLegend
```

## 🔐 Modelo de Segurança

### Camadas de Segurança

```
┌─────────────────────────────────────────┐
│  CAMADA 1: Frontend Validation          │
│  - TypeScript types                     │
│  - Form validation                      │
│  - Input sanitization                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  CAMADA 2: Authentication               │
│  - JWT Tokens                           │
│  - PKCE Flow                            │
│  - Session Management                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  CAMADA 3: Authorization (RLS)          │
│  - Row Level Security                   │
│  - Policy-based access                  │
│  - Role-based permissions               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  CAMADA 4: Database Constraints        │
│  - Foreign keys                         │
│  - Check constraints                    │
│  - Unique constraints                   │
└─────────────────────────────────────────┘
```

### Exemplo de Política RLS

```sql
-- Política: Usuários podem ver suas próprias notificações
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
USING (
  auth.uid() = user_id
  OR user_id IS NULL  -- Notificações gerais
);

-- Política: Admins podem criar lendas
CREATE POLICY "Admins can insert legends"
ON legends FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);
```

## 🚀 Otimizações de Performance

### 1. Estratégia de Cache

```
┌──────────────┐
│   Request    │
└──────┬───────┘
       │
       ▼
┌──────────────┐      Yes    ┌──────────────┐
│ Cache Check  │────────────▶│ Return Cache │
└──────┬───────┘             └──────────────┘
       │
       │ No
       ▼
┌──────────────┐
│  API Call    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Store Cache  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Return Data  │
└──────────────┘
```

### 2. Lazy Loading de Imagens

```typescript
// Expo Image com lazy loading automático
<Image
  source={{ uri: imageUrl }}
  placeholder={blurhash}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

### 3. Paginação

```typescript
// Implementação de paginação
const PAGE_SIZE = 20;

const fetchLegends = async (page: number) => {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  
  return await supabase
    .from('legends')
    .select('*')
    .range(from, to)
    .order('created_at', { ascending: false });
};
```

## 📊 Modelo de Dados Relacional

### Diagrama ER Simplificado

```
┌─────────────┐
│  profiles   │
│─────────────│
│ id (PK)     │
│ email       │
│ full_name   │
│ is_admin    │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────────┐         ┌─────────────┐
│   favorites     │         │   legends   │
│─────────────────│         │─────────────│
│ id (PK)         │    N:1  │ id (PK)     │
│ user_id (FK)    │◄────────│ name        │
│ legend_id (FK)  │────────►│ nationality │
└─────────────────┘         │ position    │
                             └──────┬──────┘
                                    │
                                    │ 1:N
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
            │   stories    │ │    media    │ │  trophies  │
            │──────────────│ │─────────────│ │────────────│
            │ id (PK)      │ │ id (PK)      │ │ id (PK)    │
            │ legend_id(FK)│ │ legend_id(FK)│ │ legend_id  │
            │ title        │ │ type         │ │ name       │
            │ content      │ │ url          │ │ year       │
            └──────────────┘ └──────────────┘ └────────────┘
```

## 🔄 Fluxos de Estado

### Estado de Autenticação

```typescript
interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

// Transições de estado
initial → loading → authenticated | unauthenticated
authenticated → loading → authenticated (refresh)
authenticated → signOut → unauthenticated
```

### Estado de Busca

```typescript
interface SearchState {
  query: string;
  filters: SearchFilters;
  results: Legend[];
  loading: boolean;
  error: Error | null;
}

// Fluxo
idle → typing → debouncing → searching → results | error
```

## 🧪 Estratégia de Testes (Recomendada)

### Pirâmide de Testes

```
        ┌─────────┐
        │   E2E   │  (Poucos, críticos)
        └─────────┘
      ┌─────────────┐
      │ Integration │  (Médio número)
      └─────────────┘
    ┌─────────────────┐
    │     Unit        │  (Muitos, rápidos)
    └─────────────────┘
```

### Exemplo de Teste Unitário

```typescript
describe('AuthContext', () => {
  it('should sign in user and fetch profile', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });
    
    expect(result.current.user).toBeTruthy();
    expect(result.current.profile).toBeTruthy();
  });
});
```

## 📱 Estrutura de Navegação

### Navegação Hierárquica

```
Root Stack
│
├── Auth Stack (não autenticado)
│   ├── Login
│   ├── Register
│   └── Forgot Password
│
└── Main Stack (autenticado)
    │
    ├── Tab Navigator
    │   ├── Home Tab
    │   ├── Search Tab
    │   ├── Favorites Tab
    │   ├── Notifications Tab
    │   └── Profile Tab
    │
    └── Modal/Stack Screens
        ├── Legend Detail
        │   ├── Stories List
        │   ├── Media Gallery
        │   └── Story Detail
        │
        ├── Profile Edit
        │
        └── Admin Stack
            ├── Dashboard
            ├── Create Legend
            ├── Edit Legend
            └── Manage Content
```

## 🔧 Configurações de Build

### Perfis de Build EAS

```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  },
  "preview": {
    "distribution": "internal",
    "android": { "buildType": "apk" }
  },
  "production": {
    "android": { "buildType": "apk" },
    "ios": { "buildConfiguration": "Release" }
  }
}
```

### Variáveis de Ambiente por Perfil

```typescript
// Development
EXPO_PUBLIC_SUPABASE_URL=dev-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=dev-key

// Preview/Production
EXPO_PUBLIC_SUPABASE_URL=prod-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=prod-key
```

---

**Este documento complementa a Documentação Técnica principal com diagramas e detalhes arquiteturais.**

