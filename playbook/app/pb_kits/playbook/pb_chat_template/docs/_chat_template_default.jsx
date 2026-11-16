import React, { useState } from 'react'

import ChatTemplate from '../_chat_template'

const INITIAL_MESSAGES = [
  { id: 'user-1', role: 'user', content: 'Can you summarize the Kitchen Remodel project?' },
  { id: 'agent-1', role: 'agent', content: 'Sure! The Kitchen Remodel project is 70% complete, on budget, and scheduled to finish next Friday.' },
]

const ChatTemplateDefault = (props) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (prompt) => {
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: 'user', content: prompt }])
    setLoading(true)

    // Replace with a call to your agent.
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `agent-${Date.now()}`, role: 'agent', content: `Here is what I found about "${prompt}".` },
      ])
      setLoading(false)
    }, 1200)
  }

  return (
    <ChatTemplate
        height="480px"
        icon="nitro-intelligence"
        loading={loading}
        maxWidth="sm"
        messages={messages}
        onClear={() => setMessages([])}
        onSubmit={handleSubmit}
        title="Nitro Intelligence Chat"
        {...props}
    />
  )
}

export default ChatTemplateDefault
