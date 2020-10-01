import React from 'react'
import Button from '../_button.jsx'

const ButtonOptions = (props) => (
  <div>
    <Button
        {...props}
        htmlType="submit"
        onClick={() => alert('Click!')}
        text="Button with options"
        value="1234"
    />
  </div>
)

export default ButtonOptions
