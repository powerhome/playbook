
var componentRequireContext = require.context('components', true)
var ReactRailsUJS = require('react_ujs')
// eslint-disable-next-line react-hooks/rules-of-hooks
ReactRailsUJS.useContext(componentRequireContext)

// import GraphDashboard from "../components/GraphDashboard"; // Adjust path as needed

// ReactRailsUJS.register({ GraphDashboard });
// registerReactComponent('GraphDashboard', GraphDashboard);
