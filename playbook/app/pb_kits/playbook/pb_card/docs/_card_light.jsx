import React from "react"
import Card from "../_card"

const CardLight = (props) => {
  return (
    <div>
      <Card
          height="100%"
          htmlOptions={{
            style: {
              width: "100%",
              backgroundColor: "blue",
            },
            tabIndex: 7
          }}
          minHeight="189px"
          {...props}
      >
        {"HELLO WORLD!!!"}
      </Card>
    </div>
  )
}

export default CardLight

