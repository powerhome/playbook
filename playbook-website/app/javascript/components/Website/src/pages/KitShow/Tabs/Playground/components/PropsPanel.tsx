import React from "react";
import {
  Card,
  Caption,
  Detail,
  Flex,
  Icon,
  SectionSeparator,
  Title,
} from "playbook-ui";
import {
  PropControlField,
  PropControlRow,
  type PropListSharedProps,
} from "../PropControl";
import { PropDefinition } from "../types";
import { usePanelResize } from "../hooks/usePanelResize";
import { PropGroupList } from "./PropGroupList";
import { PropsPanelTextarea } from "./PropsPanelTextarea";
import "./PropsPanel.scss";

const PROPS_PANEL_MIN_WIDTH = 330;
const PROPS_PANEL_MAX_WIDTH = 500;
const PROPS_PANEL_DEFAULT_WIDTH = 330;

interface PropsPanelProps extends PropListSharedProps {
  totalProps: number;
  showChildren: boolean;
  children: string;
  onChildrenChange: (value: string) => void;
  groupedProps: Array<{ name: string; props: Array<[string, PropDefinition]> }>;
  globalProps: Record<string, PropDefinition>;
  showGlobalProps: boolean;
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
  const { width: panelWidth, resizeHandleProps } = usePanelResize({
    defaultWidth: PROPS_PANEL_DEFAULT_WIDTH,
    minWidth: PROPS_PANEL_MIN_WIDTH,
    maxWidth: PROPS_PANEL_MAX_WIDTH,
  });

  const propListShared: PropListSharedProps = {
    propValues,
    propDisabledState,
    onPropChange,
    requiredPropNames,
    propSyncHints,
  };

  return (
    <Card
      className="props-panel"
      flexDirection="column"
      htmlOptions={{ style: { width: `${panelWidth}px` } }}
      padding="none"
    >
      <div
        className="props-panel__resize-handle"
        role="presentation"
        {...resizeHandleProps}
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
            <PropControlRow
              alignItems="start"
              filled={children.trim().length > 0}
              label={<Detail text="Children" truncate={1} width="100%" />}
            >
              <PropsPanelTextarea
                dialogTitle="Children"
                placeholder="Enter children content..."
                value={children}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChildrenChange(e.target.value)
                }
              />
            </PropControlRow>
            <SectionSeparator marginY="sm" />
          </>
        )}

        <PropGroupList
          {...propListShared}
          groups={groupedProps}
          noKitProps={totalProps === 0}
        />

        {showGlobalProps && globalPropEntries.length > 0 && (
          <>
            <SectionSeparator marginY="sm" />
            <Title text="Global Props" size={4} paddingY="xs" />
            <Flex flexDirection="column">
              {globalPropEntries.map(([name, definition]) => (
                <PropControlField
                  key={name}
                  name={name}
                  definition={definition}
                  value={propValues[name]}
                  onChange={onPropChange}
                  syncHint={propSyncHints[name]}
                />
              ))}
            </Flex>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
