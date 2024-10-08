import { Avatar, Badge, Card, Pill, Table, Title } from "playbook-ui";
async function kitCode(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.text();
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export async function avatarCode() {
    return Avatar.toString();
}

export async function badgeCode() {
    return Badge.toString();
}

export async function cardCode() {
    return Card.toString();
}

export async function pillCode() {
    return Pill.toString();
}

export async function tableCode() {
    return Table.toString();
}

export function tableExampleCode() {
    return 'import React from "react"; import { Table } from "playbook-ui"; const App = () => { return ( <Table><Table.Head><Table.Row><Table.Header>{"Column 1"}</Table.Header><Table.Header>{"Column 2"}</Table.Header><Table.Header>{"Column 3"}</Table.Header><Table.Header>{"Column 4"}</Table.Header><Table.Header>{"Column 5"}</Table.Header></Table.Row></Table.Head><Table.Body><Table.Row><Table.Cell>{"Value 1"}</Table.Cell><Table.Cell>{"Value 2"}</Table.Cell><Table.Cell>{"Value 3"}</Table.Cell><Table.Cell>{"Value 4"}</Table.Cell><Table.Cell>{"Value 5"}</Table.Cell></Table.Row><Table.Row><Table.Cell>{"Value 1"}</Table.Cell><Table.Cell>{"Value 2"}</Table.Cell><Table.Cell>{"Value 3"}</Table.Cell><Table.Cell>{"Value 4"}</Table.Cell><Table.Cell>{"Value 5"}</Table.Cell></Table.Row><Table.Row><Table.Cell>{"Value 1"}</Table.Cell><Table.Cell>{"Value 2"}</Table.Cell><Table.Cell>{"Value 3"}</Table.Cell><Table.Cell>{"Value 4"}</Table.Cell><Table.Cell>{"Value 5"}</Table.Cell></Table.Row></Table.Body></Table> ); }; export default App;'
}

export async function titleCode() {
    return Title.toString();
}

export async function examplePage() {
    const url = "https://raw.githubusercontent.com/powerhome/playbook/master/playbook-website/app/views/samples/analytics_dashboard/index.jsx";
    return await kitCode(url);
}
