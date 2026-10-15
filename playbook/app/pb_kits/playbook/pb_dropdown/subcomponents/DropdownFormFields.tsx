import React, { useEffect, useRef } from "react";
import { GenericObject } from "../../types";

type DropdownFormFieldsProps = {
  disabled: boolean;
  multiSelect: boolean;
  name?: string;
  onInvalid: () => void;
  onReset: () => void;
  required: boolean;
  selected: GenericObject[];
  validationMessage: string;
};

const DropdownFormFields = ({ disabled, multiSelect, name, onInvalid, onReset, required, selected, validationMessage }: DropdownFormFieldsProps) => {
  const validationRef = useRef<HTMLInputElement>(null);
  const resetRef = useRef(onReset);
  resetRef.current = onReset;
  const hasSelection = selected.some((option) => String(option.id ?? option.value ?? "") !== "");
  const fieldName = multiSelect && name && !name.endsWith("[]") ? `${name}[]` : name;

  useEffect(() => {
    validationRef.current?.setCustomValidity(required && !hasSelection ? validationMessage : "");
  }, [required, hasSelection, validationMessage]);

  useEffect(() => {
    const form = validationRef.current?.form;
    const reset = (event: Event) => {
      Promise.resolve().then(() => {
        if (!event.defaultPrevented) resetRef.current();
      });
    };
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, []);

  return (
    <>
      {name && (hasSelection ? selected : [{}]).map((option, index) => (
        <input disabled={disabled}
            key={index}
            name={fieldName}
            type="hidden"
            value={option.id ?? option.value ?? ""}
        />
      ))}
      <input aria-hidden="true"
          disabled={disabled}
          onChange={() => undefined}
          onInvalid={(event) => {
            event.preventDefault();
            onInvalid();
          }}
          ref={validationRef}
          required={required && !hasSelection}
          style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }}
          tabIndex={-1}
          value={hasSelection ? "selected" : ""}
      />
    </>
  );
};

export default DropdownFormFields;
