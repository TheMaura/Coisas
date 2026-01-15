# Script para configurar credenciais Android no EAS
# Execute este script antes de fazer builds pelo site da Expo

Write-Host "=== Configuracao de Credenciais Android para EAS ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se EAS CLI esta instalado
Write-Host "Verificando EAS CLI..." -ForegroundColor Yellow
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue

if (-not $easInstalled) {
    Write-Host "EAS CLI nao encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g eas-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar EAS CLI. Tente manualmente: npm install -g eas-cli" -ForegroundColor Red
        exit 1
    }
}

# Verificar login
Write-Host ""
Write-Host "Verificando login no Expo..." -ForegroundColor Yellow
$whoami = eas whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Voce nao esta logado. Fazendo login..." -ForegroundColor Yellow
    eas login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao fazer login. Tente manualmente: eas login" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Logado como: $whoami" -ForegroundColor Green
}

# Configurar credenciais Android
Write-Host ""
Write-Host "Configurando credenciais Android..." -ForegroundColor Yellow
Write-Host "Siga as instrucoes na tela:" -ForegroundColor Cyan
Write-Host "  1. Selecione: Android" -ForegroundColor White
Write-Host "  2. Selecione: Set up Android credentials" -ForegroundColor White
Write-Host "  3. Deixe o EAS gerar o keystore automaticamente" -ForegroundColor White
Write-Host ""

eas credentials

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Credenciais configuradas com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Agora voce pode fazer builds pelo site da Expo:" -ForegroundColor Cyan
    Write-Host "  https://expo.dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Ou via CLI:" -ForegroundColor Cyan
    Write-Host "  eas build --platform android --profile preview" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Erro ao configurar credenciais. Tente manualmente:" -ForegroundColor Red
    Write-Host "  eas credentials" -ForegroundColor White
    exit 1
}
