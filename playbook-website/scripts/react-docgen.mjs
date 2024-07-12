import { withCustomConfig } from 'react-docgen-typescript';
import { argv } from 'process';
import fs from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

import globalPropNames from '../../playbook/app/pb_kits/playbook/utilities/globalPropNames.mjs';

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
  fs.writeFileSync(cachedKit, result);
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
