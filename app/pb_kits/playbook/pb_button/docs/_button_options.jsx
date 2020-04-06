import React from 'react'
import Button from '../_button.jsx'

const ButtonOptions = () => (
  <div>
    <Button
        htmlType="submit"
        onClick={() => alert('Click!')}
        text="Button with options"
        value="1234"
    />
  </div>
)

export default ButtonOptions
