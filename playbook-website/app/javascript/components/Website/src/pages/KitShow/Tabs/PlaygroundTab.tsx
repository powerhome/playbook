import React, { useMemo } from "react";
import { Body, Button, Caption, Card, Flex } from "playbook-ui";

import { linkFormat } from "../../../../../../utilities/website_sidebar_helper";

import {
  PlaygroundPreview,
  usePlaygroundState,
  PresetsBar,
  HintsDisplay,
  CodePanel,
  PropsPanel,
  StructureModeSelector,
  DataPresetSelector,
  KitSchema,
  GlobalPropsSchema,
  PlaygroundConfig,
  getPropSyncContextHint,
} from "./Playground";

interface Example {
  example_key: string;
  title: string;
  source: string;
  description?: string;
}

interface PlaygroundTabProps {
  kitSchema: KitSchema | null;
  globalPropsSchema: GlobalPropsSchema | null;
  kitName: string;
  defaultExample?: Example;
  playgroundConfig?: PlaygroundConfig | null;
}

export const PlaygroundTab: React.FC<PlaygroundTabProps> = ({
  kitSchema,
  globalPropsSchema,
  kitName,
  defaultExample,
  playgroundConfig,
}) => {
  const {
    propValues,
    displayPropValues,
    children,
    activePresetIndex,
    activeStructureMode,
    activeDataPresetKey,
    reactProps,
    globalProps,
    groupedProps,
    propDisabledState,
    activeHints,
    hasModifiedProps,
    hasTemplate,
    showChildren,
    previewCode,
    displayCode,
    availableStructureModes,
    availableDataPresets,
    requiredPropNames,
    handlePropChange,
    applyPreset,
    setChildren,
    handleStructureModeChange,
    handleDataPresetChange,
    handleReset,
  } = usePlaygroundState({
    kitSchema,
    globalPropsSchema,
    kitName,
    defaultExample,
    playgroundConfig,
  });

  if (!kitSchema) {
    return (
      <Flex width="100%">
        <Card padding="md" width="100%">
          <Body text="No schema available for this component. The playground requires kit.schema.json to be generated." />
        </Card>
      </Flex>
    );
  }

  const totalKitProps = Object.keys(reactProps).length;
  const hasPresets =
    playgroundConfig?.presets && playgroundConfig.presets.length > 0;
  const hasStructureModes = availableStructureModes.length > 0;
  const hasDataPresets = availableDataPresets.length > 0;

  const propSyncHints = useMemo(() => {
    if (!playgroundConfig?.propSyncOnEnable) return {};
    const out: Record<string, string> = {};
    Object.keys(playgroundConfig.propSyncOnEnable).forEach((name) => {
      const h = getPropSyncContextHint(name, playgroundConfig);
      if (h) out[name] = h;
    });
    return out;
  }, [playgroundConfig]);

  // Merge scopeVars with requiredProps values for the live preview
  const previewScope = useMemo(() => {
    const scope: Record<string, any> = {};
    
    // Add scopeVars from config
    if (playgroundConfig?.scopeVars) {
      Object.assign(scope, playgroundConfig.scopeVars);
    }
    
    // Add requiredProps values (use current propValues for editability)
    if (playgroundConfig?.requiredProps) {
      Object.keys(playgroundConfig.requiredProps).forEach((propName) => {
        // Use current value from propValues if available, otherwise use default
        const currentValue = propValues[propName];
        scope[propName] = currentValue?.value ?? playgroundConfig.requiredProps![propName];
      });
    }
    
    return scope;
  }, [playgroundConfig?.scopeVars, playgroundConfig?.requiredProps, propValues]);

  const displayKitName = linkFormat(kitName);

  return (
    <Flex alignItems="start" gap="lg" width="100%">
      {/* Left Panel - Preview and Code */}
      <Flex flexDirection="column" flex="1" minWidth="0">
       <Card marginBottom="md" width="100%">
        <Caption text={`${displayKitName} Setup`} />
        {hasPresets && (
          <PresetsBar
            presets={playgroundConfig!.presets!}
            activePresetIndex={activePresetIndex}
            onPresetClick={applyPreset}
          />
        )}

        {hasStructureModes && (
          <StructureModeSelector
            modes={availableStructureModes}
            activeMode={activeStructureMode}
            onModeChange={handleStructureModeChange}
          />
        )}

        {hasDataPresets && (
          <DataPresetSelector
            activeKey={activeDataPresetKey}
            presets={availableDataPresets}
            onPresetChange={handleDataPresetChange}
          />
        )}

        <HintsDisplay hints={activeHints} />
        </Card>

        {/* Live Preview */}
        <Card marginBottom="md" padding="none" width="100%">
          <Flex justify="between" align="center" margin="md">
            <Caption text="Preview" />
            <Flex align="center" gap="sm">
              {!hasModifiedProps && defaultExample && !hasTemplate && (
                <Caption text="Default example" color="lighter" />
              )}
              {hasModifiedProps && (
                <Button
                  icon="undo"
                  onClick={handleReset}
                  size="sm"
                  variant="secondary"
                  text="Reset to Default Example"
                />
              )}
            </Flex>
          </Flex>
          <PlaygroundPreview
            code={previewCode}
            extraScope={previewScope}
          />
        </Card>

        <CodePanel code={displayCode} />
      </Flex>

      {/* Right Panel - Props Controls */}
      <PropsPanel
        totalProps={totalKitProps}
        showChildren={showChildren}
        children={children}
        onChildrenChange={setChildren}
        groupedProps={groupedProps}
        propValues={displayPropValues}
        propDisabledState={propDisabledState}
        onPropChange={handlePropChange}
        globalProps={globalProps}
        showGlobalProps={Boolean(kitSchema.globalProps)}
        requiredPropNames={requiredPropNames}
        propSyncHints={propSyncHints}
        playgroundConfig={playgroundConfig}
      />
    </Flex>
  );
};

export default PlaygroundTab;
