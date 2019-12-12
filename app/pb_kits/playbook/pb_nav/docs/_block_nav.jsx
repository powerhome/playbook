import React from 'react'
import {Nav} from '../../'
import NavItem from '../_item.jsx'

function BlockNav() {
  return (
    <Nav title='Title example' link='#' orientation='vertical'>
        <NavItem link='#' active={true}>{`Active Nav Item using text prop`}</NavItem>
        <NavItem link='#'>{`Nav Item using text prop`}</NavItem>
        <NavItem link='#'>{`Nav Item using text prop`}</NavItem>
    </Nav>
  )
}

export default BlockNav;
