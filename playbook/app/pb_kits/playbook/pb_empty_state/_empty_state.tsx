
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Title from '../pb_title/_title'
import Body from '../pb_body/_body'
import Button from '../pb_button/_button'
import Detail from '../pb_detail/_detail'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'

type EmptyStateProps = {
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
}

const EmptyState = (props: EmptyStateProps) => {
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
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_emptystate'), globalProps(props), className)

  const renderContent = () => {
    const sizeConfigs = {
      sm: {
        vertical: {
          imageWidth: "100px",
          titleSize: 4,
          titlePadding: "xxs",
          descriptionPadding: "sm",
          buttonSize: "sm",
          buttonMargin: "xs",
          scssClassName: "sm-state-vertical",
          column: "column",
        },
        horizontal: {
          imageWidth: "100px",
          titleSize: 4,
          titlePadding: "xxs",
          descriptionPadding: "sm",
          buttonSize: "sm",
          buttonMargin: "xs",
          scssClassName: 'sm-state-horizontal',
          column: "",
        },
      },
      md: {
        vertical: {
          imageWidth: "250px",
          titleSize: 3,
          titlePadding: "xs",
          descriptionPadding: "md",
          buttonSize: "md",
          buttonMargin: "sm",
          scssClassName: "md-state-vertical",
          column: "column",
        },
        horizontal: {
          imageWidth: "250px",
          titleSize: 3,
          titlePadding: "xs",
          descriptionPadding: "md",
          buttonSize: "md",
          buttonMargin: "sm",
          scssClassName: 'md-state-horizontal',
          column: "",
        },
      },
      lg: {
        vertical: {
          imageWidth: "400px",
          titleSize: 2,
          titlePadding: "sm",
          descriptionPadding: "lg",
          buttonSize: "md",
          buttonMargin: "md",
          scssClassName: "lg-state-vertical",
          column: "column",
        },
        horizontal: {
          imageWidth: "400px",
          titleSize: 2,
          titlePadding: "sm",
          descriptionPadding: "lg",
          buttonSize: "md",
          buttonMargin: "md",
          scssClassName: 'lg-state-horizontal',
          column: "",
        },
      },
    };

    const configs = sizeConfigs[size]?.[orientation] || sizeConfigs.md[orientation] || sizeConfigs.md.vertical
    const alignFlex = alignment === 'center' ? 'center' : alignment === "right" ? "bottom" : undefined
    const alignText = alignment === 'center' ? 'center' : alignment === "right" ? "right" : undefined

    const layout = (
      <div {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <Flex className={configs.scssClassName}
            orientation={configs.column}
            vertical={alignFlex}
        >
          <img
              alt="test"
              src={image}
              style={{ width: "100%", maxWidth: configs.imageWidth, height: "auto" }}
          />

          <FlexItem>
            <Title paddingBottom={configs.titlePadding}
                size={configs.titleSize}
                text={header}
                textAlign={alignText}
            />

            {size !== "sm" ? (
              <Body paddingBottom={configs.descriptionPadding}
                  text={description}
                  textAlign={alignText}
              />
            ) : (
              <Detail paddingBottom={configs.descriptionPadding}
                  text={description}
                  textAlign={alignText}
              />
            )}

            <Button
                marginBottom={configs.buttonMargin}
                size={configs.buttonSize}
                text={primaryButton}
                variant="primary"
                width="100%"
            />
            <Button size={configs.buttonSize}
                text={linkButton}
                variant="link"
                width="100%"
            />
          </FlexItem>
        </Flex>
      </div>
    )
    return layout || null;
  }
  return renderContent()
}

export default EmptyState
