# Guia para Gerar APK - Futebol Legends

## Pré-requisitos

1. **Node.js instalado e no PATH**
   - Se `npm` não for reconhecido, execute: `powershell -ExecutionPolicy Bypass -File ./fix-node-path.ps1`
   - Ou reinstale Node.js de: https://nodejs.org/
   - **IMPORTANTE:** Reinicie o PowerShell após instalar Node.js

2. **Conta Expo** (gratuita): https://expo.dev/signup
3. **EAS CLI** instalado globalmente ou via npx
4. **Projeto configurado** com `eas.json`

## Passos para Gerar o APK

### 1. Instalar EAS CLI (se ainda não tiver)

```bash
npm install -g eas-cli
```

### 2. Fazer Login no Expo

```bash
eas login
```

Você será redirecionado para fazer login no navegador.

### 3. Configurar o Projeto EAS (primeira vez)

```bash
eas build:configure
```

Isso criará/atualizará o arquivo `eas.json` e `app.json` com o `projectId`.

### 4. Gerar APK para Android

**Opção A: Build na nuvem (recomendado)**
```bash
eas build --platform android --profile preview
```

**Opção B: Build local (requer Android Studio)**
```bash
eas build --platform android --profile preview --local
```

### 5. Acompanhar o Build

Após iniciar o build, você receberá um link para acompanhar o progresso. O build leva aproximadamente 10-20 minutos.

### 6. Download do APK

Quando o build estiver completo, você poderá:
- Baixar o APK diretamente do link fornecido
- Ou executar: `eas build:list` para ver todos os builds e seus links

## Perfis de Build Disponíveis

No arquivo `eas.json` temos 3 perfis:

- **preview**: APK para testes (distribuição interna)
- **production**: APK para produção
- **development**: Build com development client

## Troubleshooting

### Erro de autenticação
```bash
eas logout
eas login
```

### Ver builds anteriores
```bash
eas build:list
```

### Cancelar build em andamento
```bash
eas build:cancel [BUILD_ID]
```

## Notas Importantes

- O primeiro build pode demorar mais (criação do ambiente)
- Builds na nuvem são gratuitos para contas pessoais (com limites)
- O APK gerado pode ser instalado diretamente em dispositivos Android
- Para publicar na Play Store, use o perfil `production` e gere um AAB

