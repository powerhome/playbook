import React, { useContext } from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";

import DropdownContext from "../context";

import List from "../../pb_list/_list";
import ListItem from "../../pb_list/_list_item";
import TextInput from "../../pb_text_input/_text_input";
import Body from "../../pb_body/_body";

type DropdownContainerProps = {
  aria?: { [key: string]: string };
  className?: string;
  children?: React.ReactChild[] | React.ReactChild;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  searchbar?: boolean;
};

const DropdownContainer = (props: DropdownContainerProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    htmlOptions = {},
    id,
    searchbar = false,
  } = props;

  const {
    isDropDownClosed,
    handleChange,
    dropdownContainerRef,
    filterItem,
    filteredOptions,
    inputRef,
    setFocusedOptionIndex,
    triggerRef
  } = useContext(DropdownContext);

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_dropdown_container"),
    `${isDropDownClosed ? "close" : "open"}`,
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        {...htmlProps}
        className={classes} 
        id={id}
        onMouseEnter={() => setFocusedOptionIndex(-1)}
        ref={dropdownContainerRef}
        style={triggerRef ? {} : { position: "absolute"}}
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
      <List>{
        filteredOptions?.length === 0 ? (
          <ListItem
              display="flex"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              justifyContent="center"
              padding="xs"
          >
            <Body color="light" 
                text="no option"
            />
          </ListItem>
        ): (
          children
        )
        }
        </List>
    </div>
  );
};

export default DropdownContainer;
