import React from 'react'
import { Body } from 'playbook-ui'

const BodyStyled = (props) => {
  return (
    <>
      <Body {...props}>
        <b>{"This text is using the <b> tag"}</b>
        <br />
        <br />
        <strong>{"This text is using the <strong> tag"}</strong>
        <br />
        <br />
        <a href="#">{"This text is using the <a> tag"}</a>
        <br />
        <br />
        <i>{"This text is using an <i> tag"}</i>
        <br />
        <br />
        {"This "}<em>word</em>{" is using an <em> tag."}
        <br />
        <br />
        <small>{"This text is using a <small> tag."}</small>
        <br />
        <br />
        <u>{"This text is using a <u> tag."}</u>
      </Body>
    </>
  )
}

export default BodyStyled
