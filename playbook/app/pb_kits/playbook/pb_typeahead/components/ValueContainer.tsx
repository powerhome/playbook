import React, { useCallback, useMemo, useRef } from 'react'
import { components } from 'react-select'

import Body from '../../pb_body/_body'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableContext, DraggableProvider } from '../../pb_draggable/context'
import { SelectValueType } from '../_typeahead'
import PillRenderer from './PillRenderer'

type ValueContainerProps = {
  children: React.ReactNode | React.ReactNode[]
  getValue: () => SelectValueType[]
  hasValue?: boolean
  selectProps?: Record<string, unknown>
  setValue: (value: SelectValueType[], action: string) => void
}

const isPillReorderActive = (selectProps: Record<string, unknown> | undefined): boolean => {
  return Boolean(
    selectProps?.enablePillReorder
    && selectProps?.isMulti
    && selectProps?.inputDisplay === 'pills'
  )
}

const mapDraggableItemsToValue = (
  items: Array<{ id: string }>,
  value: SelectValueType[],
): SelectValueType[] => {
  return items
    .map((item) => value.find((entry) => entry.value === item.id))
    .filter((entry): entry is SelectValueType => Boolean(entry))
}

type DraggablePillListProps = {
  onRemove: (item: SelectValueType) => void
  selectProps: Record<string, unknown>
  setValue: (value: SelectValueType[], action: string) => void
  value: SelectValueType[]
}

const isDragHandleTarget = (target: EventTarget | null): boolean => {
  return Boolean(
    (target as HTMLElement | null)?.closest(
      '.pb_typeahead_pill_drag_handle, .pb_draggable_handle',
    ),
  )
}

const DraggablePillList = ({
  onRemove,
  selectProps,
  setValue,
  value,
}: DraggablePillListProps) => {
  const { items, isDragging } = DraggableContext()
  const orderedValues = isDragging
    ? mapDraggableItemsToValue(items, value)
    : value

  const handleKeyboardReorder = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= orderedValues.length) return

    const reordered = [...orderedValues]
    const [movedItem] = reordered.splice(index, 1)
    reordered.splice(newIndex, 0, movedItem)
    setValue(reordered, 'set-value')
  }

  return (
    <Draggable.Container
        className="pb_typeahead_draggable_pills"
        container="typeahead-pills"
        tag="div"
    >
      {orderedValues.map((item, index) => (
        <Draggable.Item
            container="typeahead-pills"
            dragId={item.value}
            key={item.value}
            tag="span"
        >
          <PillRenderer
              dark={(selectProps as any)?.dark}
              data={item}
              index={index}
              multiKit={(selectProps as any)?.multiKit}
              onKeyboardReorder={(direction) => handleKeyboardReorder(index, direction)}
              onRemove={() => onRemove(item)}
              pillColor={(selectProps as any)?.pillColor}
              pillDragHandle={(selectProps as any)?.pillDragHandle}
              selectProps={selectProps}
              showPillIndex={(selectProps as any)?.showPillIndex}
              totalCount={orderedValues.length}
              truncate={(selectProps as any)?.truncate}
              wrapped={(selectProps as any)?.wrapped}
          />
        </Draggable.Item>
      ))}
    </Draggable.Container>
  )
}

type DraggablePillsStripProps = {
  getValue: () => SelectValueType[]
  onRemove: (item: SelectValueType) => void
  selectProps: Record<string, unknown>
  setValue: (value: SelectValueType[], action: string) => void
  value: SelectValueType[]
}

const buildValueOrderKey = (value: SelectValueType[]): string => (
  value.map((item) => item.value).join('|')
)

const DraggablePillsStrip = React.memo(function DraggablePillsStrip({
  getValue,
  onRemove,
  selectProps,
  setValue,
  value,
}: DraggablePillsStripProps) {
  const pendingReorderRef = useRef<SelectValueType[] | null>(null)
  const getValueRef = useRef(getValue)
  getValueRef.current = getValue

  const initialItems = useMemo(
    () => value.map((item) => ({
      id: item.value,
      container: 'typeahead-pills',
      label: item.label,
      name: item.name,
      imageUrl: item.imageUrl,
      pillColor: item.pillColor,
      value: item.value,
    })),
    [value],
  )

  const commitReorder = useCallback(() => {
    if (!pendingReorderRef.current) return

    const currentValue = getValueRef.current()
    const currentOrder = currentValue.map((item) => item.value).join(',')
    const newOrder = pendingReorderRef.current.map((item) => item.value).join(',')

    if (currentOrder !== newOrder) {
      setValue(pendingReorderRef.current, 'set-value')
    }

    pendingReorderRef.current = null
  }, [setValue])

  const handleReorder = useCallback((items: Array<{ id: string }>) => {
    pendingReorderRef.current = mapDraggableItemsToValue(items, getValueRef.current())
  }, [])

  return (
    <DraggableProvider
        dropZone={{ type: 'ghost' }}
        initialItems={initialItems}
        onDragEnd={commitReorder}
        onDrop={commitReorder}
        onReorder={handleReorder}
    >
      <DraggablePillList
          onRemove={onRemove}
          selectProps={selectProps}
          setValue={setValue}
          value={value}
      />
    </DraggableProvider>
  )
}, (prevProps, nextProps) => (
  buildValueOrderKey(prevProps.value) === buildValueOrderKey(nextProps.value)
))

const ValueContainer = (props: ValueContainerProps | any): React.ReactElement => {
  const { children, selectProps, hasValue, getValue, setValue, innerProps } = props
  const inputDisplay = (selectProps as any)?.inputDisplay
  const value = getValue() as SelectValueType[]

  const handleRemove = useCallback((itemToRemove: SelectValueType) => {
    const currentValue = getValue() as SelectValueType[]
    const newValue = currentValue.filter((item) => item.value !== itemToRemove.value)
    setValue(newValue, 'remove-value')
  }, [getValue, setValue])

  const valueContainerInnerProps = useMemo(() => ({
    ...innerProps,
    // Bubble phase only — capture-phase stopPropagation blocks mousedown from
    // reaching the grip handle and its drag listeners.
    onMouseDown: (event: React.MouseEvent) => {
      if (isDragHandleTarget(event.target)) {
        event.stopPropagation()
        return
      }
      innerProps?.onMouseDown?.(event)
    },
  }), [innerProps])

  if (isPillReorderActive(selectProps) && hasValue) {
    return (
      <components.ValueContainer
          className="text_input_value_container pb_typeahead_draggable_value_container"
          {...props}
          innerProps={valueContainerInnerProps}
      >
        {value?.length ? (
          <DraggablePillsStrip
              getValue={getValue}
              onRemove={handleRemove}
              selectProps={selectProps as Record<string, unknown>}
              setValue={setValue}
              value={value}
          />
        ) : null}
        {children}
      </components.ValueContainer>
    )
  }

  if (inputDisplay === 'none' && hasValue && value) {
    const selectedCount = Array.isArray(value) ? value.length : 0

    return (
      <components.ValueContainer
          className="text_input_value_container"
          {...props}
      >
        <Body
            className="pb_typeahead_selection_count"
            text={`${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`}
        />
        {children}
      </components.ValueContainer>
    )
  }

  return (
    <components.ValueContainer
        className="text_input_value_container"
        {...props}
    />
  )
}

export default ValueContainer
