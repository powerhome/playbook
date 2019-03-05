import Table from "pb_table/_table.jsx";

// Examples
import TableSM from "pb_table/docs/examples/_table_sm.jsx";
import TableMD from "pb_table/docs/examples/_table_md.jsx";
import TableLG from "pb_table/docs/examples/_table_lg.jsx";
import TableContainer from "pb_table/docs/examples/_table_container.jsx";
import TableDark from "pb_table/docs/examples/_table_dark.jsx";
import TableContainerDark from "pb_table/docs/examples/_table_container_dark.jsx";
import TableDisableHover from "pb_table/docs/examples/_table_disable_hover.jsx";
import TableSingleLine from "pb_table/docs/examples/_table_single_line.jsx";
import TableMultiline from "pb_table/docs/examples/_table_multiline.jsx";

import WebpackerReact from "webpacker-react";

WebpackerReact.setup({ Table,
    TableSM,
    TableMD,
    TableLG,
    TableContainer,
    TableDark,
    TableContainerDark,
    TableDisableHover,
    TableSingleLine,
    TableMultiline });
