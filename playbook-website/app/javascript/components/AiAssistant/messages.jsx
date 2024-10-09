import React, { useEffect, useState } from "react";
import axios from "axios";
import { Caption, Flex, SectionSeparator } from 'playbook-ui';

import MessagesForm from "./messageForm"

const Messages = ({project, currentProject, apiKey}) => {
  const [messages, setMessages] = useState([]);

  const trueProject = currentProject || project;

  useEffect(() => {
    if (trueProject) {
        axios.get(`/projects/${trueProject}.json`)
          .then(response => {
            setMessages(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the projects!", error);
          });
    }
  }, [currentProject]);



  return (
    <div>
        {messages.map((message) => (
          <div>
            <Flex>
              <div>
          icon
              </div>
              <div>
                <Caption>
                   You 
                </Caption>
                <div>
                    {message.user_input}
                </div>
              </div>
            </Flex>

         <SectionSeparator
             text="Playmaker has Responded"
         />

            <Flex>
              <div>
          icon
              </div>
              <div>
                <Caption>
                   Playmaker 
                </Caption>
                <div>
                   open ai response goes here 
                </div>
              </div>
          </Flex>
          </div>
      ))}
      <MessagesForm projectId={trueProject} apiKey={apiKey} messages={messages} />
    </div>
  );
};

export default Messages;
