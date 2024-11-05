import React from 'react'
import { Card, Caption, FormPill, Typeahead } from 'playbook-ui'

const names = [
  { label: 'Alexander Nathaniel Montgomery', value: 'Alexander Nathaniel Montgomery' },
  { label: 'Isabella Anastasia Wellington', value: 'Isabella Anastasia Wellington' },
  { label: 'Christopher Maximilian Harrington', value: 'Christopher Maximilian Harrington' },
  { label: 'Elizabeth Seraphina Kensington', value: 'Elizabeth Seraphina Kensington' },
  { label: 'Theodore Jonathan Abernathy', value: 'Theodore Jonathan Abernathy' },
]

const FormPillTruncatedText = (props) => {
  return (
    <>
      <Typeahead
          htmlOptions={{ style: { maxWidth: "240px" }}}
          isMulti
          label="Truncation Within Typeahead"
          options={names}
          truncate={1}
          {...props}
      />
      <Caption text="Form Pill Truncation"/>
      <Card maxWidth="xs">
        <FormPill
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            name="Princess Amelia Mignonette Grimaldi Thermopolis Renaldo"
            onClick={() => alert('Click!')}
            tabIndex={0}
            truncate={1}
        />
        <FormPill
            icon="badge-check"
            onClick={() => {alert('Click!')}}
            tabIndex={0}
            text="icon and a very long tag to show truncation"
            truncate={1}
        />
        <FormPill
            onClick={() => {alert('Click!')}}
            tabIndex={0}
            text="form pill with a very long tag to show truncation"
            truncate={1}
        />
      </Card>
    </>
  )
}

export default FormPillTruncatedText
