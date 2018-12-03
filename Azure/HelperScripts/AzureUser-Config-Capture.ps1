<#

.SYNOPSIS
Gather use input pretaining to azure upload and deployment

.DESCRIPTION
This scripts enables a persisent azure session. This will allows future scripts to use this azure 
session without asking for crednetials again. This script will edit a azureuser-config.json bassed 
on user respones to prompts. The azureuser-config.json is intedned to be used by other scritps to 
help access their Azure env.

.PARAMETER ConfigurationFile
A cake-config.json file

#>

Param(
    [parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string] $ConfigurationFile,
    [switch] $SkipScUpload
)

###########################
# Find configuration files
###########################

Import-Module "$($PSScriptRoot)\ProcessConfigFile\ProcessConfigFile.psm1" -Force

$configuration = ProcessConfigFile -Config $ConfigurationFile
$config = $configuration.cakeConfig
$azureuserconfig = $configuration.azureUserConfig
$azureuserconfigfile = $configuration.azureUserConfigFile

########################
# Create SelfSignedCertificate
########################

Function Get-SelfSignedCertificate {
    $thumbprint = (New-SelfSignedCertificate -Subject "CN=$env:COMPUTERNAME @ Sitecore, Inc." -Type SSLServerAuthentication -FriendlyName "$env:USERNAME Certificate").Thumbprint
	
    if (!(Test-Path -Path $config.DeployFolder)) {
        New-Item -Path $config.DeployFolder -ItemType Directory
    }

    $certificateFilePath = Join-Path $config.DeployFolder "$thumbprint.pfx"

    $certPassword = ConvertTo-SecureString -String $secret -Force -AsPlainText

    return Export-PfxCertificate -cert cert:\LocalMachine\MY\$thumbprint -FilePath "$certificateFilePath" -Password $certPassword	
}

########################
# Get Azure Credentials
########################

Write-Host "Importing and Installing AzureRm Module"

$AzureModule = Get-Module -ListAvailable AzureRM
if ($AzureModule -eq "") {
    Install-Module -Name AzureRM
}

Import-Module AzureRM

# Add Persisent Azure Session
Enable-AzureRmContextAutosave

# Add the Azure Service Principal

$servicePrincipalConfiguration = $azureuserconfig.serviceprincipal;

$securePassword = ConvertTo-SecureString $servicePrincipalConfiguration.applicationPassword -AsPlainText -Force
$servicePrincipalCredentials = New-Object System.Management.Automation.PSCredential($servicePrincipalConfiguration.applicationId, $securePassword)
Login-AzureRmAccount -ServicePrincipal -Tenant $servicePrincipalConfiguration.tenantId -Credential $servicePrincipalCredentials
Set-AzureRmContext -SubscriptionName $servicePrincipalConfiguration.azureSubscriptionName -TenantId $servicePrincipalConfiguration.tenantId

###########################################
# Get User Input for azureuser-config.json
###########################################

$certificatePath = ''

$xConnectCertPassword = $azureuserconfig.settings | Where-Object {$_.id -eq "XConnectCertificatePassword"}

if ([string]::IsNullOrEmpty($xConnectCertPassword.value)) {
    $xConnectCertPassword.value = "secret"
    $secret = $xConnectCertPassword.value
} 
else {
    $secret = $xConnectCertPassword.value
}

$xConnectCertfilePath = $azureuserconfig.settings | Where-Object {$_.id -eq "XConnectCertfilePath"}
if ([string]::IsNullOrEmpty($xConnectCertfilePath.value)) {
    $certificatePath = $xConnectCertfilePath
}
else {
    $cert = Get-SelfSignedCertificate
    if ($cert -is [array]) {
        $certificatePath = $cert[-1].FullName
    } 
    else {
        $certificatePath = $cert.FullName
    }
    $xConnectCertfilePath = $certificatePath
}


$azureuserconfig | ConvertTo-Json  | set-content $azureuserconfigFile