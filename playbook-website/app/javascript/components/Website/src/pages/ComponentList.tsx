import React from "react"
import { NavLink, Outlet, useOutlet } from "react-router-dom"
import { Title } from "playbook-ui"

export default function ComponentList() {
  const outlet = useOutlet();

  return (
    <div className='pl_md'>
      {!outlet && (
        <NavLink to="avatar">
          <Title text={"Avatar"} size='2' />
        </NavLink>
      )}
      <Outlet /> 
    </div>
  )
}