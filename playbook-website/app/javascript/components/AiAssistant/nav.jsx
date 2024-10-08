import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, NavItem } from 'playbook-ui';

const AINav = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects.json')
      .then(response => {
        console.log(response.data);
        console.log('asdfasdfasd_f');
        setProjects(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  return (
    <Nav
      link="#"
      orientation="vertical"
      variant="bold"
    >
      {projects.map((project) => (
        <NavItem
          key={project.id}
          fontSize="small"
          fontWeight="bolder"
          link="#"
          text={project.summary}
        />
      ))}
    </Nav>
  );
};

export default AINav;
