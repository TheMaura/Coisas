# Atualizar Dependências - Solução para Erros de Build

## Problema Identificado

O build está falhando porque:
1. React Native está desatualizado (0.73.2 → 0.73.6)
2. Erro do Gradle com expo-module-gradle-plugin

## ✅ Solução Aplicada

Atualizei o `package.json` para usar React Native 0.73.6.

## 🔄 Próximos Passos

### 1. Atualizar todas as dependências

Execute no seu terminal:

```bash
npx expo install --fix
```

Este comando irá:
- Atualizar todas as dependências para versões compatíveis com Expo SDK 50
- Corrigir incompatibilidades automaticamente

### 2. Verificar dependências

```bash
npx expo doctor
```

Deve mostrar que tudo está OK agora.

### 3. Rebuild

Após atualizar as dependências:

```bash
eas build --platform android --profile preview --clear-cache
```

## 📝 Se o erro persistir

### Opção 1: Atualização manual completa

```bash
# Remover node_modules e lock file
rm -rf node_modules package-lock.json

# Reinstalar tudo
npm install

# Corrigir versões do Expo
npx expo install --fix

# Verificar
npx expo doctor
```

### Opção 2: Usar versões específicas recomendadas

Se ainda houver problemas, use estas versões exatas:

```json
{
  "expo": "~50.0.17",
  "react": "18.2.0",
  "react-native": "0.73.6",
  "expo-router": "~3.4.0"
}
```

Depois execute:
```bash
npm install
npx expo install --fix
```

## 🔍 Verificar Logs

Se o build ainda falhar, verifique:
1. Os logs completos do build no EAS
2. Execute `npx expo doctor` localmente
3. Verifique se todas as dependências estão atualizadas

## 📚 Referências

- Expo SDK 50: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
- Dependency Management: https://docs.expo.dev/guides/using-libraries/

