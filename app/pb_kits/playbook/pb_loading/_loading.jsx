/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Flex } from '../'

type LoadingProps = {
  align?: string,
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  isLoading: boolean,
  size?: string,
}

const Loading = (props: LoadingProps) => {
  const {
    align,
    aria = {},
    className,
    data = {},
    id,
    isLoading = true,
    size = '_md',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_loading_kit', size), globalProps(props), className)

  return (
    <If condition={isLoading}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <Flex
            className="loading-container"
            horizontal={align}
        >
          <div className="loading-circle" />
          <div className="loading-circle" />
          <div className="loading-circle" />
        </Flex>
      </div>
    </If>
  )
}

export default Loading
