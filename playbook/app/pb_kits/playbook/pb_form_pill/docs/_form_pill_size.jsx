import React from 'react'
import FormPill from '../_form_pill'

const FormPillSize = (props) => {
  return (

    <div>
      <FormPill
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          size="small"
          tabIndex={0}
          {...props}
      />
      <br />
      <br />
      <FormPill
          name="Anna Black"
          size="small"
          tabIndex={0}
          {...props}
      />
    </div>
  )
}

export default FormPillSize
