/* eslint-disable react/no-multi-comp */
import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../../utilities/props";
import { globalProps, GlobalProps } from "../../utilities/globalProps";
import { LightboxContext } from "../_lightbox_context";

import CircleIconButton from "../../pb_circle_icon_button/_circle_icon_button";
import Caption from "../../pb_caption/_caption";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import Title from "../../pb_title/_title";
import Button from "../../pb_button/_button";

type LightboxHeaderProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode[] | React.ReactNode | string;
  className?: string;
  closeable?: boolean;
  data?: { [key: string]: string | number };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  icon?: string;
  id?: string;
  onClickRight?: () => void;
  onClose?: () => void;
  text?: string;
  navRight?: string;
  title?: string;
} & GlobalProps;

const LightboxHeader = (props: LightboxHeaderProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    onClickRight,
    spacing = "between",
    text,
    navRight,
    title,
    closeable = true,
    icon = "times",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const api: any = useContext(LightboxContext);
  const headerCSS = buildCss("lightbox_header");
  const headerSpacing = globalProps(props, { paddingY: "sm" });

  const handleOnLightboxClose = () => api.onClose();

  const HeaderBody = () => (
    <React.Fragment>
      <FlexItem flex="1"
          marginLeft="sm"
      >
        <CircleIconButton
            dark
            icon={icon}
            onClick={handleOnLightboxClose}
            variant="link"
        />
      </FlexItem>
      {title && text && (
        <FlexItem flex="5">
          <Flex justify="center">
            <Flex align="center"
                orientation="column"
            >
              {typeof title === "string" ? (
                <Title dark
                    paddingBottom="xxs"
                    size={4}
                    text={title}
                />
              ) : (
                <Flex className="custom-header"
                    justify="center"
                >
                  {title}
                  </Flex>
              )}

              {typeof text === "string" ? (
                <Caption dark>{text}</Caption>
              ) : (
                <Flex className="custom-header"
                    justify="center"
                >
                  {text}
                </Flex>
              )}
            </Flex>
          </Flex>
        </FlexItem>
      )}
      <FlexItem flex="1">
        <Flex justify="end">
          <Button
              className="nav-right-btn"
              dark
              htmlType="button"
              onClick={onClickRight}
              text={navRight}
              variant="link"
          />
        </Flex>
      </FlexItem>
    </React.Fragment>
  );

  return (
    <div className="carousel-header">
      <Flex
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classnames(headerCSS, headerSpacing, className)}
          spacing={spacing}
      >
        {closeable && <HeaderBody />}
        {children}
      </Flex>
    </div>
  );
};

export default LightboxHeader;
