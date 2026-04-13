import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Caption,
  Checkbox,
  Flex,
  Select,
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

/** Plain object from prop state — used when enabling object controls so playground `defaults` survive the toggle. */
function objectSeedFromPropValue(value: PropValue | undefined): Record<string, unknown> {
  const v = value?.value;
  if (v !== null && v !== undefined && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return {};
}

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

const BOOLEAN_PILLS: readonly boolean[] = [true, false];

const BooleanControl: React.FC<PropControlProps> = ({ name, value, onChange, definition }) => {
  const isEnabled = value?.enabled ?? false;
  const schemaDefault =
    typeof definition.default === "boolean" ? definition.default : undefined;
  const raw = value?.value;
  const effectiveBool =
    typeof raw === "boolean"
      ? raw
      : schemaDefault === true || schemaDefault === false
        ? schemaDefault
        : false;

  const defaultWhenEnabling =
    typeof schemaDefault === "boolean" ? schemaDefault : false;

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? false : defaultWhenEnabling,
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <Flex flexWrap="wrap" gap="xs" marginLeft="lg">
          {BOOLEAN_PILLS.map((boolVal) => {
            const label = String(boolVal);
            return (
              <div
                key={label}
                onClick={() => {
                  onChange(name, {
                    value: boolVal,
                    enabled: true,
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <Badge
                  text={label}
                  variant={effectiveBool === boolVal ? "primary" : "neutral"}
                />
              </div>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

const EnumControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const schemaDefault =
    typeof definition.default === "string" ? definition.default : undefined;
  const currentValue =
    value?.value ??
    (schemaDefault && definition.values?.includes(schemaDefault)
      ? schemaDefault
      : "");
  const values = definition.values || [];

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          const first =
            schemaDefault && values.includes(schemaDefault)
              ? schemaDefault
              : values[0] || "";
          onChange(name, {
            value: isEnabled ? "" : first,
            enabled: !isEnabled,
          });
        }}
        text={name}
      />
      {isEnabled && values.length > 0 && (
        <Flex flexWrap="wrap" gap="xs" marginLeft="lg">
          {values.map((val) => (
            <div
              key={val}
              onClick={() => onChange(name, { value: val, enabled: true })}
              style={{ cursor: "pointer" }}
            >
              <Badge
                text={val}
                variant={currentValue === val ? "primary" : "neutral"}
              />
            </div>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const StringControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const currentValue = value?.value ?? "";

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? "" : definition.default || "",
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <TextInput
          marginLeft="lg"
          placeholder={`Enter ${name}...`}
          value={currentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(name, { value: e.target.value, enabled: true });
          }}
        />
      )}
    </Flex>
  );
};

const NumberControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const currentValue = value?.value ?? 0;

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? 0 : definition.default || 0,
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <TextInput
          marginLeft="lg"
          type="number"
          placeholder={`Enter ${name}...`}
          value={String(currentValue)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(name, { value: Number(e.target.value), enabled: true });
          }}
        />
      )}
    </Flex>
  );
};

const FunctionControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const currentValue = value?.value ?? "";

  const options = FUNCTION_PRESETS.map((preset) => ({
    label: preset.label,
    value: preset.value,
  }));

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          const defaultPreset = FUNCTION_PRESETS[1];
          onChange(name, {
            value: isEnabled ? "" : defaultPreset.code,
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <Select
          marginLeft="lg"
          options={options}
          value={FUNCTION_PRESETS.find((p) => p.code === currentValue)?.value || "custom"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const preset = FUNCTION_PRESETS.find((p) => p.value === e.target.value);
            onChange(name, {
              value: preset?.code || currentValue,
              enabled: true,
            });
          }}
        />
      )}
    </Flex>
  );
};

const ReactNodeControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const currentValue = value?.value ?? "";

  return (
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? "" : "Content",
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <TextInput
          marginLeft="lg"
          placeholder={`Enter content for ${name}...`}
          value={currentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(name, { value: e.target.value, enabled: true });
          }}
        />
      )}
    </Flex>
  );
};

// Control for props that accept string | string[] (like icon)
const StringOrArrayControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const currentValue = value?.value ?? "";
  const isArray = Array.isArray(currentValue);
  
  const [inputValue, setInputValue] = useState(() => {
    if (isArray) return currentValue.join(", ");
    return currentValue;
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
    <Flex flexDirection="column" padding="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? "" : "plus",
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <Flex flexDirection="column" marginLeft="lg">
          <TextInput
            value={inputValue}
            onChange={handleInputChange}
          />
          <Caption text="Comma-separated for array (e.g., plus, times)" color="light" marginTop="xs" />
        </Flex>
      )}
    </Flex>
  );
};

const ObjectControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
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
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? null : objectSeedFromPropValue(value),
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <Flex flexDirection="column" marginLeft="lg">
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
            style={{
              width: "100%",
              minHeight: "100px",
              fontFamily: "monospace",
              fontSize: "12px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
        </Flex>
      )}
    </Flex>
  );
};

const ArrayControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const [inputValue, setInputValue] = useState(
    value?.value ? JSON.stringify(value.value, null, 2) : "[]"
  );

  const arraySyncKey = useMemo(() => {
    const v = value?.value;
    return Array.isArray(v) ? JSON.stringify(v) : "";
  }, [value?.value]);

  useEffect(() => {
    if (!isEnabled) return;
    const v = value?.value;
    if (Array.isArray(v)) {
      setInputValue(JSON.stringify(v, null, 2));
    }
  }, [isEnabled, arraySyncKey]);

  return (
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          const seed = value?.value;
          onChange(name, {
            value: isEnabled ? null : Array.isArray(seed) ? seed : [],
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
      {isEnabled && (
        <Flex flexDirection="column" marginLeft="lg">
          <Caption
            color="light"
            marginBottom="xs"
            text='JSON or JS array literal. Quote hex colors: "#0056CF" not #0056CF.'
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
            style={{
              width: "100%",
              minHeight: "120px",
              fontFamily: "monospace",
              fontSize: "12px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
        </Flex>
      )}
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
    <Flex flexDirection="column" paddingY="xs">
      <Flex align="center" gap="xs" marginBottom="xs">
        <Body text={name} />
        <Badge text="Required" variant="primary" />
      </Flex>
      <Flex flexDirection="column">
        <Caption
          marginBottom="xs"
          color="light"
          text='JSON or JS array literal. Quote hex colors: "#0056CF" not #0056CF.'
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
          style={{
            width: "100%",
            minHeight: "120px",
            fontFamily: "monospace",
            fontSize: "12px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            resize: "vertical",
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
    <Flex flexDirection="column" paddingY="xs">
      <Flex align="center" gap="xs" marginBottom="xs">
        <Body text={name} />
        <Badge text="Required" variant="primary" />
      </Flex>
      <Flex flexDirection="column">
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
          style={{
            width: "100%",
            minHeight: "120px",
            fontFamily: "monospace",
            fontSize: "12px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            resize: "vertical",
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
