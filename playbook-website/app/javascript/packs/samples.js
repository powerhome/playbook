import WebpackerReact from 'webpacker-react'

// Please rearrange/alphabaetize after Sample Generator appends new imports
// Sample Imports
import AnalyticsDashboard from '../../views/samples/analytics_dashboard'
import CrmClientList from '../../views/samples/crm_client_list'
import ConferenceStatistics from '../../views/samples/conference_statistics'
import NewsMagazine from '../../views/samples/news_magazine'
import TrendingRepositories from '../../views/samples/trending_repositories'
import CrowdsourcedPosts from '../../views/samples/crowdsourced_posts'
import CardDashboard from '../../views/samples/card_dashboard'
import MusicApp from '../../views/samples/music_app'

WebpackerReact.setup({
  AnalyticsDashboard,
  CardDashboard,
  ConferenceStatistics,
  CrmClientList,
  CrowdsourcedPosts,
  NewsMagazine,
  MusicApp,
  TrendingRepositories,
})
