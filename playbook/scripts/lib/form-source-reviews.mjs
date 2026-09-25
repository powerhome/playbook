import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const REVIEW_FILE = 'scripts/lib/form-contract-reviews.json';
const KITS = 'app/pb_kits/playbook';

// Cross-kit runtime dependencies used by the curated form behavior. Keep this
// explicit: imports alone miss Rails rendering and JavaScript DOM interactions.
const KIT_DEPENDENCIES = {
  date_picker: ['text_input'],
  dropdown: ['text_input', 'form_pill'],
  multi_level_select: ['checkbox', 'radio', 'form_pill'],
  phone_number_input: ['text_input'],
  time_picker: ['text_input', 'radio'],
  typeahead: ['text_input', 'form_pill'],
};

function runtimeFiles(packageRoot, relativeDir) {
  const files = [];
  for (const entry of fs.readdirSync(path.join(packageRoot, relativeDir), { withFileTypes: true })) {
    if (['docs', '__tests__', '__snapshots__'].includes(entry.name)) continue;
    const relativePath = `${relativeDir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...runtimeFiles(packageRoot, relativePath));
    else if (/\.(rb|erb|js|jsx|ts|tsx)$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) files.push(relativePath);
  }
  return files;
}

function kitSources(packageRoot, kit, seen = new Set()) {
  if (seen.has(kit)) return [];
  seen.add(kit);
  return [
    ...runtimeFiles(packageRoot, `${KITS}/pb_${kit}`),
    ...(KIT_DEPENDENCIES[kit] || []).flatMap((dependency) => kitSources(packageRoot, dependency, seen)),
  ];
}

/** Hash file bytes (including comments), with normalized line endings only. */
export function formSourceSnapshot(packageRoot, metadata) {
  const scopes = {
    builder: [
      ...metadata.builder.sources,
      'lib/playbook/pb_forms_global_props_helper.rb',
      'lib/playbook/kit_base.rb',
      ...['form', 'kit_registry', 'enhanced_element'].flatMap((kit) => kitSources(packageRoot, kit)),
    ],
  };
  for (const method of metadata.methods) {
    scopes[method.kit] ||= kitSources(packageRoot, method.kit);
    scopes[method.kit].push(...method.sources);
  }
  scopes[metadata.actions.kit] ||= kitSources(packageRoot, metadata.actions.kit);
  scopes[metadata.actions.kit].push(...metadata.actions.sources);
  const hashes = new Map();
  const contracts = {};
  for (const [scope, sources] of Object.entries(scopes).sort(([a], [b]) => a.localeCompare(b))) {
    contracts[scope] = {};
    for (const source of [...new Set(sources)].sort()) {
      if (!hashes.has(source)) {
        const content = fs.readFileSync(path.join(packageRoot, source), 'utf8').replace(/\r\n/g, '\n');
        hashes.set(source, createHash('sha256').update(content).digest('hex'));
      }
      contracts[scope][source] = hashes.get(source);
    }
  }
  return { version: 1, contracts };
}

export function readFormReviews(packageRoot) {
  const file = path.join(packageRoot, REVIEW_FILE);
  if (!fs.existsSync(file)) return { version: 1, contracts: {} };
  const reviews = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (reviews.version !== 1 || !reviews.contracts || typeof reviews.contracts !== 'object') throw new Error(`Invalid ${REVIEW_FILE}`);
  return reviews;
}

export function pendingFormReviews(current, reviewed) {
  const changes = [];
  const scopes = [...new Set([...Object.keys(current.contracts), ...Object.keys(reviewed.contracts)])].sort();
  for (const scope of scopes) {
    const before = reviewed.contracts[scope] || {};
    const after = current.contracts[scope] || {};
    const files = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort().filter((file) => before[file] !== after[file]);
    if (files.length || !(scope in reviewed.contracts) || !(scope in current.contracts)) changes.push({ scope, files });
  }
  return changes;
}

export function validateFormReviews(packageRoot, metadata) {
  const changes = pendingFormReviews(formSourceSnapshot(packageRoot, metadata), readFormReviews(packageRoot));
  if (!changes.length) return;
  throw new Error([
    'Form metadata needs source review:',
    ...changes.map(({ scope, files }) => `  ${scope}:\n${files.map((file) => `    ${file}`).join('\n')}`),
    'Review the changed source, update form-contracts.mjs and usage-faqs.mjs as needed, then acknowledge only reviewed scopes:',
    `  cd playbook && node scripts/review-form-metadata.mjs --accept ${changes.map(({ scope }) => scope).join(' ')}`,
    'Generation never updates review fingerprints automatically.',
  ].join('\n'));
}

/** Only the explicit review command writes this file. Generation calls validation. */
export function acceptFormReviews(packageRoot, metadata, scopes) {
  const current = formSourceSnapshot(packageRoot, metadata);
  const reviewed = readFormReviews(packageRoot);
  if (!scopes.length) throw new Error('Specify at least one reviewed scope after --accept');
  for (const scope of scopes) {
    if (!(scope in current.contracts) && !(scope in reviewed.contracts)) throw new Error(`Unknown review scope: ${scope}`);
  }
  for (const scope of scopes) {
    if (scope in current.contracts) reviewed.contracts[scope] = current.contracts[scope];
    else delete reviewed.contracts[scope];
  }
  reviewed.contracts = Object.fromEntries(Object.entries(reviewed.contracts).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(path.join(packageRoot, REVIEW_FILE), `${JSON.stringify(reviewed, null, 2)}\n`);
}
