# Solução para Erro node:sea no Windows

## Problema
O erro `ENOENT: no such file or directory, mkdir 'node:sea'` ocorre quando se usa Node.js v24+ com Expo CLI no Windows.

## Solução Recomendada: Usar Node.js v20.x

### Opção 1: Usar nvm-windows (Recomendado)

1. **Instalar nvm-windows:**
   - Baixe de: https://github.com/coreybutler/nvm-windows/releases
   - Execute o instalador

2. **Instalar Node.js v20:**
   ```powershell
   nvm install 20.11.1
   nvm use 20.11.1
   ```

3. **Verificar versão:**
   ```powershell
   node -v
   ```
   Deve mostrar: `v20.11.1`

4. **Reinstalar dependências:**
   ```powershell
   npm install
   ```

5. **Executar o projeto:**
   ```powershell
   npm run dev
   ```

### Opção 2: Baixar Node.js v20 diretamente

1. Baixe Node.js v20 LTS de: https://nodejs.org/
2. Instale a versão v20.x
3. Reinicie o terminal
4. Execute `npm run dev`

## Por que isso acontece?

O Node.js v24 introduziu o recurso SEA (Single Executable Applications) que causa conflito com o Expo CLI no Windows ao tentar criar diretórios com `:` no nome, o que não é permitido no sistema de arquivos Windows.

## Versões Testadas

- ✅ Node.js v20.11.1 - Funciona perfeitamente
- ❌ Node.js v24.12.0 - Apresenta o erro

## Alternativa Temporária

Se não puder mudar a versão do Node.js agora, você pode tentar:

```powershell
# Criar diretório manualmente antes
New-Item -ItemType Directory -Force -Path ".expo\metro\externals\node_sea" | Out-Null
npm run dev
```

Mas a solução mais estável é usar Node.js v20.x.

