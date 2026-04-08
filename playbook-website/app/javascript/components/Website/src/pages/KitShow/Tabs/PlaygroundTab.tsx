import React, { useState, useMemo, useCallback } from "react";
import {
  Body,
  Button,
  Caption,
  Card,
  Flex,
  SectionSeparator,
  TextInput,
  Title,
} from "playbook-ui";
import PlaygroundPreview from "./Playground/PlaygroundPreview";
import PropControl from "./Playground/PropControl";
import {
  generateCode,
  generateLiveCode,
  generateFromTemplate,
  generateLiveFromTemplate,
  getDefaultChildren,
  needsChildren,
} from "./Playground/CodeGenerator";

import {
  KitSchema,
  GlobalPropsSchema,
  PropValue,
  PropDefinition,
  PlaygroundConfig,
} from "./Playground/types";

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

const EXCLUDED_PROPS = ["children", "className", "id", "data", "aria", "htmlOptions"];

const prepareExampleCode = (source: string): string => {
  let code = source
    .split("\n")
    .filter((l) => !l.trim().startsWith("import "))
    .join("\n");

  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+)/;
  if (defaultExportRegex.test(code)) {
    code = code.replace(defaultExportRegex, "const __Exported = $1");
    code += `\nrender(<__Exported />)`;
  }

  return code;
};

