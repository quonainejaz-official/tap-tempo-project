#Requires -Version 5.1
<#
.SYNOPSIS
    Malware IOC Scanner - Detects known cryptocurrency stealer / Electron loader malware.
.DESCRIPTION
    Scans project files, system processes, network connections, and application installations
    for indicators of compromise (IOCs). Saves detailed JSON + text reports.
.PARAMETER Path
    Project path to scan. Defaults to current directory.
.PARAMETER Quick
    Skip deep scans (processes, network, apps). Scan project files only.
.PARAMETER AutoRemove
    Automatically kill malicious processes and delete infected files.
.PARAMETER Silent
    Suppress console output. Logs still saved.
.NOTES
    IOC Database v3 - Updated 2026-08-23
    Malware Family: ElectronLoader / CryptoStealer
#>

param(
    [string]$Path = ".",
    [switch]$Quick,
    [switch]$AutoRemove,
    [switch]$Silent
)

$ErrorActionPreference = "SilentlyContinue"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logDir = Join-Path $PSScriptRoot "..\.security-reports"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }

$results = @{
    timestamp = $timestamp
    hostname  = $env:COMPUTERNAME
    user      = $env:USERNAME
    findings  = @()
    summary   = @{ total = 0; critical = 0; warning = 0; clean = 0 }
}

function Write-Status {
    param([string]$Message, [string]$Level = "INFO")
    if (-not $Silent) {
        $color = switch ($Level) {
            "CRITICAL" { "Red" }
            "WARNING"  { "Yellow" }
            "CLEAN"    { "Green" }
            default    { "Cyan" }
        }
        $prefix = switch ($Level) {
            "CRITICAL" { "[!!!]" }
            "WARNING"  { "[!]" }
            "CLEAN"    { "[OK]" }
            default    { "[*]" }
        }
        Write-Host "  $prefix $Message" -ForegroundColor $color
    }
}

function Add-Finding {
    param([string]$Category, [string]$Target, [string]$IOC, [string]$Severity, [string]$Detail)
    $results.findings += @{
        category = $Category
        target   = $Target
        ioc      = $IOC
        severity = $Severity
        detail   = $Detail
        time     = (Get-Date -Format "o")
    }
    $results.summary.total++
    switch ($Severity) {
        "CRITICAL" { $results.summary.critical++ }
        "WARNING"  { $results.summary.warning++ }
        "CLEAN"    { $results.summary.clean++ }
    }
}

# ============================================================
# IOC DATABASE
# ============================================================
$iocPatterns = @(
    @{ Name = "VersionMarker";   Pattern = 'A10-\*3134-30';         Severity = "CRITICAL"; Desc = "Malware version marker" }
    @{ Name = "XORKey";          Pattern = 'q4FZkxX\{!h';           Severity = "CRITICAL"; Desc = "XOR decryption key for payload" }
    @{ Name = "BuildTag";        Pattern = 'M260630A';              Severity = "CRITICAL"; Desc = "Malware build tag" }
    @{ Name = "EvalInjector";    Pattern = 'app-GitHubDesktop-eval'; Severity = "CRITICAL"; Desc = "GitHub Desktop eval injector" }
    @{ Name = "VSCodeInjector";  Pattern = 'app-vscode-eval';       Severity = "CRITICAL"; Desc = "VS Code eval injector" }
    @{ Name = "PayloadLoader";   Pattern = 'main\.inz\.cjs';        Severity = "CRITICAL"; Desc = "Malware payload loader file" }
    @{ Name = "C2Server";        Pattern = '23\.27\.13\.135';        Severity = "CRITICAL"; Desc = "Known C2 server IP" }
    @{ Name = "C2Endpoint";      Pattern = '/0x/clb';               Severity = "CRITICAL"; Desc = "C2 payload endpoint" }
    @{ Name = "C2Endpoint2";     Pattern = '/0x/ls';                Severity = "CRITICAL"; Desc = "C2 secondary endpoint" }
    @{ Name = "C2Endpoint3";     Pattern = '/0x/cl';                Severity = "CRITICAL"; Desc = "C2 endpoint variant" }
    @{ Name = "ExfilEndpoint";   Pattern = 'verify-human';          Severity = "CRITICAL"; Desc = "Data exfiltration endpoint" }
    @{ Name = "CreateRequire";   Pattern = 'createRequire\s*\(\s*import\.meta\.url\s*\)\s*\(\s*["\x27]'; Severity = "WARNING";  Desc = "Suspicious dynamic require via createRequire" }
    @{ Name = "SuspiciousSpawn"; Pattern = 'spawn.*detached.*true';  Severity = "WARNING";  Desc = "Suspicious detached child process spawn" }
    @{ Name = "ObfuscatedEval";  Pattern = 'eval\s*\(\s*[a-zA-Z_]+\s*\)'; Severity = "WARNING"; Desc = "Dynamic eval call" }
    @{ Name = "CryptoAddress";   Pattern = '0xa322E5f3';            Severity = "WARNING";  Desc = "Hardcoded crypto address" }
    @{ Name = "EthRPC";          Pattern = 'eth_blockNumber';       Severity = "WARNING";  Desc = "Ethereum RPC call" }
    @{ Name = "EthRPC2";         Pattern = 'eth_getTransactionByNumber'; Severity = "WARNING"; Desc = "Ethereum transaction query" }
)

