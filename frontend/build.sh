#!/bin/bash

# Load nvm and set Node version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18.18.1

# Set environment variables
export CI=true
export NEXT_TELEMETRY_DISABLED=1

# Direct execution of next build using node
node ./node_modules/.bin/next build 