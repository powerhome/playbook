import React from 'react'
import { Detail } from 'playbook-ui'

const DetailStyled = (props) => (
  <>
    <Detail {...props}>
      <b>{"This text is using the <b> tag."}</b>
      <br />
      <br />
      <strong>{"This text is using the <strong> tag."}</strong>
      <br />
      <br />
      <a>{"This text is using the <a> tag."}</a>
      <br />
      <br />
      <i>{"This text is using the <i> tag."}</i>
      <br />
      <br />
      {"This "}<em>{"word"}</em>{" is using an <em> tag."}
      <br />
      <br />
      <small>{"This text is using the <small> tag."}</small>
      <br />
      <br />
      <u>{"This text is using the <u> tag."}</u>
      <br />
      <br />
    </Detail>
  </>
)

export default DetailStyled
