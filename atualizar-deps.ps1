# Script para atualizar dependencias do Expo
Write-Host "=== Atualizando Dependencias do Expo ===" -ForegroundColor Cyan
Write-Host ""

# Adicionar Node.js ao PATH se necessario
$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    if ($env:PATH -notlike "*$nodePath*") {
        $env:PATH += ";$nodePath"
    }
}

Write-Host "1. Verificando versoes atuais..." -ForegroundColor Yellow
& npm list react-native expo --depth=0

Write-Host ""
Write-Host "2. Corrigindo versoes com expo install --fix..." -ForegroundColor Yellow
& npx expo install --fix

Write-Host ""
Write-Host "3. Verificando com expo doctor..." -ForegroundColor Yellow
& npx expo doctor

Write-Host ""
Write-Host "Concluido! Agora voce pode executar: npm run build:android" -ForegroundColor Green

