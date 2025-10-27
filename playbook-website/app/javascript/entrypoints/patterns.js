import '../utilities/mountComponent'
import ComponentRegistry from '../utilities/componentRegistry'

import GlobalPositioning from "../../views/patterns/global_positioning"
import CustomUserDisplay from "../../views/patterns/custom_user_display"
import TableFilterCard from "../../views/patterns/table_filter_card"
import AlertBanner from "../../views/patterns/alert_banner"

ComponentRegistry.registerComponents({
  GlobalPositioning,
  CustomUserDisplay,
  TableFilterCard,
  AlertBanner,
})
