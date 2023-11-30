import React from 'react'
import classnames from 'classnames'

import { buildCss, buildHtmlProps } from '../../utilities/props'
import { GlobalProps, globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'


type DialogFooterProps = {
  aria?: {[key: string]: string},
  children: React.ReactChild[] | React.ReactChild | string,
  className?: string,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | Function},
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
    className,
    htmlOptions = {},
    spacing = "between",
    separator = false,
  } = props

  const footerCSS = buildCss("dialog_footer")
  const footerSpacing = globalProps(props)
  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <div 
      {...htmlProps}
    >
      {separator &&
        <SectionSeparator />
      }
      <div className="dialog-pseudo-footer">
      </div>
      <Flex
          className={classnames(footerCSS, footerSpacing, className)}
          spacing={spacing}
      >
        {children}
      </Flex>
    </div>
  )
}

export default DialogFooter
