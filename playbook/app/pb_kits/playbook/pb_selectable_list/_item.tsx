import React, { useState } from "react";
import classnames from "classnames";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps, domSafeProps } from "../utilities/globalProps";

import Checkbox from "../pb_checkbox/_checkbox";
import ListItem from "../pb_list/_list_item";
import Radio from "../pb_radio/_radio";
import { GenericObject } from "../types";

export type SelectableListItemProps = {
  aria?: { [key: string]: string };
  children: React.ReactNode[] | React.ReactNode;
  checked?: boolean;
  className?: string;
  data?: GenericObject;
  defaultChecked?: boolean;
  dragId?: string;
  dragHandle?: boolean;
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  label?: string;
  text?: string;
  name?: string;
  value?: string;
  variant?: string;
  onChange: (arg: React.ChangeEvent<HTMLInputElement>  | null) => void;
};

const SelectableListItem = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  dragId,
  dragHandle = true,
  defaultChecked,
  htmlOptions = {},
  id,
  label,
  text = "",
  name = "",
  value = "",
  variant = "checkbox",
  onChange = () => {void 0},
  ...props
}: SelectableListItemProps) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_selectable_list_item_kit"),
    globalProps(props),
    className
  );

  const initialCheckedState = checked;
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setCheckedState(event.target.checked);
  };

  return (
    <ListItem
        {...props}
        className={classnames(checkedState ? "checked_item" : "", className)}
        dragHandle={dragHandle}
        dragId={dragId}
    >
      <div 
          {...ariaProps} 
          {...dataProps}
          {...htmlProps} 
          className={classes}
      >
        {variant == "checkbox" && (
          <>
            <Checkbox
                checked={checkedState}
                id={id}
                marginLeft="xs"
                name={name}
                onChange={handleChecked}
                // eslint suppressor, text is needed to display on screen
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                text={label || (text && false)}
                type="checkbox"
                value={value}
                {...props}
            />
            {children}
          </>
        )}
        {variant == "radio" && (
          <>
            <Radio
                defaultChecked={defaultChecked}
                id={id}
                label={label}
                marginLeft="xs"
                name={name}
                onChange={onChange}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                text={label}
                type="radio"
                value={value}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                {...domSafeProps(props)}
            />
            {children}
          </>
        )}
        {variant !== "checkbox" && variant !== "radio" && (
          { children }
        )}
      </div>
    </ListItem>
  );
};

export default SelectableListItem;
