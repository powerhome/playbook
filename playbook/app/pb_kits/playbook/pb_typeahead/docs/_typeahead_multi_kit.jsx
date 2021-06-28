// @flow

import React from 'react'

import Typeahead from '../_typeahead'

const labels = [
  { label: 'Verve', value: '1956' },
  { label: 'Stax', value: '1957' },
  { label: 'Motown', value: '1959' },
  { label: 'Kudu', value: '1971' },
  { label: 'Stones Throw', value: '1996' },
]

const expressionists = [
  { label: 'Kandinsky', value: 'Russia' },
  { label: 'Klee', value: 'Switzerland' },
  { label: 'Kokoschka', value: 'Austria' },
  { label: 'Kirchner', value: 'Germany' },
]

const TypeaheadMultiKit = (props) => {
  return (
    <>
      <Typeahead
          defaultValue={[labels[0]]}
          isMulti
          label="Badges"
          multiKit="badge"
          options={labels}
          {...props}
      />
      <Typeahead
          defaultValue={[expressionists[0]]}
          isMulti
          label="Small Pills"
          multiKit="smallPill"
          options={expressionists}
          {...props}
      />
    </>
  )
}

export default TypeaheadMultiKit
