import React from "react";
import {
  Body,
  Caption,
  Card,
  Flex,
  SectionSeparator,
  TextInput,
  Title,
} from "playbook-ui";
import PropControl from "../PropControl";
import { PropDefinition, PropValue } from "../types";

interface PropsPanelProps {
  totalProps: number;
  showChildren: boolean;
  children: string;
  onChildrenChange: (value: string) => void;
  groupedProps: Array<{ name: string; props: Array<[string, PropDefinition]> }>;
  propValues: Record<string, PropValue>;
  propDisabledState: Record<string, { disabled: boolean; reason: string }>;
  onPropChange: (name: string, value: PropValue) => void;
  globalProps: Record<string, PropDefinition>;
  showGlobalProps: boolean;
  requiredPropNames?: Set<string>;
  /** From `propSyncOnEnable` — what sample data / structure applies when the prop is turned on */
  propSyncHints?: Record<string, string>;
}

export const PropsPanel: React.FC<PropsPanelProps> = ({
  totalProps,
  showChildren,
  children,
  onChildrenChange,
  groupedProps,
  propValues,
  propDisabledState,
  onPropChange,
  globalProps,
  showGlobalProps,
  requiredPropNames = new Set(),
  propSyncHints = {},
}) => {
  const globalPropEntries = Object.entries(globalProps);

  return (
    <Card
      flexDirection="column"
      htmlOptions={{ style: { width: "320px" } }}
      height="100vh"
      overflowY="auto"
      padding="none"
    >
      <Card.Header headerColor="white">
        <Flex justify="between" align="center" marginBottom="sm">
          <Title text="Props" size={4} />
          <Caption text={`${totalProps} available`} />
        </Flex>
      </Card.Header>
      <Card.Body padding="sm">
      {showChildren && (
        <>
          <Caption text="Children" marginBottom="xs" />
          <TextInput
            placeholder="Enter children content..."
            value={children}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChildrenChange(e.target.value)
            }
            marginBottom="sm"
          />
          <SectionSeparator marginY="sm" />
        </>
      )}

      <Flex flexDirection="column">
        {groupedProps.map((group, groupIndex) => (
          <React.Fragment key={group.name || "ungrouped"}>
            {group.name && (
              <>
                {groupIndex > 0 && <SectionSeparator width="100%" marginY="xs" />}
                <Flex
                  justify="between"
                  align="center"
                  cursor="pointer"
                  paddingY="xs"
                >
                  <Title text={group.name} size={4} />
                </Flex>
              </>
            )}

            {group.props.length > 0 ? (
              group.props.map(([name, definition]) => {
                const disabledState = propDisabledState[name];
                const syncHint = propSyncHints[name];
                return (
                  <Flex flexDirection="column" key={name} marginBottom="xs">
                    <PropControl
                      name={name}
                      definition={definition}
                      value={propValues[name]}
                      onChange={onPropChange}
                      disabled={disabledState?.disabled}
                      disabledReason={disabledState?.reason}
                      isRequired={requiredPropNames.has(name)}
                    />
                    {syncHint ? (
                      <Body
                        color="lighter"
                        marginLeft="md"
                        marginTop="xxs"
                        text={syncHint}
                      />
                    ) : null}
                  </Flex>
                );
              })
            ) : (
              <Body text="No props in this group." color="light" />
            )}
          </React.Fragment>
        ))}

        {totalProps === 0 && (
          <Body text="No kit-specific props available." color="light" />
        )}
      </Flex>

      {showGlobalProps && globalPropEntries.length > 0 && (
        <>
          <SectionSeparator marginY="sm" />
          <Flex justify="between" align="center" cursor="pointer" paddingY="xs">
            <Title text="Global Props" size={4} />
          </Flex>
          <Flex flexDirection="column">
            {globalPropEntries.map(([name, definition]) => {
              const syncHint = propSyncHints[name];
              return (
                <Flex flexDirection="column" key={name} marginBottom="xs">
                  <PropControl
                    name={name}
                    definition={definition}
                    value={propValues[name]}
                    onChange={onPropChange}
                  />
                  {syncHint ? (
                    <Body
                      color="lighter"
                      marginLeft="md"
                      marginTop="xxs"
                      text={syncHint}
                    />
                  ) : null}
                </Flex>
              );
            })}
          </Flex>
        </>
      )}
      </Card.Body>
    </Card>
  );
};
