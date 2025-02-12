import React from "react"
import Icon from "../../pb_icon/_icon"

type FullscreenIconButtonProps = {
  isFullscreen: boolean
  onClick: () => void
}

export const FullscreenIconButton = ({ isFullscreen, onClick }: FullscreenIconButtonProps) => {
  return (
    <>
        <button
            className="gray-icon fullscreen-icon"
            onClick={onClick}
        >
            <Icon
                cursor="pointer"
                fixedWidth
                icon={isFullscreen ? "grid-2" : "expand"}
            />
        </button>
    </>
  )
}