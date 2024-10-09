import React, { useEffect, useState } from "react";
import axios from "axios";
import { Caption, Nav, Title, Image, Flex, NavItem } from 'playbook-ui';

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
      paddingX="sm"
    >
      {projects.map((project) => (
        <Flex
        >
       <Image
            alt=""
            rounded
            size="xs"
            url="https://unsplash.it/500/400/?image=634"

        key={project.id}
        onClick={() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('project', project.id);
            window.history.pushState({}, '', currentUrl);

            // console.log(changeProject)
            // changeProject()
            onChildClick(project.id)
          }}
        />
        <NavItem 

        key={project.id}
        onClick={() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('project', project.id);
            window.history.pushState({}, '', currentUrl);

            // console.log(changeProject)
            // changeProject()
            onChildClick(project.id)
          }}
        >
          <Title size={4}> { project.summary } </Title>
          <Caption>
            { project.media_size }
          </Caption>
        </NavItem>
        </Flex>
      ))}
    </Nav>
  );
};

export default AINav;