$c2IPs = @("23.27.13.135", "23.27.13.43", "23.27.202.27", "166.88.134.62", "198.105.127.210")

$knownCleanHashes = @(
    "D082CB40047E4E3CAF521395E25754481E6ABAAC10731B3D66FE34880964B157"  # GH Desktop 3.6.4 clean
    "61F20BBCC84FC835126C6A9809131F63D2DFA5AC581231B9D68D135830F6928D"  # VS Code 1.134.0 clean
    "D97A2B1A2170D6094625956D6AD5BA5D5EDFCE26BC3787C51447C9737B6AFC2D"  # npm CLI clean
)

$knownInfectedHashes = @(
    "2049FC0DC531DBBB3E4F12AF68C807836AB41B9ADBF707DEE98B7D98039B15D9"  # GH Desktop 3.5.12 infected
    "90C6A67FC01F0C2A6E3A09586EC36A17B2BD1EDAC44D3CE97E2A6B415C463E34"  # GH Desktop 3.6.2 infected
    "1B9A83C59CF7A950886B3D8B1AA74E1BF27BD177C3A25A5BA10DF2D4A3E7F20F"  # VS Code infected
)

# ============================================================
# SCAN FUNCTIONS
# ============================================================

function Scan-ProjectFiles {
    param([string]$ProjectPath)
    if (-not (Test-Path $ProjectPath)) { return }

    Write-Status "Scanning project files in: $ProjectPath"
    $extensions = @('.js', '.mjs', '.cjs', '.ts', '.tsx', '.json', '.bat', '.cmd', '.ps1', '.env', '.env.local', '.env.*')
    $excludeDirs = @('node_modules', '.next', '.git', '.security-reports', 'dist', 'build')
    $excludeFiles = @('security-scan.ps1')

    $files = Get-ChildItem $ProjectPath -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
        $ext = $_.Extension.ToLower()
        $excluded = $false
        foreach ($dir in $excludeDirs) {
            if ($_.FullName -match [regex]::Escape("\$dir\")) { $excluded = $true; break }
        }
        if (-not $excluded) {
            foreach ($ef in $excludeFiles) {
                if ($_.Name -eq $ef) { $excluded = $true; break }
            }
        }
        (-not $excluded) -and ($extensions -contains $ext) -and $_.Length -lt 1000000
    }

    $scanned = 0
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -ErrorAction SilentlyContinue | Out-String
        if (-not $content) { continue }

        foreach ($ioc in $iocPatterns) {
            if ($content -match $ioc.Pattern) {
                $relPath = $f.FullName.Replace("$ProjectPath\", "")
                $detail = "$($ioc.Desc) | File: $relPath | Size: $($f.Length) bytes"
                Add-Finding -Category "PROJECT_FILE" -Target $relPath -IOC $ioc.Name -Severity $ioc.Severity -Detail $detail
                Write-Status "$($ioc.Severity): $($ioc.Desc) in $relPath" $ioc.Severity
            }
        }

        $hash = (Get-FileHash $f.FullName -Algorithm SHA256 -ErrorAction SilentlyContinue).Hash
        if ($hash -in $knownInfectedHashes) {
            $relPath = $f.FullName.Replace("$ProjectPath\", "")
            Add-Finding -Category "KNOWN_HASH" -Target $relPath -IOC "KnownInfectedFile" -Severity "CRITICAL" -Detail "Known infected file hash: $hash | File: $relPath"
            Write-Status "KNOWN MALWARE HASH: $relPath" "CRITICAL"
        }

        $scanned++
    }
    Write-Status "Scanned $scanned project files" "CLEAN"
}

function Scan-GitHubDesktop {
    Write-Status "Scanning GitHub Desktop installations..."
    $gdPath = "$env:LOCALAPPDATA\GitHubDesktop"
    if (-not (Test-Path $gdPath)) { Write-Status "GitHub Desktop not found"; return }

    Get-ChildItem $gdPath -Directory | Where-Object { $_.Name -match '^app-' } | ForEach-Object {
        $mainJs = Join-Path $_.FullName "resources\app\main.js"
        if (-not (Test-Path $mainJs)) { return }

        $hash = (Get-FileHash $mainJs -Algorithm SHA256).Hash
        $infected = Select-String -Path $mainJs -Pattern "A10-\*3134-30|M260630A|q4FZkxX" -Quiet -ErrorAction SilentlyContinue

        if ($infected) {
            Add-Finding -Category "APP_INSTALL" -Target "GitHubDesktop/$($_.Name)" -IOC "InfectedMainJS" -Severity "CRITICAL" -Detail "Infected main.js | Hash: $hash | Size: $((Get-Item $mainJs).Length) bytes"
            Write-Status "GitHub Desktop $($_.Name): INFECTED" "CRITICAL"
            if ($AutoRemove) {
                Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
                Write-Status "  -> DELETED $($_.Name)" "WARNING"
            }
        } elseif ($hash -in $knownInfectedHashes) {
            Add-Finding -Category "KNOWN_HASH" -Target "GitHubDesktop/$($_.Name)" -IOC "KnownInfectedHash" -Severity "CRITICAL" -Detail "Known infected hash: $hash"
            Write-Status "GitHub Desktop $($_.Name): KNOWN INFECTED HASH" "CRITICAL"
            if ($AutoRemove) {
                Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
                Write-Status "  -> DELETED $($_.Name)" "WARNING"
            }
        } else {
            Write-Status "GitHub Desktop $($_.Name): CLEAN (hash: $hash)" "CLEAN"
            Add-Finding -Category "APP_INSTALL" -Target "GitHubDesktop/$($_.Name)" -IOC "Clean" -Severity "CLEAN" -Detail "Clean | Hash: $hash"
        }
    }
}

function Scan-VSCode {
    Write-Status "Scanning VS Code installations..."
    $vsPath = "$env:LOCALAPPDATA\Programs\Microsoft VS Code"
    if (-not (Test-Path $vsPath)) { Write-Status "VS Code not found"; return }

    Get-ChildItem $vsPath -Directory | ForEach-Object {
        $mainJs = Join-Path $_.FullName "resources\app\out\main.js"
        $inzCjs = Join-Path $_.FullName "resources\app\out\main.inz.cjs"

        if (Test-Path $mainJs) {
            $hash = (Get-FileHash $mainJs -Algorithm SHA256).Hash
            $infected = Select-String -Path $mainJs -Pattern "A10-\*3134-30|M260630A|main\.inz" -Quiet -ErrorAction SilentlyContinue

            if ($infected -or $hash -in $knownInfectedHashes) {
                Add-Finding -Category "APP_INSTALL" -Target "VSCode/$($_.Name)" -IOC "InfectedMainJS" -Severity "CRITICAL" -Detail "Infected main.js | Hash: $hash"
                Write-Status "VS Code $($_.Name): INFECTED" "CRITICAL"
            } else {
                Write-Status "VS Code $($_.Name): CLEAN (hash: $hash)" "CLEAN"
                Add-Finding -Category "APP_INSTALL" -Target "VSCode/$($_.Name)" -IOC "Clean" -Severity "CLEAN" -Detail "Clean | Hash: $hash"
            }
        }

        if (Test-Path $inzCjs) {
            $sz = (Get-Item $inzCjs).Length
            Add-Finding -Category "MALWARE_PAYLOAD" -Target "VSCode/$($_.Name)/main.inz.cjs" -IOC "PayloadFile" -Severity "CRITICAL" -Detail "Malware payload file exists ($sz bytes)"
            Write-Status "VS Code $($_.Name): main.inz.cjs PAYLOAD EXISTS ($sz bytes)" "CRITICAL"
            if ($AutoRemove) {
                Remove-Item $inzCjs -Force -ErrorAction SilentlyContinue
                Write-Status "  -> DELETED main.inz.cjs" "WARNING"
            }
        }
    }
}

function Scan-Processes {
    Write-Status "Scanning active processes..."
    $nodeProcs = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue
    foreach ($p in $nodeProcs) {
        $cmdLine = $p.CommandLine
        foreach ($ioc in $iocPatterns) {
            if ($cmdLine -match $ioc.Pattern) {
                Add-Finding -Category "PROCESS" -Target "node.exe PID=$($p.ProcessId)" -IOC $ioc.Name -Severity "CRITICAL" -Detail "Malicious node process | Cmd: $($cmdLine.Substring(0, [Math]::Min(200, $cmdLine.Length)))"
                Write-Status "MALICIOUS node.exe PID=$($p.ProcessId): $($ioc.Desc)" "CRITICAL"
                if ($AutoRemove) {
                    Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
                    Write-Status "  -> KILLED PID $($p.ProcessId)" "WARNING"
                }
            }
        }
    }

    foreach ($ip in $c2IPs) {
        $conns = Get-NetTCPConnection -RemoteAddress $ip -ErrorAction SilentlyContinue
        foreach ($c in $conns) {
            $proc = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
            Add-Finding -Category "NETWORK" -Target "$ip`:$($c.RemotePort)" -IOC "C2Connection" -Severity "CRITICAL" -Detail "Active connection to C2 | Process: $($proc.ProcessName) (PID=$($c.OwningProcess))"
            Write-Status "C2 CONNECTION: $($proc.ProcessName) -> $ip`:$($c.RemotePort)" "CRITICAL"
            if ($AutoRemove) {
                Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
                Write-Status "  -> KILLED PID $($c.OwningProcess)" "WARNING"
            }
        }
    }
}

function Scan-NpmCli {
    Write-Status "Scanning npm CLI..."
    $npmCli = "C:\Program Files\nodejs\node_modules\npm\lib\cli.js"
    if (Test-Path $npmCli) {
        $hash = (Get-FileHash $npmCli -Algorithm SHA256).Hash
        $infected = Select-String -Path $npmCli -Pattern "A10-\*3134-30|q4FZkxX|M260630A" -Quiet -ErrorAction SilentlyContinue
        if ($infected -or $hash -in $knownInfectedHashes) {
            Add-Finding -Category "SYSTEM" -Target "npm CLI" -IOC "InfectedNpm" -Severity "CRITICAL" -Detail "Infected npm CLI | Hash: $hash"
            Write-Status "npm CLI: INFECTED" "CRITICAL"
        } else {
            Write-Status "npm CLI: CLEAN (hash: $hash)" "CLEAN"
            Add-Finding -Category "SYSTEM" -Target "npm CLI" -IOC "Clean" -Severity "CLEAN" -Detail "Clean | Hash: $hash"
        }
    }
}

function Scan-NpmGlobal {
    Write-Status "Scanning npm global packages..."
    $npmGlobal = "$env:APPDATA\npm"
    if (-not (Test-Path $npmGlobal)) { return }

    $knownCleanPaths = @('\pnpm\', '\pnpm\dist\', '\pnpm\dist\node_modules\')

    $files = Get-ChildItem $npmGlobal -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
        $ext = $_.Extension -match '\.(js|mjs|cjs)$'
        $small = $_.Length -lt 500000
        $cleanPkg = $false
        foreach ($kp in $knownCleanPaths) {
            if ($_.FullName -match [regex]::Escape($kp)) { $cleanPkg = $true; break }
        }
        $ext -and $small -and (-not $cleanPkg)
    }
    $infected = 0
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -ErrorAction SilentlyContinue | Out-String
        foreach ($ioc in $iocPatterns) {
            if ($content -match $ioc.Pattern) {
                Add-Finding -Category "NPM_GLOBAL" -Target $f.FullName -IOC $ioc.Name -Severity "CRITICAL" -Detail "$($ioc.Desc) | File: $($f.FullName)"
                Write-Status "npm global INFECTED: $($f.Name)" "CRITICAL"
                $infected++
            }
        }
    }
    if ($infected -eq 0) { Write-Status "npm global packages: ALL CLEAN ($($files.Count) files)" "CLEAN" }
}

# ============================================================
# MAIN EXECUTION
# ============================================================

if (-not $Silent) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "   Malware IOC Scanner v3" -ForegroundColor Cyan
    Write-Host "   $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
}

