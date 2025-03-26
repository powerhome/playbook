import React from 'react'
import classnames from 'classnames'

import { GlobalProps, globalProps, globalInlineProps } from '../../utilities/globalProps'

type LayoutRoundLabelProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

export const RoundLabel = (props: LayoutRoundLabelProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <div
        className={classnames('layout_round_label', className)}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )
}

type LayoutRoundProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

export const Round = (props: LayoutRoundProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  const numberOfChildren = Array.isArray(children) ? children.length : 0

  const rightConnectors = Array.from({ length: numberOfChildren / 2 }, (_, index) => (
    <div
        className="right_connector"
        key={`right_connector_${index}`}
    />
  ))

  const numberOfGamesClass = 
    numberOfChildren === 8 ? 'eight_games' :
    numberOfChildren === 4 ? 'four_games' :
    numberOfChildren === 2 ? 'two_games' : ''

  return (
    <>
      <div
          className={classnames('layout_round', globalProps(props), className, numberOfGamesClass)}
          style={dynamicInlineProps}
      >
        {children}
      </div>
      <div className="connector_container">{rightConnectors}</div>
    </>
  )
}
