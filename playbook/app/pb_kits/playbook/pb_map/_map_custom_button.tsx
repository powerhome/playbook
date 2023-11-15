import React from "react"
import Button from "../pb_button/_button"
import Icon from "../pb_icon/_icon"

type MapCustomButtonTypes = {
  onClick?: () => {}
  icon?: string
}

const MapCustomButton = ({ onClick, icon }: MapCustomButtonTypes) => {
  return (
    <Button className="pb_map-custom-button" onClick={onClick}>
      <Icon icon={icon} />
    </Button>
  )
}

export default MapCustomButton
