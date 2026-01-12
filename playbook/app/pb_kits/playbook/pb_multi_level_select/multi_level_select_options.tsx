import React, {useContext} from "react";
import classnames from "classnames";
import MultiLevelSelectContext from "./context";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props";
import Checkbox from "../pb_checkbox/_checkbox";
import Radio from "../pb_radio/_radio";
import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button";
import Body from "../pb_body/_body";

type MultiLevelSelectOptionsProps = {
  aria?: { [key: string]: string },
  children?: React.ReactNode | ((item: any) => React.ReactNode),
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
} & GlobalProps;

const MultiLevelSelectOptions = ({
  children,
  items,
  ...props
}: MultiLevelSelectOptionsProps) => {
const {
  variant,
  inputName,
  renderNestedOptions,
  isTreeRowExpanded,
  handleToggleClick,
  handleRadioButtonClick,
  handledropdownItemClick,
  filterItem,
} = useContext(MultiLevelSelectContext)

const {
  aria = {},
  className,
  data = {},
  htmlOptions = {},
} = props;

const ariaProps = buildAriaProps(aria);
const dataProps = buildDataProps(data);
const htmlProps = buildHtmlProps(htmlOptions);
const classes = classnames(
  buildCss("pb_multi_level_select_options"),
  globalProps(props),
  className
);

  return (
    <ul
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
      {Array.isArray(items) &&
        items.map((item: { [key: string]: any }) => {
          return (
            <div key={item.id}>
              <li className={"dropdown_item"} 
                  data-name={item.id}
              >
                <div className="dropdown_item_checkbox_row">
                  {!item.parent_id && !item.children ? null : (
                    <div
                        key={
                          isTreeRowExpanded(item)
                            ? "chevron-down"
                            : "chevron-right"
                        }
                    >
                      <CircleIconButton
                          className={
                            item.children && item.children.length > 0
                              ? ""
                              : "toggle_icon"
                          }
                          icon={
                            isTreeRowExpanded(item)
                              ? "chevron-down"
                              : "chevron-right"
                          }
                          onClick={(event: React.MouseEvent) =>
                            handleToggleClick(item.id, event)
                          }
                          variant="link"
                      />
                    </div>
                  )}
                  {variant === "single" ? (
                    item.hideRadio ? (
                      <Body>{item.label}</Body>
                    ) : (
                      <Radio
                          checked={item.checked}
                          disabled={item.disabled}
                          id={`${item.id}-${item.label}`}
                          label={item.label}
                          name={inputName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleRadioButtonClick(e)
                          }
                          padding={item.children ? "none" : "xs"}
                          type="radio"
                          value={item.label}
                      />
                    )
                  ) : (
                    <Checkbox id={item.id} 
                        text={item.label}
                    >
                        <input
                            checked={item.checked}
                            disabled={item.disabled}
                            name={item.label}
                            onChange={(e) => {
                              handledropdownItemClick(e, !item.checked);
                            }}
                            type="checkbox"
                            value={item.label}
                        />
                    </Checkbox>
                  )}
                  {/* Render children next to the checkbox */}
                  {children && (
                    typeof children === "function" ? children(item) : children
                  )}
                </div>
                {isTreeRowExpanded(item) &&
                  item.children &&
                  item.children.length > 0 &&
                  (variant === "single" || !filterItem) && (
                    <div>{renderNestedOptions(item.children)}</div>
                  )}
              </li>
            </div>
          );
        })}
    </ul>
  );
};

export default MultiLevelSelectOptions;