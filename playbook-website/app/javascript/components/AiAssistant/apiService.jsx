import axios from 'axios';
import { avatarCode, badgeCode, cardCode, examplePage, pillCode, tableCode, tableExampleCode, titleCode, barGraphCode } from './kitsCode';

export const fetchChatGPTResponse = async (prompt, apiKey) => {
    const url = 'https://api.openai.com/v1/chat/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
        model: 'gpt-4o-mini', // Or whichever GPT model you're using
        messages: [
            { role: "system", content: "Only give me code as a response" },
            {
                role: "system",
                content: "If you need to use avatar, badge, card, pill, table, or title, use it from the code I gave you, importing them from playbook-ui"
            },
            {
                role: "system",
                content: "If you need to use the table component, here is an example of how to use it: #{table_example_code}"
            },
            { role: "assistant", content: await avatarCode() },
            { role: "assistant", content: await badgeCode() },
            { role: "assistant", content: await cardCode() },
            { role: "assistant", content: await pillCode() },
            { role: "assistant", content: await tableCode() },
            { role: "assistant", content: await titleCode() },
            { role: "assistant", content: await barGraphCode() },
            { role: "assistant", content: `This is how I want you to format the page: ${await examplePage()}` },
            { role: "user", content: "Give me a table with 5 columns and 3 rows" },
            { role: "assistant", content: await tableExampleCode() },
            { role: 'user', content: prompt }
        ],
        max_tokens: 4096,
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw error;
    }
};
