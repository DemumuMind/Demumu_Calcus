#requires -Version 5.1
# Eval Command System for Claude Code
# Usage: .\eval.ps1 [define|check|report|list|clean] [feature-name]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("define", "check", "report", "list", "clean")]
    [string]$Command,
    
    [Parameter(Mandatory=$false)]
    [string]$FeatureName,
    
    [Parameter(Mandatory=$false)]
    [switch]$Force
)

$ErrorActionPreference = "Stop"
# Resolve paths relative to script location using PSScriptRoot
$ScriptDir = $PSScriptRoot
$RootDir = Resolve-Path (Join-Path $ScriptDir "..")
$EvalsDir = Join-Path $RootDir "evals"
$RegistryFile = Join-Path $EvalsDir "_registry.md"
$LangFile = Join-Path $ScriptDir "eval.lang"

# Set UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Load language strings
function Get-LangString {
    param($Key)
    $strings = @{
        "CREATED_DIR" = "Created directory"
        "CREATED_EVAL" = "Created eval definition"
        "FILL_TEMPLATE" = "FILL THE TEMPLATE:"
        "OPEN_FILE" = "1. Open file"
        "ADD_CRITERIA" = "2. Add specific testable criteria"
        "SPECIFY_RESULTS" = "3. Specify expected results"
        "RUN_CHECK" = "4. Run"
        "NOT_FOUND" = "Eval not found. Create first"
        "EVAL_CHECK" = "EVAL CHECK"
        "CAPABILITY_CHECKS" = "CAPABILITY CHECKS"
        "REGRESSION_CHECKS" = "REGRESSION CHECKS"
        "PASS_FAIL_SKIP" = "[P]ASS, [F]AIL, or [S]KIP"
        "SUMMARY" = "SUMMARY"
        "CAPABILITY" = "Capability"
        "REGRESSION" = "Regression"
        "STATUS" = "Status"
        "READY_TO_SHIP" = "Ready to ship!"
        "NEEDS_WORK" = "Needs work"
        "NOT_STARTED" = "Not started or blocked"
        "SAVED_REPORT" = "Report saved"
        "EVAL_DEFINITIONS" = "EVAL DEFINITIONS"
        "NO_EVALS" = "No evals defined"
        "CREATE_FIRST" = "Create first"
        "CLEANING_LOGS" = "Cleaning old logs"
        "KEEP_10" = "Keeping last 10 entries"
        "ENTRIES" = "entries"
        "LESS_THAN_10" = "less than 10"
        "CLEAN_COMPLETE" = "Clean complete"
        "DELETED_OLD" = "Deleted old report"
    }
    
    if (Test-Path $LangFile) {
        $custom = Get-Content $LangFile -Encoding UTF8 -ErrorAction SilentlyContinue
        foreach ($line in $custom) {
            if ($line -match "^(.+?)\s*=\s*(.+)$") {
                $strings[$matches[1]] = $matches[2]
            }
        }
    }
    
    return $strings[$Key]
}

function Ensure-EvalsDir {
    if (-not (Test-Path $EvalsDir)) {
        New-Item -ItemType Directory -Path $EvalsDir -Force | Out-Null
        Write-Host ("* " + (Get-LangString "CREATED_DIR") + ": $EvalsDir") -ForegroundColor Green
    }
    if (-not (Test-Path $RegistryFile)) {
        "# Eval Registry`n## Format: name | status | last_check | cap_score | reg_score`n`n" | 
            Out-File -FilePath $RegistryFile -Encoding UTF8
    }
}

