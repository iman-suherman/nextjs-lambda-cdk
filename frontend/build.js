const { execSync } = require('child_process');
const path = require('path');

try {
  // Clean previous builds
  execSync('rm -rf .next', { stdio: 'inherit' });
  
  // Run Next.js build
  execSync('NODE_ENV=production next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 