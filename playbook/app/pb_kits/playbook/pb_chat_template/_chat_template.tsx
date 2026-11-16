import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps, globalInlineProps } from '../utilities/globalProps'

import useFloatingWindow, { RESIZE_DIRECTIONS } from './useFloatingWindow'

import Body from '../pb_body/_body'
import Button from '../pb_button/_button'
import Icon from '../pb_icon/_icon'
import LoadingInline from '../pb_loading_inline/_loading_inline'
import TextInput from '../pb_text_input/_text_input'
import Title from '../pb_title/_title'

export type ChatTemplateMessage = {
  content?: React.ReactNode,
  id: string | number,
  role: 'agent' | 'user',
  type?: string,
  [key: string]: unknown,
}

type ChatTemplateProps = {
  aria?: { [key: string]: string },
  className?: string,
  context?: React.ReactNode,
  dark?: boolean,
  data?: { [key: string]: string },
  defaultHeight?: number,
  defaultWidth?: number,
  emptyState?: React.ReactNode,
  error?: string,
  floating?: boolean,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  icon?: string,
  id?: string,
  loading?: boolean,
  loadingText?: string,
  messages?: ChatTemplateMessage[],
  onClear?: () => void,
  onClose?: () => void,
  onSubmit?: (prompt: string) => void,
  placeholder?: string,
  renderContent?: (message: ChatTemplateMessage) => React.ReactNode | undefined,
  title?: string,
} & GlobalProps

const ChatTemplate = (props: ChatTemplateProps): React.ReactElement => {
  const {
    aria = {},
    className,
    context,
    dark = false,
    data = {},
    defaultHeight = 560,
    defaultWidth = 400,
    emptyState = 'Ask a question to get started.',
    error,
    floating = false,
    htmlOptions = {},
    icon,
    id,
    loading = false,
    loadingText = ' Thinking',
    messages = [],
    onClear,
    onClose,
    onSubmit,
    placeholder = 'Ask a question...',
    renderContent,
    title = 'Chat',
  } = props

  const [prompt, setPrompt] = useState('')
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleKeyboardMove, startDrag, startResize, windowRef } = useFloatingWindow({
    defaultHeight,
    defaultWidth,
    enabled: floating,
  })

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_chat_template_kit'),
    { 'chat-template-floating': floating },
    globalProps(props),
    className
  )

  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [messages.length, loading, error])

  useEffect(() => {
    if (floating) inputRef.current?.focus()
  }, [floating])

  const trimmedPrompt = prompt.trim()
  const canSubmit = trimmedPrompt.length > 0 && !loading
  const isEmpty = messages.length === 0 && !loading && !error

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit?.(trimmedPrompt)
    setPrompt('')
  }

  const handleWindowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (floating && onClose && event.key === 'Escape') onClose()
  }

  const renderMessageContent = (message: ChatTemplateMessage) => {
    const customContent = renderContent?.(message)
    if (customContent !== undefined) return customContent
    if (typeof message.content === 'string') {
      return (
        <Body
            dark={dark}
            text={message.content}
        />
      )
    }
    return message.content
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        aria-label={title}
        className={classes}
        id={id}
        onKeyDown={handleWindowKeyDown}
        ref={windowRef}
        role={floating ? 'dialog' : 'region'}
        style={globalInlineProps(props)}
    >
      <div
          aria-label={floating ? `${title}. Use arrow keys to move or Shift plus arrow keys to resize.` : undefined}
          className="chat-template-header"
          onKeyDown={floating ? handleKeyboardMove : undefined}
          onPointerDown={floating ? startDrag : undefined}
          role={floating ? 'group' : undefined}
          tabIndex={floating ? 0 : undefined}
      >
        <div className="chat-template-title">
          {icon && (
            <Icon
                color="primary"
                dark={dark}
                fixedWidth
                icon={icon}
            />
          )}
          <Title
              dark={dark}
              size={4}
              text={title}
          />
        </div>
        <div className="chat-template-actions">
          {onClear && messages.length > 0 && (
            <Button
                aria={{ label: 'New chat' }}
                dark={dark}
                icon="comment-plus"
                onClick={onClear}
                size="sm"
                variant="link"
            />
          )}
          {onClose && (
            <Button
                aria={{ label: 'Close chat' }}
                dark={dark}
                icon="times"
                onClick={onClose}
                size="sm"
                variant="link"
            />
          )}
        </div>
      </div>

      {context && <div className="chat-template-context">{context}</div>}

      <div
          aria-label="Conversation"
          aria-live="polite"
          className="chat-template-thread"
          ref={threadRef}
          role="log"
          tabIndex={0}
      >
        {isEmpty && (
          <div className="chat-template-empty">
            {typeof emptyState === 'string' ? (
              <Body
                  color="light"
                  dark={dark}
                  text={emptyState}
              />
            ) : emptyState}
          </div>
        )}
        {messages.map((message) => (
          <div
              className={`chat-template-message chat-template-message-${message.role}`}
              key={message.id}
          >
            <div className="chat-template-bubble">
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-template-message chat-template-message-agent">
            <div className="chat-template-bubble">
              <LoadingInline
                  dark={dark}
                  text={loadingText}
              />
            </div>
          </div>
        )}
        {error && (
          <div
              className="chat-template-message chat-template-message-agent"
              role="alert"
          >
            <div className="chat-template-bubble chat-template-bubble-error">
              <Body
                  dark={dark}
                  status="negative"
                  text={error}
              />
            </div>
          </div>
        )}
      </div>

      <form
          className="chat-template-form"
          onSubmit={handleSubmit}
      >
        <TextInput
            dark={dark}
            marginBottom="none"
        >
          <input
              aria-label={placeholder}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={placeholder}
              ref={inputRef}
              type="text"
              value={prompt}
          />
        </TextInput>
        <Button
            aria={{ label: 'Send message' }}
            dark={dark}
            disabled={!canSubmit}
            htmlType="submit"
            icon="paper-plane"
        />
      </form>

      {floating && RESIZE_DIRECTIONS.map((direction) => (
        <div
            aria-hidden="true"
            className={`chat-template-resize-handle chat-template-resize-${direction}`}
            key={direction}
            onPointerDown={startResize(direction)}
        />
      ))}
    </div>
  )
}

export default ChatTemplate
