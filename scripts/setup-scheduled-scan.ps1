#Requires -Version 5.1
<#
.SYNOPSIS
    Creates the daily malware scan scheduled task.
.DESCRIPTION
    Registers a Windows Scheduled Task that:
    - Runs every day at 9:00 AM during active hours
    - Also runs on user login if the daily scan was missed
    - Saves reports to .security-reports\
.NOTES
    Run this script once with admin privileges to set up the task.
#>

param([switch]$Remove)

$taskName = "TapTempo-SecurityScan"
$scannerPath = "C:\Users\IT LAND\Downloads\Project\tap-tempo-project\scripts\security-scan.ps1"
$logDir = "C:\Users\IT LAND\Downloads\Project\tap-tempo-project\.security-reports"

if ($Remove) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Output "Task '$taskName' removed."
    return
}

# Ensure log directory exists
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }

# Remove old task if exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Action: Run the security scanner (full scan, auto-remove, silent)
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File `"$scannerPath`" -Path `"C:\Users\IT LAND\Downloads\Project\tap-tempo-project`" -AutoRemove -Silent" `
    -WorkingDirectory "C:\Users\IT LAND\Downloads\Project\tap-tempo-project"

# Trigger 1: Daily at 9:00 AM
$dailyTrigger = New-ScheduledTaskTrigger -Daily -At "9:00AM"

# Trigger 2: On user logon (catches missed runs)
$loginTrigger = New-ScheduledTaskTrigger -AtLogOn

# Settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 15) `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1)

# Principal: Run as current user with normal priority
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Highest

# Register the task
Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger @($dailyTrigger, $loginTrigger) `
    -Settings $settings `
    -Principal $principal `
    -Description "TapTempo Malware IOC Scanner - Runs daily at 9AM and on login if missed. Auto-removes infections. Reports saved to .security-reports\" `
    -Force

Write-Output ""
Write-Output "============================================"
Write-Output "  Scheduled Task Created: $taskName"
Write-Output "============================================"
Write-Output "  Trigger 1: Daily at 9:00 AM"
Write-Output "  Trigger 2: On user login (catches missed runs)"
Write-Output "  Action:    Full system scan + auto-remove"
Write-Output "  Reports:   $logDir"
Write-Output "  Remove:    powershell -File $PSCommandPath -Remove"
Write-Output "============================================"
Write-Output ""
