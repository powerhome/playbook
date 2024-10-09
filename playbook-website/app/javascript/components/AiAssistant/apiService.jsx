import axios from 'axios';
import { examplePage, tableExampleCode, allKits } from './kitsCode';
import { designRules, genericInfo, newsLayout, tableGuidelines, territories } from './rules';

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
    const designRulesContext = Object.entries(designRules).map(([key, rules]) => (
        `For ${key}: ${rules.join(' ')}`
    )).join('\n');

    const territoriesContext = territories.map(territory => 
        `Territory ID: ${territory.id}, Name: ${territory.name}, Abbreviation: ${territory.abbreviation}`
    ).join('\n');

    const genericInfoContext = Object.entries(genericInfo).map(([key, info]) => 
        `${key}: ${info.join(' ')}`
    ).join('\n');

    const tableGuidelinesContext = tableGuidelines.map(guideline => 
        `${guideline.section}: ${guideline.description}`
    ).join('\n');

    const newsLayoutContext = newsLayout.map(layout => 
        `${layout.section}: ${layout.description}`
    ).join('\n');

    const fullContext = `
        Design Rules:
        ${designRulesContext}

        Territories:
        ${territoriesContext}

        Generic Information:
        ${genericInfoContext}

        Table Guidelines:
        ${tableGuidelinesContext}

        News Layout:
        ${newsLayoutContext}
    `;

    const data = {
        model: 'gpt-4o-mini', // Or whichever GPT model you're using
        messages: [
            {
                role: "system",
                content: "If you need to use any component, use it from the code I gave you, importing them from playbook-ui"
            },
            {
                role: "system",
                content: `If you need to use the table component, here is an example of how to use it: ${tableExampleCode()}`
            },
            { role: "system", content: fullContext },
            ...allKitsRoles,
            { role: "assistant", content: `This is how I want you to format the page: ${examplePage()}` },
            { role: "user", content: "Give me a table with 5 columns and 3 rows" },
            { role: "assistant", content: tableExampleCode() },
            { role: 'user', content: prompt },
            { role: 'user', content: "Rename the Component function to App" },
            { role: 'user', content: "Make it a functional component" },
            { role: 'user', content: "Move any const to inside the functional component" },
            { role: 'user', content: "Do not add any markdown to it" },
            { role: 'user', content: "Last line should be only render(<App />)" },
            { role: 'user', content: "Remove all the import at the top" },
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
    const designRulesContext = Object.entries(designRules).map(([key, rules]) => (
        `For ${key}: ${rules.join(' ')}`
    )).join('\n');

    const territoriesContext = territories.map(territory => 
        `Territory ID: ${territory.id}, Name: ${territory.name}, Abbreviation: ${territory.abbreviation}`
    ).join('\n');

    const genericInfoContext = Object.entries(genericInfo).map(([key, info]) => 
        `${key}: ${info.join(' ')}`
    ).join('\n');

    const tableGuidelinesContext = tableGuidelines.map(guideline => 
        `${guideline.section}: ${guideline.description}`
    ).join('\n');

    const newsLayoutContext = newsLayout.map(layout => 
        `${layout.section}: ${layout.description}`
    ).join('\n');

    const fullContext = `
        Design Rules:
        ${designRulesContext}

        Territories:
        ${territoriesContext}

        Generic Information:
        ${genericInfoContext}

        Table Guidelines:
        ${tableGuidelinesContext}

        News Layout:
        ${newsLayoutContext}
    `;

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
            { role: "system", content: fullContext },
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

