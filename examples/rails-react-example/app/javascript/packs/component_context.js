
var componentRequireContext = require.context('components', true)
var ReactRailsUJS = require('react_ujs')
// eslint-disable-next-line react-hooks/rules-of-hooks
ReactRailsUJS.useContext(componentRequireContext)

import WebpackerReact from "webpacker-react";
import GraphDashboard from "../components/GraphDashboard"; // Ensure the path is correct

// Register GraphDashboard with Webpacker-React
WebpackerReact.setup({ GraphDashboard });
