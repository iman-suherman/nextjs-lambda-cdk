import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class NextjsLambdaCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Function
    const handler = new lambda.Function(this, 'NextJSHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'server.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../.lambda-package')),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
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
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL]
      }
    });

    // Create Lambda integration
    const integration = new apigateway.LambdaIntegration(handler, {
      proxy: true,
      allowTestInvoke: true,
    });

    // Add root method
    api.root.addMethod('ANY', integration, {
      authorizationType: apigateway.AuthorizationType.NONE,
    });

    // Add catch-all proxy
    const proxy = api.root.addProxy({
      defaultIntegration: integration,
      defaultMethodOptions: {
        authorizationType: apigateway.AuthorizationType.NONE,
      },
      anyMethod: true,
    });

    // Grant invoke permissions
    handler.grantInvoke(new iam.ServicePrincipal('apigateway.amazonaws.com'));

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway endpoint URL',
    });
  }
} 