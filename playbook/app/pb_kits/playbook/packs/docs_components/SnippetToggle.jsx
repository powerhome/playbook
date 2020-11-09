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
    <div style={{cursor: "pointer", maxWidth: "170px"}}>
      <Nav
        orientation="horizontal"
      >
        <NavItem
            active={codeSnippet === 'rails'}
            onClick={() => toggleHook('rails')}
            text="Rails"
        />
        <NavItem
            active={codeSnippet === 'react'}
            onClick={() => toggleHook('react')}
            text="React"
        />
      </Nav>
    </div>
  )
}

export default SnippetToggle
