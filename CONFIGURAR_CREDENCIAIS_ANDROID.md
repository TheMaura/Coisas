# Configurar Credenciais Android para EAS Build

## Problema

O erro "Generating a new Keystore is not supported in --non-interactive mode" ocorre porque o EAS precisa de credenciais Android configuradas antes de fazer o build pelo site.

## Solução: Configurar Credenciais via CLI

Execute os seguintes comandos no terminal local:

### 1. Instalar EAS CLI (se ainda não tiver)

```bash
npm install -g eas-cli
```

### 2. Fazer Login no Expo

```bash
eas login
```

### 3. Configurar Credenciais Android

```bash
eas credentials
```

Quando solicitado:
- **Platform**: Selecione `Android`
- **Action**: Selecione `Set up Android credentials` ou `Generate new keystore`
- Deixe o EAS gerar e gerenciar o keystore automaticamente

### 4. Verificar Credenciais Configuradas

```bash
eas credentials
```

Selecione `Android` e verifique se as credenciais estão configuradas.

## Após Configurar

Depois de configurar as credenciais, você poderá fazer builds pelo site da Expo sem problemas.

### Opção Alternativa: Usar Perfil Preview

Se não quiser configurar credenciais agora, use o perfil **preview** no site da Expo:
- Platform: Android
- Profile: **preview** (em vez de production)

O perfil preview é mais simples e pode funcionar sem configuração prévia de credenciais.

## Troubleshooting

### Se o comando `eas credentials` não funcionar:

1. Verifique se está logado:
```bash
eas whoami
```

2. Se não estiver logado:
```bash
eas login
```

3. Tente novamente:
```bash
eas credentials
```

### Se ainda tiver problemas:

Execute um build via CLI primeiro para forçar a criação de credenciais:

```bash
eas build --platform android --profile preview
```

Isso criará as credenciais automaticamente e depois você poderá usar o site da Expo.

