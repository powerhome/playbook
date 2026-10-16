import React, { useState } from 'react'
import Dropdown from '../_dropdown'
import Button from '../../pb_button/_button'
import Body from '../../pb_body/_body'

const DropdownForm = () => {
  const [submittedTags, setSubmittedTags] = useState(null)
  const options = [
    { id: 'product', label: 'Product', value: 'product' },
    { id: 'support', label: 'Support', value: 'support' },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedTags(new FormData(event.currentTarget).getAll('tags[]'))
  }

  return (
    <form onReset={() => setSubmittedTags(null)}
        onSubmit={handleSubmit}
    >
      <Dropdown
          enableFormSupport
          label="Tags"
          marginBottom="md"
          multiSelect
          name="tags[]"
          options={options}
          required
          requiredIndicator
          validationMessage="Select at least one tag."
      />
      <Button text="Submit"
          type="submit"
      />
      <Button marginLeft="xs"
          text="Reset"
          type="reset"
          variant="secondary"
      />
      {submittedTags && (
        <Body marginTop="sm"
            text={`Submitted tags: ${submittedTags.join(', ')}`}
        />
      )}
    </form>
  )
}

export default DropdownForm
