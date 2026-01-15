# Solução para Erro Gradle - Expo Modules Core

## Erro Encontrado

```
Could not get unknown property 'release' for SoftwareComponent container
```

Este erro ocorre devido a incompatibilidade entre versões do Expo e Gradle.

## ✅ Soluções Aplicadas

### 1. Atualização do React Native
- React Native atualizado de `0.73.2` para `0.73.6` (versão compatível com Expo SDK 50)

### 2. Configuração do EAS Build
- Removido `gradleCommand` específico que causava conflito
- Configuração simplificada para usar padrões do EAS Build

## 🔄 Próximos Passos

### ⚠️ IMPORTANTE: Atualizar Dependências Primeiro!

**Antes de fazer rebuild, atualize todas as dependências:**

```bash
npm run update:deps
# ou manualmente:
npx expo install --fix
```

Isso garantirá que todas as dependências estejam nas versões corretas.

### Opção 1: Rebuild com cache limpo (Recomendado)

Após atualizar dependências:

```bash
eas build --platform android --profile preview --clear-cache
```

### Opção 2: Build com configuração específica

Se o erro persistir, tente:

```bash
eas build --platform android --profile preview --clear-cache --non-interactive
```

### Opção 3: Usar perfil de desenvolvimento primeiro

Para testar se o problema é específico do perfil preview:

```bash
eas build --platform android --profile development --clear-cache
```

## 🛠️ Se o Problema Persistir

### Solução Alternativa: Atualizar todas as dependências

1. **Atualizar Expo CLI:**
```bash
npm install -g @expo/cli@latest
```

2. **Atualizar dependências do projeto:**
```bash
npx expo install --fix
```

3. **Limpar cache:**
```bash
npx expo start --clear
```

4. **Rebuild:**
```bash
eas build --platform android --profile preview --clear-cache
```

### Verificar Versões

Certifique-se de que está usando versões compatíveis:

- Expo SDK: 50.x
- React Native: 0.73.x
- Node.js: 18.x ou 20.x (não 24.x)

## 📝 Notas

- O erro geralmente é resolvido atualizando o Expo para a versão mais recente
- Limpar o cache é importante após mudanças de configuração
- Se usar Node.js v24, considere voltar para v20.x (veja SOLUCAO_NODE.md)

## 🔗 Referências

- Expo SDK 50: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
- EAS Build Troubleshooting: https://docs.expo.dev/build/troubleshooting/

