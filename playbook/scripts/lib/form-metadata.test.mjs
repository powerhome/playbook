/** Run after build:ai: node --test scripts/lib/form-metadata.test.mjs */
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { FORM_METHODS } from './form-contracts.mjs';
import { enrichSchemaForms, validateFormContracts } from './build-form-metadata.mjs';

const packageRoot = fileURLToPath(new URL('../../', import.meta.url));
const dist = path.join(packageRoot, 'dist/ai');
const lookup = path.resolve(packageRoot, '../docs/ai/consumer/ask-playbook/lookup.mjs');
const read = (file) => JSON.parse(fs.readFileSync(path.join(dist, file), 'utf8'));
const index = read('index.json');
const kits = Object.keys(index.kitMeta);
const metadata = validateFormContracts(packageRoot, kits);

function installedFixture(t, fixture) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playbook-form-metadata-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const target = path.join(root, 'node_modules/playbook-ui/dist/ai');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (fixture) {
    fs.mkdirSync(target);
    for (const [file, contents] of Object.entries(fixture)) {
      fs.mkdirSync(path.dirname(path.join(target, file)), { recursive: true });
      fs.writeFileSync(path.join(target, file), JSON.stringify(contents));
    }
  } else {
    fs.symlinkSync(dist, target, 'dir');
  }
  return (...args) => JSON.parse(execFileSync(process.execPath, [lookup, '--root', root, ...args], { encoding: 'utf8' }));
}

test('all registered Ruby field methods and action methods have contracts and FAQ references resolve', () => {
  validateFormContracts(packageRoot, kits);
  assert.equal(FORM_METHODS.length, 20);
  assert.throws(() => validateFormContracts(packageRoot, kits, FORM_METHODS.slice(1)), /Missing or incorrect/);
  assert.throws(() => validateFormContracts(packageRoot, kits, [...FORM_METHODS, FORM_METHODS[0]]), /Duplicate/);
  assert.throws(() => validateFormContracts(packageRoot, kits, [...FORM_METHODS, { name: 'removed_method', kit: 'text_input' }]), /Stale/);
});

test('enrichment preserves existing kit APIs and usage', () => {
  const schema = { props: { required: { platforms: ['react'] } }, usage: { rails: { example: 'original' } } };
  const enriched = enrichSchemaForms(schema, 'textarea', metadata);
  assert.deepEqual(enriched.props, schema.props);
  assert.deepEqual(enriched.usage, schema.usage);
  assert.equal(schema.form, undefined);
  assert.equal(enrichSchemaForms(schema, 'avatar', metadata), schema);
});

test('distribution includes identical contracts in kit schemas and aggregate schemas', () => {
  const forms = read(index.forms);
  assert.equal(forms.version, index.version);
  assert.equal(forms.metadataVersion, index.metadataVersion);
  const aggregate = read('all-schemas.json');
  for (const method of forms.methods) {
    const schema = read(index.kitMeta[method.kit].schema);
    assert.deepEqual(schema.form, aggregate.kits[method.kit].form);
    assert.deepEqual(schema.form.rails.builder.methods.find(({ name }) => name === method.name), method);
    assert.ok(schema.faqs.length);
  }
  assert.equal(read('kits/button.schema.json').form.rails.builder.actions.name, 'actions');
});

test('lookup exposes form contracts, FAQ search, builder methods and prop descriptions from installed metadata', (t) => {
  const run = installedFixture(t);
  const kit = run('kit', 'Dropdown');
  assert.equal(kit.version, index.version);
  assert.equal(kit.form.rails.builder.methods[0].binding.modelScopedName, false);
  assert.ok(kit.faqs.some(({ id }) => id === 'dropdown.builder-name'));
  assert.equal(run('forms', 'text_field').method.binding.modelValue, true);
  assert.equal(run('forms', 'actions').actions.kit, 'button');
  assert.equal(run('search', 'dropdown_field').matches[0].name, 'dropdown');
  assert.ok(run('search', 'maxlength').matches.some(({ name }) => name === 'text_input'));
  const prop = run('prop', 'dropdown', 'name');
  assert.ok(prop.form);
  assert.ok(prop.faqs.some(({ id }) => id === 'dropdown.builder-name'));
});

test('lookup retains descriptions and shapes and handles older installed metadata without using local contracts', (t) => {
  const run = installedFixture(t, {
    'index.json': { version: 'old-installed-version', kitMeta: { text_input: { schema: 'kits/text_input.schema.json' } } },
    'kits/text_input.schema.json': { props: { options: { type: 'array', platforms: ['rails'], description: 'Installed description', example: [{ id: 'x' }], itemShape: { id: { type: 'string' } } } } },
  });
  const kit = run('kit', 'text_input');
  assert.equal(kit.version, 'old-installed-version');
  assert.equal(kit.form, null);
  assert.deepEqual(kit.faqs, []);
  assert.equal(kit.props[0].description, 'Installed description');
  assert.deepEqual(kit.props[0].itemShape, { id: { type: 'string' } });
  assert.equal(run('forms').forms, null);
});

test('missing standalone props do not become invented kit props even when a builder supports them', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playbook-missing-prop-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const target = path.join(root, 'node_modules/playbook-ui/dist');
  fs.mkdirSync(target, { recursive: true });
  fs.symlinkSync(dist, path.join(target, 'ai'), 'dir');
  const result = spawnSync(process.execPath, [lookup, '--root', root, 'prop', 'dropdown', 'inputOptions'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  const error = JSON.parse(result.stderr);
  assert.equal(error.ok, false);
  assert.ok(error.form);
  assert.ok(error.faqs.length);
});
