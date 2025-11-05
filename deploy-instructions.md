# Deployment Instructions

This guide will help you deploy your Indoor Navigation App to AWS using CloudFormation, S3, and CloudFront.

## Prerequisites

1. **AWS CLI installed and configured**
   ```bash
   # Install AWS CLI
   # Windows: Download from https://aws.amazon.com/cli/
   # macOS: brew install awscli
   # Linux: sudo apt-get install awscli
   
   # Configure AWS credentials
   aws configure
   ```

2. **Node.js and npm installed**
   ```bash
   # Download from https://nodejs.org/
   # Verify installation
   node --version
   npm --version
   ```

3. **S3 Bucket**
   - Your S3 bucket `morton-indoor-nav-app` should already exist
   - The deployment script will configure it for web hosting

4. **Required IAM Permissions**
   Your AWS user/role needs these permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:*",
           "cloudfront:*",
           "cloudformation:*",
           "logs:*",
           "acm:ListCertificates"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

## Deployment

### Option 1: PowerShell (Windows)

```powershell
# Basic deployment (uses morton-indoor-nav-app bucket by default)
.\scripts\deploy.ps1

# With custom options
.\scripts\deploy.ps1 `
  -S3BucketName "morton-indoor-nav-app" `
  -AppName "my-navigation-app" `
  -Environment "production" `
  -CustomDomain "nav.yourdomain.com" `
  -SSLCertificateArn "arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012" `
  -Region "us-east-1"
```

### Option 2: Bash (Linux/macOS)

```bash
# Basic deployment
./scripts/deploy.sh

# With custom options
./scripts/deploy.sh \
  --bucket "morton-indoor-nav-app" \
  --name "my-navigation-app" \
  --env "production" \
  --domain "nav.yourdomain.com" \
  --cert "arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012" \
  --region "us-east-1"
```

### Option 3: Manual CloudFormation

```bash
# Build the app first
npm install
npm run build

# Validate template
aws cloudformation validate-template --template-body file://cloudformation/amplify-app.yaml

# Deploy stack
aws cloudformation create-stack \
  --stack-name indoor-nav-s3-stack \
  --template-body file://cloudformation/amplify-app.yaml \
  --parameters \
    ParameterKey=AppName,ParameterValue=indoor-navigation-app \
    ParameterKey=S3BucketName,ParameterValue=morton-indoor-nav-app \
    ParameterKey=Environment,ParameterValue=production \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1

# Upload files to S3
aws s3 sync build/ s3://morton-indoor-nav-app --delete
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| S3BucketName | No | morton-indoor-nav-app | S3 bucket for hosting |
| AppName | No | indoor-navigation-app | Name for the application |
| Environment | No | production | Environment name |
| CustomDomainName | No | - | Custom domain (optional) |
| SSLCertificateArn | No | - | ACM certificate ARN for custom domain |

## What Gets Created

The CloudFormation template creates:

- **S3 Bucket** - Hosts your static React application files
- **S3 Bucket Policy** - Allows public read access to your files
- **CloudFront Distribution** - CDN for fast global delivery and HTTPS
- **CloudWatch Log Group** - For monitoring and debugging
- **Custom Domain** - If specified (requires ACM certificate)

## Post-Deployment

1. **Wait for CloudFront Distribution**
   - CloudFront deployment takes 10-15 minutes
   - You can use the S3 website URL immediately for testing

2. **Test Your Application**
   - Visit the CloudFront URL once distribution is ready
   - Test navigation between different locations

3. **Configure Custom Domain** (Optional)
   - Create an ACM certificate in us-east-1 region
   - Update your DNS to point to the CloudFront distribution
   - Redeploy with custom domain parameters

## Updating Your App

After initial deployment, use the update script to deploy changes:

```powershell
# PowerShell (Windows)
.\scripts\update-app.ps1

# With custom options
.\scripts\update-app.ps1 -S3BucketName "morton-indoor-nav-app" -Region "us-east-1"
```

```bash
# Manual update (Linux/macOS)
npm run build
aws s3 sync build/ s3://morton-indoor-nav-app --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Cleanup

To remove all resources:

```powershell
# PowerShell
.\scripts\cleanup.ps1 -StackName "indoor-nav-s3-stack"

# Force cleanup without confirmation
.\scripts\cleanup.ps1 -StackName "indoor-nav-s3-stack" -Force
```

```bash
# Manual cleanup
aws cloudformation delete-stack --stack-name indoor-nav-s3-stack --region us-east-1
```

## Troubleshooting

### Common Issues

1. **S3 Access Issues**
   - Ensure AWS credentials have S3 permissions
   - Verify bucket exists and is in the correct region
   - Check bucket policy allows public read access

2. **Build Failures**
   - Ensure Node.js and npm are installed
   - Run `npm install` before building
   - Check for any missing dependencies in package.json

3. **CloudFront Issues**
   - Distribution deployment takes 10-15 minutes
   - Cache invalidation may take 5-10 minutes
   - Use S3 website URL for immediate testing

4. **Custom Domain Issues**
   - ACM certificate must be in us-east-1 region for CloudFront
   - DNS propagation can take up to 48 hours
   - Ensure certificate is validated before deployment

5. **Permission Errors**
   - Ensure AWS credentials have sufficient permissions
   - CloudFormation needs permissions to create S3 and CloudFront resources

### Getting Help

- Check CloudFormation events in AWS Console
- Review Amplify build logs
- Verify GitHub webhook is working
- Check AWS CloudTrail for API errors

## Cost Estimation

AWS S3 + CloudFront pricing (as of 2024):
- **S3 Storage**: $0.023 per GB per month
- **S3 Requests**: $0.0004 per 1,000 GET requests
- **CloudFront**: $0.085 per GB for first 10TB/month
- **CloudFront Requests**: $0.0075 per 10,000 requests

Typical monthly cost for a small app: $0.50-2 USD