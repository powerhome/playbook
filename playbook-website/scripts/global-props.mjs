/*
Description:
  This script uses ts-json-schema-generator to parse a typescript file and extract the keys from a type.
  The keys are then written to a file that can be imported to filter out global props.

Dependencies:
  - ts-json-schema-generator
    - https://github.com/vega/ts-json-schema-generator
  - typescript

Arguments:
  None

Example CLI Usage:
  (cd playbook-website; node scripts/global-props.mjs)
*/

import tsj from 'ts-json-schema-generator';
import fs from 'fs';
import { resolve } from 'path';
import { exit } from 'process';

const UTILS_PATH = '../playbook/app/pb_kits/playbook/utilities';

const config = {
  path: resolve(`${UTILS_PATH}/globalProps.ts`),
  tsconfig: resolve('../playbook/tsconfig.json'),
  type: "GlobalProps",
  topRef: false,
}

let schema;

try {
  schema = tsj.createGenerator(config).createSchema(config.type);
} catch (e) {
  console.error("Failed to generate globalProps keys file!", e);
  exit(1);
}

try {
  const keys = Object.entries(schema["anyOf"][0]["properties"]).map(([key]) => key)
  const schemaString = `export default ${JSON.stringify(keys, null, 2)};\n`;
  const outFile = `${UTILS_PATH}/globalPropNames.mjs`;

  fs.writeFileSync(resolve(outFile), schemaString);
} catch (e) {
  console.error(`Failed to write to ${outFile}`, e);
  exit(1);
}

console.log("Successfully generated globalProps keys file!")

exit(0);
