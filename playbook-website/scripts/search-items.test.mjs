import assert from 'node:assert/strict'
import { test } from 'node:test'
import { searchItems } from '../app/javascript/components/Website/src/utils/searchItems.ts'

test('ranks exact, prefix, word, substring, acronym and fuzzy matches', () => {
  const names = ['axxxb', 'Alpha Beta', 'cab', 'a b', 'abc', 'AB', 'ab']
  const items = names.map(name => ({ name }))
  assert.deepEqual(searchItems(items, 'ab', ['name']).map(item => item.name), [
    'ab', 'AB', 'abc', 'cab', 'a b', 'Alpha Beta', 'axxxb',
  ])
  assert.deepEqual(searchItems([{ name: 'a button' }, { name: 'unbutton' }], 'button', ['name'])
    .map(item => item.name), ['a button', 'unbutton'])
})

test('icon search excludes acronym and fuzzy results', () => {
  const items = ['arrow-left', 'arrow-location', 'alert'].map(name => ({ name }))
  assert.deepEqual(searchItems(items, 'al', ['name'], true).map(item => item.name), ['alert'])
  assert.equal(searchItems(items, 'al', ['name']).length, 3)
})

test('normalizes accents and searches array fields without changing the input', () => {
  const items = [
    { name: 'Other', terms: ['café', 'Résumé'] },
    { name: 'Cafe', terms: [] },
    { name: 'Neither', terms: ['Æther'] },
  ]
  assert.deepEqual(searchItems(items, 'cafe', ['name', item => item.terms]), [items[0], items[1]])
  assert.deepEqual(searchItems(items, 'resume', ['name', item => item.terms]), [items[0]])
  assert.deepEqual(searchItems(items, 'aether', ['name', item => item.terms]), [items[2]])
  assert.equal(items[0].name, 'Other')
})

test('breaks ties by field priority, alphabetically, then original order', () => {
  const items = [
    { name: 'z button', terms: ['button'] },
    { name: 'button', terms: [] },
    { name: 'Button', terms: [] },
    { name: 'button', terms: [] },
  ]
  assert.deepEqual(searchItems(items, 'button', ['name', item => item.terms]), [
    items[1], items[3], items[0], items[2],
  ])
  const tied = [{ name: 'z button' }, { name: 'a button' }]
  assert.deepEqual(searchItems(tied, 'button', ['name']), [tied[1], tied[0]])
  assert.deepEqual(searchItems(items, 'missing', ['name']), [])
  assert.deepEqual(searchItems([], 'button', ['name']), [])
})
