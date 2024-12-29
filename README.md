# Serverless Next.js with AWS CDK

This project demonstrates how to deploy a Next.js application using AWS Lambda for server-side rendering and S3 for static asset delivery, creating a high-performance serverless web application.

## Architecture

### Components

- **AWS Lambda**: Handles server-side rendering of Next.js pages
- **S3 Bucket**: Serves static assets (JS, CSS, images) for faster delivery
- **API Gateway**: Routes requests between Lambda and clients
- **CDK**: Manages infrastructure as code

### Request Flow

1. Client requests a page
2. API Gateway routes the request to Lambda
3. Lambda renders the HTML using Next.js
4. Static assets (/_next/*) are served directly from S3
5. Client receives fast HTML and loads assets from S3

## Prerequisites

### Minimum Required Software

- Node.js 18.12.0
- npm 6.14.18
- AWS CLI v2
- AWS CDK v2
- TypeScript

### Installing AWS CLI

#### On macOS

```bash
# Install using Homebrew
brew install awscli

# Verify installation
aws --version
```

#### On Linux

```bash
# Download AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verify installation
aws --version
```

#### On Windows

1. Download the AWS CLI MSI installer for Windows (64-bit):
   <https://awscli.amazonaws.com/AWSCLIV2.msi>
2. Run the downloaded MSI installer
3. Verify installation:

```bash
aws --version
```

### AWS Credential Setup (via AWS Console)

1. Create an IAM User:
   - Go to AWS Console → IAM → Users → Add user
   - Username: `cdk-deployer` (or your preferred name)
   - Access type: Programmatic access
   - Click "Next: Permissions"

2. Create an IAM Group (recommended):
   - Click "Create group"
   - Group name: `cdk-deployers`
   - Attach these managed policies:
     - `AWSCloudFormationFullAccess`
     - `IAMFullAccess`
     - `AmazonS3FullAccess`
     - `AWSLambda_FullAccess`
     - `AmazonAPIGatewayAdministrator`
   - Add your user to this group
   - Click through to "Create user"

3. Save Credentials:
   - Download the CSV file with credentials
   - Note your Access key ID and Secret access key
   - Keep these secure and never commit them to git

4. Configure AWS CLI:

```bash
aws configure

AWS Access Key ID [None]: YOUR_ACCESS_KEY
AWS Secret Access Key [None]: YOUR_SECRET_KEY
Default region name [None]: ap-southeast-2
Default output format [None]: json
```

5. Verify Configuration:

```bash
aws sts get-caller-identity
```

### AWS Credential Setup via CLI

1. Create IAM Group:

```bash
aws iam create-group --group-name cdk-deployers
```

2. Attach Required Policies (via CLI iam-policy command):

```bash
aws iam attach-group-policy --group-name cdk-deployers --policy-arn arn:aws:iam::aws:policy/AWSCloudFormationFullAccess
aws iam attach-group-policy --group-name cdk-deployers --policy-arn arn:aws:iam::aws:policy/IAMFullAccess
aws iam attach-group-policy --group-name cdk-deployers --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam attach-group-policy --group-name cdk-deployers --policy-arn arn:aws:iam::aws:policy/AWSLambda_FullAccess
aws iam attach-group-policy --group-name cdk-deployers --policy-arn arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator
```

3. Create and Attach Inline Policy:

Create a file named `cdk-policy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:*",
                "s3:*",
                "iam:*",
                "lambda:*",
                "apigateway:*"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole"
            ],
            "Resource": [
                "arn:aws:iam::*:role/cdk-*"
            ]
        }
    ]
}
```

Create and attach the policy:

```bash
aws iam create-policy \
    --policy-name CDKDeploymentPolicy \
    --policy-document file://cdk-policy.json

aws iam attach-group-policy \
    --group-name cdk-deployers \
    --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/CDKDeploymentPolicy
```

4. Create IAM User:

```bash
aws iam create-user --user-name cdk-deployer
```

5. Add User to Group:

```bash
aws iam add-user-to-group --user-name cdk-deployer --group-name cdk-deployers
```

6. Create Access Key:

```bash
aws iam create-access-key --user-name cdk-deployer
```

7. Configure AWS CLI with the new credentials:

```bash
aws configure

AWS Access Key ID [None]: YOUR_NEW_ACCESS_KEY
AWS Secret Access Key [None]: YOUR_NEW_SECRET_KEY
Default region name [None]: ap-southeast-2
Default output format [None]: json
```

8. Verify Setup:

```bash
aws sts get-caller-identity
```

### Installing AWS CDK and Bootstraping

1. Install Node.js (if not already installed):
   - Download from: <https://nodejs.org/>
   - Recommended version: 18.12.0 or later

2. Verify Node.js installation:

```bash
node --version
npm --version
```

3. Install AWS CDK globally:

```bash
npm install -g aws-cdk
```

4. Verify CDK installation:

```bash
cdk --version
```

5. Install TypeScript globally:

```bash
npm install -g typescript
```

6. Verify TypeScript installation:

```bash
tsc --version
```

7. Initialize project dependencies:

```bash
npm install
```

8. Bootstrap CDK:

```bash
cdk bootstrap aws://YOUR_ACCOUNT_ID/YOUR_REGION
```

Replace:

- `YOUR_USERNAME` with your IAM username
- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_REGION` with your target region (e.g., ap-southeast-2)

## Local Development

To run the Next.js application locally:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at <http://localhost:3000>

## AWS Deployment

### Build and Deploy Via Script

The project includes a deployment script that handles building, packaging, and deploying:

```bash
./deploy.sh
```

This script will:

1. Install CDK dependencies
2. Build the Next.js application
3. Package for Lambda deployment
4. Deploy to AWS using CDK

### Manual Deployment Steps

If you prefer to deploy manually:

1. Build the Next.js application:

```bash
cd frontend
npm run build
cd ..
```

2. Package for Lambda:

```bash
./prepare-lambda.sh
```

3. Deploy to AWS:

```bash
cdk deploy
```

## Architecture Benefits

### Performance

- Static assets served directly from S3
- Reduced Lambda cold starts
- Faster page loads
- Better caching

### Cost

- Reduced Lambda execution time
- Pay only for actual server-side rendering
- Cost-effective static file serving

### Scalability

- Automatic scaling with Lambda
- S3 handles high traffic for static assets
- No server management required

## Author

Iman Suherman ([@iman-suherman](https://github.com/iman-suherman))

## License

MIT License

---

Built with ❤️ using AWS Lambda and CDK
