# Solucao simples: adiciona Node.js ao PATH
$env:PATH += ";C:\Program Files\nodejs"

Write-Host "PATH atualizado. Testando..." -ForegroundColor Cyan
Write-Host ""

try {
    $nodeVersion = & "C:\Program Files\nodejs\node.exe" --version 2>&1
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
    
    $npmVersion = & "C:\Program Files\nodejs\npm.cmd" --version 2>&1
    Write-Host "npm: $npmVersion" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Sucesso! Agora voce pode executar: npm run build:apk" -ForegroundColor Green
} catch {
    Write-Host "Erro: Node.js pode nao estar instalado ou em outro local" -ForegroundColor Red
    Write-Host "Instale Node.js de: https://nodejs.org/" -ForegroundColor Yellow
}

