import { useState } from "react";
import axios from "axios"; // Import axios
import { fetchChatGPTResponse } from "./apiService";
import { Button, Card, Flex, Textarea, Background, Body } from "playbook-ui";
import KitResponse from "./kitResponse";
import AINav from "./nav";

const AiAssistant = ({ apiKey }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Retrieve the CSRF token from the meta tag in the HTML
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Fetch the response from ChatGPT
      const data = await fetchChatGPTResponse(input, apiKey);
      const chatResponse = data.choices[0].message.content;
      setResponse(chatResponse);

      // Post the response to your Rails app's Message model with the CSRF token
      await axios.post(
        "/projects",
        {
          summary: input,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error fetching or posting response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background display="flex" backgroundColor="grey">
        <AINav/>
        <Flex
          grow
          orientation="column"
          justify="center"
          align="center"
          htmlOptions={{ style: { height: "100vh" } }}
        >
          {response ? (
            <Body>
              <KitResponse response={response}/>
            </Body>
          ) : (
            <Card
              borderNone
              padding="xs"
              htmlOptions={{ style: { width: "700px" } }}
            >
              <Textarea
                label="How Can I Help You?"
                name="comment"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your prompt here"
                value={input}
              />
              <Button
                onClick={handleSubmit}
                disabled={loading}
                loading={loading}
                text="Submit"
              />
            </Card>
          )}
        </Flex>
      </Background>
    </>
  );
};

export default AiAssistant;
