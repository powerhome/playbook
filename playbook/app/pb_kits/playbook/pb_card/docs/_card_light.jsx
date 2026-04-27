import React from 'react'

import Background from '../../pb_background/_background'
import Card from '../_card'
import Title from '../../pb_title/_title'
import Flex from '../../pb_flex/_flex'
import Button from '../../pb_button/_button'
import Table from '../../pb_table/_table'
import Dropdown from '../../pb_dropdown/_dropdown'
import Typeahead from '../../pb_typeahead/_typeahead'
import DatePicker from '../../pb_date_picker/_date_picker'
import Body from '../../pb_body/_body'
import Caption from '../../pb_caption/_caption'
import Icon from '../../pb_icon/_icon'

const dropdownOptions = [
  { label: 'United States', value: 'us', id: 'us' },
  { label: 'Canada', value: 'ca', id: 'ca' },
]

const typeaheadOptions = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Blue', value: '#0000FF' },
]

const CardLight = (props) => (
  <Flex margin="md" 
      orientation="column"
      {...props}
  >
    <Title marginBottom="sm" 
        size={4}
        text="Border global prop — Cards"
    />
    <Flex gap="md" 
        marginBottom="xl"
        orientation="column"
    >
      <Caption marginBottom="xs"
          text="border: default (full)"
      />
      <Card border="default">{"Full default border"}</Card>
      <Caption marginBottom="xs"
          text="border: none"
      />
      <Card border="none">{"border none"}</Card>

      <Caption marginBottom="xs"
          text="border_top + border_x (all default)"
      />
      <Card borderTop="default"
          borderX="default"
          padding="md"
      >
        {"Top + left/right default borders"}
      </Card>
    </Flex>

    <Title marginBottom="sm"
        size={4}
        text="border + borderRadius on Flex & Caption (no card chrome)"
    />
    <Caption
        marginBottom="xs"
        text="Flex with border default + borderRadius lg — outline follows radius"
    />
    <Flex border="default"
        borderRadius="lg"
        gap="sm"
        orientation="column"
        padding="md"
    >
      <Body text="Plain flex box; border utilities stack with border_radius." />
    </Flex>

    <Caption marginBottom="xs"
        marginTop="md"
        text="Caption inside a rounded flex wrapper"
    />
    <Flex border="default" 
        borderRadius="rounded"
        padding="sm"
    >
      <Caption text="Caption text inside rounded border" />
    </Flex>

    <Title marginBottom="sm"
        marginTop="xl"
        size={4}
        text="Other kits (light)"
    />
    <Flex gap="lg"
        orientation="column"
    >
      <Caption marginBottom="xs"
          text="Button (compound .pb_button_kit.border_* restores visible stroke)"
      />
      <Background backgroundColor="neutral_subtle"
          borderRadius="md"
          padding="md"
      >
        <Flex align="center"
            gap="sm"
            wrap
        >
          <Button border="default" 
              paddingX="sm" 
              text="primary + border" 
          />
          <Button border="default" 
              paddingX="sm" 
              text="secondary + border" 
              variant="secondary" 
          />
          <Button borderTop="default" 
              text="border_top only" 
              variant="secondary" 
          />
        </Flex>
      </Background>

      <Caption marginBottom="xs"
          text="Flex container"
      />
      <Flex border="default"
          gap="sm"
          padding="sm"
      >
        <Body text="Item A" />
        <Body text="Item B" />
      </Flex>

      <Caption marginBottom="xs"
          text="Table (2×2, border on wrapper)"
      />
      <Background backgroundColor="neutral_subtle"
          borderRadius="md"
          padding="sm"
      />

      <Caption marginBottom="xs" 
          text="Dropdown"
      />
      <Dropdown border="default"
          options={dropdownOptions}
      />

      <Caption marginBottom="xs"
          text="Typeahead"
      />
      <Typeahead
          border="default"
          id="card-light-typeahead-react"
          label="Color"
          name="card_light_ta_react"
          options={typeaheadOptions}
          placeholder="Pick"
      />

      <Caption marginBottom="xs"
          text="Date picker"
      />
      <DatePicker
          border="default"
          label="Date"
          name="card_light_date_react"
          pickerId="card-light-dp-react"
      />

      <Caption marginBottom="xs"
          text="Body"
      />
      <Background backgroundColor="neutral_subtle"
          borderRadius="sm"
          padding="sm"
      >
        <Body border="default"
            padding="sm"
            text="Body with border default"
        />
      </Background>

      <Caption marginBottom="xs"
          text="Caption"
      />
      <Caption borderX="default"
          paddingX="sm"
          text="Caption + border_x default"
      />

      <Caption marginBottom="xs"
          text="Icon"
      />
      <Background backgroundColor="neutral_subtle"
          borderRadius="sm" 
          padding="sm"
      >
        <Icon border="default"
            fixedWidth
            icon="user"
            padding="xs"
        />
      </Background>
    </Flex>

    <Title marginBottom="sm"
        marginTop="xl"
        size={4}
        text="Dark surface (nested .dark)"
    />
    <div className="dark"
        style={{ padding: 24, borderRadius: 8, background: '#0a0f1a' }}
    >
      <Flex gap="lg"
          orientation="column"
      >
        <Caption color="light"
            marginBottom="xs"
            text="Card"
        />
        <Card border="default" 
            dark
        >
          {"Dark card + border default"}
        </Card>

        <Caption color="light"
            marginBottom="xs"
            text="Buttons"
        />
        <Flex align="center" 
            gap="sm"
            wrap
        >
          <Button border="default"
              dark
              paddingX="sm"
              text="primary + border"
          />
          <Button border="default"
              dark
              paddingX="sm"
              text="secondary + border"
              variant="secondary"
          />
          <Button borderTop="default"
              dark
              text="border_top"
              variant="secondary"
          />
        </Flex>

        <Caption color="light"
            marginBottom="xs"
            text="Flex + border_radius"
        />
        <Flex border="default"
            borderRadius="lg"
            dark
            gap="xs"
            orientation="column"
            padding="md"
        >
          <Body dark
              text="Dark flex with border + radius"
          />
        </Flex>

        <Caption color="light"
            marginBottom="xs"
            text="Body"
        />
        <Body border="default"
            dark
            padding="sm"
            text="Body with border on dark"
        />

        <Caption color="light"
            marginBottom="xs"
            text="Caption"
        />
        <Caption borderX="default"
            color="light"
            dark
            paddingX="sm"
            text="Caption + border_x"
        />

        <Caption color="light"
            marginBottom="xs"
            text="Icon"
        />
        <Icon border="default"
            dark
            fixedWidth
            icon="user"
            padding="xs"
        />

        <Caption color="light"
            marginBottom="xs"
            text="Table"
        />
        <Table border="default"
            dark
            responsive="none"
            size="sm"
        >
          <Table.Head>
            <Table.Row>
              <Table.Header>{'A'}</Table.Header>
              <Table.Header>{'B'}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{'1'}</Table.Cell>
              <Table.Cell>{'2'}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Caption color="light"
            marginBottom="xs"
            text="Dropdown"
        />
        <Dropdown border="default"
            dark
            options={dropdownOptions}
        />

        <Caption color="light"
            marginBottom="xs"
            text="Typeahead"
        />
        <Typeahead
            border="default"
            dark
            id="card-light-typeahead-dark-react"
            label="Color"
            name="card_light_ta_dark_react"
            options={typeaheadOptions}
            placeholder="Pick"
        />

        <Caption color="light"
            marginBottom="xs"
            text="Date picker"
        />
        <DatePicker
            border="default"
            dark
            label="Date"
            name="card_light_date_dark_react"
            pickerId="card-light-dp-dark-react"
        />
      </Flex>
    </div>
  </Flex>
)

export default CardLight
