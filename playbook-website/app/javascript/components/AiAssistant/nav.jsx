import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, NavItem } from 'playbook-ui';

const AINav = ({onChildClick}) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects.json')
      .then(response => {
        console.log(response.data);
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
          // link={"?project=" + project.id}
          onClick={() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('project', project.id);
            window.history.pushState({}, '', currentUrl);

            // console.log(changeProject)
            // changeProject()
            onChildClick(project.id)
          }}
          text={project.summary}
        />
      ))}
    </Nav>
  );
};

export default AINav;
