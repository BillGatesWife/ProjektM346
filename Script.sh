sudo apt update
sudo apt install curl
sudo apt-get install -y dotnet.sdk-6.0
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

aws configure \
ASIAXXHN6XU7JWC4TVVT \
emwDa0fmJ1iH9yWj+Aqcd/1IW9JB69lhiC1avy+3 \
us-east-1 \
json 

sudo apt-get update
sudo apt-get install -y dotnet-sdk-6.0
dotnet new --install Amazon.Lambda.Templates
dotnet tool install -g Amazon.Lambda.Tools
dotnet tool update -g Amazon.Lambda.Tools

cat << \EOF >> ~/.bash_profile
# Add .NET Core SDK tools
export PATH="$PATH:/home/vmadmin/.dotnet/tools"
EOF

dotnet add package Amazon.APIGatewayEvents
dotnet new lambda.S3 -n resizeImage

aws s3 mb s3://image-upload-project-346
aws s3 mb s3://image-download-project-346

aws s3api put-public-access-block \
--bucket <image-upload-project-346> \
--public-access-block-configuration "BlockPublicPolicy=false"
aws s3api put-bucket-ownership-controls \
--bucket <image-upload-project-346> \
--ownership-controls="Rules=[{ObjectOwnership=BucketOwnerPreferred}]"

aws s3api put-public-access-block \
--bucket <image-download-project-346> \
--public-access-block-configuration "BlockPublicPolicy=false"
aws s3api put-bucket-ownership-controls \
--bucket <image-download-project-346> \
--ownership-controls="Rules=[{ObjectOwnership=BucketOwnerPreferred}]"

aws lambda add-permission \
  --function-name resizeImage \
  --action "lambda:InvokeFunction" \
  --principal s3.amazonaws.com \
  --source-arn arn:aws:s3:::image-upload-project-346 \
  --statement-id s3-trigger

aws s3api put-bucket-notification-configuration \
  --bucket image-upload-project-346 \
  --notification-configuration '{
    "LambdaFunctionConfigurations": [
      {
        "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:MyFunction",
        "Events": ["s3:ObjectCreated:*"],
        "Filter": {
          "Key": {
            "FilterRules": [
              {
                "Name": "prefix",
                "Value": "test-"
              },
              {
                "Name": "suffix",
                "Value": ".txt"
              }
            ]
          }
        }
      }
    ]
  }'

  aws s3api put-object-acl \
--bucket <image-upload-project-346> \
--key test.txt \
--acl public-read

aws s3api put-object-acl \
--bucket <image-download-project-346> \
--key test.txt \
--acl public-read