function Get-Registry {
    $registry = @()
    if (Test-Path $RegistryFile) {
        $lines = Get-Content $RegistryFile -Encoding UTF8
        foreach ($line in $lines) {
            if ($line -match "^\s*#" -or $line -match "^\s*$") { continue }
            # Match: name | status | last_check | cap_score | reg_score
            # All fields can contain spaces, trim them
            if ($line -match "^([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)$") {
                $item = New-Object -TypeName PSObject -Property @{
                    Name = $matches[1].Trim()
                    Status = $matches[2].Trim()
                    LastCheck = $matches[3].Trim()
                    CapabilityScore = $matches[4].Trim()
                    RegressionScore = $matches[5].Trim()
                }
                $registry += $item
            }
        }
    }
    return $registry
}

function Update-Registry {
    param($FeatureName, $Status, $CapabilityScore, $RegressionScore)
    
    $registry = Get-Registry
    $existing = $registry | Where-Object { $_.Name -eq $FeatureName }
    
    if ($existing) {
        $existing.Status = $Status
        $existing.LastCheck = (Get-Date -Format "yyyy-MM-dd HH:mm")
        $existing.CapabilityScore = $CapabilityScore
        $existing.RegressionScore = $RegressionScore
    } else {
        $registry += [PSCustomObject]@{
            Name = $FeatureName
            Status = $Status
            LastCheck = (Get-Date -Format "yyyy-MM-dd HH:mm")
            CapabilityScore = $CapabilityScore
            RegressionScore = $RegressionScore
        }
    }
    
    $content = "# Eval Registry`n## Format: name | status | last_check | cap_score | reg_score`n`n"
    foreach ($entry in $registry) {
        $content += "$($entry.Name) | $($entry.Status) | $($entry.LastCheck) | $($entry.CapabilityScore) | $($entry.RegressionScore)`n"
    }
    
    $content | Out-File -FilePath $RegistryFile -Encoding UTF8
}

function New-EvalDefinition {
    param($FeatureName)
    
    $filePath = Join-Path $EvalsDir "$FeatureName.md"
    $date = Get-Date -Format "yyyy-MM-dd HH:mm"
    
    # English template (safe for all systems)
    $template = @"
## EVAL: $FeatureName
Created: $date
Status: NOT STARTED

### Description
[Describe what is being tested]

### Capability Evals
- [ ] [Specific testable criterion 1]
- [ ] [Specific testable criterion 2]
- [ ] [Specific testable criterion 3]

### Regression Evals
- [ ] [Existing behavior 1 still works]
- [ ] [Existing behavior 2 still works]

### Success Criteria
- pass@3 > 90% for capability evals
- pass^3 = 100% for regression evals

### Notes
[Additional information]
"@
    
    $template | Out-File -FilePath $filePath -Encoding UTF8
    
    Update-Registry -FeatureName $FeatureName -Status "NOT STARTED" -CapabilityScore "0/0" -RegressionScore "0/0"
    
    Write-Host ""
    Write-Host "* $(Get-LangString 'CREATED_EVAL'): $filePath" -ForegroundColor Green
    Write-Host ""
    Write-Host (Get-LangString "FILL_TEMPLATE") -ForegroundColor Yellow
    Write-Host "  $(Get-LangString "OPEN_FILE"): $filePath"
    Write-Host "  $(Get-LangString "ADD_CRITERIA")"
    Write-Host "  $(Get-LangString "SPECIFY_RESULTS")"
    Write-Host "  $(Get-LangString "RUN_CHECK"): eval check $FeatureName"
    Write-Host ""
}

