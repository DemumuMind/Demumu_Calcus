#requires -Version 5.1
# Evolve Command System for Claude Code
# Usage: .\evolve.ps1 [analyze|generate] [--generate]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("analyze", "generate", "list")]
    [string]$Command = "analyze",
    
    [Parameter(Mandatory=$false)]
    [switch]$Generate
)

$ErrorActionPreference = "Stop"

# Resolve paths
$ScriptDir = $PSScriptRoot
$RootDir = Resolve-Path (Join-Path $ScriptDir "..")
$InstinctsDir = Join-Path $RootDir "instincts"
$EvolveDir = Join-Path $RootDir "evolve"
$TemplatesDir = Join-Path $EvolveDir "templates"
$EvolvedDir = Join-Path $EvolveDir "evolved"
$CommandsDir = Join-Path $EvolvedDir "commands"
$SkillsDir = Join-Path $EvolvedDir "skills"
$AgentsDir = Join-Path $EvolvedDir "agents"
$RegistryFile = Join-Path $InstinctsDir "_registry.md"
$LangFile = Join-Path $ScriptDir "evolve.lang"

# Set UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Thresholds for evolution
$CommandThreshold = 80
$SkillThreshold = 75
$AgentThreshold = 70
$MinInstinctsForCommand = 2
$MinInstinctsForSkill = 2
$MinInstinctsForAgent = 3

