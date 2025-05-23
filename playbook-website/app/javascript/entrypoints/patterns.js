import WebpackerReact from 'webpacker-react'

import GlobalPositioning from "../../views/patterns/global_positioning"
import CustomUserDisplay from "../../views/patterns/custom_user_display"
import DateRangeWithMinAndMaxDates from "../../views/patterns/date_range_with_min_and_max_dates"

WebpackerReact.registerComponents({
  GlobalPositioning,
  CustomUserDisplay,
  DateRangeWithMinAndMaxDates,
})
