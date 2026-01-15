# Corrigir Erro "Failed to fetch (auth.supabase.io)"

Este erro geralmente ocorre quando há problemas de conexão ou configuração com o Supabase.

## Possíveis Causas e Soluções

### 1. Verificar Credenciais do Supabase

Certifique-se de que suas credenciais estão corretas:

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Vá em **Settings** > **API**
3. Verifique se a URL e a chave anônima estão corretas

### 2. Verificar se o Projeto está Ativo

- O projeto pode estar pausado ou inativo
- Verifique no dashboard se o projeto está rodando
- Se estiver pausado, reative-o

### 3. Verificar Conectividade de Rede

```bash
# Teste a conexão com o Supabase
curl https://lrkqhubivgozjkcdbisg.supabase.co/rest/v1/
```

### 4. Verificar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se não existir):

```env
EXPO_PUBLIC_SUPABASE_URL=https://lrkqhubivgozjkcdbisg.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

**Importante:** No Expo, as variáveis de ambiente devem começar com `EXPO_PUBLIC_` para serem acessíveis no cliente.

### 5. Reiniciar o Servidor Expo

Após alterar variáveis de ambiente:

```bash
# Parar o servidor (Ctrl+C)
# Limpar cache e reiniciar
npx expo start --clear
```

### 6. Verificar Configurações de CORS

No Supabase Dashboard:
1. Vá em **Settings** > **API**
2. Verifique se o domínio do seu app está nas **Allowed Origins**
3. Para desenvolvimento local, adicione: `http://localhost:8081`, `http://localhost:19000`, etc.

### 7. Verificar Firewall/Antivírus

- Alguns firewalls bloqueiam conexões com o Supabase
- Adicione uma exceção para o app
- Teste desabilitando temporariamente o antivírus

### 8. Limpar Cache do AsyncStorage

Se o problema persistir, limpe o cache de autenticação:

```typescript
// No código do app, adicione temporariamente:
import AsyncStorage from '@react-native-async-storage/async-storage';

// Limpar todas as chaves do Supabase
const clearSupabaseCache = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const supabaseKeys = keys.filter(key => key.includes('supabase'));
  await AsyncStorage.multiRemove(supabaseKeys);
};
```

### 9. Verificar Versão do @supabase/supabase-js

Certifique-se de estar usando uma versão compatível:

```bash
npm list @supabase/supabase-js
npm update @supabase/supabase-js
```

### 10. Testar Conexão Manualmente

Adicione este código temporariamente para testar:

```typescript
import { supabase } from '@/lib/supabase';

const testConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('Session:', data);
    console.log('Error:', error);
  } catch (error) {
    console.error('Erro de conexão:', error);
  }
};
```

## Solução Rápida

1. **Reinicie o servidor Expo com cache limpo:**
   ```bash
   npx expo start --clear
   ```

2. **Verifique as credenciais no arquivo `lib/supabase.ts`**

3. **Verifique se o projeto Supabase está ativo no dashboard**

4. **Teste em outro dispositivo/rede** para descartar problemas de rede local

## Se Nada Funcionar

1. Crie um novo projeto no Supabase
2. Atualize as credenciais no código
3. Execute novamente o servidor

## Logs Úteis

Adicione logs para debug:

```typescript
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Definida' : 'Não definida');
```