# Language strings
function Get-LangString {
    param($Key)
    $strings = @{
        "ANALYZING_INSTINCTS" = "Analyzing instincts"
        "NO_INSTINCTS" = "No instincts found"
        "RECORD_FIRST" = "Record first instinct"
        "EVOLVE_ANALYSIS" = "EVOLVE ANALYSIS"
        "EVOLUTION_CANDIDATES" = "EVOLUTION CANDIDATES"
        "COMMAND_CANDIDATES" = "COMMAND CANDIDATES"
        "SKILL_CANDIDATES" = "SKILL CANDIDATES"
        "AGENT_CANDIDATES" = "AGENT CANDIDATES"
        "NO_CANDIDATES" = "No evolution candidates found"
        "GENERATING_FILES" = "Generating evolved files"
        "FILES_GENERATED" = "Files generated"
        "COMMAND_SUMMARY" = "Commands"
        "SKILL_SUMMARY" = "Skills"
        "AGENT_SUMMARY" = "Agents"
        "TOTAL" = "Total"
        "AVG_CONFIDENCE" = "Avg confidence"
        "INSTINCTS" = "instincts"
        "CLUSTER" = "Cluster"
        "FROM" = "From"
        "SCOPE" = "Scope"
        "DOMAINS" = "Domains"
        "STEPS" = "Steps"
        "TRIGGERS" = "Triggers"
        "CONFIDENCE_TOO_LOW" = "Confidence too low"
        "REVIEW_RECOMMENDED" = "Manual review recommended"
        "READY_FOR_USE" = "Ready for use"
        "EVOLVED_FROM" = "Evolved from"
        "VIEW_DETAILS" = "View details in"
        "CREATED_AT" = "Created"
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

function Ensure-Directory {
    param($Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Get-Instincts {
    $instincts = @()
    
    if (-not (Test-Path $InstinctsDir)) {
        return $instincts
    }
    
    $files = Get-ChildItem $InstinctsDir -Filter "*.md" -ErrorAction SilentlyContinue | 
             Where-Object { $_.Name -ne "_registry.md" }
    
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Encoding UTF8 -Raw
        
        # Parse instinct metadata
        $id = $file.BaseName
        $trigger = ""
        $action = ""
        $confidence = 0
        $domain = ""
        $scope = "project"
        $created = ""
        
        if ($content -match "## INSTINCT:\s*(\S+)") {
            $id = $matches[1]
        }
        if ($content -match "Created:\s*(.+?)(?:\n|\r)") {
            $created = $matches[1].Trim()
        }
        if ($content -match "Confidence:\s*(\d+)%") {
            $confidence = [int]$matches[1]
        }
        if ($content -match "Trigger:\s*(.+?)(?:\n|\r)") {
            $trigger = $matches[1].Trim()
        }
        if ($content -match "Action:\s*(.+?)(?:\n|\r)") {
            $action = $matches[1].Trim()
        }
        if ($content -match "Domain:\s*(.+?)(?:\n|\r)") {
            $domain = $matches[1].Trim()
        }
        if ($content -match "Scope:\s*(.+?)(?:\n|\r)") {
            $scope = $matches[1].Trim()
        }
        
        $instincts += [PSCustomObject]@{
            Id = $id
            File = $file.FullName
            Trigger = $trigger
            Action = $action
            Confidence = $confidence
            Domain = $domain
            Scope = $scope
            Created = $created
            Content = $content
        }
    }
    
    return $instincts
}

function Get-Clusters {
    param($Instincts)
    
    $clusters = @()
    
    # Group by domain first
    $domainGroups = $Instincts | Group-Object -Property Domain
    
    foreach ($domainGroup in $domainGroups) {
        $domain = $domainGroup.Name
        $domainInstincts = $domainGroup.Group
        
        # Within domain, look for workflow patterns (step1, step2, step3)
        $workflowInstincts = $domainInstincts | Where-Object { $_.Id -match "\d+$" }
        if ($workflowInstincts.Count -ge 2) {
            $workflowGroups = $workflowInstincts | Group-Object -Property { 
                $_.Id -replace "\d+$", "" -replace "-$", "" 
            }
            
            foreach ($wf in $workflowGroups) {
                if ($wf.Count -ge 2) {
                    $clusters += [PSCustomObject]@{
                        Type = "workflow"
                        Name = $wf.Name
                        Domain = $domain
                        Instincts = $wf.Group | Sort-Object Id
                        Count = $wf.Count
                    }
                }
            }
        }
        
        # Look for pattern-based groups (similar triggers)
        $triggerGroups = $domainInstincts | Group-Object -Property { 
            # Normalize trigger to find patterns
            $normalized = $_.Trigger -replace "\s+", " "
            if ($normalized -match "когда\s+(.+?)(?:\s*,|\s+тогда|\s*$)") {
                $matches[1]
            } else {
                $normalized
            }
        }
        
        foreach ($tg in $triggerGroups) {
            if ($tg.Count -ge 2 -and -not ($clusters | Where-Object { $_.Name -eq $tg.Name })) {
                $clusters += [PSCustomObject]@{
                    Type = "pattern"
                    Name = $tg.Name
                    Domain = $domain
                    Instincts = $tg.Group
                    Count = $tg.Count
                }
            }
        }
    }
    
    return $clusters
}

function Analyze-EvolutionCandidates {
    param($Instincts, $Clusters)
    
    $candidates = [PSCustomObject]@{
        Commands = @()
        Skills = @()
        Agents = @()
    }
    
    foreach ($cluster in $Clusters) {
        $avgConfidence = ($cluster.Instincts | Measure-Object -Property Confidence -Average).Average
        $domains = ($cluster.Instincts | Select-Object -ExpandProperty Domain -Unique) -join ", "
        $scopes = ($cluster.Instincts | Select-Object -ExpandProperty Scope -Unique) -join ", "
        
        # Determine evolution type
        $evolutionType = ""
        $threshold = 0
        $minInstincts = 0
        
        # Check for user-invoked patterns (commands)
        $userInvokedCount = ($cluster.Instincts | Where-Object { 
            $_.Trigger -match "пользователь|user|просит|asks|создании|creating" 
        }).Count
        
        # Check for auto-trigger patterns (skills)
        $autoTriggerCount = ($cluster.Instincts | Where-Object { 
            $_.Trigger -match "при|when|автоматически|automatically|ошибке|error" 
        }).Count
        
        # Check for complex workflow (agents)
        $hasSteps = ($cluster.Instincts | Where-Object { $_.Id -match "step\d+|шаг\d+" }).Count
        $isComplex = $cluster.Count -ge 3 -and ($cluster.Instincts | Measure-Object -Property Confidence -Minimum).Minimum -lt 90
        
        if ($cluster.Type -eq "workflow" -or ($hasSteps -gt 0 -and $isComplex)) {
            # Likely an agent (multi-step, complex)
            $evolutionType = "Agent"
            $threshold = $AgentThreshold
            $minInstincts = $MinInstinctsForAgent
        } elseif ($userInvokedCount -gt 0 -and $cluster.Type -eq "workflow") {
            # Likely a command (user-invoked workflow)
            $evolutionType = "Command"
            $threshold = $CommandThreshold
            $minInstincts = $MinInstinctsForCommand
        } elseif ($autoTriggerCount -eq $cluster.Count) {
            # Likely a skill (auto-triggered)
            $evolutionType = "Skill"
            $threshold = $SkillThreshold
            $minInstincts = $MinInstinctsForSkill
        } else {
            # Default: command for workflows, skill for patterns
            if ($cluster.Type -eq "workflow") {
                $evolutionType = "Command"
                $threshold = $CommandThreshold
                $minInstincts = $MinInstinctsForCommand
            } else {
                $evolutionType = "Skill"
                $threshold = $SkillThreshold
                $minInstincts = $MinInstinctsForSkill
            }
        }
        
        # Check if meets criteria
        if ($avgConfidence -ge $threshold -and $cluster.Count -ge $minInstincts) {
            $candidate = [PSCustomObject]@{
                Name = $cluster.Name
                Type = $evolutionType
                Domain = $domains
                Scope = $scopes
                InstinctCount = $cluster.Count
                AvgConfidence = [math]::Round($avgConfidence, 1)
                Instincts = $cluster.Instincts
                ClusterType = $cluster.Type
            }
            
            switch ($evolutionType) {
                "Command" { $candidates.Commands += $candidate }
                "Skill" { $candidates.Skills += $candidate }
                "Agent" { $candidates.Agents += $candidate }
            }
        }
    }
    
    return $candidates
}

function Show-EvolutionAnalysis {
    param($Instincts, $Candidates)
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "  $(Get-LangString "EVOLVE_ANALYSIS") - $($Instincts.Count) $(Get-LangString "INSTINCTS")" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""
    
    if ($Instincts.Count -eq 0) {
        Write-Host "$(Get-LangString "NO_INSTINCTS")" -ForegroundColor Yellow
        Write-Host "$(Get-LangString "RECORD_FIRST")" -ForegroundColor Gray
        return
    }
    
    # Summary statistics
    $highConfidence = ($Instincts | Where-Object { $_.Confidence -ge 80 }).Count
    Write-Host "$(Get-LangString "TOTAL"): $($Instincts.Count) | High confidence (>=80%): $highConfidence" -ForegroundColor White
    Write-Host ""
    
    # Command candidates
    if ($Candidates.Commands.Count -gt 0) {
        Write-Host "$(Get-LangString "COMMAND_CANDIDATES") ($($Candidates.Commands.Count))" -ForegroundColor Green
        Write-Host ("-" * 50)
        foreach ($cmd in $Candidates.Commands) {
            Write-Host "  Command: /$($cmd.Name)" -ForegroundColor Green
            Write-Host "    $(Get-LangString "FROM"): $($cmd.InstinctCount) $(Get-LangString "INSTINCTS")" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "AVG_CONFIDENCE"): $($cmd.AvgConfidence)%" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "DOMAINS"): $($cmd.Domain)" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "SCOPE"): $($cmd.Scope)" -ForegroundColor Gray
            Write-Host ""
        }
    }
    
    # Skill candidates
    if ($Candidates.Skills.Count -gt 0) {
        Write-Host "$(Get-LangString "SKILL_CANDIDATES") ($($Candidates.Skills.Count))" -ForegroundColor Yellow
        Write-Host ("-" * 50)
        foreach ($skill in $Candidates.Skills) {
            Write-Host "  Skill: $($skill.Name)" -ForegroundColor Yellow
            Write-Host "    $(Get-LangString "FROM"): $($skill.InstinctCount) $(Get-LangString "INSTINCTS")" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "AVG_CONFIDENCE"): $($skill.AvgConfidence)%" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "TRIGGERS"): $($skill.Instincts.Count) patterns" -ForegroundColor Gray
            Write-Host ""
        }
    }
    
    # Agent candidates
    if ($Candidates.Agents.Count -gt 0) {
        Write-Host "$(Get-LangString "AGENT_CANDIDATES") ($($Candidates.Agents.Count))" -ForegroundColor Magenta
        Write-Host ("-" * 50)
        foreach ($agent in $Candidates.Agents) {
            Write-Host "  Agent: $($agent.Name)" -ForegroundColor Magenta
            Write-Host "    $(Get-LangString "FROM"): $($agent.InstinctCount) $(Get-LangString "INSTINCTS")" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "AVG_CONFIDENCE"): $($agent.AvgConfidence)%" -ForegroundColor Gray
            Write-Host "    $(Get-LangString "STEPS"): $($agent.InstinctCount) workflow steps" -ForegroundColor Gray
            Write-Host ""
        }
    }
    
    # No candidates
    if ($Candidates.Commands.Count -eq 0 -and $Candidates.Skills.Count -eq 0 -and $Candidates.Agents.Count -eq 0) {
        Write-Host "$(Get-LangString "NO_CANDIDATES")" -ForegroundColor Yellow
        Write-Host "$(Get-LangString "CONFIDENCE_TOO_LOW")" -ForegroundColor Gray
    }
}

