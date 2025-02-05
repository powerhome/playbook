
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Title from '../pb_title/_title'
import Body from '../pb_body/_body'
import Button from '../pb_button/_button'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'

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

  const renderContent = () => {
    const layouts = {
      lg: {
        vertical: (
          <div {...ariaProps}
              {...dataProps}
              className={classes}
              id={id}
          >
            <Flex orientation="column"
                vertical="center"
            >
              <img
                  alt="test"
                  src={image}
                  style={{ width: "100%", maxWidth: "400px", height: "auto" }}
              />
              <Title paddingBottom='sm'
                  size="1"
                  text={header}
              />
              <Body paddingBottom='lg'
                  text={description}
              />
              <Button marginBottom='md'
                  size="md"
                  text={primaryButton}
                  variant="primary"
                  width="100%"
              />
              <Button size="md"
                  text={linkButton}
                  variant="link"
                  width="100%"
              />
            </Flex>
          </div>
        ),
        horizontal: (
          <div
              {...ariaProps}
              {...dataProps}
              className={classes}
              id={id}
          >
            <Flex vertical="center">
              <img
                  alt="test"
                  src={image}
                  style={{ width: "100%", maxWidth: "400px", height: "auto" }}
              />
              <FlexItem paddingLeft="lg">
                <Title paddingBottom="sm"
                    size="1"
                    text={header}
                />
                <Body paddingBottom="lg"
                    text={description}
                />
                <Button marginBottom="md"
                    size="md"
                    text={primaryButton}
                    variant="primary"
                    width="100%"
                />
                <Button size="md"
                    text={linkButton}
                    variant="link"
                    width="100%"
                />
              </FlexItem >
            </Flex >
          </div>
        ),
      },
    }
    return layouts[size]?.[orientation] || null
  }
  return renderContent()
}

export default Emptystate
