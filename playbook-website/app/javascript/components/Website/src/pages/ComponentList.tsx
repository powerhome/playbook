import React from "react"
import { NavLink, Outlet, useOutlet } from "react-router-dom"
import { Flex, Title } from "playbook-ui"

export default function ComponentList() {
  const outlet = useOutlet()

  return (
    <Flex paddingLeft='md'>
      {!outlet && (
        <NavLink to='avatar'>
          <Title
            paddingTop={{ xs: "md", sm: "md", md: "md", default: "none" }}
            text={"Avatar"}
            size='2'
          />
        </NavLink>
      )}
      <Outlet />
    </Flex>
  )
}
