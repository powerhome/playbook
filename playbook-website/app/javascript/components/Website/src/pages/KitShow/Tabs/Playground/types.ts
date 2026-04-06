export type PropType =
  | "boolean"
  | "string"
  | "number"
  | "enum"
  | "function"
  | "ReactNode"
  | "object"
  | "array"
  | string;

export interface PropDefinition {
  type: PropType;
  platforms: ("react" | "rails" | "swift")[];
  values?: string[];
  default?: any;
  responsive?: boolean;
  description?: string;
  example?: string;
}

export interface KitSchema {
  $schema: string;
  name: string;
  description: string;
  platforms: ("react" | "rails" | "swift")[];
  props: Record<string, PropDefinition>;
  globalProps: boolean;
  usage: {
    react?: {
      import: string;
      example: string;
    };
    rails?: {
      import: string | null;
      example: string;
    };
  };
}

export interface GlobalPropsSchema {
  $schema: string;
  name: string;
  description: string;
  breakpoints: Record<string, string>;
  spacing: {
    values: string[];
    description: string;
    tokens: Record<string, string>;
  };
  props: Record<string, PropDefinition>;
}

export interface PropValue {
  value: any;
  enabled: boolean;
}

export interface PlaygroundState {
  propValues: Record<string, PropValue>;
  children: string;
}

export interface PropControlProps {
  name: string;
  definition: PropDefinition;
  value: PropValue | undefined;
  onChange: (name: string, value: PropValue) => void;
}

export type FunctionPreset = {
  label: string;
  value: string;
  code: string;
};

export const FUNCTION_PRESETS: FunctionPreset[] = [
  { label: "None", value: "", code: "" },
  { label: "Alert", value: "alert", code: "() => alert('Clicked!')" },
  { label: "Console Log", value: "console", code: "() => console.log('Clicked!')" },
  { label: "Custom Handler", value: "custom", code: "(e) => { /* your code */ }" },
];

export type ReactNodePreset = {
  label: string;
  value: string;
};

export const REACT_NODE_PRESETS: ReactNodePreset[] = [
  { label: "Text", value: "text" },
  { label: "Icon", value: "icon" },
  { label: "Custom JSX", value: "custom" },
];

export interface PlaygroundConfig {
  template: string;
  propTargets?: Record<string, string>;
  defaults?: Record<string, any>;
  scopeVars?: Record<string, any>;
}
