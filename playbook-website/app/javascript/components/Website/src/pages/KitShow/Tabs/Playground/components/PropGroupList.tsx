import React from "react";
import { Body, Caption, Collapsible, Flex, SectionSeparator } from "playbook-ui";
import { PropControlField, type PropListSharedProps } from "../PropControl";
import { PropDefinition } from "../types";

type PropGroup = {
  name: string;
  props: Array<[string, PropDefinition]>;
};

type PropGroupListProps = PropListSharedProps & {
  groups: PropGroup[];
  emptyMessage?: string;
  noKitProps?: boolean;
  collapsedInitial?: boolean;
};

const PropGroupItems: React.FC<
  PropListSharedProps & {
    props: Array<[string, PropDefinition]>;
    emptyMessage: string;
  }
> = ({
  props,
  emptyMessage,
  propValues,
  propDisabledState,
  onPropChange,
  requiredPropNames,
  propSyncHints,
  playgroundConfig,
}) => {
  if (props.length === 0) {
    return <Body text={emptyMessage} color="light" />;
  }

  return (
    <>
      {props.map(([name, definition]) => {
        const disabledState = propDisabledState[name];
        return (
          <PropControlField
            key={name}
            name={name}
            definition={definition}
            value={propValues[name]}
            onChange={onPropChange}
            disabled={disabledState?.disabled}
            disabledReason={disabledState?.reason}
            isRequired={requiredPropNames?.has(name)}
            syncHint={propSyncHints?.[name]}
            playgroundConfig={playgroundConfig}
          />
        );
      })}
    </>
  );
};

export const PropGroupList: React.FC<PropGroupListProps> = ({
  groups,
  emptyMessage = "No props in this group.",
  noKitProps = false,
  collapsedInitial = false,
  ...shared
}) => {
  return (
    <Flex flexDirection="column">
      {groups.map((group, groupIndex) => {
        if (!group.name) {
          return (
            <React.Fragment key="ungrouped">
              <PropGroupItems
                {...shared}
                props={group.props}
                emptyMessage={emptyMessage}
              />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={group.name}>
            {groupIndex > 0 && (
              <SectionSeparator width="100%" marginY="none" />
            )}
            <Collapsible
              collapsed={collapsedInitial}
              padding="none"
              width="100%"
              icon={["plus", "minus"]}
            >
              <Collapsible.Main paddingX="none" paddingY="sm">
                <Caption text={group.name} />
              </Collapsible.Main>
              <Collapsible.Content padding="none">
                <Flex flexDirection="column">
                  <PropGroupItems
                    {...shared}
                    props={group.props}
                    emptyMessage={emptyMessage}
                  />
                </Flex>
              </Collapsible.Content>
            </Collapsible>
          </React.Fragment>
        );
      })}

      {noKitProps && (
        <Body text="No kit-specific props available." color="light" />
      )}
    </Flex>
  );
};
