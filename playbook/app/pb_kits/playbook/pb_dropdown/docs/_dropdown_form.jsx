import React from 'react'
import Dropdown from '../_dropdown'
import Button from '../../pb_button/_button'

const DropdownForm = () => (
  <form onSubmit={(event) => event.preventDefault()}>
    <Dropdown
        label="Tags"
        marginBottom="md"
        multiSelect
        name="tags[]"
        options={[{ id: 'existing', label: 'Existing tag', value: 'existing' }]}
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
  </form>
)

export default DropdownForm
