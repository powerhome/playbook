import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../../utilities/props'
import { GlobalProps, globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'


type DialogFooterProps = {
  aria?: {[key: string]: string},
  children: React.ReactChild[] | React.ReactChild | string,
  className?: string,
  data?: {[key: string]: string},
  id?: string,
  padding?: string,
  paddingBottom?: string,
  paddingX?: string,
  separator?: boolean,
  spacing?: "none" | "between" | "around" | "evenly",
} & GlobalProps

// Footer component
const DialogFooter = (props: DialogFooterProps) => {
  const {
    children,
    padding = "sm",
    paddingBottom = "sm",
    paddingX = "sm",
    className,
    spacing = "between",
    separator = false,
  } = props

  const footerCSS = buildCss("dialog_footer")
  const footerSpacing = globalProps(props, { padding, paddingBottom, paddingX })

  return (
    <>
      {separator &&
        <SectionSeparator />
      }
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
