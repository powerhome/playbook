import React from "react"
import Card from "../_card.jsx"

function CardSelected() {
  return (
    <div>
      <Card>{`Card content`}</Card>
      <br/>
      <Card selected>{`Card content`}</Card>
    </div>
  )
}

export default CardSelected
