import axios from 'axios';
import { examplePage, tableExampleCode, allKits, exampleFormatCode } from './kitsCode';

export const fetchChatGPTResponse = async (prompt, apiKey) => {
    const url = 'https://api.openai.com/v1/chat/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    let allKitsRoles = []
    const allKitsCode = await allKits();
    allKitsCode.forEach((kit) => {
        allKitsRoles.push({ role: "assistant", content: kit });
    });

    const data = {
        model: 'gpt-4o-mini', // Or whichever GPT model you're using
        messages: [
            { role: "system", content: "Only give me code as a response" },
            { role: "system", content: "remove all imports from the top and only give funtional components, no arrow functions" },
            {
                role: "system",
                content: "If you need to use any component, use it from the code I gave you, importing them from playbook-ui"
            },
            {
                role: "system",
                content: `If you need to use the table component, here is an example of how to use it: ${tableExampleCode()}`
            },
            ...allKitsRoles,
            { role: "assistant", content: `This is how I want you to format the page: ${examplePage()}` },
            { role: "user", content: "Give me a table with 5 columns and 3 rows" },
            { role: "assistant", content: tableExampleCode() },
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

export const fetchIteration = async (prompt, previousCode, apiKey) => {
    const url = 'https://api.openai.com/v1/chat/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    let allKitsRoles = []
    const allKitsCode = await allKits();
    allKitsCode.forEach((kit) => {
        allKitsRoles.push({ role: "assistant", content: kit });
    });

    const data = {
        model: 'gpt-4o-mini', // Or whichever GPT model you're using
        messages: [
            { role: "system", content: "Only give me code as a response" },
            {
                role: "system",
                content: "If you need to use any component, use it from the code I gave you, importing them from playbook-ui"
            },
            {
                role: "system",
                content: `If you need to use the table component, here is an example of how to use it: ${tableExampleCode()}`
            },
            ...allKitsRoles,
            { role: "assistant", content: `This is how I want you to format the page: ${examplePage()}` },
            { role: "user", content: "Give me a table with 5 columns and 3 rows" },
            { role: "assistant", content: tableExampleCode() },
            // Show previous code
            { role: 'user', content: previousCode },
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

