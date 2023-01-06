export type ThemeProps = {
    lang?: {[key: string]: string}
    credits?: {[key: string]: boolean}
    colors?: string[]
    chart?: {[key: string]: any}
    title?: {[key: string]: string | {}}
    subtitle?: {[key: string]: string | {};}
    xAxis?: {[key: string]: any;}
    yAxis?: {[key: string]: any;}
    legend?: {[key: string]: string | {};}
    labels?: {[key: string]: {};}
    tooltip?: {[key: string]: any;}
    pane?: {[key: string]: {};}
    plotOptions?: {[key: string]: any;}
    colorKey?: string
    }