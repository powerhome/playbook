import React, { useState } from "react";
import { Flex, Card, Textarea, Background } from "playbook-ui";

const AiAssistant = () => {
  const [value, setValue] = useState("Start Typing...");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
          <Background backgroundColor="white">
          <Flex
            grow
            orientation="column"
            justify="center"
            align="center"
            htmlOptions={{ style: { height: "100vh" } }}
          >
            <Card borderNone padding="xs" htmlOptions={{ style: { width: "700px" } }}>
              <Textarea
                label="How Can I Help You?"
                name="comment"
                onChange={(e) => handleChange(e)}
                placeholder="Placeholder text"
                value={value}
              />
            </Card>
          </Flex>
          </Background>
    </div>
  );
};

export default AiAssistant;
