The `customOptions` prop provides comprehensive access to additional [Highcharts options](https://api.highcharts.com/highcharts/) that are not explicitly defined as props.
 It's important to note that certain options may require specific script imports to function properly.

Note: If you are having trouble getting any Highcharts options to work, please match the formatting of our [staticOptions](https://github.com/powerhome/playbook/blob/master/playbook/app/pb_kits/playbook/pb_bar_graph/_bar_graph.tsx#L85-L141). For example, `yAxis` will need to be wrapped with square brackets.

You may also need to override any of the [defaults](https://github.com/powerhome/playbook/blob/master/playbook/app/pb_kits/playbook/pb_bar_graph/_bar_graph.tsx#L45-L73) in order to get that options to work.