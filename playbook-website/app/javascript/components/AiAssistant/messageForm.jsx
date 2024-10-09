import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { fetchChatGPTResponse, fetchIteration, describeCode } from "./apiService";
import { Background, Body, Button, Card, CircleIconButton, Flex, SectionSeparator, Textarea } from "playbook-ui";
import KitResponse from "./kitResponse";
import AINav from "./nav";
import Messages from "./messages"

const MessageForm = ({ projectId, apiKey, messages }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content")

  const handleSubmit = async () => {
    setLoading(true)

    console.log("submitting a message!", projectId)

    const previousMessage = messages[messages.length - 1]

    try {

      console.log(previousMessage)
      const data = await fetchIteration(input, previousMessage.code, apiKey)
      const chatResponse = data.choices[0].message.content
      setResponse(chatResponse)


      console.log(chatResponse)
      console.log("before posting a message")

      const descriptionData = await describeCode(previousMessage.code, chatResponse, apiKey)
      const descriptionChatResponse = descriptionData.choices[0].message.content

      console.log(descriptionChatResponse)

      await axios.post(
        "/messages",
        {
          project_id: projectId,
          user_input: input,
          code: chatResponse,
          ai_response: descriptionChatResponse,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("after posting a message")

      // Fetch the response from ChatGPT
      // const data = await fetchChatGPTResponse(input, apiKey)
      // const chatResponse = data.choices[0].message.content
      // setResponse(chatResponse)

      // await axios.post(
      //   "/messages",
      //   {
      //     project_id: projectResponse.data.id,
      //     code: chatResponse,
      //   },
      //   {
      //     headers: {
      //       "X-CSRF-Token": csrfToken,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // Post response to messages
    } catch (error) {
      console.error("Error fetching or posting response:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SectionSeparator/>
      <Flex   
        alignItems="center"  
        display="flex"
        justifyContent="center"
        position="relative"
      >
        <Textarea
          alignItems="center"
          inline
          name='comment'
          onChange={(e) => setInput(e.target.value)}
          marginTop="md"
          placeholder='Refine your results'
          shadow="deep"
          htmlOptions={{ style: { width: "300px" } }}
          value={input}
        />
        <CircleIconButton 
          bottom={{ inset: true, value: "md" }}
          icon="paper-plane" 
          disabled={loading}
          loading={loading}
          onClick={handleSubmit}
          position="absolute"
          right={{ inset: true, value: "md" }}
          variant="secondary"
        />
      </Flex>
    </>
  );
};

export default MessageForm;
