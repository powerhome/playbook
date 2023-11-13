import React from "react"
import { NavLink, Outlet, useOutlet, useOutletContext } from "react-router-dom"
import { Title } from "playbook-ui"

export default function ComponentList() {
  const outlet = useOutlet();
  const isMobile = useOutletContext();

  return (
    <div className='pl_md'>
      {!outlet && (
        <NavLink to="avatar">
          <Title paddingTop={isMobile ? "md" : ""} text={"Avatar"} size='2' />
        </NavLink>
      )}
      <Outlet context={isMobile} /> 
    </div>
  )
}