export const PlaygroundTab: React.FC<PlaygroundTabProps> = ({
  kitSchema,
  globalPropsSchema,
  kitName,
  defaultExample,
  playgroundConfig,
}) => {
  const [propValues, setPropValues] = useState<Record<string, PropValue>>({});
  const [children, setChildren] = useState<string>(getDefaultChildren(kitName));
  const [showGlobalProps, setShowGlobalProps] = useState(false);
  const [copyState, setCopyState] = useState(false);

  const reactProps = useMemo(() => {
    if (!kitSchema?.props) return {};
    
    const filtered: Record<string, PropDefinition> = {};
    Object.entries(kitSchema.props).forEach(([name, def]) => {
      const isReactProp = !def.platforms || def.platforms.length === 0 || def.platforms.includes("react");
      const isExcluded = EXCLUDED_PROPS.includes(name) || EXCLUDED_PROPS.includes(name.toLowerCase());
      
      if (isReactProp && !isExcluded) {
        filtered[name] = def;
      }
    });
    return filtered;
  }, [kitSchema]);

  const globalProps = useMemo(() => {
    if (!globalPropsSchema?.props || !kitSchema?.globalProps) return {};
    return globalPropsSchema.props;
  }, [globalPropsSchema, kitSchema]);

  const handlePropChange = useCallback((name: string, value: PropValue) => {
    setPropValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setPropValues({});
    setChildren(getDefaultChildren(kitName));
  }, [kitName]);

  const allPropDefinitions = useMemo(() => ({
    ...reactProps,
    ...globalProps,
  }), [reactProps, globalProps]);

  // Check if any props have been modified
  const hasModifiedProps = Object.values(propValues).some(p => p.enabled);

  // Use template-based generation if playgroundConfig exists
  const hasTemplate = Boolean(playgroundConfig?.template);

  // Generated code with selected props
  const generatedDisplayCode = useMemo(() => {
    if (hasTemplate && playgroundConfig) {
      return generateFromTemplate({
        template: playgroundConfig.template,
        propValues,
        propDefinitions: allPropDefinitions,
        propTargets: playgroundConfig.propTargets,
        defaults: playgroundConfig.defaults,
        includeImport: true,
      });
    }
    return generateCode({
      componentName: kitName,
      propValues,
      propDefinitions: allPropDefinitions,
      children: needsChildren(kitName) ? children : undefined,
      includeImport: true,
    });
  }, [kitName, propValues, allPropDefinitions, children, hasTemplate, playgroundConfig]);

  const generatedLiveCode = useMemo(() => {
    if (hasTemplate && playgroundConfig) {
      return generateLiveFromTemplate({
        template: playgroundConfig.template,
        propValues,
        propDefinitions: allPropDefinitions,
        propTargets: playgroundConfig.propTargets,
        defaults: playgroundConfig.defaults,
      });
    }
    return generateLiveCode({
      componentName: kitName,
      propValues,
      propDefinitions: allPropDefinitions,
      children: needsChildren(kitName) ? children : undefined,
    });
  }, [kitName, propValues, allPropDefinitions, children, hasTemplate, playgroundConfig]);

  // For template-based: always use template (it has the base structure)
  // For non-template: use doc example when no props modified
  const previewCode = useMemo(() => {
    if (hasTemplate) {
      return generatedLiveCode;
    }
    if (!hasModifiedProps && defaultExample?.source) {
      return prepareExampleCode(defaultExample.source);
    }
    return generatedLiveCode;
  }, [hasTemplate, hasModifiedProps, defaultExample, generatedLiveCode]);

  // Display code follows same logic
  const displayCode = useMemo(() => {
    if (hasTemplate) {
      return generatedDisplayCode;
    }
    if (!hasModifiedProps && defaultExample?.source) {
      return defaultExample.source;
    }
    return generatedDisplayCode;
  }, [hasTemplate, hasModifiedProps, defaultExample, generatedDisplayCode]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopyState(true);
      setTimeout(() => setCopyState(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (!kitSchema) {
    return (
      <Flex paddingX="xl">
        <Card padding="md" width="100%">
          <Body text="No schema available for this component. The playground requires kit.schema.json to be generated." />
        </Card>
      </Flex>
    );
  }

  const kitPropEntries = Object.entries(reactProps);
  const globalPropEntries = Object.entries(globalProps);

  return (
    <Flex width="100%" paddingX="xl" gap="lg">
      {/* Left Panel - Preview and Code */}
      <Flex flexDirection="column" flex="1" minWidth="0">
        {/* Live Preview */}
        <Card marginBottom="md" padding="none" width="100%">
          <Flex justify="between" align="center" margin="md">
            <Caption text="Preview" color="lighter" />
            {!hasModifiedProps && defaultExample && (
              <Caption text="Default example" color="lighter" />
            )}
            {hasModifiedProps && (
              <Caption text="With selected props" color="lighter" />
            )}
          </Flex>
          <PlaygroundPreview code={previewCode} extraScope={playgroundConfig?.scopeVars} />
        </Card>

        {/* Code Snippet */}
        <Card padding="none" width="100%">
          <Flex justify="between" align="center" padding="sm">
            <Caption text="Code" color="lighter" />
            <Flex gap="xs">
              {hasModifiedProps && (
                <Button
                  text="Reset"
                  variant="link"
                  size="sm"
                  icon="undo"
                  onClick={handleReset}
                />
              )}
              <Button
                text={copyState ? "Copied!" : "Copy"}
                variant="link"
                size="sm"
                icon="copy"
                onClick={copyCode}
              />
            </Flex>
          </Flex>
          <Card borderNone background="light">
            <pre className="highlight" style={{ margin: 0, padding: "16px", overflow: "auto" }}>
              <code>{displayCode}</code>
            </pre>
          </Card>
        </Card>
      </Flex>

      {/* Right Panel - Props Controls */}
      <Flex
        flexDirection="column"
        htmlOptions={{ style: { width: "320px", minWidth: "320px" } }}
      >
        <Card padding="sm" height="100%" width="100%">
          <Flex justify="between" align="center" marginBottom="sm">
            <Title text="Props" size={4} />
            <Caption text={`${kitPropEntries.length} available`} />
          </Flex>

          {/* Children Input (for components that accept children) */}
          {needsChildren(kitName) && (
            <>
              <Caption text="Children" marginBottom="xs" />
              <TextInput
                placeholder="Enter children content..."
                value={children}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChildren(e.target.value)}
                marginBottom="sm"
              />
              <SectionSeparator marginY="sm" />
            </>
          )}

          {/* Kit Props */}
          <Flex
            flexDirection="column"
            htmlOptions={{
              style: {
                maxHeight: "400px",
                overflowY: "auto",
              },
            }}
          >
            {kitPropEntries.length > 0 ? (
              kitPropEntries.map(([name, definition]) => (
                <PropControl
                  key={name}
                  name={name}
                  definition={definition}
                  value={propValues[name]}
                  onChange={handlePropChange}
                />
              ))
            ) : (
              <Body text="No kit-specific props available." color="light" />
            )}
          </Flex>

          {/* Global Props Section */}
          {kitSchema.globalProps && globalPropEntries.length > 0 && (
            <>
              <SectionSeparator marginY="sm" />
              <Flex
                justify="between"
                align="center"
                cursor="pointer"
                onClick={() => setShowGlobalProps(!showGlobalProps)}
                paddingY="xs"
              >
                <Title text="Global Props" size={4} />
                <Caption text={showGlobalProps ? "▲" : "▼"} />
              </Flex>

              {showGlobalProps && (
                <Flex
                  flexDirection="column"
                  htmlOptions={{
                    style: {
                      maxHeight: "300px",
                      overflowY: "auto",
                    },
                  }}
                >
                  {globalPropEntries.map(([name, definition]) => (
                    <PropControl
                      key={name}
                      name={name}
                      definition={definition}
                      value={propValues[name]}
                      onChange={handlePropChange}
                    />
                  ))}
                </Flex>
              )}
            </>
          )}
        </Card>
      </Flex>
    </Flex>
  );
};

export default PlaygroundTab;
