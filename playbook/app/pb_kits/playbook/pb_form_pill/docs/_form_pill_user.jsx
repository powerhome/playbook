import React from 'react'
import FormPill from '../_form_pill.jsx'

const FormPillDefault = (props) => {
  return (

    <div>
      <FormPill
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          onClick={() => alert('Click!')}
          {...props}
      />
      <br />
      <br />
      <FormPill
          name="Anna Black"
          onClick={() => alert('Click!')}
          {...props}
      />
    </div>
  )
}

export default FormPillDefault