function Read-EvalDefinition {
    param($FeatureName)
    
    $filePath = Join-Path $EvalsDir "$FeatureName.md"
    
    if (-not (Test-Path $filePath)) {
        Write-Error "$(Get-LangString "NOT_FOUND"): eval define $FeatureName"
        return $null
    }
    
    $content = Get-Content $filePath -Encoding UTF8 -Raw
    
    $capabilityEvals = @()
    # Use single-line mode (?s) so . matches newlines
    if ($content -match "(?s)### Capability Evals\r?\n(.*?)(?=###|\z)") {
        $section = $matches[1]
        $lines = $section -split "\r?\n"
        foreach ($line in $lines) {
            if ($line -match "^- \[([ x])\] (.+)") {
                $capabilityEvals += [PSCustomObject]@{
                    Description = $matches[2].Trim()
                    Status = if ($matches[1] -eq "x") { "PASS" } else { "NOT_CHECKED" }
                }
            }
        }
    }
    
    $regressionEvals = @()
    if ($content -match "(?s)### Regression Evals\r?\n(.*?)(?=###|\z)") {
        $section = $matches[1]
        $lines = $section -split "\r?\n"
        foreach ($line in $lines) {
            if ($line -match "^- \[([ x])\] (.+)") {
                $regressionEvals += [PSCustomObject]@{
                    Description = $matches[2].Trim()
                    Status = if ($matches[1] -eq "x") { "PASS" } else { "NOT_CHECKED" }
                }
            }
        }
    }
    
    return [PSCustomObject]@{
        FeatureName = $FeatureName
        Content = $content
        CapabilityEvals = $capabilityEvals
        RegressionEvals = $regressionEvals
    }
}

function Invoke-EvalCheck {
    param($FeatureName)
    
    $definition = Read-EvalDefinition $FeatureName
    if (-not $definition) { return }
    
    Write-Host ""
    Write-Host "$(Get-LangString "EVAL_CHECK"): $FeatureName" -ForegroundColor Cyan
    Write-Host ("=" * 40)
    
    $capabilityPass = 0
    $capabilityTotal = $definition.CapabilityEvals.Count
    $regressionPass = 0
    $regressionTotal = $definition.RegressionEvals.Count
    
    Write-Host ""
    Write-Host (Get-LangString "CAPABILITY_CHECKS") -ForegroundColor Yellow
    foreach ($eval in $definition.CapabilityEvals) {
        Write-Host "  - $($eval.Description): " -NoNewline
        $response = Read-Host "[P]ASS, [F]AIL, [S]KIP?"
        switch ($response.ToUpper()) {
            "P" { 
                $eval.Status = "PASS"
                $capabilityPass++
                Write-Host "    [OK] PASS" -ForegroundColor Green
            }
            "F" { 
                $eval.Status = "FAIL"
                Write-Host "    [X] FAIL" -ForegroundColor Red
            }
            default { 
                Write-Host "    [-] SKIP" -ForegroundColor Gray
            }
        }
    }
    
    Write-Host ""
    Write-Host (Get-LangString "REGRESSION_CHECKS") -ForegroundColor Yellow
    foreach ($eval in $definition.RegressionEvals) {
        Write-Host "  - $($eval.Description): " -NoNewline
        $response = Read-Host "[P]ASS, [F]AIL, [S]KIP?"
        switch ($response.ToUpper()) {
            "P" { 
                $eval.Status = "PASS"
                $regressionPass++
                Write-Host "    [OK] PASS" -ForegroundColor Green
            }
            "F" { 
                $eval.Status = "FAIL"
                Write-Host "    [X] FAIL" -ForegroundColor Red
            }
            default { 
                Write-Host "    [-] SKIP" -ForegroundColor Gray
            }
        }
    }
    
    $totalPass = $capabilityPass + $regressionPass
    $totalEvals = $capabilityTotal + $regressionTotal
    
    if ($totalEvals -eq 0) {
        $status = "NOT STARTED"
    } elseif ($totalPass -eq $totalEvals) {
        $status = "READY"
    } elseif ($totalPass -gt 0) {
        $status = "IN PROGRESS"
    } else {
        $status = "NOT STARTED"
    }
    
    $filePath = Join-Path $EvalsDir "$FeatureName.md"
    $content = $definition.Content
    
    foreach ($eval in $definition.CapabilityEvals) {
        if ($eval.Status -eq "PASS") {
            $old = "- [ ] $($eval.Description)"
            $new = "- [x] $($eval.Description)"
            $content = $content.Replace($old, $new)
        }
    }
    foreach ($eval in $definition.RegressionEvals) {
        if ($eval.Status -eq "PASS") {
            $old = "- [ ] $($eval.Description)"
            $new = "- [x] $($eval.Description)"
            $content = $content.Replace($old, $new)
        }
    }
    
    $content = $content -replace "Status: .*", "Status: $status"
    $content | Out-File -FilePath $filePath -Encoding UTF8
    
    Update-Registry -FeatureName $FeatureName -Status $status -CapabilityScore "$capabilityPass/$capabilityTotal" -RegressionScore "$regressionPass/$regressionTotal"
    
    $logFile = Join-Path $EvalsDir "$FeatureName.log"
    $logEntry = "`n## [$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")] CHECK`nCapability: $capabilityPass/$capabilityTotal`nRegression: $regressionPass/$regressionTotal`nStatus: $status`n"
    Add-Content -Path $logFile -Value $logEntry -Encoding UTF8
    
    Write-Host ""
    Write-Host "---"
    Write-Host "$(Get-LangString "SUMMARY"):"
    Write-Host "$(Get-LangString "CAPABILITY"): $capabilityPass/$capabilityTotal"
    Write-Host "$(Get-LangString "REGRESSION"): $regressionPass/$regressionTotal"
    Write-Host "$(Get-LangString "STATUS"): $status"
    
    if ($status -eq "READY") {
        Write-Host ""
        Write-Host "* $(Get-LangString "READY_TO_SHIP")!" -ForegroundColor Green
    } elseif ($status -eq "IN PROGRESS") {
        Write-Host ""
        Write-Host "> $(Get-LangString "NEEDS_WORK")" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "X $(Get-LangString "NOT_STARTED")" -ForegroundColor Red
    }
}

