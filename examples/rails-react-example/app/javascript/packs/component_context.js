
var componentRequireContext = require.context('components', true)
var ReactRailsUJS = require('react_ujs')
// eslint-disable-next-line react-hooks/rules-of-hooks
ReactRailsUJS.useContext(componentRequireContext)
