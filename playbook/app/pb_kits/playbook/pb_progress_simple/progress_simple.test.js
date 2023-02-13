import React from 'react'
import { render, screen, cleanup } from '../utilities/test-utils'

import ProgressSimple from './_progress_simple'

const testId = "progress-simple-test"

test('renders default class name and percentage', () => {
  render(
    <div>
    <ProgressSimple 
        data={{ testid: testId }}
        percent={45} 
    />
  </div>

  )

  const kit = screen.getByTestId(testId)
  const progress = kit.querySelector(".progress_simple_value")

  expect(kit).toHaveClass('pb_progress_simple_wrapper')
  expect(progress).toHaveStyle("width: 45%")

})

test('renders values', () => {
    render(
      <div>
      <ProgressSimple 
          data={{ testid: testId }}
          max='10'
          value='2'
      />
    </div>
  
    )
  
    const kit = screen.getByTestId(testId)
    const progress = kit.querySelector(".progress_simple_value")
    expect(progress).toHaveStyle("width: 20%")
  })

  test('renders progress bar width', () => {
    render(
      <div>
      <ProgressSimple 
          data={{ testid: testId }}
          percentage={40}
          width="100px"
      />
    </div>
  
    )
  
    const kit = screen.getByTestId(testId)
    const progress = kit.querySelector(".pb_progress_simple_kit")
    expect(progress).toHaveStyle("width: 100px")
  })

  test('renders color variants', () => {
    [
        "positive",
        "negative",
        "warning"
    ].forEach((colorVariant) => {
  
    render(
      <div>
      <ProgressSimple 
          data={{ testid: testId }}
          percentage={40}
          variant={colorVariant}
      />
    </div>
    )
  
    const kit = screen.getByTestId(testId)
    const progress = kit.querySelector(`.pb_progress_simple_kit_${colorVariant}`)
    expect(progress).toBeInTheDocument()

    cleanup()
    })
})

test('renders muted prop', () => {
    render(
      <div>
      <ProgressSimple 
          data={{ testid: testId }}
          muted
          percentage={40}
      />
    </div>
    )
  
    const kit = screen.getByTestId(testId)
    const progress = kit.querySelector('.pb_progress_simple_kit_muted')
    expect(progress).toBeInTheDocument()
})

test('renders align prop', () => {
    [
      "left",
      "center",
      "right"
    ].forEach((alignProp) => {
      render(
        <ProgressSimple
            align={alignProp}
            data={{ testid: testId }}
            percentage={45}
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`pb_progress_simple_wrapper_${alignProp}`)
      
      cleanup()
    })
  })
