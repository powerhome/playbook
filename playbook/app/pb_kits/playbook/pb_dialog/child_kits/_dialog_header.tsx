import React, { useContext } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../../utilities/props'
import { globalProps, GlobalProps } from '../../utilities/globalProps'

import { CloseIcon } from '../_close_icon'
import { DialogContext } from '../_dialog_context'
import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'

type DialogHeaderProps = {
  aria?: {[key: string]: string},
  children: React.ReactNode[] | React.ReactNode | string,
  className?: string,
  closeable?: boolean,
  data?: object,
  id?: string,
  padding?: string,
  separator?: boolean,
  spacing?: "none" | "between" | "around" | "evenly",
  text?: string,
  title?: string,
} & GlobalProps

const DialogHeader = (props: DialogHeaderProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    padding = "sm",
    spacing = "between",
    closeable = true,
    separator = true,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const api = useContext(DialogContext)
  const headerCSS = buildCss("dialog_header")
  const headerSpacing = globalProps(props, { padding })

  /* eslint-disable react/jsx-handler-names */

  return (
    <>
      <Flex
          {...ariaProps}
          {...dataProps}
          className={classnames(headerCSS, headerSpacing, className)}
          spacing={spacing}
      >
        {children}
        {closeable &&
          <CloseIcon
            onClose={api.onClose}
          />
        }
      </Flex>
      {separator &&
        <SectionSeparator />
      }
    </>
  )
}

export default DialogHeader
