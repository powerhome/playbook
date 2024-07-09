import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import Icon from '../pb_icon/_icon'
import Body from '../pb_body/_body'
import Draggable from '../pb_draggable/_draggable'

type ListItemProps = {
  aria?: { [key: string]: string },
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  data?: Record<string, unknown>,
  dragId?: string,
  dragHandle?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  tabIndex?: number,
} & GlobalProps

const ListItem = (props: ListItemProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    enableDrag,
    dragId, 
    dragHandle = true,
    htmlOptions = {},
    id,
    tabIndex,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_item_kit'),
    globalProps(props),
    className
  )

  return (
    <>
    {
      enableDrag ? (
        <Draggable.Item 
            dragId={dragId}
        >
        <li
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
            tabIndex={tabIndex}
        >
          {
            dragHandle && (
              <span style={{verticalAlign: 'middle'}}>
                <Body color="light">
                <Icon 
                    icon="grip-dots-vertical"
                    verticalAlign="middle" 
                />
                </Body>
              </span>
            )
          }
          {children}
        </li>
        </Draggable.Item>
        ) : (
        <li
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
            tabIndex={tabIndex}
        >
          {children}
        </li>
      )
    }
      
    </>
  )
}

export default ListItem
