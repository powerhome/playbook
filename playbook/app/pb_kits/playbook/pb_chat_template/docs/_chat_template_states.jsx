import React from 'react'

import Body from '../../pb_body/_body'
import ChatTemplate from '../_chat_template'
import Flex from '../../pb_flex/_flex'
import Icon from '../../pb_icon/_icon'

const PROMPT = [{ id: 'user-1', role: 'user', content: 'What is the weather like at HQ?' }]

const ChatTemplateStates = (props) => (
  <Flex
      gap="md"
      wrap
  >
    <ChatTemplate
        emptyState={
          <>
            <Icon
                color="primary"
                icon="nitro-intelligence"
                size="2x"
            />
            <Body
                color="light"
                marginTop="xs"
                text="Ask about compensation, projects, or schedules."
            />
          </>
        }
        height="360px"
        onSubmit={() => {}}
        title="Empty"
        width="xxs"
        {...props}
    />
    <ChatTemplate
        height="360px"
        loading
        messages={PROMPT}
        onSubmit={() => {}}
        title="Loading"
        width="xxs"
        {...props}
    />
    <ChatTemplate
        error="Something went wrong. Please try again."
        height="360px"
        messages={PROMPT}
        onSubmit={() => {}}
        title="Error"
        width="xxs"
        {...props}
    />
  </Flex>
)

export default ChatTemplateStates
