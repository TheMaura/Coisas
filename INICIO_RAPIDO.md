# Início Rápido - Gerar APK

## Problema: npm não reconhecido

Se você receber o erro `npm : The term 'npm' is not recognized`, siga estes passos:

### Solução Rápida (Temporária)

**Opção 1 - Script simples (recomendado):**
```powershell
npm run setup:path:simple
# ou
powershell -ExecutionPolicy Bypass -File ./setup-path-simple.ps1
```

**Opção 2 - Script completo:**
```powershell
npm run setup:path
# ou
powershell -ExecutionPolicy Bypass -File ./setup-path.ps1
```

**Opção 3 - Manual (mais rápido):**
```powershell
$env:PATH += ";C:\Program Files\nodejs"
npm run build:apk
```

Depois execute:
```powershell
npm run build:apk
```

### Solução Permanente

**Opção 1: Reiniciar PowerShell**
- Feche e abra um novo PowerShell
- O Node.js deve estar no PATH automaticamente

**Opção 2: Adicionar ao PATH manualmente**

Execute no PowerShell (como Administrador):
```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", "User")
```

Depois reinicie o PowerShell.

**Opção 3: Verificar instalação do Node.js**

Execute o script de diagnóstico:
```powershell
powershell -ExecutionPolicy Bypass -File ./fix-node-path.ps1
```

## Gerar APK (após corrigir PATH)

1. **Configurar PATH (se necessário):**
   ```powershell
   powershell -ExecutionPolicy Bypass -File ./setup-path.ps1
   ```

2. **Gerar APK:**
   ```powershell
   npm run build:apk
   ```

3. **Seguir instruções na tela:**
   - Fazer login no Expo (se necessário)
   - Aguardar build (10-20 minutos)
   - Baixar APK quando concluído

## Comandos Úteis

```powershell
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar PATH atual
$env:PATH -split ';' | Select-String -Pattern 'node'
```

