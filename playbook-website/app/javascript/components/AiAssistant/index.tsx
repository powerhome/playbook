
import { useState } from "react";
import axios from "axios"; // Import axios
import { fetchChatGPTResponse } from "./apiService";
import {
  Button,
  Card,
  Flex,
  Textarea,
  Background,
  Body,
  Layout,
  Title,
  Nav,
  NavItem,
  Caption,
} from "playbook-ui"
import KitResponse from "./kitResponse";
import AINav from "./nav";
import Messages from "./messages"

const AiAssistant = ({ apiKey }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);


  // Retrieve the CSRF token from the meta tag in the HTML
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content")

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      project: params.get('project'),
    };
  };

  const { project } = getQueryParams();

  const handleChildClick = (id) => {
    // alert('Child component clicked!');
    console.log(id)
    setCurrentProject(id)
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Fetch the response from ChatGPT
      const data = await fetchChatGPTResponse(input, apiKey)
      const chatResponse = data.choices[0].message.content
      setResponse(chatResponse)

      // Post the response to your Rails app's Message model with the CSRF token
      const projectResponse = await axios.post(
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

      console.log(projectResponse)

      await axios.post(
        "/messages",
        {
          project_id: projectResponse.data.id,
          code: chatResponse,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );
      // Post response to messages
    } catch (error) {
      console.error("Error fetching or posting response:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Layout layout='content'>
        <Layout.Side>
          <AINav onChildClick={handleChildClick} />
          <Messages project={project} currentProject={currentProject} />
        </Layout.Side>
        <Layout.Body>
          <Flex
            grow
            orientation='column'
            justify='center'
            align='center'
            htmlOptions={{ style: { height: "100vh" } }}
          >
            {response ? (
              <Body>
                <KitResponse response={response} />
              </Body>
            ) : (
              <>
                <Body paddingBottom='lg' color="lighter">Generate UI from simple text</Body>
                <Card padding='md' htmlOptions={{ style: { width: "700px" } }}>
                  <Title size={3} paddingBottom='lg'>
                    Let's get started
                  </Title>
                  <Caption paddingBottom='xs'>
                    What device are you designing for?
                  </Caption>
                  <Nav
                    paddingBottom='lg'
                    link='#'
                    orientation='horizontal'
                    variant='subtle'
                  >
                    <NavItem active link='#' text='Desktop' />
                    <NavItem link='#' text='Tablet' />
                    <NavItem link='#' text='Mobile' />
                  </Nav>
                  <Textarea
                    label='Tell us about the problem you are solving'
                    name='comment'
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='For the [Project Name], I’d like to use AI to design a layout that meets our key project requirements, such as prioritized features, user interactions, and any specific technical constraints like deadlines or platform dependencies. The layout should focus on our target audience, reflect the desired aesthetic, and include critical content elements.'
                    value={input}
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    loading={loading}
                    text='Generate Design'
                  />
                </Card>
              </>
            )}
          </Flex>
        </Layout.Body>
      </Layout>
      <Background display='flex' backgroundColor='grey'></Background>
    </>
  )
}

export default AiAssistant