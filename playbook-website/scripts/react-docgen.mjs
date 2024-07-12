import { parse } from 'react-docgen-typescript';
import { argv } from 'process';
import fs from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

import globalPropNames from '../../playbook/app/pb_kits/playbook/utilities/globalPropNames.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const kitPath = argv[2];
if (!kitPath) {
  console.error('ReactDocgen: Please provide a path to a typescript file');
  process.exit(1);
}

// cache handling
const tempDir = resolve(__dirname, `../tmp/cache/playbook`);
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const kitFileName = kitPath.split('/').reverse()[0].split('.')[0];
const cachedKit = resolve(__dirname, '../tmp/cache/playbook', `${kitFileName}.json`);

// use cache if it exists
if (fs.existsSync(cachedKit)) {
  const cachedKitContent = fs.readFileSync(cachedKit, 'utf8');
  console.log(cachedKitContent);
  process.exit(0);
}

const PARSER_OPTIONS = {
  shouldExtractValuesFromUnion: false,
  savePropValueAsString: true,
  shouldIncludePropTagMap: true,
  shouldIncludeExpression: true,
  propFilter: ({name}) => !globalPropNames.includes(name),
}

const parsed = parse(kitPath, PARSER_OPTIONS)[0].props,
      result = JSON.stringify(parsed)

// cache the result
fs.writeFileSync(cachedKit, result);

console.log(result)

process.exit(0);
