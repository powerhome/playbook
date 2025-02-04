
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Button from '../pb_button/_button'

type EmptystateProps = {
  aria?: { [key: string]: string },
  // alignment?: "center" | "left" | "right",
  className?: string,
  data?: { [key: string]: string },
  // description?: string,
  id?: string,
  // imageAlt?: string,
  // imageUrl?: string,
  // linkButton?: string,
  // orientation?: "horizontal" | "vertical",
  // primaryButton?: string,
  // size?: "sm" | "md" | "lg",
  text?: string,
}

const Emptystate = (props: EmptystateProps) => {
  const {
    aria = {},
    // alignment = 'center',
    className,
    data = {},
    // description,
    id,
    // imageAlt = '',
    // imageUrl,
    // linkButton,
    // orientation = 'horizontal',
    // primaryButton,
    // size = "md",
    text = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_emptystate'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
    <Button>
      hello
    </Button>
    </div>
  )
}

export default Emptystate