function Invoke-EvolutionGeneration {
    param($Candidates)
    
    Write-Host ""
    Write-Host "$(Get-LangString "GENERATING_FILES")..." -ForegroundColor Cyan
    Write-Host ""
    
    Ensure-Directory -Path $CommandsDir
    Ensure-Directory -Path $SkillsDir
    Ensure-Directory -Path $AgentsDir
    
    $generated = 0
    
    # Generate commands
    foreach ($cmd in $Candidates.Commands) {
        $fileName = "$($cmd.Name).md"
        $filePath = Join-Path $CommandsDir $fileName
        
        if (Test-Path $filePath) {
            Write-Host "  - Skipping existing: $fileName" -ForegroundColor Gray
            continue
        }
        
        $template = Get-Content (Join-Path $TemplatesDir "command.md") -Encoding UTF8
        
        # Replace placeholders
        $content = $template -replace "{{name}}", $cmd.Name
        $content = $content -replace "{{description}}", "Auto-evolved command for $($cmd.Domain)"
        $content = $content -replace "{{command}}", "/$($cmd.Name)"
        $content = $content -replace "{{avgConfidence}}", $cmd.AvgConfidence
        $content = $content -replace "{{generatedDate}}", (Get-Date -Format "yyyy-MM-dd")
        
        # Build instincts list
        $instinctsList = ($cmd.Instincts | ForEach-Object { "  - $($_.Id) [$($_.Scope)]" }) -join "`n"
        $content = $content -replace "{{#instincts}}.*?{{/instincts}}", $instinctsList
        
        $content | Out-File -FilePath $filePath -Encoding UTF8
        Write-Host "  + Generated command: $fileName" -ForegroundColor Green
        $generated++
    }
    
    # Generate skills
    foreach ($skill in $Candidates.Skills) {
        $fileName = "$($skill.Name).md"
        $filePath = Join-Path $SkillsDir $fileName
        
        if (Test-Path $filePath) {
            Write-Host "  - Skipping existing: $fileName" -ForegroundColor Gray
            continue
        }
        
        $template = Get-Content (Join-Path $TemplatesDir "skill.md") -Encoding UTF8
        
        $content = $template -replace "{{name}}", $skill.Name
        $content = $content -replace "{{description}}", "Auto-evolved skill for $($skill.Domain)"
        $content = $content -replace "{{avgConfidence}}", $skill.AvgConfidence
        $content = $content -replace "{{generatedDate}}", (Get-Date -Format "yyyy-MM-dd")
        $content = $content -replace "{{triggerCount}}", $skill.Instincts.Count
        
        $instinctsList = ($skill.Instincts | ForEach-Object { "### $($_.Id) ($($_.Confidence)%)`n- **Trigger:** $($_.Trigger)`n- **Action:** $($_.Action)" }) -join "`n`n"
        $content = $content -replace "{{#instincts}}.*?{{/instincts}}", $instinctsList
        
        $triggersList = ($skill.Instincts | ForEach-Object { "  - $($_.Trigger) → $($_.Action)" }) -join "`n"
        $content = $content -replace "{{#triggers}}.*?{{/triggers}}", $triggersList
        
        $content | Out-File -FilePath $filePath -Encoding UTF8
        Write-Host "  + Generated skill: $fileName" -ForegroundColor Yellow
        $generated++
    }
    
    # Generate agents
    foreach ($agent in $Candidates.Agents) {
        $fileName = "$($agent.Name)-agent.md"
        $filePath = Join-Path $AgentsDir $fileName
        
        if (Test-Path $filePath) {
            Write-Host "  - Skipping existing: $fileName" -ForegroundColor Gray
            continue
        }
        
        $template = Get-Content (Join-Path $TemplatesDir "agent.md") -Encoding UTF8
        
        $content = $template -replace "{{name}}", $agent.Name
        $content = $content -replace "{{description}}", "Auto-evolved agent for $($agent.Domain)"
        $content = $template -replace "{{avgConfidence}}", $agent.AvgConfidence
        $content = $content -replace "{{generatedDate}}", (Get-Date -Format "yyyy-MM-dd")
        $content = $content -replace "{{stepCount}}", $agent.Instincts.Count
        
        $stepNum = 1
        $stepItems = @()
        foreach ($instinct in ($agent.Instincts | Sort-Object Id)) {
            $stepItems += "  - $stepNum`: $($instinct.Action)"
            $stepNum++
        }
        $stepsList = $stepItems -join "`n"
        $content = $content -replace "{{#steps}}.*?{{/steps}}", $stepsList
        
        $instinctsList = ($agent.Instincts | ForEach-Object { "  - $($_.Id) [$($_.Scope)]" }) -join "`n"
        $content = $content -replace "{{#instincts}}.*?{{/instincts}}", $instinctsList
        
        $content | Out-File -FilePath $filePath -Encoding UTF8
        Write-Host "  + Generated agent: $fileName" -ForegroundColor Magenta
        $generated++
    }
    
    Write-Host ""
    Write-Host "* $(Get-LangString "FILES_GENERATED"): $generated" -ForegroundColor Green
    Write-Host ""
    Write-Host "$(Get-LangString "REVIEW_RECOMMENDED")" -ForegroundColor Yellow
}

# Main execution
Ensure-Directory -Path $InstinctsDir
Ensure-Directory -Path $EvolveDir
Ensure-Directory -Path $TemplatesDir
Ensure-Directory -Path $EvolvedDir

# Load instincts
$instincts = Get-Instincts

# Cluster instincts
$clusters = Get-Clusters -Instincts $instincts

# Analyze evolution candidates
$candidates = Analyze-EvolutionCandidates -Instincts $instincts -Clusters $clusters

# Show analysis
Show-EvolutionAnalysis -Instincts $instincts -Candidates $candidates

# Generate if requested
if ($Generate -or $Command -eq "generate") {
    Invoke-EvolutionGeneration -Candidates $candidates
}
