import React from 'react'
import classnames from 'classnames'

import { GlobalProps, globalProps, globalInlineProps } from '../../utilities/globalProps'

import Card from '../../pb_card/_card'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'

type LayoutGameProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  numberOfRounds: number,
  numberOfGames: number,
  lastRoundWithSelf?: number,
  isOdd: boolean,
} & GlobalProps

// Game component (modeled after Item)
const Game = (props: LayoutGameProps) => {
  const { children, className, numberOfRounds, numberOfGames, isOdd, lastRoundWithSelf } = props
  const dynamicInlineProps = globalInlineProps(props)

  const numberOfChildren = Array.isArray(children) ? children.length : 0

  const isMultiple = Array.isArray(children)

  let ratio = 0
  let exponent
  let currentRound = numberOfRounds
  if (numberOfGames > 1) {
    exponent = (numberOfRounds) - Math.log2(numberOfGames) - 1
    ratio = 2 ** exponent

    currentRound = exponent + 1
  }

  let hasWinner = false
  const hasLastWinnerAndSelf = lastRoundWithSelf === currentRound
  if (numberOfChildren === 2) {
    const [firstChildWithoutProps, secondChildWithoutProps] = React.Children.toArray(children)

    const firstChild = React.cloneElement(firstChildWithoutProps, { hasLastWinnerAndSelf })
    const secondChild = React.cloneElement(secondChildWithoutProps, { hasLastWinnerAndSelf })

    if (React.isValidElement(firstChild) && React.isValidElement(secondChild)) {
      if ('winner' in firstChild.props || 'winner' in secondChild.props) {
        hasWinner = true
      }
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
            <SectionSeparator className="game_separator"/>
            <Card.Body padding="none">{secondChild}</Card.Body>
          </Card>
          {isOdd && numberOfGames > 1 &&
            <div
                className="half_box"
                style={{ height: `calc(${ratio} * 100% + 4px)` }}
            />
          }
          {numberOfGames > 1 && hasWinner &&
            <div className="polygon_node" />
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
      {((!isMultiple && children) || numberOfChildren >= 1) ? (
        children
      ) : (
        <div className="layout_tbd">
          <Card
              marginY="xs"
              padding="none"
              shadow="deep"
          >
            <Card.Body padding="xs">
              <Body color="light">
                To be determined...
              </Body>
            </Card.Body>
            <SectionSeparator className="game_separator"/>
            <Card.Body padding="xs">
              <Body color="light">
                To be determined...
              </Body>
            </Card.Body>
          </Card>
        </div>
      )}
      {isOdd && numberOfGames > 1 &&
        <div
            className="half_box"
            style={{ height: `calc(${ratio} * 100% + 4px)` }}
        />
      }
    </div>
  )
}

export default Game
