import { useState } from 'react';
import { fetchChatGPTResponse } from './apiService';
import { Button, Card, Flex, Textarea, Background } from 'playbook-ui';

const AiAssistant = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await fetchChatGPTResponse(input);
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

            {response && <div><strong>Response:</strong> {response}</div>}
          </Card>
        </Flex>
      </Background>
    </>
  );
};

export default AiAssistant;
