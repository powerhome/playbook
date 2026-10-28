import React, { useCallback, useContext, useMemo, useRef } from "react";
import Body from "../../pb_body/_body";
import Draggable from "../../pb_draggable/_draggable";
import { DraggableContext, DraggableProvider } from "../../pb_draggable/context";
import Flex from "../../pb_flex/_flex";
import FormPill from "../../pb_form_pill/_form_pill";
import Icon from "../../pb_icon/_icon";
import { noop } from "../../utilities/object";
import { GenericObject } from "../../types";
import DropdownContext from "../context";
import usePillDropIndicator from "../utilities/usePillDropIndicator";

type MultiSelectTriggerDisplayProps = {
  autocomplete?: boolean;
  selected: GenericObject[];
  placeholder?: string;
  dark?: boolean;
};

type DropdownPillProps = {
  dark?: boolean;
  formPillProps?: GenericObject;
  index: number;
  onKeyboardReorder?: (direction: "left" | "right") => void;
  onRemove: (event: React.MouseEvent | React.KeyboardEvent) => void;
  option: GenericObject;
  externalDragHandle?: boolean;
  showPillIndex?: boolean;
  totalCount: number;
};

const DropdownPill = ({
  dark = false,
  formPillProps,
  index,
  onKeyboardReorder,
  onRemove,
  option,
  externalDragHandle = false,
  showPillIndex = false,
  totalCount,
}: DropdownPillProps) => {
  const baseLabel = option.label || "";
  const label = showPillIndex ? `${index + 1}. ${baseLabel}` : baseLabel;
  const positionLabel = totalCount > 0
    ? `${baseLabel}, position ${index + 1} of ${totalCount}, press Left or Right Arrow keys to reorder`
    : baseLabel;
  const pillIcon = !externalDragHandle && onKeyboardReorder ? "grip-dots-vertical" : "";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      event.stopPropagation();
      onRemove(event);
    } else if (onKeyboardReorder && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      event.stopPropagation();
      const pill = event.currentTarget;
      onKeyboardReorder(event.key === "ArrowLeft" ? "left" : "right");
      requestAnimationFrame(() => pill.focus());
    }
  };

  const pill = (
    <FormPill
        dark={dark}
        htmlOptions={{ "aria-label": positionLabel, onKeyDown: handleKeyDown }}
        icon={pillIcon}
        marginRight="xs"
        name=""
        onClick={(event) => {
          event.stopPropagation();
          onRemove(event);
        }}
        tabIndex={0}
        text={label}
        {...formPillProps}
    />
  );

  if (!externalDragHandle) return pill;

  return (
    <span className="pb_dropdown_pill_with_handle">
      <span
          aria-hidden="true"
          className="pb_draggable_handle pb_dropdown_external_drag_handle"
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
      >
        <Body color="light">
          <Icon
              icon="grip-dots-vertical"
              verticalAlign="middle"
          />
        </Body>
      </span>
      {pill}
    </span>
  );
};

type DraggablePillListProps = {
  dark?: boolean;
  formPillProps?: GenericObject;
  getItemId: (item: GenericObject) => string;
  onRemove: (option: GenericObject) => void;
  onReorder: (next: GenericObject[]) => void;
  pendingReorderRef: React.MutableRefObject<GenericObject[] | null>;
  externalDragHandle: boolean;
  selected: GenericObject[];
  showPillIndex: boolean;
};

const DraggablePillList = ({
  dark,
  formPillProps,
  getItemId,
  onRemove,
  onReorder,
  pendingReorderRef,
  externalDragHandle,
  selected,
  showPillIndex,
}: DraggablePillListProps) => {
  const { isDragging: dragId } = DraggableContext();
  const dropTarget = usePillDropIndicator(
    dragId,
    selected,
    getItemId,
    pendingReorderRef,
  );

  const getDropLineClassName = (index: number): string | undefined => {
    if (dropTarget?.index !== index) return undefined;
    return dropTarget.after ? "pb_dropdown_drop_after" : "pb_dropdown_drop_before";
  };

  const handleKeyboardReorder = (index: number, direction: "left" | "right") => {
    const newIndex = direction === "left" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= selected.length) return;

    const reordered = [...selected];
    const [movedItem] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, movedItem);
    onReorder(reordered);
  };

  return (
    <div
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => {
          if ((event.target as HTMLElement | null)?.closest(".pb_form_pill_close")) return
          event.stopPropagation()
        }}
    >
      <Draggable.Container
          className="pb_dropdown_draggable_pills"
          container="dropdown-pills"
          tag="div"
      >
        {selected.map((option, index) => (
          <Draggable.Item
              className={getDropLineClassName(index)}
              container="dropdown-pills"
              dragId={getItemId(option)}
              handlePointerDrag={externalDragHandle}
              key={getItemId(option)}
              pointerDrag={!externalDragHandle}
              tag="span"
          >
            <DropdownPill
                dark={dark}
                externalDragHandle={externalDragHandle}
                formPillProps={formPillProps}
                index={index}
                onKeyboardReorder={(direction) => handleKeyboardReorder(index, direction)}
                onRemove={() => onRemove(option)}
                option={option}
                showPillIndex={showPillIndex}
                totalCount={selected.length}
            />
          </Draggable.Item>
        ))}
      </Draggable.Container>
    </div>
  );
};

