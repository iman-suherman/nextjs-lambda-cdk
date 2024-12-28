#!/bin/bash

# Set environment variables
export CDK_DISABLE_STDIN=true

# Run CDK deploy with explicit options
exec npx cdk deploy \
  --require-approval never \
  --no-color \
  --progress events \
  --output cdk.out \
  --verbose 