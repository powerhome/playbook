import WebpackerReact from 'webpacker-react'

import AnalyticsDashboard from '../../samples/analytics_dashboard/index.jsx'
import CrmClientList from '../../samples/crm_client_list/index.jsx'
import ConferenceStatistics from '../../samples/conference_statistics/index.jsx'
import NewsMagazine from '../../samples/news_magazine/index.jsx'
import TrendingRepositories from '../../samples//trending_repositories/index.jsx'

WebpackerReact.setup({
  AnalyticsDashboard,
  ConferenceStatistics,
  CrmClientList,
  NewsMagazine,
  TrendingRepositories,
})
