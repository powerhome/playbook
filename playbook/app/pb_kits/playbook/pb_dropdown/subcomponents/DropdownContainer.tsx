import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

import DropdownContext from "../context";

import List from "../../pb_list/_list";
import TextInput from "../../pb_text_input/_text_input";

type DropdownContainerProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactChild[] | React.ReactChild;
  data?: { [key: string]: string };
  id?: string;
  searchbar?: boolean;
};

const DropdownContainer = (props: DropdownContainerProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    id,
    searchbar = false,
  } = props;

  const {
    isDropDownClosed,
    handleChange,
    filterItem,
    inputRef,
    setFocusedOptionIndex,
  } = useContext(DropdownContext);

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_dropdown_container"),
    `${isDropDownClosed ? "close" : "open"}`,
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        className={classes} 
        id={id}
        onMouseEnter={() => setFocusedOptionIndex(-1)}
    >
      {searchbar && (
        <TextInput paddingTop="xs" 
            paddingX="xs"
        >
            <input
                onChange={handleChange}
                placeholder="Select..."
                ref={inputRef}
                value={filterItem}
            />
        </TextInput>
      )}
      <List>{children}</List>
    </div>
  );
};

export default DropdownContainer;
