import React, { useEffect, useState } from "react";
import axios from "axios";
import { Caption, Button, Nav, Title, Image, Flex, NavItem } from 'playbook-ui';
import Messages from "./messages"

const AINav = ({onChildClick, project, apiKey, currentProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const projectParam = currentUrl.searchParams.get('project');

    // Check if projectParam is a number
    if (projectParam !== null && !projectParam) {
      currentUrl.searchParams.set('project', 'undefined');
      window.history.pushState({}, '', currentUrl);
    }
    
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
     <div
          style={{height: "100vh", width: "20vw", backgroundColor: "white"}}
           >
           <Flex alignItems="center" justifyContent="center" paddingTop="xl">
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='New Design'
        variant='secondary'
        icon="edit"
        marginBottom="md"
        onClick={() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('project', project.id);
            window.history.pushState({}, '', currentUrl);

            // console.log(changeProject)
            // changeProject()
            onChildClick('new')
          }}
    />
    </Flex>
    {(project === 'undefined' ) &&  
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
    }
    {(project !== 'undefined' ) &&  
      <Messages project={project} currentProject={currentProject} apiKey={apiKey} />
    }
    </div>
  );
};

export default AINav;