function Get-EvalReport {
    param($FeatureName)
    
    $definition = Read-EvalDefinition $FeatureName
    if (-not $definition) { return }
    
    $logFile = Join-Path $EvalsDir "$FeatureName.log"
    $logs = ""
    if (Test-Path $logFile) {
        $logs = Get-Content $logFile -Encoding UTF8 -Raw
    }
    
    $report = @"

EVAL REPORT: $FeatureName
=========================
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm")

CAPABILITY EVALS
----------------
"@
    
    foreach ($eval in $definition.CapabilityEvals) {
        $symbol = if ($eval.Status -eq "PASS") { "[OK]" } else { "[X]" }
        $status = $eval.Status
        $report += "`n$symbol $($eval.Description): $status"
    }
    
    $report += @"

REGRESSION EVALS
----------------
"@
    
    foreach ($eval in $definition.RegressionEvals) {
        $symbol = if ($eval.Status -eq "PASS") { "[OK]" } else { "[X]" }
        $status = $eval.Status
        $report += "`n$symbol $($eval.Description): $status"
    }
    
    $capTotal = $definition.CapabilityEvals.Count
    $capPass = ($definition.CapabilityEvals | Where-Object { $_.Status -eq "PASS" }).Count
    $regTotal = $definition.RegressionEvals.Count
    $regPass = ($definition.RegressionEvals | Where-Object { $_.Status -eq "PASS" }).Count
    
    $capPass1 = if ($capTotal -gt 0) { [math]::Round(($capPass / $capTotal) * 100, 0) } else { 0 }
    
    $report += @"

METRICS
-------
Capability pass@1: $capPass1%
Capability: $capPass/$capTotal
Regression: $regPass/$regTotal

CHECK HISTORY
-------------
$logs

RECOMMENDATION
--------------
"@
    
    if ($capPass -eq $capTotal -and $regPass -eq $regTotal -and $capTotal + $regTotal -gt 0) {
        $report += "[SHIP] Ready to ship"
    } elseif ($capPass + $regPass -gt 0) {
        $report += "[NEEDS WORK] Requires additional work"
    } else {
        $report += "[NOT STARTED] Not started"
    }
    
    Write-Host $report -ForegroundColor White
    
    $reportFile = Join-Path $EvalsDir "$FeatureName-report-$(Get-Date -Format "yyyyMMdd-HHmm").md"
    $report | Out-File -FilePath $reportFile -Encoding UTF8
    Write-Host ""
    Write-Host "* $(Get-LangString "SAVED_REPORT"): $reportFile" -ForegroundColor Green
}

