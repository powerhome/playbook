import React from 'react'
import FormPill from '../_form_pill.jsx'

const FormPillDefault = () => {
  return (
    <div>
      <FormPill
          onClick={() => alert('Click!')}
          text="this is a tag"
      />
    </div>
  )
}
export default FormPillDefault
