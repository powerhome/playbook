/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'

// Footer component
const DialogFooter = (props: DialogFooterProps) => {
  const {
    children,
    padding = 'sm',
    className,
    spacing = 'between',
    separator = false,
  } = props
  const footerCSS = buildCss('dialog_footer')
  const footerSpacing = globalProps(props, { padding })

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
