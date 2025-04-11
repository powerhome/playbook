import React from 'react'
import classnames from 'classnames'

import { GlobalProps, globalProps, globalInlineProps } from '../../utilities/globalProps'

import Card from '../../pb_card/_card'
import SectionSeparator from '../../pb_section_separator/_section_separator'

type LayoutGameProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  numberOfRounds: number,
  numberOfGames: number,
  isOdd: boolean,
} & GlobalProps

// Game component (modeled after Item)
const Game = (props: LayoutGameProps) => {
  const { children, className, numberOfRounds, numberOfGames, isOdd } = props
  const dynamicInlineProps = globalInlineProps(props)
  
  const numberOfChildren = Array.isArray(children) ? children.length : 0
  
  const isMultiple = Array.isArray(children)
  
  let ratio = 0
  let exponent
  if (numberOfGames > 1) {
    exponent = (numberOfRounds) - Math.log2(numberOfGames) - 1
    ratio = 2 ** exponent
  }
  
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
            overflow="hidden"
            padding="none"
            shadow="deep"
        >
          <Card.Body padding="none">{firstChild}</Card.Body>
          <SectionSeparator />
          <Card.Body padding="none">{secondChild}</Card.Body>
        </Card>
        {isOdd && numberOfGames > 1  &&
          <div
              className="half_box"
              style={{ height: `calc(${ratio} * 100% + 4px)` }}
          />
        }
      </div>
      )
    }
  }
  
  return (
    <div
        className={classnames('layout_game', globalProps(props), className)}
        style={dynamicInlineProps}
    >
    {((!isMultiple && children) || numberOfChildren >= 1 )? (
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
      {isOdd && numberOfGames > 1  &&
        <div
            className="half_box"
            style={{ height: `calc(${ratio} * 100% + 4px)` }}
        />
      }
    </div>
  )
}

export default Game
