import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import Caption from '../../pb_caption/_caption'
import ChatTemplate from '../_chat_template'
import Flex from '../../pb_flex/_flex'
import Pill from '../../pb_pill/_pill'

const ChatTemplateFloating = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const handleSubmit = (prompt) => {
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: prompt },
      { id: `agent-${Date.now()}`, role: 'agent', content: 'Drag the header to move this window, or drag any edge or corner to resize it.' },
    ])
  }

  return (
    <>
      <Button
          icon="nitro-intelligence"
          onClick={() => setIsOpen(true)}
          text="Open Chat"
      />
      {isOpen && (
        <ChatTemplate
            context={
              <Flex
                  align="center"
                  gap="xs"
              >
                <Caption text="Asking about" />
                <Pill
                    text="Project #10482"
                    variant="primary"
                />
              </Flex>
            }
            floating
            icon="nitro-intelligence"
            messages={messages}
            onClear={() => setMessages([])}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            title="Nitro Intelligence Chat"
            {...props}
        />
      )}
    </>
  )
}

export default ChatTemplateFloating
