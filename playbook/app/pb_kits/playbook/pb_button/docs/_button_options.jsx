import React from 'react'
import Button from '../_button.jsx'

const ButtonOptions = (props) => (
  <div>
    <Button
        htmlType="submit"
        onClick={() => alert('Click!')}
        text="Button with options"
        value="1234"
        {...props}
    />
  </div>
)

export default ButtonOptions
