import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class NextjsLambdaCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const handler = new lambda.Function(this, 'NextJSHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'server.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../.lambda-package'), {
        exclude: ['**/*.map', '**/*.ts', '**/*.tsx']
      }),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
        AWS_LAMBDA_JS_RUNTIME: 'nodejs18.x',
      }
    });

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'NextJSApi', {
      restApiName: 'Next.js API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*'],
      },
      deployOptions: {
        stageName: 'prod',
      },
      binaryMediaTypes: ['*/*'],
    });

    // Integrate API Gateway with Lambda
    const integration = new apigateway.LambdaIntegration(handler, {
      contentHandling: apigateway.ContentHandling.CONVERT_TO_BINARY,
      proxy: true,
    });

    api.root.addMethod('ANY', integration);
    api.root.addProxy({
      defaultIntegration: integration,
      anyMethod: true,
    });

    // Output the API Gateway URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway endpoint URL',
    });
  }
} 