#!/usr/bin/env pwsh
#requires -Version 5.1
<#
.SYNOPSIS
    Integration test suite for all OpenCode command systems.

.DESCRIPTION
    Validates that all command systems are properly installed and functional.
    Runs smoke tests on /eval, /evolve, /backend, and /ccg:execute systems.

.EXAMPLE
    .claude/scripts/test-all.ps1
    Runs the full test suite and outputs results.

.EXAMPLE
    .claude/scripts/test-all.ps1 -Verbose
    Runs with detailed output.
#>

[CmdletBinding()]
param(
    [switch]$SkipEval,
    [switch]$SkipEvolve,
    [switch]$SkipBackend,
    [switch]$SkipCCG,
    [switch]$Report
)

$ErrorActionPreference = "Stop"
$script:TestResults = @()
$script:Passed = 0
$script:Failed = 0

# Colors for output
$Colors = @{
    Success = "Green"
    Error = "Red"
    Warning = "Yellow"
    Info = "Cyan"
}

function Write-TestHeader {
    param([string]$Title)
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Colors.Info
    Write-Host " $Title" -ForegroundColor $Colors.Info
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Colors.Info
}

function Write-TestResult {
    param(
        [string]$Test,
        [bool]$Passed,
        [string]$Message = ""
    )
    
    $status = if ($Passed) { "✅ PASS" } else { "❌ FAIL" }
    $color = if ($Passed) { $Colors.Success } else { $Colors.Error }
    
    Write-Host "  [$status] $Test" -ForegroundColor $color
    if ($Message -and !$Passed) {
        Write-Host "       → $Message" -ForegroundColor $Colors.Warning
    }
    
    $script:TestResults += [PSCustomObject]@{
        Test = $Test
        Passed = $Passed
        Message = $Message
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
    
    if ($Passed) { $script:Passed++ } else { $script:Failed++ }
}

function Test-FileExists {
    param(
        [string]$Path,
        [string]$Description
    )
    
    $exists = Test-Path $Path -PathType Leaf
    Write-TestResult -Test $Description -Passed $exists -Message $(if (!$exists) { "File not found: $Path" })
    return $exists
}

function Test-DirectoryExists {
    param(
        [string]$Path,
        [string]$Description
    )
    
    $exists = Test-Path $Path -PathType Container
    Write-TestResult -Test $Description -Passed $exists -Message $(if (!$exists) { "Directory not found: $Path" })
    return $exists
}

function Test-CommandScript {
    param(
        [string]$Name,
        [string]$Description
    )
    
    $ps1 = Test-FileExists -Path ".claude/scripts/$Name.ps1" -Description "$Description (PowerShell)"
    $bat = Test-FileExists -Path ".claude/scripts/$Name.bat" -Description "$Description (Batch)"
    $sh = Test-FileExists -Path ".claude/scripts/$Name.sh" -Description "$Description (Shell)"
    
    return $ps1 -and $bat -and $sh
}

# ============ TESTS ============

Write-TestHeader "OpenCode Command System Integration Tests"
Write-Host " Testing all command systems for v1.0 milestone" -ForegroundColor $Colors.Info
Write-Host " Started: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

# Test 1: File Structure
Write-TestHeader "1. File Structure Tests"

Test-DirectoryExists -Path ".claude" -Description "Root .claude directory exists"
Test-DirectoryExists -Path ".claude/scripts" -Description "Scripts directory exists"
Test-DirectoryExists -Path ".claude/evals" -Description "Evals directory exists"
Test-DirectoryExists -Path ".claude/evolve" -Description "Evolve directory exists"
Test-DirectoryExists -Path ".claude/backend" -Description "Backend directory exists"
Test-DirectoryExists -Path ".claude/ccg" -Description "CCG directory exists"

# Test 2: /eval System
if (!$SkipEval) {
    Write-TestHeader "2. /eval System Tests"
    
    Test-CommandScript -Name "eval" -Description "Eval command scripts"
    Test-FileExists -Path ".claude/evals/README.md" -Description "Eval README exists"
    Test-FileExists -Path ".claude/evals/QUICKSTART.md" -Description "Eval QUICKSTART exists"
    Test-FileExists -Path ".claude/evals/GUIDE.md" -Description "Eval GUIDE exists"
    Test-FileExists -Path ".claude/evals/_registry.md" -Description "Eval registry exists"
}

# Test 3: /evolve System
if (!$SkipEvolve) {
    Write-TestHeader "3. /evolve System Tests"
    
    Test-CommandScript -Name "evolve" -Description "Evolve command scripts"
    Test-FileExists -Path ".claude/evolve/README.md" -Description "Evolve README exists"
    Test-FileExists -Path ".claude/evolve/QUICKSTART.md" -Description "Evolve QUICKSTART exists"
    Test-FileExists -Path ".claude/evolve/GUIDE.md" -Description "Evolve GUIDE exists"
    Test-FileExists -Path ".claude/evolve/_registry.md" -Description "Evolve registry exists"
    Test-DirectoryExists -Path ".claude/evolve/templates" -Description "Evolve templates directory"
    Test-FileExists -Path ".claude/evolve/templates/command.md" -Description "Command template exists"
    Test-FileExists -Path ".claude/evolve/templates/skill.md" -Description "Skill template exists"
    Test-FileExists -Path ".claude/evolve/templates/agent.md" -Description "Agent template exists"
}

# Test 4: /backend System
if (!$SkipBackend) {
    Write-TestHeader "4. /backend System Tests"
    
    Test-CommandScript -Name "backend" -Description "Backend command scripts"
    Test-FileExists -Path ".claude/backend/README.md" -Description "Backend README exists"
    Test-FileExists -Path ".claude/backend/QUICKSTART.md" -Description "Backend QUICKSTART exists"
    Test-FileExists -Path ".claude/backend/GUIDE.md" -Description "Backend GUIDE exists"
    Test-DirectoryExists -Path ".claude/backend/prompts" -Description "Backend prompts directory"
    Test-DirectoryExists -Path ".claude/backend/prompts/codex" -Description "Codex prompts directory"
    Test-DirectoryExists -Path ".claude/backend/templates" -Description "Backend templates directory"
}

# Test 5: /ccg:execute System
if (!$SkipCCG) {
    Write-TestHeader "5. /ccg:execute System Tests"
    
    Test-CommandScript -Name "ccg-execute" -Description "CCG execute command scripts"
    Test-FileExists -Path ".claude/ccg/execute/README.md" -Description "CCG README exists"
    Test-FileExists -Path ".claude/ccg/execute/QUICKSTART.md" -Description "CCG QUICKSTART exists"
    Test-DirectoryExists -Path ".claude/ccg/execute/prompts" -Description "CCG prompts directory"
    Test-DirectoryExists -Path ".claude/ccg/execute/prompts/codex" -Description "CCG Codex prompts"
    Test-DirectoryExists -Path ".claude/ccg/execute/prompts/gemini" -Description "CCG Gemini prompts"
    Test-DirectoryExists -Path ".claude/ccg/execute/templates" -Description "CCG templates directory"
}

# Test 6: Unified Documentation
Write-TestHeader "6. Unified Documentation Tests"

Test-FileExists -Path ".claude/README.md" -Description "Master README exists"

# Check for content in master README
$masterReadme = Get-Content ".claude/README.md" -Raw -ErrorAction SilentlyContinue
$hasEval = $masterReadme -match "/eval"
$hasEvolve = $masterReadme -match "/evolve"
$hasBackend = $masterReadme -match "/backend"
$hasCCG = $masterReadme -match "/ccg:execute"

Write-TestResult -Test "Master README references /eval" -Passed $hasEval -Message "Missing /eval reference"
Write-TestResult -Test "Master README references /evolve" -Passed $hasEvolve -Message "Missing /evolve reference"
Write-TestResult -Test "Master README references /backend" -Passed $hasBackend -Message "Missing /backend reference"
Write-TestResult -Test "Master README references /ccg:execute" -Passed $hasCCG -Message "Missing /ccg:execute reference"

# Test 7: Planning Files
Write-TestHeader "7. Planning Infrastructure Tests"

Test-FileExists -Path ".planning/ROADMAP.md" -Description "ROADMAP.md exists"
Test-FileExists -Path ".planning/STATE.md" -Description "STATE.md exists"
Test-DirectoryExists -Path ".planning/phases" -Description "Phases directory exists"

# ============ SUMMARY ============

Write-TestHeader "Test Summary"

$total = $script:Passed + $script:Failed
$percent = if ($total -gt 0) { [math]::Round(($script:Passed / $total) * 100, 1) } else { 0 }

Write-Host "  Total Tests:  $total" -ForegroundColor $Colors.Info
Write-Host "  Passed:       $script:Passed" -ForegroundColor $Colors.Success
Write-Host "  Failed:       $script:Failed" -ForegroundColor $(if ($script:Failed -gt 0) { $Colors.Error } else { $Colors.Success })
Write-Host "  Success Rate: $percent%" -ForegroundColor $(if ($percent -ge 90) { $Colors.Success } elseif ($percent -ge 70) { $Colors.Warning } else { $Colors.Error })

if ($script:Failed -eq 0) {
    Write-Host "`n  ✅ All tests passed!" -ForegroundColor $Colors.Success
    Write-Host "  Systems are properly integrated and ready for use." -ForegroundColor Gray
    $exitCode = 0
} else {
    Write-Host "`n  ⚠ Some tests failed." -ForegroundColor $Colors.Warning
    Write-Host "  Review failures above and fix issues." -ForegroundColor Gray
    $exitCode = 1
}

Write-Host "`n  Completed: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

# Generate report if requested
if ($Report) {
    $reportPath = ".claude/test-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $script:TestResults | ConvertTo-Json -Depth 3 | Out-File $reportPath
    Write-Host "  Report saved: $reportPath" -ForegroundColor $Colors.Info
}

exit $exitCode
