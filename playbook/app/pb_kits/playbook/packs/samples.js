import WebpackerReact from 'webpacker-react'

// Search Bar Import
import KitSearch from '../docs_components/KitSearch.jsx'

// Sample Imports - Please rearrange/alphabaetize after Sample Generator appends new imports
import AnalyticsDashboard from '../../../views/playbook/samples/analytics_dashboard/index.jsx'
import CrmClientList from '../../../views/playbook/samples/crm_client_list/index.jsx'
import ConferenceStatistics from '../../../views/playbook/samples/conference_statistics/index.jsx'
import NewsMagazine from '../../../views/playbook/samples/news_magazine/index.jsx'
import TrendingRepositories from '../../../views/playbook/samples/trending_repositories/index.jsx'
import CrowdsourcedPosts from '../../../views/playbook/samples/crowdsourced_posts/index.jsx'
import CardDashboard from '../../../views/playbook/samples/card_dashboard/index.jsx'

WebpackerReact.setup({
  AnalyticsDashboard,
  CardDashboard,
  ConferenceStatistics,
  CrmClientList,
  CrowdsourcedPosts,
  KitSearch,
  NewsMagazine,
  TrendingRepositories,
})
