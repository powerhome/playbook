import React from 'react'
import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo, setDefaults } from '@storybook/addon-info'

setDefaults({
  header: false,
  inline: true,
  source: true,
})


const CenterDecorator = (storyFn) => (
  <div className="container my-5">
    { storyFn() }
  </div>
)

addDecorator((story, context) => withInfo('Common Info')(story)(context))
addDecorator(CenterDecorator);
addDecorator(withKnobs)

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)