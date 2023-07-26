import React from "react";
import classnames from "classnames";
import DateTime from "../pb_kit/dateTime";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";
import Flex from "../pb_flex/_flex";
import Icon from "../pb_icon/_icon";
import Title from "../pb_title/_title";

type LabelValueProps = {
  active?: boolean;
  aria?: { [key: string]: string };
  className?: string;
  dark?: boolean;
  data?: object;
  date?: Date;
  id?: string;
  label: string;
  value?: string;
  variant?: "default" | "details";
  icon?: string;
  description?: string;
  title?: string;
};

const dateString = (value: DateTime) => {
  const month = value.toMonthNum();
  const day = value.toDay();

  return ` · ${month}/${day}`;
};

const LabelValue = (props: LabelValueProps) => {
  const {
    active = false,
    aria = {},
    className,
    dark = false,
    data = {},
    date,
    description,
    icon,
    id,
    label,
    title,
    value,
    variant = "default",
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const formattedDate = new DateTime({ value: date });
  const variantClass = variant === "details" ? "details" : "";
  const classes = classnames(
    buildCss("pb_label_value_kit", variantClass),
    globalProps(props),
    className
  );

  return (
    <div
      {...ariaProps}
      {...dataProps}
      className={classes}
      id={id}
      title={title}
    >
      <Caption dark={dark} text={label} />
      {variant === "details" ? (
        <Flex inline vertical="center">
          {icon && (
            <Body color="light" dark={dark} marginRight="xs">
              <Icon dark={dark} fixedWidth icon={icon} />
            </Body>
          )}
          {description && (
            <Body
              color="light"
              dark={dark}
              marginRight="xs"
              text={description}
            />
          )}
          {active === true ? (
            <Flex inline vertical="center">
              {title && (
                <Title dark={dark} size={4} text={title} variant="link" />
              )}
              {date && (
                <Title
                  dark={dark}
                  marginLeft="xs"
                  size={4}
                  text={" " + dateString(formattedDate)}
                  variant="link"
                />
              )}
            </Flex>
          ) : (
            <>
              {title && <Title dark={dark} size={4} text={title} />}
              {date && (
                <Title
                  dark={dark}
                  marginLeft="xs"
                  size={4}
                  text={" " + dateString(formattedDate)}
                />
              )}
            </>
          )}
        </Flex>
      ) : (
        <Body dark={dark} text={value} />
      )}
    </div>
  );
};

export default LabelValue;
