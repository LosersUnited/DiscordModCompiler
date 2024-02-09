import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Read the files in ./src/converters
const files = fs.readdirSync('./src/converters');

// Filter .ts files and remove extension
const tsFiles = files.filter(file => path.extname(file) === '.ts').map(file => path.basename(file, '.ts'));

for (const file of tsFiles) {
  console.log(`Testing ${file}`);
  
  try {
    execSync(`npm run cli-nobuild ./test/sample/index.js ${file}`, { stdio: 'inherit' });
  } catch (error) {
    process.exit(1);
  }
}

process.exit(1);