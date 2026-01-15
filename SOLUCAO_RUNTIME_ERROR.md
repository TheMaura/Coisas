# Solução para Erro Runtime - registerWebModule

## Erro Encontrado

```
(0 , _expoModulesCore.registerWebModule) is not a function
```

Este erro ocorre quando há incompatibilidade entre versões dos pacotes do Expo, especialmente `expo-modules-core` e `expo-font`.

## ✅ Solução Aplicada

Adicionei `expo-font` explicitamente ao `package.json` e atualizei o Expo para versão mais recente.

## 🔄 Próximos Passos

### 1. Limpar e Reinstalar Dependências

```bash
# Remover node_modules e lock file
rm -rf node_modules package-lock.json

# Reinstalar tudo
npm install

# Corrigir versões do Expo
npx expo install --fix
```

### 2. Limpar Cache do Metro/Expo

```bash
npx expo start --clear
```

Ou no Windows:
```bash
npm run dev:win
```

### 3. Verificar Versões

```bash
npx expo doctor
```

Deve mostrar que tudo está OK.

## 🛠️ Se o Problema Persistir

### Opção 1: Atualizar Todas as Dependências do Expo

```bash
npx expo install --fix
```

Isso garantirá que todos os pacotes do Expo estejam nas versões corretas.

### Opção 2: Reinstalar Pacotes Específicos

```bash
npm uninstall expo-font expo-modules-core
npx expo install expo-font expo-modules-core
```

### Opção 3: Verificar Versões Específicas

Certifique-se de que está usando:
- `expo`: `~50.0.17`
- `expo-font`: `~11.10.0`
- `expo-modules-core`: Versão compatível (gerenciada pelo Expo)

## 📝 Notas

- O erro geralmente ocorre quando `expo-font` não está instalado ou está em versão incompatível
- `expo-modules-core` é uma dependência interna do Expo e não deve ser instalada manualmente
- Sempre use `npx expo install` para pacotes do Expo ao invés de `npm install`

## 🔗 Referências

- Expo Font: https://docs.expo.dev/versions/latest/sdk/font/
- Dependency Management: https://docs.expo.dev/guides/using-libraries/

