import React from "react"

//CollapsibleTrail component
const CollapsibleTrail = ({ leftOffset }: { leftOffset: number }) => {
  const style: { [key: string]: string | number } = {
    position: "absolute",
    left: `${leftOffset}em`,
    top: 0,
    bottom: 0,
    width: "2px",
    backgroundColor: "#E4E8F0",
  }

  return (
    <div 
        className="collapsible-trail" 
        style={style} 
    />
  )
}

// Updated function to render multiple trails depending on depth
export const renderCollapsibleTrail = (currentDepth: number) => {
  const lines = []
  for (let i = 1; i <= currentDepth; i++) {
    // Calculate leftOffset with additional 0.4rem for each depth level above 1
    const additionalOffset = i > 1 ? (i - 1) * 0.25 : 0
    const leftOffset = i * 1.0 + additionalOffset
    lines.push(<CollapsibleTrail key={i} 
        leftOffset={leftOffset} 
               />
              )
  }
  return lines
}
