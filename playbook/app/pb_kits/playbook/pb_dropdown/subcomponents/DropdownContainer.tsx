import React, { useContext } from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from "../../utilities/props";
import { globalProps, GlobalProps } from "../../utilities/globalProps";

import DropdownContext from "../context";
import DropdownOption from "./DropdownOption";
import { GenericObject } from "../../types";
import { useHandleOnKeyDown } from "../hooks/useHandleOnKeydown";
import { setFloatingOwnerAttribute } from "../../utilities/floatingPortalHosts";

import List from "../../pb_list/_list";
import ListItem from "../../pb_list/_list_item";
import TextInput from "../../pb_text_input/_text_input";
import Body from "../../pb_body/_body";

type DropdownContainerProps = {
  aria?: { [key: string]: string };
  children?: React.ReactChild[] | React.ReactChild;
  className?: string;
  constrainHeight?: boolean;
  dark?: boolean;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  searchbar?: boolean;
} & GlobalProps;

const DropdownContainer = (props: DropdownContainerProps) => {
  const {
    aria = {},
    children,
    className,
    constrainHeight = false,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    searchbar = false,
  } = props;

  const {
    asyncEnabled,
    optionKey,
    asyncStatus,
    dropdownContainerRef,
    error,
    filteredOptions,
    filterItem,
    floatingOwnerId,
    floatingShellClasses,
    handleChange,
    inputRef,
    isDropDownClosed,
    portalHost,
    setFocusedOptionIndex,
  } = useContext(DropdownContext);

  const handleKeyDown = useHandleOnKeyDown();
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const menuClosed = isDropDownClosed || (asyncEnabled && !searchbar && !asyncStatus && filteredOptions.length === 0);
  const classes = classnames(
    buildCss("pb_dropdown_container"),
    `${menuClosed ? "close" : "open"}`,
    constrainHeight && "constrain_height",
    globalProps(props),
    className
  );

  const inner = (
    <div {...ariaProps} 
        {...dataProps} 
        {...htmlProps}
        className={classes} 
        data-pb-dropdown-portal={portalHost ? "true" : undefined}
        id={id}
        onMouseEnter={() => setFocusedOptionIndex(-1)}
        ref={dropdownContainerRef}
        style={portalHost ? undefined : { position: "absolute"}}
    >
      {searchbar && (
        <TextInput dark={dark}
            paddingTop="xs" 
            paddingX="xs"
        >
            <input
                onChange={handleChange}
                onKeyDown={asyncEnabled ? handleKeyDown : undefined}
                placeholder="Select..."
                ref={inputRef}
                value={filterItem}
            />
        </TextInput>
      )}
      <List dark={dark}>
        {
        asyncStatus ? (
          <ListItem htmlOptions={{ role: "status" }}>
            <Body padding="xs"
                text={asyncStatus}
            />
          </ListItem>
        ) : asyncEnabled && filteredOptions?.length === 0 ? null : filteredOptions?.length === 0 ? (
          <ListItem dark={dark}
              display="flex"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              justifyContent="center"
              padding="xs"
          >
            <Body color="light" 
                dark={dark}
                text="no option"
            />
          </ListItem>
        ): (
          children || (asyncEnabled && filteredOptions.map((option: GenericObject) => (
            <DropdownOption key={optionKey(option)}
                option={option}
            />
          )))
        )
        }
        </List>
    </div>
  );

  if (portalHost) {
    if (menuClosed) {
      return null;
    }
    return createPortal(
      <div
          className={floatingShellClasses}
          ref={(node) => setFloatingOwnerAttribute(node, floatingOwnerId)}
      >
        <div
            className={classnames("dropdown_wrapper", error && "error")}
            style={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
              margin: 0,
              minHeight: 0,
              padding: 0,
              position: "static",
            }}
        >
          {inner}
        </div>
      </div>,
      portalHost,
    );
  }

  return inner;
};

export default DropdownContainer;
