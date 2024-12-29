import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class NextjsLambdaCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket for static files with public access
    const staticBucket = new s3.Bucket(this, 'StaticBucket', {
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false
      }),
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag'],
        },
      ],
    });

    // Deploy _next directory to S3
    new s3deploy.BucketDeployment(this, 'StaticDeployment', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../.lambda-package/.next'))],
      destinationBucket: staticBucket,
      destinationKeyPrefix: '_next',
    });

    // Create Lambda Function
    const handler = new lambda.Function(this, 'NextJSHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'server.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../.lambda-package')),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
        STATIC_BUCKET_NAME: staticBucket.bucketName,
      }
    });

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'NextJSApi', {
      restApiName: 'Next.js API',
      binaryMediaTypes: ['*/*'],
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*'],
      },
    });

    // Create Lambda integration
    const lambdaIntegration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
    });

    // Add catch-all proxy for all routes
    api.root.addMethod('ANY', lambdaIntegration);
    api.root.addProxy({
      defaultIntegration: lambdaIntegration,
      anyMethod: true,
      defaultMethodOptions: {
        authorizationType: apigateway.AuthorizationType.NONE,
      },
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway endpoint URL',
    });

    new cdk.CfnOutput(this, 'StaticBucketName', {
      value: staticBucket.bucketName,
      description: 'Static files bucket name',
    });
  }
} 