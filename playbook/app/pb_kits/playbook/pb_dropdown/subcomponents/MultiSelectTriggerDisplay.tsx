import React, { useContext } from "react";
import FormPill from "../../pb_form_pill/_form_pill";
import Flex from "../../pb_flex/_flex";
import Button from "../../pb_button/_button";
import Body from "../../pb_body/_body";
import { GenericObject } from "../../types";
import DropdownContext
 from "../context";
type MultiSelectTriggerDisplayProps = {
  autocomplete?: boolean;
  selected: GenericObject[];
  placeholder?: string;
  dark?: boolean;
};

const MultiSelectTriggerDisplay = ({
  autocomplete,
  selected,
  placeholder,
  dark = false,
}: MultiSelectTriggerDisplayProps) => {

  const { setSelected, handleSelectionChange, formPillProps, isControlled, isSameOption, getOptionValue, optionLabel, renderValue, disabled } = useContext(DropdownContext);

  if (selected.length === 0) {
    if (autocomplete) return null;
    return (
    <Body
        color="lighter"
        dark={dark}
        text={placeholder ? placeholder : "Select..."}
    />
    )
  }

 const handleRemoveIconClick = (option: GenericObject) => {
  if (isControlled || getOptionValue) {
    const next = selected.filter((item) => !isSameOption(item, option));
    setSelected(next);
    handleSelectionChange(next);
    return;
  }
  setSelected((prev: GenericObject[]) => {
      const next = prev.filter((item) => !isSameOption(item, option));
      handleSelectionChange && handleSelectionChange(next);
      return next;
    });
 } 

  return (
    <Flex wrap>
      {selected.map((option, i) => renderValue ? (
        <Flex align="center"
            key={getOptionValue ? getOptionValue(option) : i}
            marginRight="xs"
        >
          {renderValue(option) ?? <Body text={optionLabel(option)} />}
          <span onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") event.stopPropagation();
          }}
          >
          <Button disabled={disabled}
              htmlOptions={{ "aria-label": `Remove ${optionLabel(option)}` }}
              htmlType="button"
              icon="times"
              onClick={(event) => { event.stopPropagation(); if (!disabled) handleRemoveIconClick(option); }}
              padding="none"
              variant="link"
          />
          </span>
        </Flex>
      ) : (
          <FormPill
              dark={dark}
              key={getOptionValue ? getOptionValue(option) : i}
              marginRight="xs"
              onClick={(e)=>{e.stopPropagation();handleRemoveIconClick(option)}}
              tabIndex={0}
              text={optionLabel(option)}
              {...formPillProps}
          />
      ))}
    </Flex>
  );
};

export default MultiSelectTriggerDisplay;
