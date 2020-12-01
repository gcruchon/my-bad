param(
    [string] $fireBaseToken,
    [string] $fireBaseProject,
    [string] $releaseMessage
)
$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

write-host "Installing tool...";
npm i -g firebase-tools
write-host "Checking version deploy...";
firebase --version;
write-host "Starting deploy...";
firebase --token $fireBaseToken --project $fireBaseProject hosting:channel:deploy VSTS;
write-host "deployment completed";

Pop-Location
