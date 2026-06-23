import React, { useCallback, useRef, useState, type PointerEvent } from "react";
import {
  Body,
  Caption,
  Card,
  Collapsible,
  Flex,
  FlexItem,
  Icon,
  SectionSeparator,
  Title,
  Detail,
} from "playbook-ui";
import PropControl, { PropControlHint } from "../PropControl";
import { PropDefinition, PropValue } from "../types";
import "./PropsPanel.scss";

const PROPS_PANEL_MIN_WIDTH = 330;
const PROPS_PANEL_MAX_WIDTH = 500;
const PROPS_PANEL_DEFAULT_WIDTH = 330;

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
  const [panelWidth, setPanelWidth] = useState(PROPS_PANEL_DEFAULT_WIDTH);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, width: PROPS_PANEL_DEFAULT_WIDTH });

  const clampWidth = useCallback((width: number) => {
    return Math.min(
      PROPS_PANEL_MAX_WIDTH,
      Math.max(PROPS_PANEL_MIN_WIDTH, width),
    );
  }, []);

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: event.clientX, width: panelWidth };
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const dragPanel = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    event.preventDefault();
    const delta = dragStartRef.current.x - event.clientX;
    setPanelWidth(clampWidth(dragStartRef.current.width + delta));
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const renderGroupProps = (props: Array<[string, PropDefinition]>) => {
    if (props.length === 0) {
      return <Body text="No props in this group." color="light" />;
    }

    return props.map(([name, definition]) => {
      const disabledState = propDisabledState[name];
      const syncHint = propSyncHints[name];
      return (
        <Flex flexDirection="column" key={name} width="100%">
          <PropControl
            name={name}
            definition={definition}
            value={propValues[name]}
            onChange={onPropChange}
            disabled={disabledState?.disabled}
            disabledReason={disabledState?.reason}
            isRequired={requiredPropNames.has(name)}
          />
          {syncHint ? <PropControlHint text={syncHint} /> : null}
        </Flex>
      );
    });
  };

  return (
    <Card
      className="props-panel"
      flexDirection="column"
      height="100vh"
      htmlOptions={{ style: { width: `${panelWidth}px` } }}
      padding="none"
    >
      <div
        className="props-panel__resize-handle"
        onPointerCancel={stopDragging}
        onPointerDown={startDragging}
        onPointerMove={dragPanel}
        onPointerUp={stopDragging}
        role="presentation"
      >
        <Icon icon="grip-lines-vertical" size="xs" />
      </div>
      <Card.Header headerColor="neutral_subtle">
        <Flex justify="between" align="center">
          <Title text="Props" size={4} />
          <Caption text={`${totalProps} available`} size="xs" color="light" />
        </Flex>
      </Card.Header>
      <Card.Body className="props-panel__body" padding="sm">
        {showChildren && (
          <>
          <Flex
            alignItems="start"
            flexDirection="row"
            gap="xs"
            padding="xs"
            width="100%"
          >
            <FlexItem className="props-panel-control-label" fixedSize="40%">
              <Detail text="Children" truncate={1} width="100%" />
            </FlexItem>
            <FlexItem
              className={
                children.trim().length > 0
                  ? "props-panel-control--filled"
                  : undefined
              }
              fixedSize="60%"
            >
              <textarea
                placeholder="Enter children content..."
                value={children}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChildrenChange(e.target.value)
                }
              />
            </FlexItem>
          </Flex>
          <SectionSeparator marginY="sm" />
          </>

        )}

        <Flex flexDirection="column">
          {groupedProps.map((group, groupIndex) => {
            if (!group.name) {
              return (
                <React.Fragment key="ungrouped">
                  {renderGroupProps(group.props)}
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={group.name}>
                {groupIndex > 0 && (
                  <SectionSeparator width="100%" marginY="xs" />
                )}
                <Collapsible
                  collapsed={false}
                  padding="none"
                  marginBottom="xs"
                  width="100%"
                  icon={["plus", "minus"]}
                >
                  <Collapsible.Main paddingX="none" paddingY="xxs">
                    <Caption text={group.name} />
                  </Collapsible.Main>
                  <Collapsible.Content padding="none">
                    <Flex flexDirection="column">
                      {renderGroupProps(group.props)}
                    </Flex>
                  </Collapsible.Content>
                </Collapsible>
              </React.Fragment>
            );
          })}

          {totalProps === 0 && (
            <Body text="No kit-specific props available." color="light" />
          )}
        </Flex>

        {showGlobalProps && globalPropEntries.length > 0 && (
          <>
            <SectionSeparator marginY="sm" />
            <Flex
              justify="between"
              align="center"
              cursor="pointer"
              paddingY="xs"
            >
              <Title text="Global Props" size={4} />
            </Flex>
            <Flex flexDirection="column">
              {globalPropEntries.map(([name, definition]) => {
                const syncHint = propSyncHints[name];
                return (
                  <Flex flexDirection="column" key={name} width="100%">
                    <PropControl
                      name={name}
                      definition={definition}
                      value={propValues[name]}
                      onChange={onPropChange}
                    />
                    {syncHint ? <PropControlHint text={syncHint} /> : null}
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
