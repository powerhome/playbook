import React from "react";
import { Body, Caption, Card, Flex } from "playbook-ui";

import {
  PlaygroundPreview,
  usePlaygroundState,
  PresetsBar,
  HintsDisplay,
  CodePanel,
  PropsPanel,
  KitSchema,
  GlobalPropsSchema,
  PlaygroundConfig,
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
    children,
    activePresetIndex,
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
    handlePropChange,
    applyPreset,
    setChildren,
  } = usePlaygroundState({
    kitSchema,
    globalPropsSchema,
    kitName,
    defaultExample,
    playgroundConfig,
  });

  if (!kitSchema) {
    return (
      <Flex paddingX="xl">
        <Card padding="md" width="100%">
          <Body text="No schema available for this component. The playground requires kit.schema.json to be generated." />
        </Card>
      </Flex>
    );
  }

  const totalKitProps = Object.keys(reactProps).length;
  const hasPresets = playgroundConfig?.presets && playgroundConfig.presets.length > 0;

  return (
    <Flex width="100%" paddingX="xl" gap="lg">
      {/* Left Panel - Preview and Code */}
      <Flex flexDirection="column" flex="1" minWidth="0">
        {hasPresets && (
          <PresetsBar
            presets={playgroundConfig!.presets!}
            activePresetIndex={activePresetIndex}
            onPresetClick={applyPreset}
          />
        )}

        <HintsDisplay hints={activeHints} />

        {/* Live Preview */}
        <Card marginBottom="md" padding="none" width="100%">
          <Flex justify="between" align="center" margin="md">
            <Caption text="Preview" color="lighter" />
            {!hasModifiedProps && defaultExample && !hasTemplate && (
              <Caption text="Default example" color="lighter" />
            )}
            {hasModifiedProps && <Caption text="With selected props" color="lighter" />}
          </Flex>
          <PlaygroundPreview code={previewCode} extraScope={playgroundConfig?.scopeVars} />
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
        propValues={propValues}
        propDisabledState={propDisabledState}
        onPropChange={handlePropChange}
        globalProps={globalProps}
        showGlobalProps={Boolean(kitSchema.globalProps)}
      />
    </Flex>
  );
};

export default PlaygroundTab;
