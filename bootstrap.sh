#!/bin/bash

# Set environment variables
export CDK_DISABLE_STDIN=true
export CI=true
export AWS_NODEJS_CONNECTION_REUSE_ENABLED=1
export NODE_OPTIONS="--max-old-space-size=4096"

# Install CDK CLI globally
npm install -g aws-cdk

# Bootstrap CDK in your AWS account
cdk bootstrap

# Install project dependencies
npm install 