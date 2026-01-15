# Script PowerShell para iniciar o Expo com workaround para Windows
# Criar diretório .expo manualmente antes
$expoDir = ".expo\metro\externals"
if (-not (Test-Path $expoDir)) {
    New-Item -ItemType Directory -Force -Path $expoDir | Out-Null
}

# Tentar criar um link simbólico ou arquivo para evitar o erro
$nodeSeaPath = Join-Path $expoDir "node_sea"
if (-not (Test-Path $nodeSeaPath)) {
    New-Item -ItemType Directory -Force -Path $nodeSeaPath | Out-Null
}

npx expo start

