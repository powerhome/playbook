import React, { useContext } from "react";
import FormPill from "../../pb_form_pill/_form_pill";
import Flex from "../../pb_flex/_flex";
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

  const { setSelected, onSelect, formPillProps } = useContext(DropdownContext);

  if (selected.length === 0) {
    if (autocomplete) return null;
    return (
    <Body dark={dark} 
        text={placeholder ? placeholder : "Select..."} 
    />
    )
  }

 const handleRemoveIconClick = (option: GenericObject) => {
  setSelected((prev: GenericObject[]) => {
      const next = prev.filter((item) => item.label !== option.label);
      onSelect && onSelect(next);
      return next;
    });
 } 

  return (
    <Flex wrap>
      {selected.map((option, i) => (
          <FormPill
              dark={dark}
              key={i}
              marginRight="xs"
              onClick={(e)=>{e.stopPropagation();handleRemoveIconClick(option)}}
              text={option.label}
              {...formPillProps}
          />
      ))}
    </Flex>
  );
};

export default MultiSelectTriggerDisplay;
