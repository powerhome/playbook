import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

import DropdownContext from "../context";

import Body from "../../pb_body/_body";

type DropdownTriggerProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactChild[] | React.ReactChild;
  data?: { [key: string]: string };
  id?: string;
};

const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { aria = {}, className, children, data = {}, id } = props;

  const {
    handleWrapperClick,
    selected,
    filterItem,
    handleChange,
    handleOnKeyDown,
    setIsDropDownClosed,
    isDropDownClosed,
    inputRef,
  } = useContext(DropdownContext);

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_dropdown_trigger"),
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id}
    >
      {children ? (
        <div
            onClick={() => setIsDropDownClosed(!isDropDownClosed)}
            style={{ display: "inline-block" }}
        >
          {children}
        </div>
      ) : (
        <>
          <div className="typeahead_input_wrapper" 
              onClick={handleWrapperClick}
          >
            {selected.label && <Body text={selected.label} />}
            <input
                className="typeahead_input"
                onChange={handleChange}
                onClick={() => setIsDropDownClosed(!isDropDownClosed)}
                onKeyDown={(e) => handleOnKeyDown(e.key)}
                placeholder={selected.label ? "" : "Select..."}
                ref={inputRef}
                value={filterItem}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownTrigger;
