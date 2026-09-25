#!/usr/bin/env node
/** Explicitly acknowledge a source review; never invoked by generation/hooks. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateFormContracts } from './lib/build-form-metadata.mjs';
import { acceptFormReviews, validateFormReviews } from './lib/form-source-reviews.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
try {
  if (args.length && (args[0] !== '--accept' || args.length < 2)) {
    throw new Error('Usage: node scripts/review-form-metadata.mjs [--accept <reviewed-scope> ...]');
  }
  const kitNames = fs.readdirSync(path.join(packageRoot, 'app/pb_kits/playbook'))
    .filter((name) => name.startsWith('pb_')).map((name) => name.slice(3));
  const metadata = validateFormContracts(packageRoot, kitNames);
  if (args[0] === '--accept') {
    acceptFormReviews(packageRoot, metadata, args.slice(1));
    console.log(`Acknowledged source review: ${args.slice(1).join(', ')}. Commit the review file with any contract/FAQ edits.`);
  } else {
    validateFormReviews(packageRoot, metadata);
    console.log('Form metadata source reviews are current.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
