/* @flow */

import React from "react";
import classnames from "classnames";

import { Body, Caption, Title } from "../";

type CurrencyProps = {
  align?: "left" | "center" | "right",
  className: String,
  currencySymbol: "$",
  label?: String,
  separator?: "." | ",",
  size?: "sm" | "lg",
  value?: String,
  unit?: "00"
};

const kitCSS = ({ align = "left" }: CurrencyProps) => {
  let css = "pb_currency_kit";
  css += `_${align}`;
  return css;
};

const bodyCSS = ({  }: CurrencyProps) => {
  let css = "";
  return css;
};

const symbolCSS = currencySymbol => {
  return classnames({
    dollar_sign: currencySymbol === "$"
  });
};

const sizes = {
  lg: 1,
  sm: 2
};

const Currency = (props: CurrencyProps) => {
  const {
    currencySymbol = "$",
    label = "",
    separator = ".",
    size = "sm",
    units = "00",
    value
  } = props;

  return (
    <div className={kitCSS(props)}>
      <Caption>{label}</Caption>
      <div className="pb_currency_wrapper">
        <Body className={symbolCSS(currencySymbol)}
            color={"light"}
        >
          {currencySymbol}
        </Body>
        <Title className="pb_currency_value"
            size={sizes[size]}
        >
          {`${value}${separator}`}
        </Title>
        <Body className="cents"
            color={"light"}
        >
          {units}
        </Body>
      </div>
    </div>
  );
};

export default Currency;
