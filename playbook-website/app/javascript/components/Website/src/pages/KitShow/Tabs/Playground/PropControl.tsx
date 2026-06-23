import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Caption,
  Checkbox,
  Detail,
  Dropdown,
  Flex,
  FlexItem,
  TextInput,
  Tooltip,
  Body,
} from "playbook-ui";
import { PropControlProps, FUNCTION_PRESETS, PropValue, PropDefinition } from "./types";
import { playgroundObjectToEditableLiteral, resolveSchemaDefault } from "./utils";

export interface ExtendedPropControlProps extends PropControlProps {
  disabled?: boolean;
  disabledReason?: string;
  isRequired?: boolean;
}

const PROPS_PANEL_DROPDOWN_CLASS = "props-panel-dropdown";
const propsPanelDropdownClassName = (filled: boolean) =>
  filled
    ? `${PROPS_PANEL_DROPDOWN_CLASS} ${PROPS_PANEL_DROPDOWN_CLASS}--filled`
    : PROPS_PANEL_DROPDOWN_CLASS;

const formatPropName = (name: string): string => name;

type PropControlRowProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  alignItems?: "center" | "start";
  filled?: boolean;
};

const PropControlRow: React.FC<PropControlRowProps> = ({
  label,
  children,
  alignItems = "center",
  filled = false,
}) => (
  <Flex
    alignItems={alignItems}
    flexDirection="row"
    gap="xs"
    padding="xs"
    width="100%"
  >
    <FlexItem fixedSize="40%">{label}</FlexItem>
    <FlexItem
      className={filled ? "props-panel-control--filled" : undefined}
      fixedSize="60%"
    >
      {children}
    </FlexItem>
  </Flex>
);

export const PropControlHint: React.FC<{ text: string }> = ({ text }) => (
  <Flex flexDirection="row" gap="xs" paddingX="xs" width="100%">
    <FlexItem fixedSize="40%" />
    <FlexItem fixedSize="60%">
      <Body color="lighter" marginTop="xxs" text={text} />
    </FlexItem>
  </Flex>
);

const propValueOnDropdownClear = (
  definition: PropDefinition,
  enumValues?: string[],
): PropValue => {
  const schemaDefault = resolveSchemaDefault(definition);

  if (enumValues) {
    if (
      typeof schemaDefault === "string" &&
      enumValues.includes(schemaDefault)
    ) {
      return { value: schemaDefault, enabled: false };
    }
    return { value: "", enabled: false };
  }

  if (schemaDefault !== undefined) {
    return { value: schemaDefault, enabled: false };
  }

  return { value: "", enabled: false };
};

const getEffectiveBoolean = (
  value: PropValue | undefined,
  schemaDefault: boolean | undefined,
): boolean => {
  if (value?.enabled) return value.value === true;
  const raw = value?.value;
  if (typeof raw === "boolean") return raw;
  return schemaDefault === true;
};

const getEffectiveDisplayValue = (
  value: PropValue | undefined,
  definition: PropDefinition,
  fallback?: unknown,
): unknown => {
  if (value?.enabled) {
    return value.value ?? fallback;
  }
  if (value?.value !== undefined && value.value !== null && value.value !== "") {
    return value.value;
  }
  const schemaDefault = resolveSchemaDefault(definition);
  if (schemaDefault !== undefined) return schemaDefault;
  return fallback;
};

const isFilledDisplayValue = (displayValue: unknown): boolean => {
  if (displayValue === undefined || displayValue === null || displayValue === "") {
    return false;
  }
  if (typeof displayValue === "object") {
    if (Array.isArray(displayValue)) return displayValue.length > 0;
    return Object.keys(displayValue as Record<string, unknown>).length > 0;
  }
  return true;
};

function objectSyncFingerprint(value: PropValue | undefined): string {
  const v = value?.value;
  if (
    v !== null &&
    v !== undefined &&
    typeof v === "object" &&
    !Array.isArray(v)
  ) {
    return JSON.stringify(v);
  }
  return "";
}

/**
 * Strict JSON first, then a parenthesized JS object literal so `{ default: true }`
 * works without JSON double-quoted keys (avoids codegen staying at `{}` when JSON.parse failed).
 */
function tryParseObjectLiteralInput(
  raw: string,
): Record<string, unknown> | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {};
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      return parsed as Record<string, unknown>;
    }
    return null;
  } catch {
    // fall through
  }
  try {
    const result = new Function(`return (${trimmed})`)();
    if (
      result !== null &&
      typeof result === "object" &&
      !Array.isArray(result)
    ) {
      return result as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Strict JSON first, then a parenthesized JS expression so `[{ rowId: "1" }]` works
 * (JSON.parse requires quoted keys on nested objects).
 */
function tryParseArrayLiteralInput(raw: string): unknown[] | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }
  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    // fall through
  }
  try {
    const result = new Function(`return (${trimmed})`)();
    return Array.isArray(result) ? result : null;
  } catch {
    return null;
  }
}

const BooleanControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
  definition,
}) => {
  const schemaDefault =
    typeof definition.default === "boolean" ? definition.default : undefined;
  const isChecked = getEffectiveBoolean(value, schemaDefault);

  return (
    <PropControlRow label={<Detail text={formatPropName(name)} />}>
      <Checkbox
        checked={isChecked}
        onChange={() => {
          onChange(name, {
            value: !isChecked,
            enabled: true,
          });
        }}
        text=""
      />
    </PropControlRow>
  );
};

const EnumControl: React.FC<PropControlProps> = ({
  name,
  definition,
  value,
  onChange,
}) => {
  const values = definition.values || [];
  const enumOptions = values.map((val) => ({
    id: val,
    label: val,
    value: val,
  }));
  const schemaDefault = resolveSchemaDefault(definition);
  const schemaDefaultValue =
    typeof schemaDefault === "string" && values.includes(schemaDefault)
      ? schemaDefault
      : undefined;
  const displayValue = (() => {
    if (value?.enabled) {
      return value.value != null && value.value !== ""
        ? String(value.value)
        : null;
    }
    if (value?.value != null && value.value !== "") {
      return String(value.value);
    }
    return schemaDefaultValue ?? null;
  })();
  const activeOption = displayValue
    ? enumOptions.find((option) => option.value === displayValue)
    : undefined;

  if (values.length === 0) return null;

  return (
    <PropControlRow filled={!!displayValue} label={<Detail text={name} />}>
      <Dropdown
        className={propsPanelDropdownClassName(!!displayValue)}
        defaultValue={activeOption}
        id={`prop-${name}-enum-dropdown`}
        key={`${value?.enabled}-${String(displayValue ?? "")}`}
        onSelect={(option: { value: string } | null): null => {
          if (option?.value) {
            onChange(name, { value: option.value, enabled: true });
          } else {
            onChange(name, propValueOnDropdownClear(definition, values));
          }
          return null;
        }}
        options={enumOptions}
        width="100%"
      />
    </PropControlRow>
  );
};

