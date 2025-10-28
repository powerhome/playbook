import '../utilities/mountComponent'
import ComponentRegistry from '../utilities/componentRegistry'

import GlobalPositioning from "../../views/building_blocks/global_positioning"
import CustomUserDisplay from "../../views/building_blocks/custom_user_display"
import TableFilterCard from "../../views/building_blocks/table_filter_card"
import AlertBanner from "../../views/building_blocks/alert_banner"

ComponentRegistry.registerComponents({
  GlobalPositioning,
  CustomUserDisplay,
  TableFilterCard,
  AlertBanner,
})
