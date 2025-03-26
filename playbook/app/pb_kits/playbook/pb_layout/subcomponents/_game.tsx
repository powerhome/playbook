import React from 'react'
import classnames from 'classnames'

import { GlobalProps, globalProps, globalInlineProps } from '../../utilities/globalProps'

import Card from '../../pb_card/_card'
import SectionSeparator from '../../pb_section_separator/_section_separator'

type LayoutGameProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

// Game component (modeled after Item)
const Game = (props: LayoutGameProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  
  const numberOfChildren = Array.isArray(children) ? children.length : 0
  
  if (numberOfChildren === 2) {
    const [firstChild, secondChild] = React.Children.toArray(children)
  
    if (React.isValidElement(firstChild) && React.isValidElement(secondChild)) { 
    return (
      <div
          className={classnames('layout_game', globalProps(props), className)}
          style={dynamicInlineProps}
      >
        <Card
            marginY="xs"
            padding="none"
            shadow="deep"
        >
          <Card.Body padding="xs">{firstChild}</Card.Body>
          <SectionSeparator />
          <Card.Body padding="xs">{secondChild}</Card.Body>
        </Card>
      </div>
      )
    }
  }
  
  return (
    <div
        className={classnames('layout_game', globalProps(props), className)}
        style={dynamicInlineProps}
    >
    {numberOfChildren >= 1 ? (
      children
    ) : (
      <Card
          marginY="xs"
          padding="none"
          shadow="deep"
      >
        <Card.Body padding="xs">To be determined...</Card.Body>
        <SectionSeparator />
        <Card.Body padding="xs">To be determined...</Card.Body>
      </Card>
    )}
    </div>
  )
}

export default Game
