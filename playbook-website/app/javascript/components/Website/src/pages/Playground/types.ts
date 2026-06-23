export type PropDefinition = {
  type?: string;
  platforms?: string[];
  values?: string[];
  default?: any;
  description?: string;
};

export type PlaygroundKit = {
  name: string;
  label: string;
  category: string;
  description?: string;
  kit_schema: {
    name: string;
    props: Record<string, PropDefinition>;
    globalProps?: boolean;
  };
  playground_config?: {
    customProps?: Record<string, PropDefinition>;
    defaults?: Record<string, any>;
    children?: {
      editable?: boolean;
      default?: string;
    };
    dataPresets?: {
      presets?: Record<string, {
        label: string;
        columnDefinitions?: any[];
        tableData?: any[];
      }>;
    };
    groups?: Array<{
      name: string;
      props: string[];
    }>;
    hiddenProps?: string[];
    presets?: Array<{
      name: string;
      props?: Record<string, any>;
      children?: string;
      dataPreset?: string | null;
      structureMode?: string;
    }>;
    propAliases?: Record<string, string>;
    propSyncOnEnable?: Record<string, {
      dataPreset?: string;
      structureMode?: string;
    }>;
    propTargets?: Record<string, string>;
    requiredProps?: Record<string, any>;
    requiredCodeProps?: string[];
    structureModes?: {
      default?: string;
      modes?: Record<string, {
        label: string;
        template?: string;
        children?: string;
        props?: Record<string, any>;
        propTargets?: Record<string, string>;
        propAliases?: Record<string, string>;
        imports?: string[];
        externalImports?: string[];
        wrapper?: string;
      }>;
    };
    template?: string;
    wrapper?: string;
    externalImports?: string[];
  };
};

export type PlaygroundLoaderData = {
  global_props_schema?: {
    props?: Record<string, PropDefinition>;
  };
  playground_kits: PlaygroundKit[];
};

export type BuilderInstance = {
  id: string;
  kitName: string;
  structureMode: string | null;
  dataPresetKey: string | null;
  configuredChildren: string | null;
  props: Record<string, any>;
  enabledProps: Record<string, boolean>;
  children: BuilderInstance[];
};

export type TargetOption = {
  id: string;
  label: string;
};

export const ROOT_TARGET_ID = "root";
