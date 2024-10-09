import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { fetchChatGPTResponse } from "./apiService";
import { Button, Card, Flex, Textarea, Background, Body } from "playbook-ui";
import KitResponse from "./kitResponse";
import AINav from "./nav";
import Messages from "./messages"

const MessageForm = ({ projectId, apiKey }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content")

  const handleSubmit = async () => {
    setLoading(true)

    console.log("submitting a message!", projectId)
    try {
      
      await axios.post(
        "/messages",
        {
          project_id: projectId,
          code: input,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );

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
      {/* <div>ID: {projectId}</div> */}
      <div>funny animal name: {projectId}</div>
      <Textarea
        label='Tell us about the problem you are solving'
        name='comment'
        onChange={(e) => setInput(e.target.value)}
        placeholder='Continue?'
        value={input}
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        loading={loading}
        text='Generate Design'
      />
    </>
  );
};

export default MessageForm;
