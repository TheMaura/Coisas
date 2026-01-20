# 🔧 Solução: Erro "Network request failed" no APK

## Problema

Ao instalar o APK em um dispositivo Android e tentar fazer login, aparece o erro:
```
Erro ao fazer login: "Network request failed"
```

Mesmo com a internet ligada.

## Causas Possíveis

1. **Variáveis de ambiente não incluídas no build**
2. **Configuração de Network Security no Android**
3. **Permissões de internet não configuradas corretamente**
4. **Timeout de conexão muito curto**

## ✅ Soluções Implementadas

### 1. Configuração de Network Security no Android

Adicionado no `app.config.js`:
```javascript
android: {
  permissions: [
    "android.permission.INTERNET",
    "android.permission.ACCESS_NETWORK_STATE",
    // ... outras permissões
  ],
  usesCleartextTraffic: false,
  networkSecurityConfig: {
    cleartextTrafficPermitted: false
  }
}
```

### 2. Verificação de Variáveis de Ambiente

As variáveis `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` devem estar configuradas no `eas.json`:

```json
{
  "build": {
    "preview": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://lrkqhubivgozjkcdbisg.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "sua_chave_aqui"
      }
    }
  }
}
```

### 3. Melhor Tratamento de Erros

O código agora:
- Verifica a conexão antes de tentar login
- Mostra mensagens de erro mais específicas
- Detecta erros de rede e fornece orientações

### 4. Logs de Debug

Adicionados logs para verificar se as variáveis estão sendo carregadas (apenas em desenvolvimento).

## 🔨 Como Corrigir

### Passo 1: Verificar eas.json

Certifique-se de que o `eas.json` tem as variáveis de ambiente configuradas para o perfil de build que você usou:

```json
{
  "build": {
    "preview": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://lrkqhubivgozjkcdbisg.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  }
}
```

### Passo 2: Rebuild do APK

Após verificar as configurações, faça um novo build:

```bash
# Limpar cache e rebuild
eas build --platform android --profile preview --clear-cache
```

### Passo 3: Verificar Logs

Se o problema persistir, verifique os logs do dispositivo:

```bash
# Conectar dispositivo via USB e ver logs
adb logcat | grep -i "supabase\|network\|error"
```

### Passo 4: Testar Conexão

No código, há uma função `checkSupabaseConnection()` que verifica a conexão antes do login. Se essa verificação falhar, o erro será mais claro.

## 🔍 Debug Adicional

### Verificar se as variáveis estão no build

Adicione temporariamente este código em `lib/supabase.ts` para verificar:

```typescript
console.log('🔧 Debug Supabase:', {
  url: supabaseUrl ? 'OK' : 'MISSING',
  key: supabaseAnonKey ? 'OK' : 'MISSING',
  envUrl: !!process.env.EXPO_PUBLIC_SUPABASE_URL,
  envKey: !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
});
```

### Testar conexão manualmente

No dispositivo, abra um navegador e tente acessar:
```
https://lrkqhubivgozjkcdbisg.supabase.co
```

Se não conseguir acessar, pode ser problema de firewall ou DNS.

## ⚠️ Importante

1. **As variáveis de ambiente devem estar no `eas.json`** para serem incluídas no build
2. **Não use `.env` para builds de produção** - ele não é incluído no APK
3. **Sempre faça rebuild após alterar `eas.json`**
4. **Use `--clear-cache` se o problema persistir**

## 📝 Checklist

- [ ] Variáveis estão no `eas.json` para o perfil correto
- [ ] Permissões de internet estão no `app.config.js`
- [ ] Network Security Config está configurado
- [ ] Rebuild feito com `--clear-cache`
- [ ] Testado em dispositivo físico com internet
- [ ] Logs verificados para erros específicos

## 🆘 Se Ainda Não Funcionar

1. Verifique se o Supabase está acessível:
   - Acesse o dashboard do Supabase
   - Verifique se o projeto está ativo
   - Verifique se a URL está correta

2. Teste com Expo Go primeiro:
   ```bash
   npm run dev
   ```
   Se funcionar no Expo Go mas não no APK, é problema de build.

3. Verifique a versão do Android:
   - Alguns dispositivos Android mais antigos podem ter problemas
   - Teste em Android 8.0+ (API 26+)

4. Contate o suporte do Expo/EAS se necessário.

