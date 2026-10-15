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

const DropdownFormFields = ({
  disabled,
  multiSelect,
  name,
  onInvalid,
  onReset,
  required,
  selected,
  validationMessage,
}: DropdownFormFieldsProps): React.ReactElement => {
  const validationRef = useRef<HTMLInputElement>(null);
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  const hasSelection = selected.some((option) => String(option.id ?? option.value ?? "") !== "");
  const needsArraySuffix = multiSelect && name && !name.endsWith("[]");
  const fieldName = needsArraySuffix ? `${name}[]` : name;
  const submittedOptions = hasSelection ? selected : [{}];

  useEffect(() => {
    validationRef.current?.setCustomValidity(required && !hasSelection ? validationMessage : "");
  }, [required, hasSelection, validationMessage]);

  useEffect(() => {
    const form = validationRef.current?.form;
    const handleReset = (event: Event) => {
      // Let native controls reset first, and honor listeners that cancel the reset.
      Promise.resolve().then(() => {
        if (!event.defaultPrevented) onResetRef.current();
      });
    };
    form?.addEventListener("reset", handleReset);
    return () => form?.removeEventListener("reset", handleReset);
  }, []);

  return (
    <>
      {name && submittedOptions.map((option, index) => (
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
          style={{
            position: "absolute",
            opacity: 0,
            width: 1,
            height: 1,
            pointerEvents: "none",
          }}
          tabIndex={-1}
          value={hasSelection ? "selected" : ""}
      />
    </>
  );
};

export default DropdownFormFields;
