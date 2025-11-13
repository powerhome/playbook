import React from 'react'
import { render, screen } from '../utilities/test-utils'

import ProgressStep from './_progress_step.tsx'
import ProgressStepItem from './_progress_step_item.tsx'

const testId = 'progressStepId'
const step1Id = 'step1Id'
const step2Id = 'step2Id'
const step3Id = 'step3Id'

const ProgressStepTest = () => {
  return (
      <>
        <ProgressStep
            aria={{ label: testId }}
            className={'custom-class'}
            data={{ testid: testId }} 
        >
          <ProgressStepItem 
              data={{ testid: step1Id }} 
              status="complete"
          >
              {'Step 1'}
          </ProgressStepItem>
          <ProgressStepItem 
              data={{ testid: step2Id }} 
              status="active"
          >
              {'Step 2'}
          </ProgressStepItem>
          <ProgressStepItem 
              data={{ testid: step3Id }} 
              status="inactive"
          >
              {'Step 3'}
          </ProgressStepItem>
        </ProgressStep>
      </>
  )
}

test('should render custom class and data', () => {
  render(<ProgressStepTest/>)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('custom-class')
})

test('should render aria-label', () => {
  render(<ProgressStepTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute('aria-label', testId)
})

test('should render the horizontal variant', () => {
  render(<ProgressStepTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_progress_step_kit_horizontal')
})

test('should render the vertical variant', () => {
  render( 
        <ProgressStep
            aria={{ label: testId }}
            data={{ testid: testId }} 
            orientation="vertical"
        >
          <ProgressStepItem status="complete">{'Step 1'}</ProgressStepItem>
          <ProgressStepItem status="active">{'Step 2'}</ProgressStepItem>
          <ProgressStepItem status="inactive">{'Step 3'}</ProgressStepItem>
        </ProgressStep> 
        )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_progress_step_kit_vertical')
})

test('should render the tracker variant', () => {
  render( 
        <ProgressStep
            aria={{ label: testId }}
            data={{ testid: testId }} 
            variant="tracker"
        >
          <ProgressStepItem status="complete">{'Step 1'}</ProgressStepItem>
          <ProgressStepItem status="active">{'Step 2'}</ProgressStepItem>
          <ProgressStepItem status="inactive">{'Step 3'}</ProgressStepItem>
        </ProgressStep> 
        )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_progress_step_kit_horizontal_tracker')
})


test('should render the children elements', () => {
  render(<ProgressStepTest />)

  const step1Kit = screen.getByTestId(step1Id)
  const step2Kit = screen.getByTestId(step2Id)
  const step3Kit = screen.getByTestId(step3Id)
  
  expect(step1Kit).toHaveClass('pb_progress_step_item_complete')
  expect(step2Kit).toHaveClass('pb_progress_step_item_active')
  expect(step3Kit).toHaveClass('pb_progress_step_item_inactive')
})

test('should render info color', () => {
render( 
        <ProgressStep
            aria={{ label: testId }}
            color="info"
            data={{ testid: testId }} 
            variant="tracker"
        >
          <ProgressStepItem status="complete">{'Step 1'}</ProgressStepItem>
          <ProgressStepItem status="active">{'Step 2'}</ProgressStepItem>
          <ProgressStepItem status="inactive">{'Step 3'}</ProgressStepItem>
        </ProgressStep> 
        )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_progress_step_kit_horizontal_tracker_info')
})

test('should render custom icon', () => {
render( 
        <ProgressStep
            aria={{ label: testId }}
            data={{ testid: testId }} 
            variant="tracker"
        >
          <ProgressStepItem icon="exclamation-triangle" 
              status="complete"
          >
            {'Step 1'}
          </ProgressStepItem>
          <ProgressStepItem status="active">{'Step 2'}</ProgressStepItem>
          <ProgressStepItem status="inactive">{'Step 3'}</ProgressStepItem>
        </ProgressStep> 
        )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_progress_step_kit_horizontal_tracker')
  const icon = kit.getAttribute('aria-label', "exclamation-triangle-icon")
  expect(icon).toBeDefined()
})
