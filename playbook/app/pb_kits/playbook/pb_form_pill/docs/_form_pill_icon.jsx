import React from 'react'
import FormPill from '../_form_pill'

const FormPillIcon = (props) => {
  return (
    <div>
      <FormPill
          icon="badge-check"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="icon and tag"
          {...props}
      />
    </div>
  )
}
export default FormPillIcon
