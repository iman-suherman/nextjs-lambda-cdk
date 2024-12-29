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

## Local Development

To run the Next.js application locally:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at <http://localhost:3000>

## Deployment

### 1. Build the Next.js application

```bash
cd frontend
npm run build
```

### 2. Package for Lambda

```bash
./prepare-lambda.sh
```

### 3. Deploy to AWS

```bash
./deploy.sh
```

This will:

1. Create an S3 bucket for static assets
2. Deploy the Next.js static files to S3
3. Create a Lambda function for server-side rendering
4. Set up API Gateway for routing

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

## AWS Profile Setup

### 1. Install AWS CLI

First, ensure AWS CLI is installed:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. Configure AWS Credentials

Set up your AWS credentials:

```bash
aws configure
```

### 3. Required IAM Permissions

Ensure your AWS user has these permissions:

#### Core Permissions

- `AmazonCloudFrontFullAccess`
- `AmazonCloudFrontReadOnlyAccess`
- `AmazonCloudWatchFullAccess`
- `AmazonCloudWatchReadOnlyAccess`
- `AmazonS3FullAccess`
- `AmazonS3ReadOnlyAccess`
- `AmazonS3ObjectLambdaFullAccess`
- `AmazonS3ObjectLambdaReadOnlyAccess`

#### Minimum IAM Policies

- `AWSCloudFormationFullAccess`
- `IAMFullAccess`
- `AWSLambda_FullAccess`
- `AmazonAPIGatewayAdministrator`
- `AmazonS3FullAccess`

### 4. Multiple Profiles (Optional)

If you need multiple AWS profiles:

```bash
aws configure --profile profile-name
```

### 5. Profile Configuration File

Your AWS credentials are stored in:

```bash
~/.aws/credentials
```

### 6. Security Best Practices

1. **Access Key Rotation**
   - Rotate access keys every 90 days
   - Never commit credentials to version control
   - Use AWS Secrets Manager for sensitive data

2. **Principle of Least Privilege**
   - Start with minimum permissions
   - Add permissions as needed
   - Regularly review and remove unused permissions

3. **MFA Protection**
   - Enable MFA for your AWS account
   - Use MFA for sensitive operations

   ```bash
   # Using MFA token
   aws sts get-session-token --serial-number arn:aws:iam::ACCOUNT-ID:mfa/user --token-code CODE
   ```

### 7. Troubleshooting

1. **Invalid Credentials**

   ```bash
   aws configure list
   aws sts get-caller-identity
   ```

2. **Permission Issues**

   ```bash
   # Check current permissions
   aws iam get-user
   aws iam list-attached-user-policies --user-name YOUR_USERNAME
   ```

3. **Region Issues**

   ```bash
   # Set default region
   aws configure set region ap-southeast-2
   ```

### 8. Clean Up

To remove AWS credentials:

```bash
rm -rf ~/.aws
```

## Author

Iman Suherman ([@iman-suherman](https://github.com/iman-suherman))

## License

MIT License

---

Built with ❤️ using AWS Lambda and CDK
