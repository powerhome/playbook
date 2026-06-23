import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Caption,
  Checkbox,
  Detail,
  Dropdown,
  Flex,
  TextInput,
  Tooltip,
  Body
} from "playbook-ui";
import {
  PropControlProps,
  FUNCTION_PRESETS,
  PropValue,
} from "./types";
import { playgroundObjectToEditableLiteral } from "./utils";

export interface ExtendedPropControlProps extends PropControlProps {
  disabled?: boolean;
  disabledReason?: string;
  isRequired?: boolean;
}

const formatPropName = (name: string): string => name;

const getEffectiveBoolean = (
  value: PropValue | undefined,
  schemaDefault: boolean | undefined,
): boolean => {
  if (value?.enabled) return value.value === true;
  const raw = value?.value;
  if (typeof raw === "boolean") return raw;
  return schemaDefault === true;
};

function objectSyncFingerprint(value: PropValue | undefined): string {
  const v = value?.value;
  if (v !== null && v !== undefined && typeof v === "object" && !Array.isArray(v)) {
    return JSON.stringify(v);
  }
  return "";
}

/**
 * Strict JSON first, then a parenthesized JS object literal so `{ default: true }`
 * works without JSON double-quoted keys (avoids codegen staying at `{}` when JSON.parse failed).
 */
function tryParseObjectLiteralInput(raw: string): Record<string, unknown> | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {};
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return null;
  } catch {
    // fall through
  }
  try {
    const result = new Function(`return (${trimmed})`)();
    if (result !== null && typeof result === "object" && !Array.isArray(result)) {
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

const BooleanControl: React.FC<PropControlProps> = ({ name, value, onChange, definition }) => {
  const schemaDefault =
    typeof definition.default === "boolean" ? definition.default : undefined;
  const isChecked = getEffectiveBoolean(value, schemaDefault);

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isChecked}
        onChange={() => {
          onChange(name, {
            value: !isChecked,
            enabled: true,
          });
        }}
        text={formatPropName(name)}
      />
    </Flex>
  );
};

const EnumControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const schemaDefault =
    typeof definition.default === "string" ? definition.default : undefined;
  const currentValue =
    value?.value ??
    (schemaDefault && definition.values?.includes(schemaDefault)
      ? schemaDefault
      : "");
  const values = definition.values || [];
  const enumOptions = values.map((val) => ({
    id: val,
    label: val,
    value: val,
  }));
  const activeOption =
    enumOptions.find((option) => option.value === currentValue) ??
    enumOptions[0];

  if (values.length === 0) return null;

  return (
    <Flex flexDirection="column" padding="xs" width="100%">
      <Detail marginBottom="xs" text={name} />
      <Dropdown
        clearable={false}
        defaultValue={activeOption}
        id={`prop-${name}-enum-dropdown`}
        key={currentValue}
        onSelect={(option: { value: string } | null): null => {
          if (option?.value) {
            onChange(name, { value: option.value, enabled: true });
          }
          return null;
        }}
        options={enumOptions}
        width="100%"
      />
    </Flex>
  );
};

const StringControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const currentValue = value?.value ?? definition.default ?? "";

  return (
    <Flex flexDirection="column" padding="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
      <TextInput
        placeholder={`Enter ${name}...`}
        value={String(currentValue ?? "")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(name, { value: e.target.value, enabled: true });
        }}
      />
    </Flex>
  );
};

const NumberControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const currentValue = value?.value ?? definition.default ?? 0;

  return (
    <Flex flexDirection="column" padding="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
      <TextInput
        type="number"
        placeholder={`Enter ${name}...`}
        value={String(currentValue)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(name, { value: Number(e.target.value), enabled: true });
        }}
      />
    </Flex>
  );
};

const FunctionControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const currentValue = value?.value ?? "";
  const functionOptions = FUNCTION_PRESETS.map((preset) => ({
    id: preset.value || "none",
    label: preset.label,
    value: preset.value,
  }));
  const activeOption =
    functionOptions.find(
      (option) =>
        FUNCTION_PRESETS.find((preset) => preset.value === option.value)?.code ===
        currentValue,
    ) ?? functionOptions[0];

  return (
    <Flex flexDirection="column" padding="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
      <Dropdown
        clearable={false}
        defaultValue={activeOption}
        id={`prop-${name}-function-dropdown`}
        key={currentValue}
        onSelect={(option: { value: string } | null): null => {
          const preset = FUNCTION_PRESETS.find((p) => p.value === option?.value);
          onChange(name, {
            value: preset?.code ?? currentValue,
            enabled: true,
          });
          return null;
        }}
        options={functionOptions}
        width="100%"
      />
    </Flex>
  );
};

const ReactNodeControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const currentValue = value?.value ?? "";

  return (
    <Flex flexDirection="column" padding="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
      <TextInput
        placeholder={`Enter content for ${name}...`}
        value={currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(name, { value: e.target.value, enabled: true });
        }}
      />
    </Flex>
  );
};

const StringOrArrayControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const currentValue = value?.value ?? "plus";
  const isArray = Array.isArray(currentValue);
  
  const [inputValue, setInputValue] = useState(() => {
    if (isArray) return currentValue.join(", ");
    return String(currentValue);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    
    // If contains comma, treat as array
    if (text.includes(",")) {
      const arr = text.split(",").map(s => s.trim()).filter(s => s);
      onChange(name, { value: arr, enabled: true });
    } else {
      onChange(name, { value: text, enabled: true });
    }
  };

  return (
    <Flex flexDirection="column" padding="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
      <TextInput
        value={inputValue}
        onChange={handleInputChange}
      />
      <Caption text="Comma-separated for array (e.g., plus, times)" color="light" marginTop="xs" />
    </Flex>
  );
};

const ObjectControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(
    value?.value ? playgroundObjectToEditableLiteral(value.value) : "{}"
  );

  const objectSyncKey = useMemo(() => objectSyncFingerprint(value), [value]);

  useEffect(() => {
    const v = value?.value;
    if (v !== undefined && v !== null && typeof v === "object" && !Array.isArray(v)) {
      setInputValue(playgroundObjectToEditableLiteral(v));
    }
  }, [objectSyncKey]);

  return (
    <Flex flexDirection="column" paddingY="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
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
  );
};

const ArrayControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(
    value?.value ? JSON.stringify(value.value, null, 2) : "[]"
  );

  const arraySyncKey = useMemo(() => {
    const v = value?.value;
    return Array.isArray(v) ? JSON.stringify(v) : "";
  }, [value?.value]);

  useEffect(() => {
    const v = value?.value;
    if (Array.isArray(v)) {
      setInputValue(JSON.stringify(v, null, 2));
    }
  }, [arraySyncKey]);

  return (
    <Flex flexDirection="column" paddingY="xs" width="100%">
      <Detail marginBottom="xs" text={formatPropName(name)} />
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
  );
};

const RequiredArrayControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(
    value?.value ? JSON.stringify(value.value, null, 2) : "[]"
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
    <Flex flexDirection="column" paddingY="xs" width="100%">
      <Flex align="center" gap="xs" marginBottom="xs">
        <Body text={name} />
        <Badge text="Required" variant="primary" />
      </Flex>
      <Flex flexDirection="column" width="100%">
        <Caption
          marginBottom="xs"
          color="light"
          text='JSON or JS array literal.'
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
    </Flex>
  );
};

const RequiredObjectControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(
    value?.value ? playgroundObjectToEditableLiteral(value.value) : "{}"
  );

  const objectSyncKey = useMemo(() => objectSyncFingerprint(value), [value]);

  useEffect(() => {
    const v = value?.value;
    if (v !== undefined && v !== null && typeof v === "object" && !Array.isArray(v)) {
      setInputValue(playgroundObjectToEditableLiteral(v));
    }
  }, [objectSyncKey]);

  return (
    <Flex flexDirection="column" paddingY="xs" width="100%">
      <Flex align="center" gap="xs" marginBottom="xs">
        <Body text={name} />
        <Badge text="Required" variant="primary" />
      </Flex>
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
    </Flex>
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
    if (propType === "array" || propType.endsWith("[]") || propType.startsWith("array")) {
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
  if (propType.includes("string[]") || (propType.includes("string |") && propType.includes("[]"))) {
    return <StringOrArrayControl {...props} />;
  }

  // Function check
  if (propType === "function" || propType.includes("=>") || propType.includes("function")) {
    return <FunctionControl {...props} />;
  }

  // ReactNode check (schema may use "ReactNode")
  if (propType.includes("reactnode") || propType.includes("node") || propType.includes("element")) {
    return <ReactNodeControl {...props} />;
  }

  // Array check (for props like columnDefinitions, tableData)
  if (propType === "array" || propType.endsWith("[]") || propType.startsWith("array")) {
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
        <div style={{ opacity: 0.5, pointerEvents: "none" }}>
          {control}
        </div>
      </Tooltip>
    );
  }
  
  return control;
};

export default PropControl;
