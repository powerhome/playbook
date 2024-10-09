import { useState } from "react"
import axios from "axios" // Import axios
import { fetchChatGPTResponse } from "./apiService"
import {
  Button,
  Card,
  Flex,
  FlexItem,
  Textarea,
  Background,
  Body,
  Title,
  Nav,
  NavItem,
  Caption,
} from "playbook-ui"
import KitResponse from "./kitResponse"
import AINav from "./nav"
import Messages from "./messages"
import Logo from "../../images/Logo.svg"

const AiAssistant = ({ apiKey }) => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)

  // Retrieve the CSRF token from the meta tag in the HTML
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content")

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search)
    return {
      project: params.get("project"),
    }
  }

  const { project } = getQueryParams()

  const handleChildClick = (id) => {
    // alert('Child component clicked!');
    console.log(id)
    setCurrentProject(id)
  }

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
      )

      console.log(projectResponse)

      await axios.post(
        "/messages",
        {
          project_id: projectResponse.data.id,
          user_input: projectResponse.data.summary,
          code: chatResponse,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
        }
      )
      // Post response to messages
    } catch (error) {
      console.error("Error fetching or posting response:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Flex>
        <div style={{ height: "100vh", backgroundColor: "white" }}>
          <Flex alignItems='center' justifyContent='center' paddingTop='xl'>
            <Button
              marginRight='lg'
              onClick={() => alert("button clicked!")}
              tabIndex={0}
              text='New Design'
              variant='secondary'
              icon='edit'
            />
          </Flex>

          <AINav onChildClick={handleChildClick} project={project} currentProject={currentProject} apiKey={apiKey} />
        </div>
        <FlexItem>
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
                <img src={Logo} alt='Playmaker Logo' />
                <Card
                  marginTop='xl'
                  padding='md'
                  htmlOptions={{ style: { width: "700px" } }}
                >
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
        </FlexItem>
      </Flex>
      <Background display='flex' backgroundColor='grey'></Background>
      <style>
        {`
          [class^=pb_layout_kit][class*=_content] {
            grid-template-areas: none;
          }
        `}
      </style>
    </>
  )
}

export default AiAssistant
