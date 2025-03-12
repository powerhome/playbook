
import React from "react"
import ReactDOMServer from "react-dom/server"
import classnames from "classnames"
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props"
import { globalProps } from "../utilities/globalProps"
import Title from "../pb_title/_title"
import Body from "../pb_body/_body"
import Button from "../pb_button/_button"
import Detail from "../pb_detail/_detail"
import Flex from "../pb_flex/_flex"
import FlexItem from "../pb_flex/_flex_item"
import Image from "../pb_image/_image"
import { getDefaultImage } from "./docs/default_image/utils"

type EventHandler = (React.MouseEventHandler<HTMLElement>)

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
  onLinkButtonClick?: EventHandler,
  onPrimaryButtonClick?: EventHandler,
  orientation?: "horizontal" | "vertical",
  primaryButton?: string,
  size?: "sm" | "md" | "lg",
}

const EmptyState = (props: EmptyStateProps) => {
  const {
    aria = {},
    alignment = "center",
    className,
    data = {},
    description,
    header = "",
    id,
    image,
    linkButton,
    onLinkButtonClick,
    onPrimaryButtonClick,
    orientation = "vertical",
    primaryButton,
    size = "md",
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss("pb_empty_state_kit"), globalProps(props), className)

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
          scssClassName: "sm-state-horizontal",
          column: "",
        },
      },
      md: {
        vertical: {
          imageWidth: "140px",
          titleSize: 3,
          titlePadding: "xs",
          descriptionPadding: "md",
          buttonSize: "md",
          buttonMargin: "sm",
          scssClassName: "md-state-vertical",
          column: "column",
        },
        horizontal: {
          imageWidth: "140px",
          titleSize: 3,
          titlePadding: "xs",
          descriptionPadding: "md",
          buttonSize: "md",
          buttonMargin: "sm",
          scssClassName: "md-state-horizontal",
          column: "",
        },
      },
      lg: {
        vertical: {
          imageWidth: "100%",
          titleSize: 1,
          titlePadding: "sm",
          descriptionPadding: "lg",
          buttonSize: "md",
          buttonMargin: "md",
          scssClassName: "lg-state-vertical",
          column: "column",
        },
        horizontal: {
          imageWidth: "100%",
          titleSize: 2,
          titlePadding: "sm",
          descriptionPadding: "lg",
          buttonSize: "md",
          buttonMargin: "md",
          scssClassName: "lg-state-horizontal",
          column: "",
        },
      },
    };

    const configs = sizeConfigs[size]?.[orientation]
    const alignFlex = alignment === "center" ? "center" : alignment === "right" ? "end" : "start"
    const alignText = alignment === "center" ? "center" : alignment === "right" ? "right" : undefined
    const imageSource = getDefaultImage().computer

    const getSvgAsDataUrl = () => {
      const svgString = ReactDOMServer.renderToStaticMarkup(imageSource)
      return `data:image/svg+xml;base64,${window.btoa(svgString)}`
    }

    const layout = (
      <div {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <Flex align={alignFlex}
            className={configs.scssClassName}
            orientation={configs.column as "column" | "row" | undefined}
            paddingLeft="xl"
            paddingRight="xl"
            vertical="center"
        >

          {image && image === 'default' ? (
            <Image
                alt="test"
                htmlOptions={{ width: configs.imageWidth, height: "auto", alignment: "start" }}
                url={getSvgAsDataUrl()}
            />
          ) : image && image ? (
            <Image
                alt="test"
                htmlOptions={{ width: configs.imageWidth, height: "auto", alignment: "start" }}
                url={image}
            />
          ) : null}

          <FlexItem >
            <Title paddingBottom={configs.titlePadding as "xxs" | "xs" | "sm" | undefined}
                size={configs.titleSize as 1 | 2 | 3 | 4 | undefined}
                text={header}
                textAlign={alignText}
            />

            {size !== "sm" ? (
              <Body paddingBottom={configs.descriptionPadding as "sm" | "md" | "lg" | undefined}
                  text={description}
                  textAlign={alignText}
              />
            ) : (
              <Detail paddingBottom={configs.descriptionPadding as "sm" | "md" | "lg" | undefined}
                  text={description}
                  textAlign={alignText}
              />
            )}

            { primaryButton ? (
                <Button
                    marginBottom={configs.buttonMargin as "xs" | "sm" | "md" | undefined}
                    onClick={onPrimaryButtonClick}
                    size={configs.buttonSize as "sm" | "md" | undefined}
                    text={primaryButton}
                    variant="primary"
                    width="100%"
                />
            ) : null }

            { linkButton ? (
                <Button onClick={onLinkButtonClick}
                    size={configs.buttonSize as "sm" | "md" | undefined}
                    text={linkButton}
                    variant="link"
                    width="100%"
                />
            ) : null }

          </FlexItem>
        </Flex>
      </div>
    )
    return layout
  }
  return renderContent()
}

export default EmptyState
