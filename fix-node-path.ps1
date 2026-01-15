# Script para corrigir PATH do Node.js no PowerShell

Write-Host "=== Verificando Node.js e npm ===" -ForegroundColor Cyan
Write-Host ""

# Verificar instalações comuns do Node.js
$nodePaths = @(
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:APPDATA\npm",
    "$env:LOCALAPPDATA\Programs\nodejs"
)

$nodeFound = $false
$npmFound = $false

foreach ($path in $nodePaths) {
    if (Test-Path $path) {
        Write-Host "Encontrado: $path" -ForegroundColor Green
        
        $nodeExe = Join-Path $path "node.exe"
        $npmCmd = Join-Path $path "npm.cmd"
        
        if (Test-Path $nodeExe) {
            Write-Host "  ✓ node.exe encontrado" -ForegroundColor Green
            $nodeFound = $true
        }
        
        if (Test-Path $npmCmd) {
            Write-Host "  ✓ npm.cmd encontrado" -ForegroundColor Green
            $npmFound = $true
        }
    }
}

Write-Host ""

if (-not $nodeFound) {
    Write-Host "Node.js não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Soluções:" -ForegroundColor Yellow
    Write-Host "1. Instale Node.js de: https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Ou use nvm-windows para gerenciar versões" -ForegroundColor White
    Write-Host ""
    Write-Host "Após instalar, REINICIE o PowerShell!" -ForegroundColor Yellow
    exit 1
}

if (-not $npmFound) {
    Write-Host "npm não encontrado!" -ForegroundColor Red
    Write-Host "Reinstale o Node.js (npm vem junto)" -ForegroundColor Yellow
    exit 1
}

# Verificar se está no PATH
$currentPath = $env:PATH
$nodeInPath = $false

foreach ($path in $nodePaths) {
    if ($currentPath -like "*$path*") {
        Write-Host "✓ $path está no PATH" -ForegroundColor Green
        $nodeInPath = $true
        break
    }
}

if (-not $nodeInPath) {
    Write-Host ""
    Write-Host "Node.js não está no PATH!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para adicionar temporariamente nesta sessão:" -ForegroundColor Cyan
    Write-Host '$env:PATH += ";C:\Program Files\nodejs"' -ForegroundColor White
    Write-Host ""
    Write-Host "Para adicionar permanentemente:" -ForegroundColor Cyan
    Write-Host '[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", "User")' -ForegroundColor White
    Write-Host ""
    Write-Host "Ou REINICIE o PowerShell após instalar o Node.js" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "✓ Node.js está configurado corretamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Testando..." -ForegroundColor Cyan
    Write-Host ""
    
    # Tentar executar node e npm
    try {
        $nodeVersion = & node --version 2>&1
        Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
        
        $npmVersion = & npm --version 2>&1
        Write-Host "npm: $npmVersion" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "Tudo funcionando! Você pode executar:" -ForegroundColor Green
        Write-Host "  npm run build:apk" -ForegroundColor Cyan
    } catch {
        Write-Host "Erro ao executar node/npm: $_" -ForegroundColor Red
        Write-Host "Tente reiniciar o PowerShell" -ForegroundColor Yellow
    }
}

