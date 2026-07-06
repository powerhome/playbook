import React from "react";
import { Body, Button, Caption, Card, Flex, LoadingInline } from "playbook-ui";

import { linkFormat } from "../../../../../../utilities/website_sidebar_helper";
import LiveExampleRails from "../../../components/LiveExamples/LiveExampleRails";

import {
  usePlaygroundState,
  useRailsPlaygroundPreview,
  PresetsBar,
  HintsDisplay,
  CodePanel,
  PropsPanel,
  StructureModeSelector,
  DataPresetSelector,
  KitSchema,
  GlobalPropsSchema,
  PlaygroundConfig,
} from "./Playground";

interface Example {
  example_key: string;
  title: string;
  source: string;
  description?: string;
  rendered?: string | null;
}

interface RailsPlaygroundTabProps {
  kitSchema: KitSchema | null;
  globalPropsSchema: GlobalPropsSchema | null;
  kitName: string;
  defaultExample?: Example;
  playgroundConfig?: PlaygroundConfig | null;
}

export const RailsPlaygroundTab: React.FC<RailsPlaygroundTabProps> = ({
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
    activeStructureMode,
    activeDataPresetKey,
    reactProps,
    globalProps,
    groupedProps,
    groupedGlobalProps,
    propDisabledState,
    propSyncHints,
    activeHints,
    hasModifiedProps,
    showChildren,
    displayCode,
    railsPreviewPayload,
    availableStructureModes,
    availableDataPresets,
    requiredPropNames,
    platformPresets,
    activePlatformPresetIndex,
    handlePropChange,
    applyPlatformPreset,
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
    platform: "rails",
  });

  const { html, error, loading } = useRailsPlaygroundPreview({
    kitName,
    payload: railsPreviewPayload,
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
    platformPresets && platformPresets.length > 0;
  const hasStructureModes = availableStructureModes.length > 0;
  const hasDataPresets = availableDataPresets.length > 0;
  const displayKitName = linkFormat(kitName);
  const previewHtml =
    html ?? (!hasModifiedProps ? defaultExample?.rendered ?? null : null);

  return (
    <Flex alignItems="start" gap="lg" width="100%">
      <Flex flexDirection="column" flex="1" minWidth="0">
        <Card marginBottom="md" width="100%">
          <Caption text={`${displayKitName} Setup`} />
          {hasPresets && (
            <PresetsBar
              presets={platformPresets}
              activePresetIndex={activePlatformPresetIndex}
              onPresetClick={applyPlatformPreset}
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

        <Card
          className="playground-preview-card"
          marginBottom="md"
          padding="none"
          width="100%"
        >
          <Flex justify="between" align="center" margin="md">
            <Caption text="Rails Preview" />
            <Flex align="center" gap="sm">
              {loading && <LoadingInline align="center" text="Updating preview" />}
              {!hasModifiedProps && defaultExample && (
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

          {error && (
            <Card margin="md" marginTop="none" padding="md">
              <Body color="error" text={error} />
            </Card>
          )}

          {previewHtml ? (
            <LiveExampleRails key={previewHtml} html={previewHtml} />
          ) : (
            !error && (
              <Card margin="md" marginTop="none" padding="md">
                <Body text="Preview will appear here once props are configured." />
              </Card>
            )
          )}
        </Card>

        <CodePanel code={displayCode} language="erb" />
      </Flex>

      <PropsPanel
        totalProps={totalKitProps}
        showChildren={showChildren}
        children={children}
        onChildrenChange={setChildren}
        childrenPlaceholder={'Enter ERB children, e.g. <%= pb_rails("caption", props: { text: "A" }) %>'}
        groupedProps={groupedProps}
        groupedGlobalProps={groupedGlobalProps}
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

export default RailsPlaygroundTab;
