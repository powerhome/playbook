import React, {useContext} from "react";
import MultiLevelSelectContext from "./context";

import Checkbox from "../pb_checkbox/_checkbox";
import Radio from "../pb_radio/_radio";
import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button";
import Body from "../pb_body/_body";

const MultiLevelSelectOptions = ({
  items,
  children,
  // ...props
}: any) => {
  // const {
  //   aria = {},
  //   className,
  //   dark = false,
  //   data = {},
  //   htmlOptions = {},
  // } = props;

const {
  variant,
  inputName,
  renderNestedOptions,
  isTreeRowExpanded,
  handleToggleClick,
  handleRadioButtonClick,
  handledropdownItemClick,
  filterItem,
} =useContext(MultiLevelSelectContext);

  return (
    <ul>
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
                          onClick={(event: any) =>
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
                            name={item.label}
                            onChange={(e) => {
                              handledropdownItemClick(e, !item.checked);
                            }}
                            type="checkbox"
                            value={item.label}
                      />
                    </Checkbox>
                  )}
                  {/* Render children next to the checkbox/radio */}
                  {children && (
                    typeof children === "function" && children(item)                   
                  )}
                </div>
                {isTreeRowExpanded(item) &&
                  item.children &&
                  item.children.length > 0 &&
                  (variant === "single" || !filterItem) && ( // Show children if expanded is true
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
