import React from "react";
import FormPill from "../../pb_form_pill/_form_pill";
import Flex from "../../pb_flex/_flex";
import Body from "../../pb_body/_body";
import { GenericObject } from "../../types";
import Badge from "../../pb_badge/_badge";
import { auto } from "@popperjs/core";

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
  if (selected.length === 0) {
    if (autocomplete) return null;
    return (
    <Body dark={dark} 
        text={placeholder ? placeholder : "Select..."} 
    />
    )
  }

  return (
    <Flex paddingRight={autocomplete ? "xs" : "none"} 
        wrap
    >
      {selected.map((option, i) =>
        multiSelectDisplay === "default" ||
        multiSelectDisplay === "smallPill" ? (
          <FormPill
              dark={dark}
              key={i}
              size={multiSelectDisplay === "smallPill" ? "small" : "default"}
              text={option.label}
          />
        ) : (
           <Badge
               dark={dark}
               key={i}
               text={option.label}
               variant="primary"
           />
        )
      )}
    </Flex>
  );
};

export default MultiSelectTriggerDisplay;
