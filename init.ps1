
$name_upload = $args[0]
$name_download = $args[1]


aws s3 mb s3://$name_upload >> $(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)/log.txt
aws s3 mb s3://$name_download >> $(Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)/log.txt


$response = aws s3 ls 2>&1

if ($response -like "*$name_upload*" -and $response -like "*$name_download*") {
    Write-Host "Der s3-Bucket $name_upload wurde erstellt."
    Write-Host "Der s3-Bucket $name_download wurde erstellt."
} else {
    Write-Host "Die s3-Buckets $name_upload und $name_download wurden nicht erfolgreich erstellt, schau doch mal ins log.txt."
    exit 1
}


aws s3api put-public-access-block --bucket $name_upload --public-access-block-configuration "BlockPublicPolicy=false"
aws s3api put-public-access-block --bucket $name_download --public-access-block-configuration "BlockPublicPolicy=false"


aws s3api put-bucket-ownership-controls --bucket $name_upload --ownership-controls "Rules=[{ObjectOwnership=BucketOwnerPreferred}]"
aws s3api put-bucket-ownership-controls --bucket $name_download --ownership-controls "Rules=[{ObjectOwnership=BucketOwnerPreferred}]"
