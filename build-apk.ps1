# Script PowerShell para gerar APK do Futebol Legends
# Este script configura e executa o build do APK usando EAS Build

Write-Host "=== Build APK - Futebol Legends ===" -ForegroundColor Cyan
Write-Host ""

# Adicionar Node.js ao PATH se necessário
$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    if ($env:PATH -notlike "*$nodePath*") {
        $env:PATH += ";$nodePath"
        Write-Host "Node.js adicionado ao PATH" -ForegroundColor Yellow
    }
}

# Verificar se EAS CLI está instalado
Write-Host "Verificando EAS CLI..." -ForegroundColor Yellow
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue

if (-not $easInstalled) {
    Write-Host "EAS CLI não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g eas-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar EAS CLI. Tente manualmente: npm install -g eas-cli" -ForegroundColor Red
        exit 1
    }
}

Write-Host "EAS CLI encontrado!" -ForegroundColor Green
Write-Host ""

# Verificar se está logado
Write-Host "Verificando login no Expo..." -ForegroundColor Yellow
$loginCheck = eas whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Você precisa fazer login no Expo." -ForegroundColor Yellow
    Write-Host "Executando: eas login" -ForegroundColor Yellow
    eas login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao fazer login. Tente manualmente: eas login" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Login verificado!" -ForegroundColor Green
Write-Host ""

# Configurar projeto (se necessário)
if (-not (Test-Path ".eas.json")) {
    Write-Host "Configurando projeto EAS..." -ForegroundColor Yellow
    eas build:configure
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao configurar projeto." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Iniciando build do APK..." -ForegroundColor Cyan
Write-Host "Isso pode levar 10-20 minutos..." -ForegroundColor Yellow
Write-Host ""

# Executar build
eas build --platform android --profile preview

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Build iniciado com sucesso!" -ForegroundColor Green
    Write-Host "Acompanhe o progresso no link fornecido acima." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para ver todos os builds: eas build:list" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Erro ao iniciar build." -ForegroundColor Red
    Write-Host "Verifique os erros acima e tente novamente." -ForegroundColor Yellow
}

