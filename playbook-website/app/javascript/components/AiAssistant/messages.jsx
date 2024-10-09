import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav, NavItem } from 'playbook-ui';

const Messages = ({project, currentProject}) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`/projects/${currentProject || project}.json`)
      .then(response => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });
    //   currentProject remove this to not refresh after you make a new project
  }, [currentProject]);



  return (
    <div>
        {projects.map((project) => (
            <div>
                {project.code}
            </div>
      ))}
    </div>
  );
};

export default Messages;
