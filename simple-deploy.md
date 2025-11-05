# Simplified Deployment Guide

## One-Command Deployment

### Step 1: Build and Upload to S3
```bash
# Build the app and upload to S3 in one command
npm run build && aws s3 sync build/ s3://morton-indoor-nav-app --delete
```

### Step 2: Deploy CloudFormation Stack
```bash
# Deploy the infrastructure
aws cloudformation deploy \
  --template-file cloudformation/amplify-app.yaml \
  --stack-name indoor-nav-app \
  --parameter-overrides \
    AppName=indoor-navigation-app \
    S3BucketName=morton-indoor-nav-app \
    Environment=production \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

### Step 3: Get Your URLs
```bash
# Get the CloudFront URL
aws cloudformation describe-stacks \
  --stack-name indoor-nav-app \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontUrl`].OutputValue' \
  --output text
```

## PowerShell Version (Windows)
```powershell
# Build and upload
npm run build; aws s3 sync build/ s3://morton-indoor-nav-app --delete

# Deploy stack
aws cloudformation deploy `
  --template-file cloudformation/amplify-app.yaml `
  --stack-name indoor-nav-app `
  --parameter-overrides `
    AppName=indoor-navigation-app `
    S3BucketName=morton-indoor-nav-app `
    Environment=production `
  --capabilities CAPABILITY_NAMED_IAM `
  --region us-east-1

# Get URL
aws cloudformation describe-stacks `
  --stack-name indoor-nav-app `
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontUrl`].OutputValue' `
  --output text
```

## For Updates (After Initial Deployment)
```bash
# Just build and sync - CloudFormation stack stays the same
npm run build && aws s3 sync build/ s3://morton-indoor-nav-app --delete

# Optional: Invalidate CloudFront cache for immediate updates
DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name indoor-nav-app --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' --output text)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

## Cleanup
```bash
# Delete everything
aws cloudformation delete-stack --stack-name indoor-nav-app --region us-east-1
```

That's it! No complex scripts needed.