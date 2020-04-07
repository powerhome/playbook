import React from 'react'
import FormPill from '../_form_pill.jsx'

const FormPillDefault = () => {
  return (

    <div>
      <FormPill
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          onClick={() => alert('Click!')}
      />
      <br />
      <br />
      <FormPill
          name="Anna Black"
          onClick={() => alert('Click!')}
      />
    </div>
  )
}

export default FormPillDefault
