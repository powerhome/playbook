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
    <div style={{ height: "80vh" }}>
      <div style={{ height: "80%", maxHeight: "80%", overflowY: "scroll",  backgroundColor: "white" }}>
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
                   {message.ai_response}
                </div>
              </div>
          </Flex>
          </div>
      ))}
      </div>
      <div style={{ minHeight: "10%", maxHeight: "20%" }}>
        <MessagesForm projectId={trueProject} apiKey={apiKey} messages={messages} />
      </div>
    </div>
  );
};

export default Messages;
