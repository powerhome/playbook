
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Title from '../pb_title/_title'
import Image from '../pb_image/_image'
import Body from '../pb_body/_body'
import Button from '../pb_button/_button'
import Flex from '../pb_flex/_flex'

type EmptystateProps = {
  aria?: { [key: string]: string },
  alignment?: "center" | "left" | "right",
  className?: string,
  data?: { [key: string]: string },
  description?: string,
  header?: string,
  id?: string,
  image?: string,
  linkButton?: string,
  orientation?: "horizontal" | "vertical",
  primaryButton?: string,
  size?: "sm" | "md" | "lg",
  text?: string,
}

const Emptystate = (props: EmptystateProps) => {
  const {
    aria = {},
    alignment = 'center',
    className,
    data = {},
    description,
    header = '',
    id,
    image,
    linkButton = '',
    orientation = 'horizontal',
    primaryButton = '',
    size = "md",
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
      {size === 'lg' ? (
        <div>
          <Image
              height="auto"
              url={image}
              width="100%"
          />
          <Title size="1"
              text={header}
          />
          <Body text={description} />
          <Button
              size="md"
              text={primaryButton}
              variant="primary"
              width="100%"
          />
          <Button
              size="md"
              text={linkButton}
              variant="link"
              width="100%"
          />
        </div>
      ) : (
        <div>
        <Image
            height="auto"
            url={image}
            width="140px"
        />
         <Title size="3"
             text={header}
         />
         <Body text={description} />
        <Flex gap="sm"
            orientation="column"
        >
          <Button
              size="md"
              text={primaryButton}
              variant="primary"
              width="140px"
          />
          <Button
              size="md"
              text={linkButton}
              variant="link"
              width="140px"
          />
        </Flex>

      </div>
      )}
    </div>
  )
}

export default Emptystate
