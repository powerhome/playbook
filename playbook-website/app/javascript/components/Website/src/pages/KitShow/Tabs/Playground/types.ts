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

export interface PlaygroundChildrenConfig {
  editable: boolean;
  default: string;
  marker?: string;
  hideWhenPropSet?: string[];
}

export interface PropCondition {
  requires?: string | Record<string, any>;
  showWhen?: string | Record<string, any>;
  /** When set, the control is enabled only in this structure mode (e.g. `"explicit"`). */
  structureMode?: string;
}

export interface PropGroup {
  name: string;
  props: string[];
  collapsed?: boolean;
}

export interface PlaygroundPreset {
  name: string;
  props: Record<string, any>;
  children?: string;
  /** When set, applying this preset selects this `structureModes.modes` key (e.g. `"explicit"` for subcomponent templates). */
  structureMode?: string;
}

export interface PlaygroundHint {
  when: Record<string, any>;
  message: string;
  type?: "info" | "warning" | "error";
}

export interface StructureMode {
  label: string;
  template: string;
  children: string;
  props?: Record<string, any>;
  propTargets?: Record<string, string>;
  imports?: string[];
  wrapper?: string;
}

export interface StructureModesConfig {
  default: string;
  modes: Record<string, StructureMode>;
}

/** Named bundles of `columnDefinitions` + `tableData` for kits that need different sample data (e.g. Advanced Table). */
export interface DataPreset {
  label: string;
  columnDefinitions: any[];
  tableData: any[];
}

export interface DataPresetsConfig {
  presets: Record<string, DataPreset>;
}

/** When a prop is turned on, optionally select matching sample data and/or structure mode (kits opt in). */
export interface PropSyncOnEnableRule {
  /** Key in `dataPresets.presets` */
  dataPreset?: string;
  /** Key in `structureModes.modes` */
  structureMode?: string;
}

export type PropSyncOnEnable = Record<string, PropSyncOnEnableRule>;

export interface PlaygroundConfig {
  template: string;
  propTargets?: Record<string, string>;
  defaults?: Record<string, any>;
  scopeVars?: Record<string, any>;
  children?: PlaygroundChildrenConfig;
  conditionals?: Record<string, PropCondition>;
  groups?: PropGroup[];
  presets?: PlaygroundPreset[];
  hints?: Record<string, PlaygroundHint>;
  structureModes?: StructureModesConfig;
  /** Swap required table/column data without duplicating feature presets for each dataset. */
  dataPresets?: DataPresetsConfig;
  /** When a control is enabled, co-select sample data and/or structure mode (see Advanced Table). */
  propSyncOnEnable?: PropSyncOnEnable;
  requiredProps?: Record<string, any>;
  /** Kit prop names to omit from the playground props panel (still in kit.schema.json). */
  hiddenProps?: string[];
}
