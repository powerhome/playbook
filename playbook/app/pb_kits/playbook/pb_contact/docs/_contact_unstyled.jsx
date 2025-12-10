import React from 'react'
import Contact from "../../pb_contact/_contact"
import Body from "../../pb_body/_body"

const ContactUnstyled = (props) => {
  return (
    <div>
      <Body color="default">
        <Contact
            contactType="home"
            contactValue="2125551234"
            iconEnabled={false}
            unstyled
            {...props}
        />
      </Body>
      <Body color="light">
        <Contact
            contactType="work"
            contactValue="12125551234"
            iconEnabled={false}
            unstyled
            {...props}
        />
      </Body>
      <Body color="lighter">
        <Contact
            contactType="cell"
            contactValue="4155551234"
            iconEnabled={false}
            unstyled
            {...props}
        />
      </Body>
      <Body color="default">
        <Contact
            contactType="extension"
            contactValue="1234"
            iconEnabled={false}
            unstyled
            {...props}
        />
      </Body>
    </div>
  )
}

export default ContactUnstyled

