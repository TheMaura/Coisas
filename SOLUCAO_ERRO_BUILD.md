# Solução para Erro no Build do APK

## Problema: Build Errored

Se o build do EAS retornou "Errored", siga estes passos para diagnosticar e resolver:

## 🔍 Passo 1: Verificar os Logs do Build

1. Acesse o link do build que foi fornecido
2. Ou execute:
   ```bash
   eas build:list
   ```
3. Clique no build com erro para ver os logs detalhados

## 🛠️ Problemas Comuns e Soluções

### 1. Erro: "Missing app icon" ou "Missing splash screen"

**Solução:** Criar assets básicos

Crie os seguintes arquivos na pasta `assets/`:

- `icon.png` - 1024x1024px (ícone do app)
- `splash.png` - 2048x2048px (tela de splash)
- `adaptive-icon.png` - 1024x1024px (ícone adaptativo Android)
- `favicon.png` - 48x48px (para web)
- `notification-icon.png` - 96x96px (para notificações)

**Solução rápida:** Use placeholders temporários ou remova as referências do `app.json` temporariamente.

### 2. Erro: "Invalid package name" ou problemas com package

**Solução:** Verificar `app.json`

Certifique-se de que o `package` no Android está correto:
```json
"android": {
  "package": "com.futebollegends.app"
}
```

### 3. Erro: "Missing environment variables"

**Solução:** Configurar variáveis no EAS

```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "sua_url"
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "sua_chave"
```

Ou configure no arquivo `.env` e use `eas.json` para incluí-las no build.

### 4. Erro: "Gradle build failed"

**Solução:** Verificar configuração do Android

Atualize o `eas.json`:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  }
}
```

### 5. Erro: "Missing project ID"

**Solução:** Configurar projeto EAS

```bash
eas build:configure
```

Isso criará o `projectId` no `app.json`.

## 🔧 Solução Rápida: Build Simplificado

Tente um build mais básico primeiro:

```bash
eas build --platform android --profile preview --clear-cache
```

## 📝 Checklist Antes de Rebuild

- [ ] Assets criados (icon.png, splash.png, etc.) ou removidos do app.json
- [ ] Variáveis de ambiente configuradas (se necessário)
- [ ] `eas.json` configurado corretamente
- [ ] `app.json` com package name válido
- [ ] Projeto EAS configurado (`eas build:configure` executado)

## 🚀 Próximos Passos

1. **Ver logs detalhados** do build que falhou
2. **Identificar o erro específico** nos logs
3. **Aplicar a solução** correspondente acima
4. **Tentar build novamente**:
   ```bash
   eas build --platform android --profile preview --clear-cache
   ```

## 💡 Dica: Build Local para Debug

Se os builds na nuvem continuarem falhando, tente build local:

```bash
eas build --platform android --profile preview --local
```

**Requisitos:**
- Android Studio instalado
- Android SDK configurado
- Mais rápido para debug, mas requer configuração local

## 📞 Ajuda Adicional

Se o problema persistir:
1. Copie o erro completo dos logs
2. Verifique a documentação do Expo: https://docs.expo.dev/build/introduction/
3. Consulte o fórum: https://forums.expo.dev/

