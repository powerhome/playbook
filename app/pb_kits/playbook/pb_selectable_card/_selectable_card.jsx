/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from "react";
import classnames from "classnames";
import { Icon } from "../";

import type { InputCallback } from "../types";

import {
  buildAriaProps,
  buildDataProps,
  buildCss,
  noop
} from "../utilities/props";

type Props = {
  aria: Object,
  checked: Boolean,
  children?: Array<React.ReactChild>,
  className?: String,
  dark?: Boolean,
  data: Object,
  disabled?: Boolean,
  icon?: Boolean,
  id?: String,
  multi?: Boolean,
  name?: String,
  onChange: InputCallback,
  onSelect: InputCallback,
  onUnselect: InputCallback,
  text?: String,
  value?: String
};

const SelectableCard = ({
  aria = {},
  checked = false,
  children,
  className,
  dark = false,
  data = {},
  disabled = false,
  icon = true,
  id = null,
  multi = true,
  name,
  onChange = noop,
  onSelect = noop,
  onUnselect = noop,
  text,
  value,
  ...props
}: Props) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const handleChange = event => {
    onChange(event);
    event.target.checked ? onSelect(event) : onUnselect(event);
  };

  const css = buildCss({
    pb_selectable_card_kit: true,
    checked: checked,
    dark: dark,
    disabled: disabled,
    enabled: !disabled
  });

  const displayIcon = () => {
    if (icon === true) {
      return <Icon icon="check" fixedWidth />;
    }
  };

  const inputType = multi === false ? "radio" : "checkbox";

  const htmlFor = id !== null ? id : name;

  return (
    <span {...ariaProps} {...dataProps} className={classnames(css, className)}>
      <input
        {...props}
        name={name}
        value={value}
        id={htmlFor}
        type={inputType}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={htmlFor}>
        {text || children}
        <div className="pb_selectable_card_circle">{displayIcon()}</div>
      </label>
    </span>
  );
};
export default SelectableCard;
