import React from "react"
import LabelValue from "../_label_value.jsx"
import Title from "../../pb_title/_title.jsx";

function LabelValueCustom() {
  return (
    <LabelValue label="Role">
      <Title text="Administrator" />
      {`and Moderator`}
    </LabelValue>
  )
}

export default LabelValueCustom;
