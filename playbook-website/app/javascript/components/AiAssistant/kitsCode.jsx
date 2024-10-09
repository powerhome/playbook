import examplePageSource from '../../../views/samples/analytics_dashboard/index?raw';
import tableExampleSource from '../../../../../playbook/app/pb_kits/playbook/pb_table/docs/_table_with_subcomponents?raw';


export async function allKits() {
    const componentFiles = import.meta.glob('../../../../../playbook/app/pb_kits/playbook/*/*.tsx', { as: 'raw' });
    let files = [];
    for (const path in componentFiles) {
        const content = await componentFiles[path]();
        files.push(content);
    }

    return files;
}

export function tableExampleCode() {
    return tableExampleSource;
}

export function examplePage() {
    return examplePageSource;
}

