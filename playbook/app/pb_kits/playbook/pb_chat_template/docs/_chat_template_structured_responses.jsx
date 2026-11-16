import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Caption from '../../pb_caption/_caption'
import ChatTemplate from '../_chat_template'
import Flex from '../../pb_flex/_flex'
import Pill from '../../pb_pill/_pill'
import Table from '../../pb_table/_table'
import Title from '../../pb_title/_title'

const STATUS_VARIANTS = {
  'Above Target': 'success',
  'On Target': 'primary',
  'Below Target': 'warning',
}

const renderTableResponse = ({ columns, intro, rows }) => (
  <>
    <Body
        marginBottom="xs"
        text={intro}
    />
    <Table
        disableHover
        responsive="none"
        size="sm"
    >
      <Table.Head>
        <Table.Row>
          {columns.map((column) => <Table.Header key={column}>{column}</Table.Header>)}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.territory}</Table.Cell>
            <Table.Cell>{row.basePay}</Table.Cell>
            <Table.Cell>{row.bonus}</Table.Cell>
            <Table.Cell>
              <Pill
                  text={row.status}
                  variant={STATUS_VARIANTS[row.status]}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </>
)

const renderSummaryResponse = ({ details, heading }) => (
  <>
    <Title
        marginBottom="xs"
        size={4}
        text={heading}
    />
    {details.map(({ label, value }) => (
      <Flex
          gap="md"
          justify="between"
          key={label}
      >
        <Caption text={label} />
        <Body text={value} />
      </Flex>
    ))}
  </>
)

// Each key is a response pattern your agent can choose by returning { type, ...data }.
const RESPONSE_PATTERNS = {
  summary: renderSummaryResponse,
  table: renderTableResponse,
}

const renderContent = (message) => RESPONSE_PATTERNS[message.type]?.(message)

const COMPENSATION_RESPONSE = {
  type: 'table',
  intro: 'Here is Q3 compensation for the Mid-Atlantic team:',
  columns: ['Name', 'Territory', 'Base Pay', 'Bonus', 'Status'],
  rows: [
    { name: 'Maya Chen', territory: 'Philadelphia', basePay: '$82,000', bonus: '$9,400', status: 'Above Target' },
    { name: 'Andre Lewis', territory: 'Baltimore', basePay: '$78,500', bonus: '$6,100', status: 'On Target' },
    { name: 'Priya Patel', territory: 'Wilmington', basePay: '$74,000', bonus: '$3,250', status: 'Below Target' },
  ],
}

const PROJECT_RESPONSE = {
  type: 'summary',
  heading: 'Kitchen Remodel #10482',
  details: [
    { label: 'Status', value: 'In Progress' },
    { label: 'Completion', value: '70%' },
    { label: 'Budget Used', value: '$18,240 of $26,000' },
    { label: 'Estimated Finish', value: 'Friday' },
  ],
}

const INITIAL_MESSAGES = [
  { id: 'user-1', role: 'user', content: 'Show Q3 compensation for my team.' },
  { id: 'agent-1', role: 'agent', ...COMPENSATION_RESPONSE },
]

// Stands in for an agent that picks a response pattern based on the question.
const getMockAgentResponse = (prompt) => {
  if (/comp|pay|bonus/i.test(prompt)) return COMPENSATION_RESPONSE
  if (/project|summary|status/i.test(prompt)) return PROJECT_RESPONSE
  return { content: 'Try asking for "compensation" for a table, or a "project summary" for a summary.' }
}

const ChatTemplateStructuredResponses = (props) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  const handleSubmit = (prompt) => {
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: prompt },
      { id: `agent-${Date.now()}`, role: 'agent', ...getMockAgentResponse(prompt) },
    ])
  }

  return (
    <ChatTemplate
        height="560px"
        icon="nitro-intelligence"
        maxWidth="md"
        messages={messages}
        onClear={() => setMessages([])}
        onSubmit={handleSubmit}
        placeholder='Try "project summary"...'
        renderContent={renderContent}
        title="Nitro Intelligence Chat"
        {...props}
    />
  )
}

export default ChatTemplateStructuredResponses
