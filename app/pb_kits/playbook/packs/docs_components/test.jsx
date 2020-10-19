import React from 'react'
import { useState } from 'react'
import { Nav } from '../../'
import NavItem from '../../pb_nav/_item.jsx'

const TestComp = (props) => {
  const [codeSnippet, toggleCodeSnippet] = useState('rails')
  return (
    <>
      <Nav
        link="#"
        orientation="horizontal"
      >
        <NavItem
            active={codeSnippet === 'rails'}
            link="#"
            text="Rails"
            onClick={() => toggleCodeSnippet('rails')}
        />
        <NavItem
            active={codeSnippet === 'react'}
            link="#"
            text="React"
            onClick={() => toggleCodeSnippet('react')}
        />
      </Nav>
      <If condition={codeSnippet === 'rails'} >
        <h1>Rails!!</h1>
      </If>
      <If condition={codeSnippet === 'react'} >
        <h1>React!!</h1>
      </If>
    </>
  )
}

export default TestComp
