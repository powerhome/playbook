import React from 'react'
import FormPill from '../_form_pill'

const FormPillExample = (props) => {
  return (
    <div>
      <FormPill
          onClick={() => alert('Click!')}
          tabIndex={0}
          text="THIS IS A TAG"
          textTransform="lowercase"
          {...props}
      />
    </div>
  )
}

export default FormPillExample
