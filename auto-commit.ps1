# Auto Git Commit Script
# Usage: .\auto-commit.ps1 "optional commit message"

param(
    [string]$CommitMessage = ""
)

$ErrorActionPreference = "Stop"
$repoPath = "D:\AAAAAAAAA\ai work\hermes\science-online-guide"

Set-Location $repoPath

# Check if this is a git repository
try {
    $null = git rev-parse --git-dir 2>&1
} catch {
    Write-Host "Error: Not a valid Git repository" -ForegroundColor Red
    exit 1
}

# Check for changes
$status = git status --porcelain 2>&1

if (-not $status) {
    Write-Host "No changes to commit" -ForegroundColor Yellow
    exit 0
}

# Show files to be committed
Write-Host ""
Write-Host "=== Files to commit ===" -ForegroundColor Cyan
git status --short

# Auto-generate commit message if not provided
if (-not $CommitMessage) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $CommitMessage = "update: auto commit at $timestamp"
}

Write-Host ""
Write-Host "=== Commit message ===" -ForegroundColor Cyan
Write-Host $CommitMessage

# Execute git operations
Write-Host ""
Write-Host "=== Committing ===" -ForegroundColor Cyan

git add .
git commit -m $CommitMessage

Write-Host ""
Write-Host "=== Pushing to remote ===" -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