type DraggablePillsStripProps = {
  dark?: boolean;
  formPillProps?: GenericObject;
  getItemId: (item: GenericObject) => string;
  onRemove: (option: GenericObject) => void;
  onReorder: (next: GenericObject[]) => void;
  externalDragHandle: boolean;
  selected: GenericObject[];
  showPillIndex: boolean;
};

const buildSelectedPillsKey = (value: GenericObject[], getItemId: (item: GenericObject) => string): string => (
  value.map((item) => `${getItemId(item)}:${item.label ?? ""}`).join("|")
);

const formPillPropsKey = (formPillProps?: GenericObject): string => (
  JSON.stringify(formPillProps ?? {})
);

const DraggablePillsStrip = React.memo(function DraggablePillsStrip({
  dark,
  formPillProps,
  getItemId,
  onRemove,
  onReorder,
  externalDragHandle,
  selected,
  showPillIndex,
}: DraggablePillsStripProps) {
  const pendingReorderRef = useRef<GenericObject[] | null>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const initialItems = useMemo(
    () => selected.map((item) => ({
      id: getItemId(item),
      container: "dropdown-pills",
      label: item.label,
      value: item.value,
    })),
    [getItemId, selected],
  );

  const commitReorder = useCallback(() => {
    if (!pendingReorderRef.current) return;

    const currentOrder = selectedRef.current.map((item) => getItemId(item)).join(",");
    const newOrder = pendingReorderRef.current.map((item) => getItemId(item)).join(",");

    if (currentOrder !== newOrder) {
      onReorder(pendingReorderRef.current);
    }

    pendingReorderRef.current = null;
  }, [getItemId, onReorder]);

  return (
    <DraggableProvider
        dropZone={{ type: "ghost" }}
        initialItems={initialItems}
        onDragEnd={commitReorder}
        onDrop={commitReorder}
        onReorder={noop}
    >
      <DraggablePillList
          dark={dark}
          externalDragHandle={externalDragHandle}
          formPillProps={formPillProps}
          getItemId={getItemId}
          onRemove={onRemove}
          onReorder={onReorder}
          pendingReorderRef={pendingReorderRef}
          selected={selected}
          showPillIndex={showPillIndex}
      />
    </DraggableProvider>
  );
}, (prevProps, nextProps) => (
  prevProps.dark === nextProps.dark
  && prevProps.externalDragHandle === nextProps.externalDragHandle
  && prevProps.showPillIndex === nextProps.showPillIndex
  && formPillPropsKey(prevProps.formPillProps) === formPillPropsKey(nextProps.formPillProps)
  && buildSelectedPillsKey(prevProps.selected, prevProps.getItemId)
    === buildSelectedPillsKey(nextProps.selected, nextProps.getItemId)
));

const MultiSelectTriggerDisplay = ({
  autocomplete,
  selected,
  placeholder,
  dark = false,
}: MultiSelectTriggerDisplayProps) => {
  const {
    disabled,
    enablePillReorder,
    formPillProps,
    getOptionValue,
    handleSelectionChange,
    isControlled,
    isSameOption,
    optionKey,
    externalDragHandle = false,
    setSelected,
    showPillIndex = false,
  } = useContext(DropdownContext);

  const getItemId = useCallback((option: GenericObject) => (
    optionKey ? optionKey(option) : String(
      getOptionValue ? getOptionValue(option) : option.id ?? option.value ?? option.label
    )
  ), [getOptionValue, optionKey]);

  if (selected.length === 0) {
    if (autocomplete) return null;
    return (
      <Body
          color="lighter"
          dark={dark}
          text={placeholder ? placeholder : "Select..."}
      />
    );
  }

  const applySelection = (next: GenericObject[]) => {
    if (isControlled || getOptionValue) {
      setSelected(next);
      handleSelectionChange(next);
      return;
    }
    setSelected(() => {
      handleSelectionChange && handleSelectionChange(next);
      return next;
    });
  };

  const handleRemoveIconClick = (option: GenericObject) => {
    if (disabled) return;
    applySelection(selected.filter((item) => !isSameOption(item, option)));
  };

  const handleReorder = (next: GenericObject[]) => {
    if (disabled) return;
    applySelection(next);
  };

  if (enablePillReorder && !disabled) {
    return (
      <DraggablePillsStrip
          dark={dark}
          externalDragHandle={Boolean(externalDragHandle)}
          formPillProps={formPillProps}
          getItemId={getItemId}
          onRemove={handleRemoveIconClick}
          onReorder={handleReorder}
          selected={selected}
          showPillIndex={Boolean(showPillIndex)}
      />
    );
  }

  return (
    <Flex wrap>
      {selected.map((option, i) => (
        <FormPill
            dark={dark}
            key={getOptionValue ? getOptionValue(option) : i}
            marginRight="xs"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveIconClick(option);
            }}
            tabIndex={0}
            text={showPillIndex ? `${i + 1}. ${option.label}` : option.label}
            {...formPillProps}
        />
      ))}
    </Flex>
  );
};

export default MultiSelectTriggerDisplay;
