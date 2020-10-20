import React from 'react'
import { useState } from 'react'
import { Nav } from '../../'
import NavItem from '../../pb_nav/_item.jsx'

const SnippetToggle = (props) => {
  const [codeSnippet, toggleCodeSnippet] = useState('rails')

  const toggleHook = (snippetLang) => {
    toggleCodeSnippet(snippetLang)
    document.querySelectorAll('pre.highlight').forEach((node) => {
      if(node.style.display === 'none'){
        node.style.display = 'block'
      } else {
        node.style.display = 'none'
      }
    })
  }

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
            onClick={() => toggleHook('rails')}
        />
        <NavItem
            active={codeSnippet === 'react'}
            link="#"
            text="React"
            onClick={() => toggleHook('react')}
        />
      </Nav>
      {/* <If condition={codeSnippet === 'rails'} >
        <h1>Rails!!</h1>
      </If>
      <If condition={codeSnippet === 'react'} >
        <h1>React!!</h1>
      </If> */}
    </>
  )
}

export default SnippetToggle
