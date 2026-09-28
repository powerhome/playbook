import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { extractFormStructure, validateFormContracts } from './build-form-metadata.mjs';
import { acceptFormReviews, formSourceSnapshot, pendingFormReviews, readFormReviews, REVIEW_FILE, validateFormReviews } from './form-source-reviews.mjs';

const packageRoot = fileURLToPath(new URL('../../', import.meta.url));
const kitNames = fs.readdirSync(path.join(packageRoot, 'app/pb_kits/playbook')).filter((name) => name.startsWith('pb_')).map((name) => name.slice(3));
const metadata = validateFormContracts(packageRoot, kitNames);
const snapshot = formSourceSnapshot(packageRoot, metadata);

function sourceFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playbook-form-source-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const files = new Set(Object.values(snapshot.contracts).flatMap((sources) => Object.keys(sources)));
  for (const file of files) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.copyFileSync(path.join(packageRoot, file), path.join(root, file));
  }
  fs.mkdirSync(path.dirname(path.join(root, REVIEW_FILE)), { recursive: true });
  fs.writeFileSync(path.join(root, REVIEW_FILE), JSON.stringify(snapshot));
  return root;
}

function edit(root, file, before, after) {
  const target = path.join(root, file);
  const original = fs.readFileSync(target, 'utf8');
  assert.ok(original.includes(before));
  fs.writeFileSync(target, original.replace(before, after));
}

const dropdownBuilder = 'lib/playbook/forms/builder/dropdown_field.rb';

test('structure derives signatures, mappings and source paths from parsed Ruby, including generic wrappers and actions', (t) => {
  const root = sourceFixture(t);
  edit(root, dropdownBuilder, 'props: {})', 'props: {}, html_options: { fallback: ")" })');
  edit(root, dropdownBuilder, 'pb_rails("dropdown"', 'pb_rails("select"');
  edit(root, 'lib/playbook/forms/builder/form_field_builder.rb', '|name, props: {}, **options, &block|', '|name, props: {}, extra: [], **options, &block|');
  edit(root, 'lib/playbook/forms/builder/action_area.rb', 'def submit(value = nil, props: {})', 'def submit(value = "Save", props: {})');
  fs.appendFileSync(path.join(root, dropdownBuilder), '\n# def fake_field(name)\n# @template.pb_rails("fake", props: props)\n');
  const structure = extractFormStructure(root);
  const dropdown = structure.methods.find(({ name }) => name === 'dropdown_field');
  assert.equal(dropdown.kit, 'select');
  assert.equal(dropdown.signature, 'dropdown_field(name, props: {}, html_options: { fallback: ")" })');
  assert.ok(dropdown.sources.includes(dropdownBuilder));
  assert.match(structure.methods.find(({ name }) => name === 'text_field').signature, /extra: \[\]/);
  assert.ok(structure.actions.methods.includes('submit(value = "Save", props: {})'));
  assert.equal(structure.methods.some(({ name }) => name === 'fake_field'), false);
  assert.throws(() => validateFormContracts(root, kitNames), /Unresolved FAQ contract path/);
  edit(root, dropdownBuilder, 'pb_rails("select"', 'pb_rails("dropdown"');
  const resolved = validateFormContracts(root, kitNames);
  assert.equal(resolved.methods.find(({ name }) => name === 'dropdown_field').signature, dropdown.signature);
  assert.throws(() => validateFormReviews(root, resolved), /needs source review/);
});

test('new methods need curated behavior; unsupported dynamic kit mapping fails instead of guessing', (t) => {
  const root = sourceFixture(t);
  fs.appendFileSync(path.join(root, dropdownBuilder), '\ndef added_field(name, props: {})\n  @template.pb_rails("dropdown", props: props)\nend\n');
  assert.throws(() => validateFormContracts(root, kitNames), /Missing or incorrect form contract: added_field/);
  edit(root, dropdownBuilder, 'pb_rails("dropdown", props: props)', 'pb_rails(dynamic_kit, props: props)');
  assert.throws(() => extractFormStructure(root), /Expected literal string_literal/);
});

