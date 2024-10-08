import avatarSource from '../../../../../playbook/app/pb_kits/playbook/pb_avatar/_avatar?raw';
import badgeSource from '../../../../../playbook/app/pb_kits/playbook/pb_badge/_badge?raw';
import barGraphSource from '../../../../../playbook/app/pb_kits/playbook/pb_bar_graph/_bar_graph?raw';
import cardSource from '../../../../../playbook/app/pb_kits/playbook/pb_card/_card?raw';
import pillSource from '../../../../../playbook/app/pb_kits/playbook/pb_pill/_pill?raw';
import tableSource from '../../../../../playbook/app/pb_kits/playbook/pb_table/_table?raw';
import titleSource from '../../../../../playbook/app/pb_kits/playbook/pb_title/_title?raw';
import examplePageSource from '../../../views/samples/analytics_dashboard/index?raw';

export function avatarCode() {
    return avatarSource;
}

export function badgeCode() {
    return badgeSource;
}

export function cardCode() {
    return cardSource;
}

export function pillCode() {
    return pillSource;
}

export function tableCode() {
    return tableSource;
}

export function barGraphCode() {
    return barGraphSource;
}

export function tableExampleCode() {
    return 'import React from "react"; import { Table } from "playbook-ui"; const App = () => { return ( <Table><Table.Head><Table.Row><Table.Header>{"Column 1"}</Table.Header><Table.Header>{"Column 2"}</Table.Header><Table.Header>{"Column 3"}</Table.Header><Table.Header>{"Column 4"}</Table.Header><Table.Header>{"Column 5"}</Table.Header></Table.Row></Table.Head><Table.Body><Table.Row><Table.Cell>{"Value 1"}</Table.Cell><Table.Cell>{"Value 2"}</Table.Cell><Table.Cell>{"Value 3"}</Table.Cell><Table.Cell>{"Value 4"}</Table.Cell><Table.Cell>{"Value 5"}</Table.Cell></Table.Row><Table.Row><Table.Cell>{"Value 1"}</Table.Cell><Table.Cell>{"Value 2"}</Table.Cell><Table.Cell>{"Value 3"}</Table.Cell><Table.Cell>{"Value 4"}</Table.Cell><Table.Cell>{"Value 5"}</Table.Cell></Table.Row><Table.Row><Table.Cell>{"Value 1"}</Table.Cell><Table.Cell>{"Value 2"}</Table.Cell><Table.Cell>{"Value 3"}</Table.Cell><Table.Cell>{"Value 4"}</Table.Cell><Table.Cell>{"Value 5"}</Table.Cell></Table.Row></Table.Body></Table> ); }; export default App;'
}

export function titleCode() {
    return titleSource;
}

export async function examplePage() {
    return examplePageSource;
}