function Get-EvalList {
    $registry = Get-Registry
    
    Write-Host ""
    Write-Host (Get-LangString "EVAL_DEFINITIONS") -ForegroundColor Cyan
    Write-Host ("=" * 40)
    
    if (-not $registry -or $registry.Count -eq 0) {
        Write-Host (Get-LangString "NO_EVALS") -ForegroundColor Gray
        Write-Host "$(Get-LangString "CREATE_FIRST"): eval define <name>" -ForegroundColor Gray
        return
    }
    
    foreach ($entry in $registry) {
        $color = switch ($entry.Status) {
            "READY" { "Green" }
            "IN PROGRESS" { "Yellow" }
            "BLOCKED" { "Red" }
            default { "Gray" }
        }
        
        $namePadded = $entry.Name
        if ($namePadded.Length -lt 20) {
            $namePadded = $namePadded + (" " * (20 - $namePadded.Length))
        }
        
        Write-Host "$namePadded " -NoNewline
        Write-Host "[$($entry.CapabilityScore) | $($entry.RegressionScore)] " -NoNewline -ForegroundColor White
        Write-Host $entry.Status -ForegroundColor $color
    }
    
    Write-Host ""
}

function Clear-OldLogs {
    $files = Get-ChildItem $EvalsDir -Filter "*.log" -ErrorAction SilentlyContinue
    
    Write-Host ""
    Write-Host (Get-LangString "CLEANING_LOGS") -ForegroundColor Cyan
    
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Encoding UTF8
        $entries = $content -split "\n## " | Where-Object { $_.Trim() }
        
        if ($entries.Count -gt 10) {
            $newContent = "## " + ($entries | Select-Object -Last 10 | Join-String -Separator "`n## ")
            $newContent | Out-File -FilePath $file.FullName -Encoding UTF8
            Write-Host "  * $($file.Name): $(Get-LangString "KEEP_10")" -ForegroundColor Green
        } else {
            Write-Host "  - $($file.Name): $($entries.Count) $(Get-LangString "ENTRIES") ($(Get-LangString "LESS_THAN_10"))" -ForegroundColor Gray
        }
    }
    
    $reports = Get-ChildItem $EvalsDir -Filter "*report-*.md" -ErrorAction SilentlyContinue
    $cutoff = (Get-Date).AddDays(-30)
    
    foreach ($report in $reports) {
        if ($report.LastWriteTime -lt $cutoff) {
            Remove-Item $report.FullName -Force
            Write-Host "  * $(Get-LangString "DELETED_OLD"): $($report.Name)" -ForegroundColor Green
        }
    }
    
    Write-Host ""
    Write-Host "* $(Get-LangString "CLEAN_COMPLETE")" -ForegroundColor Green
}

# Main execution
Ensure-EvalsDir

switch ($Command) {
    "define" {
        if (-not $FeatureName) {
            Write-Error "Feature name required: eval define <name>"
            exit 1
        }
        New-EvalDefinition -FeatureName $FeatureName
    }
    "check" {
        if (-not $FeatureName) {
            Write-Error "Feature name required: eval check <name>"
            exit 1
        }
        Invoke-EvalCheck -FeatureName $FeatureName
    }
    "report" {
        if (-not $FeatureName) {
            Write-Error "Feature name required: eval report <name>"
            exit 1
        }
        Get-EvalReport -FeatureName $FeatureName
    }
    "list" {
        Get-EvalList
    }
    "clean" {
        Clear-OldLogs
    }
}
