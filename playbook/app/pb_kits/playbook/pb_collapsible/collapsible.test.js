import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Collapsible from './_collapsible'

beforeEach(() => {
  // Silences error logs within the test suite.
  jest.spyOn(console, 'error')
  // eslint-disable-next-line
  console.error.mockImplementation(() => {})
})

afterEach(() => {
  // eslint-disable-next-line
  console.error.mockRestore()
})

const testId = 'collapsible1',
  kitClass = 'pb_collapsible_kit'

test('throws error if incorrect # of children', () => {
  expect(() => {
    render(
      <Collapsible />
    )
  }).toThrow()
})

test('returns namespaced additional_class class name', () => {
  render(
    <Collapsible
        className="additional_class"
        data={{ testid: testId }}
    >
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} additional_class`)
})

test('html structure is correct', () => {
  render(
    <Collapsible
        className="additional_class"
        data={{ testid: testId }}
        iconColor='lighter'
        iconSize="lg"
    >
      <Collapsible.Main>
        <div>{'Main Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
  )

  const kit = screen.getByTestId(testId)
  const normalizeHTML = (html) => html.replace(/\s+/g, '').trim();
  const expectedHTML = `
    <div data-testid="collapsible1" class="pb_collapsible_kit additional_class">
      <div class="pb_collapsible_main_kit cursor_pointer">
        <div>
          <div class="pb_flex_kit_orientation_row_justify_content_left_align_items_center_spacing_between">
            <div class="pb_flex_item_kit">
              <div>Main Section</div>
            </div>
            <div class="pb_flex_item_kit">
              <div class="icon_wrapper" style="vertical-align: middle; color: rgb(193, 205, 214);">
                <i class="pb_icon_kit far fa-fw fa-lg fa-chevron-down"></i>
                <span aria-label="chevron-down icon" hidden=""></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pb_collapsible_content_kit toggle-content" data-collapsible-content="true" style="height: 0px;">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus. Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.
        </div>
      </div>
    </div>
  `;
  expect(normalizeHTML(kit.outerHTML)).toEqual(normalizeHTML(expectedHTML));
})
