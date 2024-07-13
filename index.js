#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy the contents of the seed directory to the target directory
async function copySeedContents(targetDir) {
  const seedDir = path.join(__dirname, 'app');
  const spinner = ora('Spinning up your project, hold tight...').start();

  try {
    await fs.ensureDir(targetDir); // Ensure the target directory exists
    const files = await fs.readdir(seedDir); // Get the list of files and directories in the seed directory

    for (const file of files) {
      const srcPath = path.join(seedDir, file);
      const destPath = path.join(targetDir, file);
      await fs.copy(srcPath, destPath);
    }

    spinner.succeed('Project created successfully.');
    console.log(`\n🔥 Welcome to your new Z.js project!`);
    console.log(`🤗 Navigate to your project directory: cd ${targetDir}`);
    console.log(`💡 Install dependencies: npm install`);
    console.log(`💡 Start the project: npm run dev`);
    console.log(`\n🤖 Happy Hacking!`);
  } catch (err) {
    spinner.fail('Error creating project, try again!.');
    console.error(`Error: ${err}`);
  }
}

// Parse command-line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Please provide a target directory.');
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), args[0]);
copySeedContents(targetDir);
