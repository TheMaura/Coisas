# Como Gerar o APK - Guia Completo

## ⚠️ Problema: npm não reconhecido

Se você receber `npm : The term 'npm' is not recognized`, o Node.js não está no PATH ou não está instalado.

## ✅ Solução Passo a Passo

### Passo 1: Verificar se Node.js está instalado

Abra um **NOVO PowerShell** e execute:

```powershell
node --version
```

**Se funcionar:** Pule para o Passo 3.

**Se não funcionar:** Continue para o Passo 2.

### Passo 2: Instalar Node.js (se necessário)

1. Baixe Node.js LTS v20.x de: https://nodejs.org/
2. Instale normalmente
3. **IMPORTANTE:** Feche e abra um NOVO PowerShell
4. Teste: `node --version` e `npm --version`

### Passo 3: Adicionar Node.js ao PATH (temporário)

Se Node.js está instalado mas npm não funciona nesta sessão:

```powershell
$env:PATH += ";C:\Program Files\nodejs"
npm --version
```

Se funcionar, continue para o Passo 4.

### Passo 4: Gerar o APK

**Opção A - Script automatizado:**
```powershell
# Primeiro, adicione ao PATH se necessário
$env:PATH += ";C:\Program Files\nodejs"

# Depois execute o build
npm run build:apk
```

**Opção B - Manual:**
```powershell
# 1. Adicionar ao PATH (se necessário)
$env:PATH += ";C:\Program Files\nodejs"

# 2. Instalar EAS CLI (primeira vez)
npm install -g eas-cli

# 3. Fazer login no Expo
eas login

# 4. Configurar projeto (primeira vez)
eas build:configure

# 5. Gerar APK
eas build --platform android --profile preview
```

## 📝 Notas Importantes

- O build leva **10-20 minutos**
- Você precisa de uma **conta Expo** (gratuita): https://expo.dev/signup
- O APK será disponibilizado para download quando concluído
- Você receberá um link para acompanhar o progresso

## 🔧 Troubleshooting

### "npm não reconhecido" mesmo após instalar Node.js

**Solução:** Reinicie o PowerShell completamente (feche e abra novo)

### "EAS CLI não encontrado"

**Solução:** 
```powershell
npm install -g eas-cli
```

### Erro de autenticação

**Solução:**
```powershell
eas logout
eas login
```

## 📚 Documentação Adicional

- `BUILD_APK.md` - Guia detalhado de build
- `INICIO_RAPIDO.md` - Solução rápida de problemas
- `SOLUCAO_NODE.md` - Problemas com Node.js v24

