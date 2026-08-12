[CmdletBinding()]
param(
    [string]$Store = "dogsee-chew-store.myshopify.com",
    [string]$ThemeId = "164409344212",
    [switch]$WhatIf
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = Join-Path $repoRoot ".backup/$timestamp"
$backupZip = Join-Path $backupDir "theme-backup.zip"

New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Host "Creating local backup at $backupDir"

$items = Get-ChildItem $repoRoot -Force | Where-Object {
    $_.Name -notin @('.git', '.backup')
}

if ($items.Count -gt 0) {
    Compress-Archive -Path ($items | ForEach-Object { $_.FullName }) -DestinationPath $backupZip -Force
    Write-Host "Backup ZIP created: $backupZip"
} else {
    Write-Host "No theme files found to back up."
}

$gitStatus = git -C $repoRoot status --porcelain
if ($LASTEXITCODE -ne 0) {
    throw "Git status check failed."
}

if ($gitStatus) {
    Write-Host "Creating a backup commit for your current local changes..."
    git -C $repoRoot add -A | Out-Null
    git -C $repoRoot commit -m "Backup before Shopify pull $timestamp" | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Backup commit was skipped. You can still recover files from $backupDir"
    }
}

$pullCommand = "shopify theme pull --store $Store --theme $ThemeId"

if ($WhatIf) {
    Write-Host "WhatIf mode enabled. The command that would run is:"
    Write-Host $pullCommand
    return
}

Write-Host "Running: $pullCommand"
& shopify theme pull --store $Store --theme $ThemeId

if ($LASTEXITCODE -ne 0) {
    throw "Shopify theme pull failed."
}

Write-Host "Theme pull completed successfully."
Write-Host "If you need to restore files, use the backup in $backupDir"
