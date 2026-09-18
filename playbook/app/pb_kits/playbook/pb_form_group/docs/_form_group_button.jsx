import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import FormGroup from '../../pb_form_group/_form_group'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupButton = (props) => {
  const [searchWithLabel, setSearchWithLabel] = useState('')
  const [search, setSearch] = useState('')

  const handleUpdateSearchWithLabel = ({ target }) => {
    setSearchWithLabel(target.value)
  }

  const handleUpdateSearch = ({ target }) => {
    setSearch(target.value)
  }

  return (
    <div>
      <div>
        <FormGroup>
          <TextInput
              id="search-with-label"
              label="With Label"
              onChange={handleUpdateSearchWithLabel}
              placeholder="Search"
              value={searchWithLabel}
              {...props}
          />
          <Button
              onClick={() => alert('Button Clicked!')}
              text="Submit"
              variant="secondary"
              {...props}
          />
        </FormGroup>
      </div>
      <br />
      <div>
        <FormGroup>
          <TextInput
              onChange={handleUpdateSearch}
              placeholder="Search"
              value={search}
              {...props}
          />
          <Button
              onClick={() => alert('Button Clicked!')}
              text="Submit"
              variant="secondary"
              {...props}
          />
        </FormGroup>
      </div>
    </div>
  )
}

export default FormGroupButton
