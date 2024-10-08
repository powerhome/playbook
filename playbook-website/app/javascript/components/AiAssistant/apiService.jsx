import axios from 'axios';

const API_KEY = ''; // Replace with your OpenAI API key

export const fetchChatGPTResponse = async (prompt) => {
  const url = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  const data = {
    model: 'gpt-4o-mini', // Or whichever GPT model you're using
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
};
