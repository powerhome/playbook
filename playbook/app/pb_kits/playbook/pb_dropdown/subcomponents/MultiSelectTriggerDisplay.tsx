import React, { useContext } from "react";
import FormPill from "../../pb_form_pill/_form_pill";
import Flex from "../../pb_flex/_flex";
import Body from "../../pb_body/_body";
import { GenericObject } from "../../types";
import Badge from "../../pb_badge/_badge";
import DropdownContext
 from "../context";
type MultiSelectTriggerDisplayProps = {
  autocomplete?: boolean;
  selected: GenericObject[];
  placeholder?: string;
  dark?: boolean;
  multiSelectDisplay?: "default" | "smallPill" | "badge";
};

const MultiSelectTriggerDisplay = ({
  autocomplete,
  selected,
  placeholder,
  dark = false,
  multiSelectDisplay,
}: MultiSelectTriggerDisplayProps) => {

  const { setSelected, onSelect } = useContext(DropdownContext);

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
      {selected.map((option, i) =>
        multiSelectDisplay === "default" ||
        multiSelectDisplay === "smallPill" ? (
          <FormPill
              dark={dark}
              key={i}
              marginRight="xs"
              onClick={(e)=>{e.stopPropagation();handleRemoveIconClick(option)}}
              size={multiSelectDisplay === "smallPill" ? "small" : "default"}
              text={option.label}
          />
        ) : (
           <Badge
               dark={dark}
               key={i}
               marginRight="xs"
               removeIcon
               removeOnClick={(e)=>{e.stopPropagation();handleRemoveIconClick(option)}}
               text={option.label}
               variant="primary"
           />
        )
      )}
    </Flex>
  );
};

export default MultiSelectTriggerDisplay;
