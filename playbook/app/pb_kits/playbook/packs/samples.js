import WebpackerReact from 'webpacker-react'

import AnalyticsDashboard from '../../../views/playbook/samples/analytics_dashboard/index.jsx'
import CrmClientList from '../../../views/playbook/samples/crm_client_list/index.jsx'
import ConferenceStatistics from '../../../views/playbook/samples/conference_statistics/index.jsx'
import NewsMagazine from '../../../views/playbook/samples/news_magazine/index.jsx'
import TrendingRepositories from '../../../views/playbook/samples/trending_repositories/index.jsx'
import CrowdsourcedPosts from '../../../views/playbook/samples/crowdsourced_posts/index.jsx'

WebpackerReact.setup({ 
  AnalyticsDashboard,
  CrmClientList,
  ConferenceStatistics,
  NewsMagazine,
  TrendingRepositories,
  CrowdsourcedPosts,
})