const StringControl: React.FC<PropControlProps> = ({
  name,
  definition,
  value,
  onChange,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, "");
  const currentValue = String(displayValue ?? "");

  return (
    <PropControlRow
      filled={isFilledDisplayValue(displayValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <TextInput
        placeholder={`Enter ${name}...`}
        value={currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(name, { value: e.target.value, enabled: true });
        }}
        width="100%"
      />
    </PropControlRow>
  );
};

const NumberControl: React.FC<PropControlProps> = ({
  name,
  definition,
  value,
  onChange,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, 0);
  const currentValue = displayValue ?? 0;

  return (
    <PropControlRow
      filled={isFilledDisplayValue(displayValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <TextInput
        type="number"
        placeholder={`Enter ${name}...`}
        value={String(currentValue)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(name, { value: Number(e.target.value), enabled: true });
        }}
        width="100%"
      />
    </PropControlRow>
  );
};

const FunctionControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
  definition,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, "");
  const currentValue = String(displayValue ?? "");
  const functionOptions = FUNCTION_PRESETS.map((preset) => ({
    id: preset.value || "none",
    label: preset.label,
    value: preset.value,
  }));
  const activeOption =
    functionOptions.find(
      (option) =>
        FUNCTION_PRESETS.find((preset) => preset.value === option.value)
          ?.code === currentValue,
    ) ?? functionOptions[0];

  return (
    <PropControlRow
      filled={isFilledDisplayValue(currentValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <Dropdown
        className={propsPanelDropdownClassName(isFilledDisplayValue(currentValue))}
        clearable={false}
        defaultValue={activeOption}
        id={`prop-${name}-function-dropdown`}
        key={currentValue}
        onSelect={(option: { value: string } | null): null => {
          const preset = FUNCTION_PRESETS.find(
            (p) => p.value === option?.value,
          );
          onChange(name, {
            value: preset?.code ?? currentValue,
            enabled: true,
          });
          return null;
        }}
        options={functionOptions}
        width="100%"
      />
    </PropControlRow>
  );
};

const ReactNodeControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
  definition,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, "");
  const currentValue = String(displayValue ?? "");

  return (
    <PropControlRow
      filled={isFilledDisplayValue(displayValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <TextInput
        placeholder={`Enter content for ${name}...`}
        value={currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(name, { value: e.target.value, enabled: true });
        }}
        width="100%"
      />
    </PropControlRow>
  );
};

const StringOrArrayControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
  definition,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, "plus");
  const isArray = Array.isArray(displayValue);

  const [inputValue, setInputValue] = useState(() => {
    if (isArray) return displayValue.join(", ");
    return String(displayValue);
  });

  useEffect(() => {
    if (isArray) {
      setInputValue(displayValue.join(", "));
    } else {
      setInputValue(String(displayValue));
    }
  }, [displayValue, isArray]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);

    // If contains comma, treat as array
    if (text.includes(",")) {
      const arr = text
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      onChange(name, { value: arr, enabled: true });
    } else {
      onChange(name, { value: text, enabled: true });
    }
  };

  return (
    <PropControlRow
      alignItems="start"
      filled={isFilledDisplayValue(displayValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <Flex flexDirection="column" width="100%">
        <TextInput value={inputValue} onChange={handleInputChange} width="100%" />
        <Caption
          text="Comma-separated for array (e.g., plus, times)"
          color="light"
          marginTop="xs"
        />
      </Flex>
    </PropControlRow>
  );
};

const ObjectControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
  definition,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, {});
  const [inputValue, setInputValue] = useState(() =>
    isFilledDisplayValue(displayValue)
      ? playgroundObjectToEditableLiteral(displayValue)
      : "{}",
  );

  const objectSyncKey = useMemo(
    () => objectSyncFingerprint({ value: displayValue, enabled: value?.enabled ?? false }),
    [displayValue, value?.enabled],
  );

  useEffect(() => {
    if (
      displayValue !== undefined &&
      displayValue !== null &&
      typeof displayValue === "object" &&
      !Array.isArray(displayValue)
    ) {
      setInputValue(playgroundObjectToEditableLiteral(displayValue));
    }
  }, [objectSyncKey, displayValue]);

  return (
    <PropControlRow
      alignItems="start"
      filled={isFilledDisplayValue(displayValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <Flex flexDirection="column" width="100%">
        <Caption
          color="light"
          marginBottom="xs"
          text='JSON or object literal, e.g. {"default": true} or { default: true }'
        />
        <textarea
          placeholder="{}"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const text = e.target.value;
            setInputValue(text);
            const parsed = tryParseObjectLiteralInput(text);
            if (parsed !== null) {
              onChange(name, { value: parsed, enabled: true });
            }
          }}
        />
      </Flex>
    </PropControlRow>
  );
};

const ArrayControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
  definition,
}) => {
  const displayValue = getEffectiveDisplayValue(value, definition, []);
  const [inputValue, setInputValue] = useState(() =>
    Array.isArray(displayValue) && displayValue.length > 0
      ? JSON.stringify(displayValue, null, 2)
      : "[]",
  );

  const arraySyncKey = useMemo(
    () => (Array.isArray(displayValue) ? JSON.stringify(displayValue) : ""),
    [displayValue],
  );

  useEffect(() => {
    if (Array.isArray(displayValue)) {
      setInputValue(JSON.stringify(displayValue, null, 2));
    }
  }, [arraySyncKey, displayValue]);

  return (
    <PropControlRow
      alignItems="start"
      filled={isFilledDisplayValue(displayValue)}
      label={<Detail text={formatPropName(name)} />}
    >
      <Flex flexDirection="column" width="100%">
        <Caption
          color="light"
          marginBottom="xs"
          text="JSON or JS array literal"
        />
        <textarea
          placeholder="[]"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const text = e.target.value;
            setInputValue(text);
            const parsed = tryParseArrayLiteralInput(text);
            if (parsed !== null) {
              onChange(name, { value: parsed, enabled: true });
            }
          }}
          style={{ minHeight: "120px" }}
        />
      </Flex>
    </PropControlRow>
  );
};

const RequiredArrayControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(
    value?.value ? JSON.stringify(value.value, null, 2) : "[]",
  );

  const arraySyncKey = useMemo(() => {
    const v = value?.value;
    return Array.isArray(v) ? JSON.stringify(v) : "";
  }, [value?.value]);

  useEffect(() => {
    const v = value?.value;
    if (Array.isArray(v)) {
      setInputValue(JSON.stringify(v, null, 2));
    } else {
      setInputValue("[]");
    }
  }, [arraySyncKey]);

  return (
    <PropControlRow
      alignItems="start"
      filled={isFilledDisplayValue(value?.value ?? [])}
      label={
        <Flex align="center" gap="xs" wrap>
          <Detail text={name} />
          <Badge text="Required" variant="primary" />
        </Flex>
      }
    >
      <Flex flexDirection="column" width="100%">
        <Caption
          marginBottom="xs"
          color="light"
          text="JSON or JS array literal."
        />
        <textarea
          placeholder="[]"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const text = e.target.value;
            setInputValue(text);
            const parsed = tryParseArrayLiteralInput(text);
            if (parsed !== null) {
              onChange(name, { value: parsed, enabled: true });
            }
          }}
        />
      </Flex>
    </PropControlRow>
  );
};

