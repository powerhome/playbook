import React from 'react'
import Typeahead from '../../pb_typeahead/_typeahead'

const names = [
  { label: 'Alexander Nathaniel Montgomery', value: 'Alexander Nathaniel Montgomery' },
  { label: 'Isabella Anastasia Wellington', value: 'Isabella Anastasia Wellington' },
  { label: 'Christopher Maximilian Harrington', value: 'Christopher Maximilian Harrington' },
  { label: 'Elizabeth Seraphina Kensington', value: 'Elizabeth Seraphina Kensington' },
  { label: 'Theodore Jonathan Abernathy', value: 'Theodore Jonathan Abernathy' },
]

const TypeaheadTruncatedText = (props) => {
  return (
    <>
      <Typeahead
          htmlOptions={{ style: { maxWidth: "240px" }}}
          isMulti
          label="Truncation Within Typeahead"
          options={names}
          truncate={"1"}
          {...props}
      />
    </>
  )
}

export default TypeaheadTruncatedText
