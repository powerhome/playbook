import React from "react";
import FormPill from "../../pb_form_pill/_form_pill";
import Body from "../../pb_body/_body";
import { GenericObject } from "../../types";
import Badge from "../../pb_badge/_badge";

type MultiSelectTriggerDisplayProps = {
  selected: GenericObject[];
  placeholder?: string;
  dark?: boolean;
  multiSelectDisplay?: "default" | "smallPill" | "badge";
};

const MultiSelectTriggerDisplay = ({
  selected,
  placeholder,
  dark = false,
  multiSelectDisplay,
}: MultiSelectTriggerDisplayProps) => {
  if (selected.length === 0) {
    return (
    <Body dark={dark} 
        text={placeholder ? placeholder : "Select..."} 
    />
    )
  }

  return (
    <>
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
    </>
  );
};

export default MultiSelectTriggerDisplay;