test('behavior-only edits fail review, do not rewrite fingerprints, and require explicit scoped acceptance', (t) => {
  const root = sourceFixture(t);
  edit(root, dropdownBuilder, 'props[:name] = name', 'props[:name] = name.to_s');
  const before = fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8');
  assert.throws(() => validateFormReviews(root, metadata), /dropdown.*[\s\S]*dropdown_field\.rb/);
  assert.equal(fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8'), before);
  assert.throws(() => acceptFormReviews(root, metadata, ['not_a_scope']), /Unknown review scope/);
  assert.equal(fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8'), before);
  acceptFormReviews(root, metadata, ['text_input']);
  assert.throws(() => validateFormReviews(root, metadata), /needs source review/);
  acceptFormReviews(root, metadata, ['dropdown']);
  validateFormReviews(root, metadata);
});

test('shared helpers, ERB, JS and React dependencies trigger all affected review scopes', (t) => {
  const root = sourceFixture(t);
  for (const file of [
    'lib/playbook/pb_forms_helper.rb',
    'app/pb_kits/playbook/pb_text_input/text_input.html.erb',
    'app/pb_kits/playbook/pb_dropdown/index.js',
    'app/pb_kits/playbook/pb_typeahead/_typeahead.tsx',
  ]) fs.appendFileSync(path.join(root, file), '\n');
  const changes = pendingFormReviews(formSourceSnapshot(root, metadata), readFormReviews(root));
  const scopes = changes.map(({ scope }) => scope);
  for (const scope of ['builder', 'text_input', 'date_picker', 'dropdown', 'phone_number_input', 'time_picker', 'typeahead']) assert.ok(scopes.includes(scope), scope);
  assert.equal(scopes.includes('star_rating'), false);
});

test('runtime file additions and deletions require review; generated files, docs and tests do not', (t) => {
  const root = sourceFixture(t);
  const kit = path.join(root, 'app/pb_kits/playbook/pb_dropdown');
  fs.mkdirSync(path.join(kit, 'docs'));
  fs.writeFileSync(path.join(kit, 'docs/example.html.erb'), 'documentation');
  fs.writeFileSync(path.join(kit, 'kit.schema.json'), '{}');
  fs.writeFileSync(path.join(kit, 'dropdown.test.js'), 'test');
  validateFormReviews(root, metadata);
  fs.writeFileSync(path.join(kit, 'new-behavior.js'), 'export const changed = true;');
  assert.throws(() => validateFormReviews(root, metadata), /new-behavior\.js/);
  acceptFormReviews(root, metadata, ['dropdown']);
  validateFormReviews(root, metadata);
  fs.unlinkSync(path.join(kit, 'new-behavior.js'));
  assert.throws(() => validateFormReviews(root, metadata), /new-behavior\.js/);
});

test('checked-in source fingerprints are current and line endings do not create drift', (t) => {
  validateFormReviews(packageRoot, metadata);
  const root = sourceFixture(t);
  const file = path.join(root, dropdownBuilder);
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/\n/g, '\r\n'));
  validateFormReviews(root, metadata);
});


test('build rejects stale descriptions before cleaning dist or updating review records', (t) => {
  const root = sourceFixture(t);
  fs.cpSync(path.join(packageRoot, 'scripts/lib'), path.join(root, 'scripts/lib'), { recursive: true });
  fs.copyFileSync(path.join(packageRoot, 'scripts/build-ai-dist.mjs'), path.join(root, 'scripts/build-ai-dist.mjs'));
  for (const kit of kitNames) {
    const directory = path.join(root, 'app/pb_kits/playbook', `pb_${kit}`);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'kit.schema.json'), '{}');
  }
  const sentinel = path.join(root, 'dist/ai/keep-existing-output.json');
  fs.mkdirSync(path.dirname(sentinel), { recursive: true });
  fs.writeFileSync(sentinel, '{}');
  edit(root, dropdownBuilder, 'props[:name] = name', 'props[:name] = name.to_s');
  const reviewBefore = fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8');
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/build-ai-dist.mjs')], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Form metadata needs source review/);
  assert.ok(fs.existsSync(sentinel));
  assert.equal(fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8'), reviewBefore);
});

test('pre-commit triggers for builder, template, JavaScript and review changes', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playbook-form-hook-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const hook = path.join(root, '.git-hooks/pre_commit/verify_docs_metadata.sh');
  fs.mkdirSync(path.dirname(hook), { recursive: true });
  fs.copyFileSync(path.join(packageRoot, '../.git-hooks/pre_commit/verify_docs_metadata.sh'), hook);
  const bin = path.join(root, 'bin');
  fs.mkdirSync(bin);
  fs.writeFileSync(path.join(bin, 'git'), '#!/bin/sh\nprintf "%s\\n" "$TEST_STAGED_FILE"\n', { mode: 0o755 });
  fs.writeFileSync(path.join(bin, 'yarn'), '#!/bin/sh\necho METADATA_CHECK_INVOKED >&2\nexit 42\n', { mode: 0o755 });
  for (const file of [
    `playbook/${dropdownBuilder}`,
    'playbook/lib/playbook/pb_forms_helper.rb',
    'playbook/app/pb_kits/playbook/pb_dropdown/dropdown.html.erb',
    'playbook/app/pb_kits/playbook/pb_dropdown/index.js',
    `playbook/${REVIEW_FILE}`,
    'playbook/scripts/lib/form-contracts.mjs',
  ]) {
    const result = spawnSync('bash', [hook], { encoding: 'utf8', env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, TEST_STAGED_FILE: file } });
    assert.equal(result.status, 1, file);
    assert.match(result.stderr, /METADATA_CHECK_INVOKED/, file);
  }
});
