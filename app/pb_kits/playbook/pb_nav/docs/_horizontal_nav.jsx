import React from 'react'
import {Nav} from '../../'
import NavItem from '../_item.jsx'

function HorizontalNav() {
  return (
    <Nav title='Title example' link='#' orientation='horizontal'>
        <NavItem text='Active Nav Item using text prop' link='#' active={true}/>
        <NavItem text='Nav Item using text prop' link='#' />
        <NavItem text='Nav Item using text prop' link='#' />
    </Nav>
  )
}

export default HorizontalNav;
