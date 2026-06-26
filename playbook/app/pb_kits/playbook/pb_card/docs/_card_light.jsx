import React from "react"
import Background from '../../pb_background/_background'
import Card from '../_card'
import Title from '../../pb_title/_title'
import Flex from '../../pb_flex/_flex'
import Button from '../../pb_button/_button'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Dropdown from '../../pb_dropdown/_dropdown'
import Typeahead from '../../pb_typeahead/_typeahead'
import DatePicker from '../../pb_date_picker/_date_picker'
import Icon from '../../pb_icon/_icon'

const dropdownOptions = [
{ label: "Option 1", value: "1", key: "1" },
{ label: "Option 2", value: "2", key: "2" },
{ label: "Option 3", value: "3", key: "3" },
]

const typeaheadOptions = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Blue', value: '#0000FF' },
]

const CardLight = () => {
  return (
    <> 
      <Title marginBottom="md"
          size={3}
          text="Border Utilities"
      />

      <Title marginBottom="sm"
          size={4}
          text="Border Variants"
      />

      <Flex gap="md"
          wrap
      >
        <Card border="default"
            padding="sm"
        >
          {'default'}
        </Card>
        <Card border="active"
            padding="sm"
        >
          {'active'}
        </Card>
        <Card border="default_thick"
            padding="sm"
        >
          {'default_thick'}
        </Card>
        <Card border="active_thick"
            padding="sm"
        >
          {'active_thick'}
        </Card>
        <Card border="default_thicker"
            padding="sm"
        >
          {'default_thicker'}
        </Card>
        <Card border="active_thicker"
            padding="sm"
        >
          {'active_thicker'}
        </Card>
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Border Width Comparison"
      />

      <Flex gap="md"
          wrap
      >
        <Card border="default"
            padding="sm"
        >
          {'1px'}
        </Card>
        <Card border="default_thick"
            padding="sm"
        >
          {'2px'}
        </Card>
        <Card border="default_thicker"
            padding="sm"
        >
          {'4px'}
        </Card>
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Directional Borders"
      />

      <Flex gap="md"
          wrap
      >
        <Card borderTop="active"
            padding="sm"
        >
          {'Top'}
        </Card>
        <Card borderBottom="active"
            padding="sm"
        >
          {'Bottom'}
        </Card>
        <Card borderLeft="active"
            padding="sm"
        >
          {'Left'}
        </Card>
        <Card borderRight="active"
            padding="sm"
        >
          {'Right'}
          </Card>
        <Card borderX="active_thick"
            padding="sm"
        >
          {'X Axis'}
        </Card>
        <Card borderY="active_thicker"
            padding="sm"
        >
          {'Y Axis'}
        </Card>
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Border + Radius"
      />

      <Flex gap="md"
          wrap
      >
        <Card border="default"
            borderRadius="none"
            padding="md"
        >
          {'radius="none"'}
        </Card>

        <Flex border="active"
            borderRadius="md"
            padding="md"
        >
          {'radius="md"'}
        </Flex>

        <Flex border="default_thick"
            borderRadius="lg"
            padding="md"
        >
          {'radius="lg"'}
        </Flex>

        <Flex border="active_thicker"
            borderRadius="rounded"
            padding="md"
        >
          {'radius="rounded"'}
        </Flex>
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Buttons & Icons"
      />

      <Flex gap="md"
          wrap
      >
        <Button
            border="default"
            text="Default"
            variant="secondary"
        />

        <Button
            border="active"
            text="Active"
            variant="secondary"
        />

        <Button
            border="default_thick"
            text="Thick"
            variant="secondary"
        />

        <Button
            border="active_thicker"
            text="Thicker"
            variant="secondary"
        />

        <CircleIconButton
            border="active_thick"
            icon="star"
            variant="secondary"
        />

        <Icon
            border="default"
            icon="user"
        />
        <Icon
            border="active"
            icon="user"
        />
        <Icon
            border="default_thick"
            icon="user"
        />
        <Icon
            border="active_thick"
            icon="user"
        />
        <Icon
            border="default_thicker"
            icon="user"
        />
        <Icon
            border="active_thicker"
            icon="user"
        />
        <Icon
            border        
            icon="rocket"
        />
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Form Components"
      />

      <Flex gap="lg"
          wrap
      >
        <Dropdown
            border="default"
            label="Dropdown"
            options={dropdownOptions}
        />

        <Typeahead
            border="active"
            label="Typeahead"
            options={typeaheadOptions}
        />

        <DatePicker
            border="active_thick"
            label="Date Picker"
            pickerId="card-light-dp"
        />
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Containers"
      />

      <Flex gap="md"
          wrap
      >
        <Background
            backgroundColor="neutral_subtle"
            border="default"
            borderRadius="md"
            padding="md"
        >
          {'Default Border'}
        </Background>

        <Background
            backgroundColor="neutral_subtle"
            border="active_thick"
            borderRadius="lg"
            padding="md"
        >
          {'Active Thick Border'}
        </Background>
      </Flex>

      <Title
          marginBottom="sm"
          marginTop="md"
          size={4}
          text="Dark Mode"
      />

      <Background
          backgroundColor="dark"
          className="dark"
          padding="lg"
      >
        <Flex gap="md">
          <Card border="default"
              dark
              padding="sm"
          >
            {'default'}
          </Card>

          <Card border="active"
              dark
              padding="sm"
          >
            {'active'}
          </Card>

          <Flex
              border="default_thicker"
              borderRadius="lg"
              padding="md"
          >
            {'default_thicker + radius'}
          </Flex>

          <Button
              border="active_thick"
              text="Button"
              variant="secondary"
          />
        </Flex>
      </Background>
    </>
  )
}

export default CardLight
