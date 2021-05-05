import WebpackerReact from 'webpacker-react'

// Search Bar Import
import KitSearch from '../docs_components/KitSearch.jsx'

// Sample Imports - Please rearrange/alphabaetize after Sample Generator appends new imports
import AnalyticsDashboard from '../../../../spec/dummy/app/views/samples/analytics_dashboard/index.jsx'
import CrmClientList from '../../../../spec/dummy/app/views/samples/crm_client_list/index.jsx'
import ConferenceStatistics from '../../../../spec/dummy/app/views/samples/conference_statistics/index.jsx'
import NewsMagazine from '../../../../spec/dummy/app/views/samples/news_magazine/index.jsx'
import TrendingRepositories from '../../../../spec/dummy/app/views/samples/trending_repositories/index.jsx'
import CrowdsourcedPosts from '../../../../spec/dummy/app/views/samples/crowdsourced_posts/index.jsx'
import CardDashboard from '../../../../spec/dummy/app/views/samples/card_dashboard/index.jsx'
import MusicApp from '../../../../spec/dummy/app/views/samples/music_app/index.jsx'

WebpackerReact.setup({
  AnalyticsDashboard,
  CardDashboard,
  ConferenceStatistics,
  CrmClientList,
  CrowdsourcedPosts,
  KitSearch,
  NewsMagazine,
  MusicApp,
  TrendingRepositories,
})
