import React from 'react'

import FormPill from '../../pb_form_pill/_form_pill'
import Title from '../../pb_title/_title'

const FormPillColors = (props) => {
  return (
    <div>
      <Title
          marginBottom="sm"
          size={4}
          text="Status Colors"
          {...props}
      />
      <FormPill
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Primary"
          {...props}
      />
      <FormPill
          color="neutral"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Neutral"
          {...props}
      />
      <FormPill
          color="success"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Success"
          {...props}
      />
      <FormPill
          color="warning"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Warning"
          {...props}
      />
      <FormPill
          color="error"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Error"
          {...props}
      />
      <FormPill
          color="info"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Info"
          {...props}
      />
      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Data Colors"
          {...props}
      />
      <FormPill
          color="data_1"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 1"
          {...props}
      />
      <FormPill
          color="data_2"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 2"
          {...props}
      />
      <FormPill
          color="data_3"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 3"
          {...props}
      />
      <FormPill
          color="data_4"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 4"
          {...props}
      />
      <FormPill
          color="data_5"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 5"
          {...props}
      />
      <FormPill
          color="data_6"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 6"
          {...props}
      />
      <FormPill
          color="data_7"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 7"
          {...props}
      />
      <FormPill
          color="data_8"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Data 8"
          {...props}
      />
      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Product Colors"
          {...props}
      />
      <FormPill
          color="windows"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Windows"
          {...props}
      />
      <FormPill
          color="siding"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Siding"
          {...props}
      />
      <FormPill
          color="roofing"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Roofing"
          {...props}
      />
      <FormPill
          color="doors"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Doors"
          {...props}
      />
      <FormPill
          color="gutters"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Gutters"
          {...props}
      />
      <FormPill
          color="solar"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Solar"
          {...props}
      />
      <FormPill
          color="insulation"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Insulation"
          {...props}
      />
      <FormPill
          color="accessories"
          onClick={() => {
            alert('Click!')
          }}
          tabIndex={0}
          text="Accessories"
          {...props}
      />
    </div>
  )
}
export default FormPillColors
