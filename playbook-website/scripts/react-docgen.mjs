/*
Description:
  This script uses react-docgen-typescript to parse a typescript file and extract the props from a React component.
  In production, the script will cache the results to avoid re-parsing the same file multiple times.
  The script can be run against a single file or all files in the playbook app.

Dependencies:
  - react-docgen-typescript
  - typescript
  - scripts/global-props.mjs
    - Runs at app startup to generate a list of global prop names to filter out of the results.

Environment Variables:
  - PB_DOCGEN_CACHE: true
    - Used to determine if the script should cache the results. Default is false.
      You can set this to true to enable/test caching in development.

Arguments:
  - Provide the absolute path to a typescript kit file to parse.
  - Use '--all-kits' to run against all kits in the playbook app. This will always cache the results.

Example CLI Usage:
  (cd playbook-website; node scripts/react-docgen.mjs /your/path/to/playbook/playbook/app/pb_kits/playbook/pb_background/_background.tsx)
*/

import { withCustomConfig } from 'react-docgen-typescript';
import { argv, env } from 'process';
import fs from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

import globalPropNames from '../../playbook/app/pb_kits/playbook/utilities/globalPropNames.mjs';

const isProduction = env.RAILS_ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PB_KITS = '../../playbook/app/pb_kits/playbook';
const CACHE_DIR = resolve(__dirname, '../public/cache/playbook');
const TSCONFIG_PATH = resolve(__dirname, '../../playbook/tsconfig.json');
const PARSER_OPTIONS = {
  shouldExtractValuesFromUnion: true,
  shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true,
  shouldIncludePropTagMap: true,
  shouldIncludeExpression: true,
  propFilter: ({name}) => !globalPropNames.includes(name),
};

// check for kit path
const kitPath = argv[2];
if (!kitPath) {
  console.error('ReactDocgen: Please provide a path to a typescript file');
  process.exit(1);
}

// cache handling
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function processKit({ kitPath }) {
  const kitFileName = kitPath.split('/').reverse()[0].split('.')[0],
        cachedKit = resolve(CACHE_DIR, `${kitFileName}.json`);

  // use cache if it exists
  if (fs.existsSync(cachedKit)) {
    const cachedKitContent = fs.readFileSync(cachedKit, 'utf8');
    return cachedKitContent;
  }

  const parser = withCustomConfig(TSCONFIG_PATH, PARSER_OPTIONS);
  const parsed = parser.parse(kitPath, PARSER_OPTIONS);

  if (!parsed.length) {
    fs.writeFileSync(cachedKit, '{}');
    return `ReactDocgen: Failed to parse ${kitPath}`;
  }

  const result = JSON.stringify(parsed[0].props);

  // cache the result
  if (!isProduction && env.PB_DOCGEN_CACHE == 'true') fs.writeFileSync(cachedKit, result);

  return result;
}

if (kitPath === '--all-kits') {
  // run against all kits
  console.info('ReactDocgen: Running against all kits...');

  const kits = fs.readdirSync(resolve(__dirname, PB_KITS))
  kits.forEach(kit => {
    const kitFileName = resolve(__dirname, PB_KITS, kit, `${kit.replace('pb', '')}.tsx`);
    console.log(kitFileName);
    if (fs.existsSync(kitFileName)) processKit({ kitPath: kitFileName });
  })

  console.info('ReactDocgen: Done!');
  process.exit(0);
} else {
  // run against a single kit
  const result = processKit({ kitPath })
  console.log(result);
  process.exit(0);
}
