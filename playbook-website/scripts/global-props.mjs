import tsj from 'ts-json-schema-generator';
import fs from 'fs';
import { resolve } from 'path';
import { exit } from 'process';

const config = {
  path: resolve('../playbook/app/pb_kits/playbook/utilities/globalProps.ts'),
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
  const outFile = '../playbook/app/pb_kits/playbook/utilities/globalPropNames.mjs'

  fs.writeFileSync(resolve(outFile), schemaString);
} catch (e) {
  console.error(`Failed to write to ${outFile}`, e);
  exit(1);
}

console.log("Successfully generated globalProps keys file!")

exit(0);