const RequiredObjectControl: React.FC<PropControlProps> = ({
  name,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(
    value?.value ? playgroundObjectToEditableLiteral(value.value) : "{}",
  );

  const objectSyncKey = useMemo(() => objectSyncFingerprint(value), [value]);

  useEffect(() => {
    const v = value?.value;
    if (
      v !== undefined &&
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v)
    ) {
      setInputValue(playgroundObjectToEditableLiteral(v));
    }
  }, [objectSyncKey]);

  return (
    <PropControlRow
      alignItems="start"
      filled={isFilledDisplayValue(value?.value ?? {})}
      label={
        <Flex align="center" gap="xs" wrap>
          <Detail text={name} />
          <Badge text="Required" variant="primary" />
        </Flex>
      }
    >
      <Flex flexDirection="column" width="100%">
        <Caption
          color="light"
          marginBottom="xs"
          text='Object: JSON or JS literal, e.g. {"default": true} or { default: true }'
        />
        <textarea
          placeholder="{}"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const text = e.target.value;
            setInputValue(text);
            const parsed = tryParseObjectLiteralInput(text);
            if (parsed !== null) {
              onChange(name, { value: parsed, enabled: true });
            }
          }}
        />
      </Flex>
    </PropControlRow>
  );
};

const normalizeType = (type: string): string => {
  return type.toLowerCase().replace(/;/g, "").trim();
};

const getControlForType = (props: PropControlProps, isRequired?: boolean) => {
  const { definition } = props;
  const rawType = definition.type || "";
  /** Lowercase so `GenericObject` matches object controls (schema uses PascalCase). */
  const propType = normalizeType(rawType);

  // For required props, use special controls that don't allow toggling off
  if (isRequired) {
    // Array check for required props
    if (
      propType === "array" ||
      propType.endsWith("[]") ||
      propType.startsWith("array")
    ) {
      return <RequiredArrayControl {...props} />;
    }
    // Default to required object control for complex types
    if (propType.includes("object") || propType.includes("genericobject")) {
      return <RequiredObjectControl {...props} />;
    }
  }

  // If it has enum values, treat as enum
  if (definition.values && definition.values.length > 0) {
    return <EnumControl {...props} />;
  }

  // Boolean check (handles "boolean", "boolean;", etc.)
  if (propType === "boolean" || propType.startsWith("boolean")) {
    return <BooleanControl {...props} />;
  }

  // Number check
  if (propType === "number" || propType.startsWith("number")) {
    return <NumberControl {...props} />;
  }

  // String or array check (for props that accept string | string[])
  if (
    propType.includes("string[]") ||
    (propType.includes("string |") && propType.includes("[]"))
  ) {
    return <StringOrArrayControl {...props} />;
  }

  // Function check
  if (
    propType === "function" ||
    propType.includes("=>") ||
    propType.includes("function")
  ) {
    return <FunctionControl {...props} />;
  }

  // ReactNode check (schema may use "ReactNode")
  if (
    propType.includes("reactnode") ||
    propType.includes("node") ||
    propType.includes("element")
  ) {
    return <ReactNodeControl {...props} />;
  }

  // Array check (for props like columnDefinitions, tableData)
  if (
    propType === "array" ||
    propType.endsWith("[]") ||
    propType.startsWith("array")
  ) {
    return <ArrayControl {...props} />;
  }

  // Object/GenericObject check
  if (propType.includes("object") || propType.includes("genericobject")) {
    return <ObjectControl {...props} />;
  }

  // String is the fallback for simple types
  if (propType === "string" || propType.startsWith("string")) {
    return <StringControl {...props} />;
  }

  // Default to string control for unknown types
  return <StringControl {...props} />;
};

const PropControl: React.FC<ExtendedPropControlProps> = (props) => {
  const { disabled, disabledReason, isRequired } = props;

  const control = getControlForType(props, isRequired);

  if (disabled) {
    return (
      <Tooltip
        placement="left"
        text={disabledReason || "This prop is not available"}
        zIndex={10}
      >
        <Flex className="props-panel-control--disabled" width="100%">
          {control}
        </Flex>
      </Tooltip>
    );
  }

  return control;
};

export default PropControl;
