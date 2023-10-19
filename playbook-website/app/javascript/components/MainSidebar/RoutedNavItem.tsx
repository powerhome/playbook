import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { NavItem } from 'playbook-ui';

const RoutedNavItem = ({ text, path, ...props }) => {
  const match = useMatch(path);

  return (
    <NavLink className='navLink' to={path} >
      <NavItem active={!!match} link={undefined} text={text} {...props} />
    </NavLink>
  );
};

export default RoutedNavItem;
