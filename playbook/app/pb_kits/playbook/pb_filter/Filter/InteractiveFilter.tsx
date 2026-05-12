import React, { useEffect, useMemo, useRef, useState } from 'react'
import flatpickr from 'flatpickr'
import { Instance } from 'flatpickr/dist/types/instance'

import Caption from '../../pb_caption/_caption'
import Icon from '../../pb_icon/_icon'
import PbReactPopover from '../../pb_popover/_popover'
import Title from '../../pb_title/_title'
import { uniqueId } from '../../utilities/object'

export type SelectInteractiveConfig = {
  type: 'select',
  options: { value: string, text?: string }[],
  value?: string,
  onChange: (value: string) => void,
}

export type DropdownInteractiveConfig = {
  type: 'dropdown',
  options: { value: string, label: string }[],
  value?: string,
  onChange: (value: string) => void,
}

export type DatePickerInteractiveConfig = {
  type: 'date-picker',
  value?: string,
  onChange: (value: string) => void,
  format?: string,
  minDate?: string,
  maxDate?: string,
  mode?: 'single' | 'range' | 'multiple',
}

export type InteractiveFilterConfig =
  | SelectInteractiveConfig
  | DropdownInteractiveConfig
  | DatePickerInteractiveConfig

type InteractiveFilterProps = {
  dark?: boolean,
  name: string,
  value: string,
  config: InteractiveFilterConfig,
}

const labelFor = (
  config: InteractiveFilterConfig,
  value: string
): string => {
  if (config.type === 'select') {
    const match = config.options.find((opt) => opt.value === value)
    if (match) return match.text || match.value
  }
  if (config.type === 'dropdown') {
    const match = config.options.find((opt) => opt.value === value)
    if (match) return match.label || match.value
  }
  return value
}

type ChipVisualProps = {
  dark: boolean,
  name: string,
  displayValue: string,
}

const ChipVisual = ({
  dark,
  name,
  displayValue,
}: ChipVisualProps): React.ReactElement => (
  <div className="pb_interactive_filter_text">
    <Caption
        dark={dark}
        text={name}
    />
    <div className="pb_interactive_filter_value">
      <Title
          dark={dark}
          size={4}
          tag="h4"
          text={displayValue || '—'}
      />
      <Icon
          className="pb_interactive_filter_caret"
          fixedWidth
          icon="angle-down"
          size="xs"
      />
    </div>
  </div>
)

type InlineCalendarProps = {
  config: DatePickerInteractiveConfig,
  onSinglePick: () => void,
}

const InlineCalendar = ({
  config,
  onSinglePick,
}: InlineCalendarProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const fp = flatpickr(containerRef.current, {
      inline: true,
      defaultDate: config.value || undefined,
      mode: config.mode || 'single',
      dateFormat: config.format || 'm/d/Y',
      minDate: config.minDate,
      maxDate: config.maxDate,
      nextArrow: '<i class="far fa-angle-right"></i>',
      prevArrow: '<i class="far fa-angle-left"></i>',
      onChange: (_selectedDates, dateStr) => {
        config.onChange(dateStr)
        if ((config.mode || 'single') === 'single') onSinglePick()
      },
    }) as Instance
    return () => fp.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} />
}

const InteractiveFilter = ({
  dark = false,
  name,
  value,
  config,
}: InteractiveFilterProps): React.ReactElement => {
  const [open, setOpen] = useState(false)
  const pickerId = useMemo(() => uniqueId('interactive-filter-date-'), [])
  const displayValue = labelFor(config, value)

  const renderEditor = () => {
    switch (config.type) {
      case 'select':
      case 'dropdown': {
        const options =
          config.type === 'dropdown'
            ? config.options.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))
            : config.options.map((opt) => ({
                value: opt.value,
                label: opt.text || opt.value,
              }))
        return (
          <ul
              className="pb_interactive_filter_options"
              role="listbox"
          >
            {options.map((option) => {
              const isActive = option.value === value
              return (
                <li
                    aria-selected={isActive}
                    className={`pb_interactive_filter_option${
                      isActive ? ' active' : ''
                    }`}
                    key={option.value}
                    onClick={() => {
                      config.onChange(option.value)
                      setOpen(false)
                    }}
                    role="option"
                >
                  <span>{option.label}</span>
                  {isActive && (
                    <Icon
                        fixedWidth
                        icon="check"
                        size="xs"
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )
      }

      case 'date-picker':
        return (
          <InlineCalendar
              config={config}
              onSinglePick={() => setOpen(false)}
          />
        )
    }
  }

  const trigger = (
    <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`pb_interactive_filter_trigger${dark ? ' dark' : ''}`}
        data-picker-id={pickerId}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
    >
      <ChipVisual
          dark={dark}
          displayValue={displayValue}
          name={name}
      />
    </button>
  )

  return (
    <PbReactPopover
        closeOnClick="outside"
        offset
        placement="bottom-start"
        reference={trigger}
        shouldClosePopover={() => setOpen(false)}
        show={open}
        zIndex={10}
    >
      <div
          className={`pb_interactive_filter_editor pb_interactive_filter_editor--${config.type}`}
      >
        {renderEditor()}
      </div>
    </PbReactPopover>
  )
}

export default InteractiveFilter
