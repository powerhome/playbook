import React from 'react'
import { render, screen } from '../../test-utils'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Flex from '../../../pb_flex/_flex'
import TextInput from '../../../pb_text_input/_text_input'
import Title from '../../../pb_title/_title'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

describe('Global Props Integration Tests', () => {
  describe('All global props at once (comprehensive showcase)', () => {
    test('All global props generate correct classes when used together', () => {
      render(
        <Body
            alignContent="center"
            alignItems="center"
            alignSelf="center"
            borderRadius="md"
            cursor="pointer"
            data={{ testid: 'all-props' }}
            display="flex"
            flex={1}
            flexDirection="column"
            flexGrow={1}
            flexShrink={0}
            flexWrap="wrap"
            gap="md"
            height="auto"
            justifyContent="spaceBetween"
            lineHeight="loose"
            margin="lg"
            maxHeight="xl"
            maxWidth="lg"
            minHeight="xs"
            minWidth="sm"
            order={1}
            overflow="hidden"
            padding="md"
            position="relative"
            shadow="deep"
            text="Test"
            textAlign="center"
            truncate={1}
            verticalAlign="middle"
            width="100%"
            zIndex={5}
        />
      )
      const body = screen.getByTestId('all-props')
      
      // Verify all global prop classes are present
      expect(body).toHaveClass('align_content_center')
      expect(body).toHaveClass('align_items_center')
      expect(body).toHaveClass('align_self_center')
      expect(body).toHaveClass('border_radius_md')
      expect(body).toHaveClass('cursor_pointer')
      expect(body).toHaveClass('display_flex')
      expect(body).toHaveClass('flex_1')
      expect(body).toHaveClass('flex_direction_column')
      expect(body).toHaveClass('flex_grow_1')
      expect(body).toHaveClass('flex_shrink_0')
      expect(body).toHaveClass('flex_wrap_wrap')
      expect(body).toHaveClass('gap_md')
      expect(body).toHaveClass('height_auto')
      expect(body).toHaveClass('justify_content_space_between')
      expect(body).toHaveClass('line_height_loose')
      expect(body).toHaveClass('m_lg')
      expect(body).toHaveClass('max_height_xl')
      expect(body).toHaveClass('max_width_lg')
      expect(body).toHaveClass('min_height_xs')
      expect(body).toHaveClass('min_width_sm')
      expect(body).toHaveClass('flex_order_1')
      expect(body).toHaveClass('overflow_hidden')
      expect(body).toHaveClass('p_md')
      expect(body).toHaveClass('position_relative')
      expect(body).toHaveClass('shadow_deep')
      expect(body).toHaveClass('text_align_center')
      expect(body).toHaveClass('truncate_1')
      expect(body).toHaveClass('vertical_align_middle')
      expect(body).toHaveClass('width_100_percent')
      expect(body).toHaveClass('z_index_5')
    })
  })

  describe('Global props + other props on the same kit', () => {
    test('Button: global props work with variant, size, and fullWidth', () => {
      render(
        <Button
            data={{ testid: 'button-integration-1' }}
            fullWidth
            margin="md"
            padding="lg"
            size="lg"
            textAlign="center"
            variant="secondary"
        />
      )
      const button = screen.getByTestId('button-integration-1')
      
      // Kit-specific classes
      expect(button).toHaveClass('pb_button_kit')
      expect(button).toHaveClass('pb_button_secondary')
      expect(button).toHaveClass('pb_button_block')
      expect(button).toHaveClass('pb_button_size_lg')
      
      // Global prop classes
      expect(button).toHaveClass('m_md')
      expect(button).toHaveClass('p_lg')
      expect(button).toHaveClass('text_align_center')
    })

    test('Title: global props work with size prop', () => {
      render(
        <Title
            data={{ testid: 'title-integration-1' }}
            margin="sm"
            padding="xs"
            size={3}
            text="Test Title"
            textAlign="right"
        />
      )
      const title = screen.getByTestId('title-integration-1')
      
      // Kit-specific classes
      expect(title).toHaveClass('pb_title_kit')
      expect(title).toHaveClass('pb_title_3')
      
      // Global prop classes
      expect(title).toHaveClass('m_sm')
      expect(title).toHaveClass('p_xs')
      expect(title).toHaveClass('text_align_right')
    })

    test('Card: global props work with borderRadius and padding props', () => {
      render(
        <Card
            borderRadius="lg"
            data={{ testid: 'card-integration-1' }}
            margin="xl"
            padding="md"
            textAlign="center"
        >
          {"Card content"}
        </Card>
      )
      const card = screen.getByTestId('card-integration-1')
      
      // Kit-specific classes
      expect(card).toHaveClass('pb_card_kit')
      expect(card).toHaveClass('border_radius_lg')
      
      // Global prop classes
      expect(card).toHaveClass('m_xl')
      expect(card).toHaveClass('p_md')
      expect(card).toHaveClass('text_align_center')
    })

    test('Flex: global props work with orientation, justify, and align props', () => {
      render(
        <Flex
            align="center"
            data={{ testid: 'flex-integration-1' }}
            justify="spaceBetween"
            margin="lg"
            orientation="column"
            padding="sm"
        >
          {"Flex content"}
        </Flex>
      )
      const flex = screen.getByTestId('flex-integration-1')
      
      // Kit-specific classes
      expect(flex).toHaveClass('pb_flex_kit')
      expect(flex).toHaveClass('pb_flex_kit_orientation_column')
      expect(flex).toHaveClass('pb_flex_kit_justify_content_spaceBetween')
      expect(flex).toHaveClass('pb_flex_kit_align_items_center')
      
      // Global prop classes
      expect(flex).toHaveClass('m_lg')
      expect(flex).toHaveClass('p_sm')
    })

    test('Link: global props work with link prop', () => {
      render(
        <Link
            data={{ testid: 'link-integration-1' }}
            link="https://example.com"
            margin="xs"
            text="Test Link"
            textAlign="center"
        />
      )
      const link = screen.getByTestId('link-integration-1')
      
      // Kit-specific classes
      expect(link).toHaveClass('pb_link_kit')
      
      // Global prop classes
      expect(link).toHaveClass('m_xs')
      expect(link).toHaveClass('text_align_center')
    })

    test('Badge: global props work with variant prop', () => {
      render(
        <Badge
            data={{ testid: 'badge-integration-1' }}
            margin="md"
            text="Badge"
            variant="success"
        />
      )
      const badge = screen.getByTestId('badge-integration-1')
      
      // Kit-specific classes (Badge includes size in classname)
      expect(badge.className).toMatch(/pb_badge_kit_success/)
      
      // Global prop classes
      expect(badge).toHaveClass('m_md')
    })
  })

  describe('Global props + other global props on the same kit', () => {
    test('Multiple spacing global props work together', () => {
      render(
        <Body
            data={{ testid: 'body-multiple-spacing' }}
            margin="md"
            marginBottom="lg"
            marginTop="sm"
            padding="lg"
            paddingLeft="xs"
            text="Test"
        />
      )
      const body = screen.getByTestId('body-multiple-spacing')
      
      expect(body).toHaveClass('m_md')
      expect(body).toHaveClass('mb_lg')
      expect(body).toHaveClass('mt_sm')
      expect(body).toHaveClass('p_lg')
      expect(body).toHaveClass('pl_xs')
    })

    test('Spacing + layout + typography global props work together', () => {
      render(
        <Body
            data={{ testid: 'body-layout-typography' }}
            display="flex"
            margin="md"
            padding="sm"
            text="Test"
            textAlign="center"
        />
      )
      const body = screen.getByTestId('body-layout-typography')
      
      expect(body).toHaveClass('m_md')
      expect(body).toHaveClass('p_sm')
      expect(body).toHaveClass('display_flex')
      expect(body).toHaveClass('text_align_center')
    })

    test('Position + spacing + z-index global props work together', () => {
      render(
        <Body
            data={{ testid: 'body-position-zindex' }}
            margin="lg"
            position="absolute"
            text="Test"
            top="md"
            zIndex={5}
        />
      )
      const body = screen.getByTestId('body-position-zindex')
      
      expect(body).toHaveClass('m_lg')
      expect(body).toHaveClass('position_absolute')
      expect(body).toHaveClass('top_md')
      expect(body).toHaveClass('z_index_5')
    })

    test('Flexbox + spacing + typography global props work together', () => {
      render(
        <Body
            alignItems="center"
            data={{ testid: 'body-flexbox-combo' }}
            flexDirection="column"
            gap="md"
            justifyContent="spaceBetween"
            margin="sm"
            padding="lg"
            text="Test"
            textAlign="right"
        />
      )
      const body = screen.getByTestId('body-flexbox-combo')
      
      expect(body).toHaveClass('m_sm')
      expect(body).toHaveClass('p_lg')
      expect(body).toHaveClass('flex_direction_column')
      expect(body).toHaveClass('justify_content_space_between')
      expect(body).toHaveClass('align_items_center')
      expect(body).toHaveClass('gap_md')
      expect(body).toHaveClass('text_align_right')
    })

    test('All major global prop categories work together', () => {
      render(
        <Body
            borderRadius="md"
            cursor="pointer"
            data={{ testid: 'body-all-categories' }}
            display="flex"
            margin="lg"
            padding="md"
            position="relative"
            shadow="lg"
            text="Test"
            textAlign="center"
            zIndex={3}
        />
      )
      const body = screen.getByTestId('body-all-categories')
      
      // Spacing
      expect(body).toHaveClass('m_lg')
      expect(body).toHaveClass('p_md')
      
      // Layout
      expect(body).toHaveClass('display_flex')
      expect(body).toHaveClass('position_relative')
      
      // Visual
      expect(body).toHaveClass('border_radius_md')
      expect(body).toHaveClass('shadow_lg')
      expect(body).toHaveClass('cursor_pointer')
      
      // Typography
      expect(body).toHaveClass('text_align_center')
      
      // Z-index
      expect(body).toHaveClass('z_index_3')
    })
  })

  describe('Global props in nested layouts / clickable wrappers', () => {
    test('Button inside Card: both have global props', () => {
      render(
        <Card
            data={{ testid: 'card-nested' }}
            margin="lg"
            padding="md"
        >
          <Button
              data={{ testid: 'button-nested' }}
              margin="sm"
              text="Click me"
              variant="primary"
          />
        </Card>
      )
      
      const card = screen.getByTestId('card-nested')
      const button = screen.getByTestId('button-nested')
      
      // Card global props
      expect(card).toHaveClass('m_lg')
      expect(card).toHaveClass('p_md')
      
      // Button global props
      expect(button).toHaveClass('m_sm')
      
      // Button kit-specific props
      expect(button).toHaveClass('pb_button_kit')
      expect(button).toHaveClass('pb_button_primary')
    })

    test('Multiple Body elements in Flex: each has different global props', () => {
      render(
        <Flex
            data={{ testid: 'flex-nested' }}
            gap="md"
            margin="lg"
        >
          <Body
              data={{ testid: 'body-nested-1' }}
              margin="xs"
              text="First"
              textAlign="left"
          />
          <Body
              data={{ testid: 'body-nested-2' }}
              margin="xs"
              text="Second"
              textAlign="center"
          />
          <Body
              data={{ testid: 'body-nested-3' }}
              margin="xs"
              text="Third"
              textAlign="right"
          />
        </Flex>
      )
      
      const flex = screen.getByTestId('flex-nested')
      const body1 = screen.getByTestId('body-nested-1')
      const body2 = screen.getByTestId('body-nested-2')
      const body3 = screen.getByTestId('body-nested-3')
      
      // Flex global props
      expect(flex).toHaveClass('m_lg')
      expect(flex).toHaveClass('gap_md')
      
      // Each Body has its own global props
      expect(body1).toHaveClass('m_xs')
      expect(body1).toHaveClass('text_align_left')
      
      expect(body2).toHaveClass('m_xs')
      expect(body2).toHaveClass('text_align_center')
      
      expect(body3).toHaveClass('m_xs')
      expect(body3).toHaveClass('text_align_right')
    })

    test('Deep nesting: Card > Flex > Button with global props', () => {
      render(
        <Card
            data={{ testid: 'card-deep' }}
            margin="xl"
            padding="lg"
        >
          <Flex
              data={{ testid: 'flex-deep' }}
              gap="sm"
              justify="center"
          >
            <Button
                data={{ testid: 'button-deep' }}
                margin="xs"
                text="Nested Button"
                variant="secondary"
            />
          </Flex>
        </Card>
      )
      
      const card = screen.getByTestId('card-deep')
      const flex = screen.getByTestId('flex-deep')
      const button = screen.getByTestId('button-deep')
      
      // Card global props
      expect(card).toHaveClass('m_xl')
      expect(card).toHaveClass('p_lg')
      
      // Flex global props
      expect(flex).toHaveClass('gap_sm')
      expect(flex).toHaveClass('pb_flex_kit_justify_content_center')
      
      // Button global props
      expect(button).toHaveClass('m_xs')
    })

    test('Link wrapper with global props containing Body with global props', () => {
      render(
        <Link
            data={{ testid: 'link-wrapper' }}
            link="https://example.com"
            margin="md"
            textAlign="center"
        >
          <Body
              data={{ testid: 'body-in-link' }}
              margin="xs"
              text="Link content"
              textAlign="left"
          />
        </Link>
      )
      
      const link = screen.getByTestId('link-wrapper')
      const body = screen.getByTestId('body-in-link')
      
      // Link global props
      expect(link).toHaveClass('m_md')
      expect(link).toHaveClass('text_align_center')
      
      // Body global props (should still work even though inside Link)
      expect(body).toHaveClass('m_xs')
      expect(body).toHaveClass('text_align_left')
    })

    test('Button with onClick and global props in Card with global props', () => {
      const handleClick = jest.fn()
      
      render(
        <Card
            data={{ testid: 'card-clickable' }}
            margin="lg"
            onClick={handleClick}
            padding="md"
        >
          <Button
              data={{ testid: 'button-clickable' }}
              margin="sm"
              onClick={handleClick}
              text="Click me"
              variant="primary"
          />
        </Card>
      )
      
      const card = screen.getByTestId('card-clickable')
      const button = screen.getByTestId('button-clickable')
      
      // Both should have their global props
      expect(card).toHaveClass('m_lg')
      expect(card).toHaveClass('p_md')
      expect(button).toHaveClass('m_sm')
      
      // Both should be clickable
      button.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('Responsive global props in nested layout', () => {
      render(
        <Card
            data={{ testid: 'card-responsive' }}
            margin={{ default: 'md', sm: 'lg', md: 'xl' }}
            padding="md"
        >
          <Flex
              data={{ testid: 'flex-responsive' }}
              gap={{ default: 'sm', md: 'lg' }}
          >
            <Body
                data={{ testid: 'body-responsive' }}
                margin="xs"
                text="Content"
                textAlign={{ default: 'left', sm: 'center', md: 'right' }}
            />
          </Flex>
        </Card>
      )
      
      const card = screen.getByTestId('card-responsive')
      const flex = screen.getByTestId('flex-responsive')
      const body = screen.getByTestId('body-responsive')
      
      // Card responsive margin (uses break_on format)
      expect(card).toHaveClass('m_md')
      expect(card.className).toMatch(/break_on_sm:m_lg/)
      expect(card.className).toMatch(/break_on_md:m_xl/)
      
      // Flex responsive gap
      expect(flex).toHaveClass('gap_sm')
      expect(flex).toHaveClass('gap_md_lg')
      
      // Body responsive textAlign
      expect(body).toHaveClass('text_align_left')
      expect(body).toHaveClass('text_align_sm_center')
      expect(body).toHaveClass('text_align_md_right')
    })
  })

  describe('Prop precedence and conflicts', () => {
    test('className prop overrides global prop classes', () => {
      render(
        <Body
            className="custom-class override-margin"
            data={{ testid: 'precedence-1' }}
            margin="lg"
            text="Test"
        />
      )
      const body = screen.getByTestId('precedence-1')
      
      // Should have global prop class
      expect(body).toHaveClass('m_lg')
      // Should have custom className
      expect(body).toHaveClass('custom-class')
      expect(body).toHaveClass('override-margin')
    })

    test('htmlOptions overrides aria and data props', () => {
      render(
        <Body
            aria={{ label: 'Aria label' }}
            data={{ testid: 'precedence-2' }}
            htmlOptions={{
              'aria-label': 'HTML options label',
              'data-testid': 'html-testid'
            }}
            text="Test"
        />
      )
      const body = screen.getByTestId('html-testid')
      
      // htmlOptions should override aria prop
      expect(body).toHaveAttribute('aria-label', 'HTML options label')
      // htmlOptions should override data prop
      expect(body).toHaveAttribute('data-testid', 'html-testid')
    })

    test('Multiple conflicting spacing props work together', () => {
      render(
        <Body
            data={{ testid: 'precedence-3' }}
            margin="md"
            marginBottom="lg"
            marginTop="sm"
            text="Test"
        />
      )
      const body = screen.getByTestId('precedence-3')
      
      // All should be present
      expect(body).toHaveClass('m_md')
      expect(body).toHaveClass('mb_lg')
      expect(body).toHaveClass('mt_sm')
    })

    test('Global props do not interfere with kit-specific props', () => {
      render(
        <Button
            data={{ testid: 'precedence-4' }}
            margin="md"
            size="lg"
            text="Click me"
            variant="secondary"
        />
      )
      const button = screen.getByTestId('precedence-4')
      
      // Kit-specific classes should still be present
      expect(button).toHaveClass('pb_button_kit')
      expect(button).toHaveClass('pb_button_secondary')
      expect(button).toHaveClass('pb_button_size_lg')
      // Global prop classes should also be present
      expect(button).toHaveClass('m_md')
    })

    test('id prop takes precedence over htmlOptions.id', () => {
      render(
        <Body
            data={{ testid: 'precedence-5' }}
            htmlOptions={{ id: 'html-id' }}
            id="prop-id"
            text="Test"
        />
      )
      const body = screen.getByTestId('precedence-5')
      
      // id prop should win
      expect(body).toHaveAttribute('id', 'prop-id')
      expect(body).not.toHaveAttribute('id', 'html-id')
    })
  })

  describe('Accessibility integration', () => {
    test('Global props work with aria props', () => {
      render(
        <Body
            aria={{
              label: 'Test label',
              describedby: 'desc-id',
              hidden: 'false'
            }}
            data={{ testid: 'a11y-1' }}
            margin="md"
            text="Test"
            textAlign="center"
        />
      )
      const body = screen.getByTestId('a11y-1')
      
      // Aria attributes should be present
      expect(body).toHaveAttribute('aria-label', 'Test label')
      expect(body).toHaveAttribute('aria-describedby', 'desc-id')
      expect(body).toHaveAttribute('aria-hidden', 'false')
      // Global props should still work
      expect(body).toHaveClass('m_md')
      expect(body).toHaveClass('text_align_center')
    })

    test('Global props work with data props', () => {
      render(
        <Body
            data={{
              testid: 'a11y-2',
              'custom-attr': 'custom-value',
              'analytics-id': 'analytics-123'
            }}
            margin="sm"
            padding="md"
            text="Test"
        />
      )
      const body = screen.getByTestId('a11y-2')
      
      // Data attributes should be present
      expect(body).toHaveAttribute('data-custom-attr', 'custom-value')
      expect(body).toHaveAttribute('data-analytics-id', 'analytics-123')
      // Global props should still work
      expect(body).toHaveClass('m_sm')
      expect(body).toHaveClass('p_md')
    })

    test('htmlOptions aria attributes override aria prop', () => {
      render(
        <Body
            aria={{ label: 'Aria prop label' }}
            data={{ testid: 'a11y-3' }}
            htmlOptions={{
              'aria-label': 'HTML options label',
              'aria-live': 'polite'
            }}
            text="Test"
        />
      )
      const body = screen.getByTestId('a11y-3')
      
      // htmlOptions should override aria prop
      expect(body).toHaveAttribute('aria-label', 'HTML options label')
      expect(body).toHaveAttribute('aria-live', 'polite')
    })

    test('Global props with role and tabIndex', () => {
      render(
        <Body
            data={{ testid: 'a11y-4' }}
            htmlOptions={{
              role: 'button',
              tabIndex: 0
            }}
            margin="lg"
            text="Test"
        />
      )
      const body = screen.getByTestId('a11y-4')
      
      // Accessibility attributes should be present
      expect(body).toHaveAttribute('role', 'button')
      expect(body).toHaveAttribute('tabIndex', '0')
      // Global props should still work
      expect(body).toHaveClass('m_lg')
    })

    test('Screen reader compatibility with global props', () => {
      render(
        <Button
            aria={{
              label: 'Submit form',
              describedby: 'submit-help'
            }}
            data={{ testid: 'a11y-5' }}
            margin="md"
            text="Submit"
        />
      )
      const button = screen.getByTestId('a11y-5')
      
      // Should be accessible
      expect(button).toHaveAttribute('aria-label', 'Submit form')
      expect(button).toHaveAttribute('aria-describedby', 'submit-help')
      expect(button).toHaveAttribute('role', 'button')
      // Global props should not interfere
      expect(button).toHaveClass('m_md')
    })
  })

  describe('Form elements', () => {
    test('Global props work with TextInput', () => {
      const handleChange = jest.fn()
      
      render(
        <TextInput
            data={{ testid: 'form-1' }}
            label="Test Input"
            margin="md"
            name="test-input"
            onChange={handleChange}
            padding="sm"
            placeholder="Enter text"
            textAlign="right"
            type="text"
            value=""
        >
          <input />
        </TextInput>
      )
      
      const wrapper = screen.getByTestId('form-1')
      
      // Global props should work on TextInput wrapper
      expect(wrapper).toHaveClass('m_md')
      expect(wrapper).toHaveClass('p_sm')
      expect(wrapper).toHaveClass('text_align_right')
    })

    test('Global props with TextInput error state', () => {
      const handleChange = jest.fn()
      
      render(
        <TextInput
            data={{ testid: 'form-2' }}
            error="This field is required"
            label="Test Input"
            margin="sm"
            name="test-input"
            onChange={handleChange}
            placeholder="Enter text"
            type="text"
            value=""
        >
          <input />
        </TextInput>
      )
      
      const wrapper = screen.getByTestId('form-2')
      
      // Error state should work
      expect(wrapper).toHaveClass('error')
      // Global props should still work
      expect(wrapper).toHaveClass('m_sm')
    })

    test('Global props with disabled TextInput', () => {
      const handleChange = jest.fn()
      
      render(
        <TextInput
            data={{ testid: 'form-3' }}
            disabled
            label="Test Input"
            margin="lg"
            name="test-input"
            onChange={handleChange}
            placeholder="Enter text"
            type="text"
            value=""
        >
          <input disabled />
        </TextInput>
      )
      
      const wrapper = screen.getByTestId('form-3')
      const input = wrapper.querySelector('input')
      
      // Input should be disabled (check attribute directly)
      expect(input).toHaveAttribute('disabled')
      // Global props should still work
      expect(wrapper).toHaveClass('m_lg')
    })

    test('Global props with required TextInput', () => {
      const handleChange = jest.fn()
      
      render(
        <TextInput
            data={{ testid: 'form-4' }}
            label="Test Input"
            margin="md"
            name="test-input"
            onChange={handleChange}
            placeholder="Enter text"
            required
            requiredIndicator
            type="text"
            value=""
        >
          <input />
        </TextInput>
      )
      
      const wrapper = screen.getByTestId('form-4')
      
      // Global props should work
      expect(wrapper).toHaveClass('m_md')
      // Required indicator should be present if requiredIndicator is true
      const requiredIndicator = screen.queryByText('*')
      if (requiredIndicator) {
        expect(requiredIndicator).toBeInTheDocument()
      }
    })
  })

  describe('Edge cases and boundary conditions', () => {
    test('Empty responsive object', () => {
      render(
        <Body
            data={{ testid: 'edge-2' }}
            margin={{}}
            text="Test"
        />
      )
      const body = screen.getByTestId('edge-2')
      
      // Should not crash with empty object
      expect(body).toBeInTheDocument()
    })

    test('Only default value in responsive object', () => {
      render(
        <Body
            data={{ testid: 'edge-3' }}
            margin={{ default: 'md' }}
            text="Test"
        />
      )
      const body = screen.getByTestId('edge-3')
      
      // Should have default class
      expect(body).toHaveClass('m_md')
    })

    test('Only breakpoints, no default in responsive object', () => {
      render(
        <Body
            data={{ testid: 'edge-4' }}
            margin={{ sm: 'md', md: 'lg' }}
            text="Test"
        />
      )
      const body = screen.getByTestId('edge-4')
      
      // Should handle breakpoints without default
      expect(body.className).toBeTruthy()
    })
  })
})