$projectPath = (Resolve-Path $Path -ErrorAction SilentlyContinue).Path
if ($projectPath) {
    Scan-ProjectFiles -ProjectPath $projectPath
}

if (-not $Quick) {
    Write-Host ""
    Scan-GitHubDesktop
    Scan-VSCode
    Scan-Processes
    Scan-NpmCli
    Scan-NpmGlobal
}

# ============================================================
# GENERATE REPORTS
# ============================================================

$jsonReport = Join-Path $logDir "scan-$timestamp.json"
$results | ConvertTo-Json -Depth 10 | Set-Content $jsonReport -Encoding UTF8

$txtReport = Join-Path $logDir "scan-$timestamp.txt"
$reportLines = @()
$reportLines += "============================================"
$reportLines += "   MALWARE SCAN REPORT"
$reportLines += "   Timestamp: $timestamp"
$reportLines += "   Hostname:  $($results.hostname)"
$reportLines += "   User:      $($results.user)"
$reportLines += "============================================"
$reportLines += ""
$reportLines += "SUMMARY: $($results.summary.total) findings | $($results.summary.critical) CRITICAL | $($results.summary.warning) WARNING | $($results.summary.clean) CLEAN"
$reportLines += ""

if ($results.findings.Count -gt 0) {
    foreach ($f in $results.findings) {
        $reportLines += "[$($f.severity)] $($f.category) | $($f.target)"
        $reportLines += "  IOC: $($f.ioc)"
        $reportLines += "  Detail: $($f.detail)"
        $reportLines += "  Time: $($f.time)"
        $reportLines += ""
    }
} else {
    $reportLines += "NO FINDINGS - ALL CLEAN"
}

$reportLines += "============================================"
$reportLines += "   END OF REPORT"
$reportLines += "============================================"

$reportLines | Set-Content $txtReport -Encoding UTF8

# Keep only last 30 reports
Get-ChildItem $logDir -Filter "scan-*" | Sort-Object Name | Select-Object -SkipLast 30 | Remove-Item -Force -ErrorAction SilentlyContinue

if (-not $Silent) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    if ($results.summary.critical -gt 0) {
        Write-Host "   RESULT: INFECTIONS DETECTED ($($results.summary.critical) CRITICAL)" -ForegroundColor Red
    } else {
        Write-Host "   RESULT: ALL CLEAN" -ForegroundColor Green
    }
    Write-Host "   JSON: $jsonReport" -ForegroundColor Gray
    Write-Host "   Text: $txtReport" -ForegroundColor Gray
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
}

# Exit code: 1 if critical findings, 0 if clean
if ($results.summary.critical -gt 0) { exit 1 } else { exit 0 }
