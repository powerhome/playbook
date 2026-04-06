import React, { useState } from "react";
import {
  Badge,
  Caption,
  Checkbox,
  Flex,
  Select,
  TextInput,
  Body,
} from "playbook-ui";
import {
  PropControlProps,
  PropValue,
  FUNCTION_PRESETS,
} from "./types";

const formatPropName = (name: string): string => {
  return name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
};

const BooleanControl: React.FC<PropControlProps> = ({ name, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;

  return (
    <Flex align="center" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: true,
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
      />
    </Flex>
  );
};

const EnumControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const currentValue = value?.value ?? "";
  const values = definition.values || [];

  return (
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? "" : values[0] || "",
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
        marginBottom="xs"
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
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? "" : definition.default || "",
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
        marginBottom="xs"
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
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? 0 : definition.default || 0,
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
        marginBottom="xs"
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
    <Flex flexDirection="column" paddingY="xs">
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
        marginBottom="xs"
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
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? "" : "Content",
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
        marginBottom="xs"
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

const ObjectControl: React.FC<PropControlProps> = ({ name, definition, value, onChange }) => {
  const isEnabled = value?.enabled ?? false;
  const [inputValue, setInputValue] = useState(
    value?.value ? JSON.stringify(value.value, null, 2) : "{}"
  );

  return (
    <Flex flexDirection="column" paddingY="xs">
      <Checkbox
        checked={isEnabled}
        onChange={() => {
          onChange(name, {
            value: isEnabled ? null : {},
            enabled: !isEnabled,
          });
        }}
        text={formatPropName(name)}
        marginBottom="xs"
      />
      {isEnabled && (
        <Flex flexDirection="column" marginLeft="lg">
          <Caption text="Enter JSON object:" marginBottom="xs" />
          <TextInput
            placeholder="{}"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(name, { value: parsed, enabled: true });
              } catch {
                // Invalid JSON, keep input but don't update state
              }
            }}
          />
        </Flex>
      )}
    </Flex>
  );
};

const normalizeType = (type: string): string => {
  return type.toLowerCase().replace(/;/g, "").trim();
};

const PropControl: React.FC<PropControlProps> = (props) => {
  const { definition } = props;
  const rawType = definition.type || "";
  const propType = normalizeType(rawType);

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

  // Function check
  if (propType === "function" || propType.includes("=>") || propType.includes("function")) {
    return <FunctionControl {...props} />;
  }

  // ReactNode check
  if (propType.includes("reactnode") || propType.includes("node") || propType.includes("element")) {
    return <ReactNodeControl {...props} />;
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

export default PropControl;
