/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'


type DialogFooterProps = {
  aria?: object,
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  closeable: boolean,
  data?: object,
  id?: string,
  padding?: string,
  paddingBottom?: string,
  paddingX?: string,
  separator: boolean,
  spacing?: string,
}

// Footer component
const DialogFooter = (props: DialogFooterProps) => {
  const {
    children,
    padding = 'sm',
    paddingBottom = "sm",
    paddingX = "sm",
    className,
    spacing = 'between',
    separator = false,
  } = props

  const footerCSS = buildCss('dialog_footer')
  const footerSpacing = globalProps(props, { padding, paddingBottom, paddingX })

  return (
    <>
      <If condition={separator}>
        <SectionSeparator />
      </If>
      <Flex
          className={classnames(footerCSS, footerSpacing, className)}
          spacing={spacing}
      >
        {children}
      </Flex>
    </>
  )
}

export default DialogFooter
