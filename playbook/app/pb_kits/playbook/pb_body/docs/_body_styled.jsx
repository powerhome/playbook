import React from 'react'
import { Body } from '../..'

const BodyStyled = (props) => {
  return (
    <div>
      <Body {...props}>
        <b>{"This text is using the <b> tag"}</b>
        <br />
        <br />
        <strong>{"This text is using the <strong> tag"}</strong>
        <br />
        <br />
        <a href="#">{"This text is using the <a> tag"}</a>
      </Body>
    </div>
  )
}

export default BodyStyled
