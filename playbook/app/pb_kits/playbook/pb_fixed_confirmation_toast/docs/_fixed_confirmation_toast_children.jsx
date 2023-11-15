import React from "react"

import FixedConfirmationToast from "../_fixed_confirmation_toast"
import Button from "../../pb_button/_button"
import Title from "../../pb_title/_title"

const FixedConfirmationToastChildren = props => {
  return (
    <>
      <FixedConfirmationToast paddingY="none" status="success" {...props}>
        <Title
          dark
          marginLeft="md"
          size={4}
          text="Design & Handoff Process was moved to UX Designer Learning Track."
        />
        <Button
          dark
          onClick={() => alert("button clicked!")}
          paddingRight="none"
          text="Undo"
          variant="link"
        />
      </FixedConfirmationToast>
    </>
  )
}

export default FixedConfirmationToastChildren
