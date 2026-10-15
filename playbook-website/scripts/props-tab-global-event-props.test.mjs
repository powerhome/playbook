/**
 * Tab visibility + generated global event props metadata.
 *
 * Run: node --experimental-strip-types --test scripts/props-tab-global-event-props.test.mjs
 */

import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { test } from 'node:test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const KITS_DIR = path.join(ROOT, 'playbook/app/pb_kits/playbook')
const SCHEMA_PATH = path.join(KITS_DIR, 'utilities/global-event-props.schema.json')
const VALUES_PATH = path.join(
  ROOT,
  'playbook-website/app/javascript/components/Website/src/components/AvailableProps/globalEventPropsValues.ts'
)
const HELPERS_PATH = path.join(
  ROOT,
  'playbook-website/app/javascript/components/Website/src/components/AvailableProps/propsTabHelpers.ts'
)

const { shouldShowGlobalEventPropsTab, filterKitPropsForPropsTab } = await import(
  HELPERS_PATH
)

function readKitSchema(kitName) {
  return JSON.parse(
    fs.readFileSync(path.join(KITS_DIR, `pb_${kitName}`, 'kit.schema.json'), 'utf8')
  )
}

test('supported kits set globalEventProps: true in kit.schema.json', () => {
  for (const kit of ['body', 'card', 'flex', 'title']) {
    assert.equal(
      readKitSchema(kit).globalEventProps,
      true,
      `${kit} should opt into global event props`
    )
  }
})

test('unsupported kits omit globalEventProps', () => {
  for (const kit of ['badge', 'button', 'star_rating']) {
    assert.equal(
      readKitSchema(kit).globalEventProps,
      undefined,
      `${kit} should not opt into global event props`
    )
  }
})

test('shouldShowGlobalEventPropsTab is react-only and opt-in', () => {
  assert.equal(shouldShowGlobalEventPropsTab({ globalEventProps: true }, 'react'), true)
  assert.equal(shouldShowGlobalEventPropsTab({ globalEventProps: true }, 'rails'), false)
  assert.equal(shouldShowGlobalEventPropsTab({}, 'react'), false)
  assert.equal(shouldShowGlobalEventPropsTab(null, 'react'), false)
  assert.equal(shouldShowGlobalEventPropsTab(readKitSchema('body'), 'react'), true)
  assert.equal(shouldShowGlobalEventPropsTab(readKitSchema('badge'), 'react'), false)
})

test('filterKitPropsForPropsTab excludes global and global event prop names', () => {
  const filtered = filterKitPropsForPropsTab(
    {
      text: { platforms: ['react', 'rails'] },
      margin: { platforms: ['react', 'rails'] },
      onClick: { platforms: ['react'] },
      color: { platforms: ['react'] },
    },
    ['margin'],
    ['onClick'],
    'react'
  )

  assert.deepEqual(Object.keys(filtered).sort(), ['color', 'text'])
})

test('globalEventPropsValues.ts matches global-event-props.schema.json', () => {
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'))
  const schemaPropNames = Object.keys(schema.props || {}).sort()

  assert.ok(schemaPropNames.includes('onClick'))
  assert.equal(schema.props.onClick.type, 'function')
  assert.deepEqual(schema.props.onClick.platforms, ['react'])

  const valuesModule = fs.readFileSync(VALUES_PATH, 'utf8')
  assert.match(valuesModule, /AUTO-GENERATED FILE - DO NOT EDIT/)
  assert.match(valuesModule, /prop: "onClick"/)
  assert.match(valuesModule, /type: "function"/)
  assert.match(valuesModule, /platforms: \["react"\]/)

  for (const name of schemaPropNames) {
    assert.match(valuesModule, new RegExp(`prop: "${name}"`))
  }
})

test('generate:global-event-props-values is idempotent', () => {
  const before = fs.readFileSync(VALUES_PATH, 'utf8')
  execFileSync('yarn', ['generate:global-event-props-values'], {
    cwd: path.join(ROOT, 'playbook-website'),
    encoding: 'utf8',
  })
  const after = fs.readFileSync(VALUES_PATH, 'utf8')
  assert.equal(after, before)
})
