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
    execSync(`npm run cli-nobuild ./test/sample/index.js ${file} ./test/sample/${file}/index.js`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error in ${file}`);
    process.exit(1);
  }
}
