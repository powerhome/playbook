import React, { useEffect, useState } from "react";
import axios from "axios";
import { Background, Caption, Flex, Icon, Image, SectionSeparator } from 'playbook-ui';
import PlaymakerLogo from "../../images/playmaker-powergon.svg";


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
            <Flex alignItems="start" paddingY="sm">
              <Background borderRadius="md">
                <Icon color="text_lt_light" icon="user"/>
              </Background>
              <div style={{marginLeft: "5px"}}>
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
          {message.ai_response && (
            <>
              <Flex alignItems="start" paddingY="sm">
                <Background borderRadius="md">
                  <img src={PlaymakerLogo} alt='Playmaker Powergon Logo' width="19px" style={{padding_x: "4px"}}/>
                </Background>
                  <div style={{marginLeft: "5px"}}>
                    <Caption>
                      Playmaker 
                    </Caption>
                    <div>
                      {message.ai_response}
                    </div>
                  </div>
              </Flex>
            </>
          )}
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
