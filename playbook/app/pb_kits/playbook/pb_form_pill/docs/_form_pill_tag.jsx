import React from 'react'
import FormPill from '../_form_pill.jsx'

const FormPillDefault = (props) => {
  return (
    <div>
      <FormPill
          onClick={() => {
alert('Click!')
}}
          text="this is a tag"
          {...props}
      />
    </div>
  )
}
export default FormPillDefault
