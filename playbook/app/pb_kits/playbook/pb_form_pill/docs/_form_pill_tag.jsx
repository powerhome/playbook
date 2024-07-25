import React from 'react'
import FormPill from '../_form_pill'

const FormPillDefault = (props) => {
  return (
    <div>
      <FormPill
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="this is a tag"
          {...props}
      />
    </div>
  )
}
export default FormPillDefault
