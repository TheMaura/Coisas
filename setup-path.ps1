# Script para adicionar Node.js ao PATH temporariamente
$possiblePaths = @(
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:APPDATA\npm",
    "$env:LOCALAPPDATA\Programs\nodejs"
)

$nodePath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $nodeExe = Join-Path $path "node.exe"
        if (Test-Path $nodeExe) {
            $nodePath = $path
            break
        }
    }
}

if ($nodePath) {
    if ($env:PATH -notlike "*$nodePath*") {
        $env:PATH += ";$nodePath"
        Write-Host "Node.js adicionado ao PATH" -ForegroundColor Green
    } else {
        Write-Host "Node.js ja esta no PATH" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Testando Node.js e npm..." -ForegroundColor Cyan
    
    try {
        $nodeVersion = & "$nodePath\node.exe" --version
        Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
        
        $npmVersion = & "$nodePath\npm.cmd" --version
        Write-Host "npm: $npmVersion" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "Tudo funcionando! Agora voce pode executar: npm run build:apk" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao executar comandos" -ForegroundColor Red
    }
} else {
    Write-Host "Node.js nao encontrado" -ForegroundColor Red
    Write-Host "Instale Node.js de: https://nodejs.org/" -ForegroundColor Yellow
}

