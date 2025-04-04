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
  numberOfRounds: number,
} & GlobalProps

export const Round = (props: LayoutRoundProps) => {
  const { children, className, numberOfRounds } = props
  const dynamicInlineProps = globalInlineProps(props)
  const numberOfChildren = Array.isArray(children) ? children.length : 0

  const childrenWithProps = Array.isArray(children) ? children.map((child, index) =>
    React.isValidElement(child) ? React.cloneElement(child, { numberOfRounds, numberOfGames: numberOfChildren, isOdd: index % 2 === 0, key: `child_${index}` }) : child
  ) : children

  const rightConnectors = Array.from({ length: numberOfChildren / 2 }, (_, index) => (
    <div
        className="right_connector"
        key={`right_connector_${index}`}
    />
  ))

  return (
    <>
      <div
          className={classnames('layout_round', globalProps(props), className)}
          style={dynamicInlineProps}
      >
        {childrenWithProps}
      </div>
      <div className="connector_container">{rightConnectors}</div>
    </>
  )
}
