import React from 'react'

import Layout from '../../pb_layout/_layout'
import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'

const teamData = {
  eagles: {
    avatar:"https://images.unsplash.com/photo-1628703117067-fb7c9c20946e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFnbGVzfGVufDB8fDB8fHww",
    name:"Eagles",
    rank:"#1 NFC East",
    territory:"PHI",
  },
  packers: {
    avatar:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Packers",
    rank:"#3 NFC North",
    territory:"GB",
  },
  vikings: {
    avatar:"https://images.unsplash.com/photo-1525540796810-55f9fbc5592f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZpa2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    name:"Vikings",
    rank:"#2 NFC North",
    territory:"MIN",
  },
  rams: {
    avatar:"https://images.unsplash.com/photo-1490739043913-239b6cdf4084?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Rams",
    rank:"#1 NFC West",
    territory:"LAR",
  },
  lions: {
    avatar:"https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Lions",
    rank:"#1 NFC North",
    territory:"DET",
  },
  commanders: {
    avatar:"https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Commanders",
    rank:"#2 NFC East",
    territory:"WAS",
  },
  buccaneers: {
    avatar:"https://images.unsplash.com/photo-1584116843008-46d529f04145?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Buccaneers",
    rank:"#1 NFC South",
    territory:"TB",
  },
  chiefs: {
    avatar:"https://plus.unsplash.com/premium_photo-1697729864667-57f5f29e946b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2Fuc2FzJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",
    name:"Chiefs",
    rank:"#1 AFC West",
    territory:"KC",
  },
  chargers: {
    avatar:"https://images.unsplash.com/photo-1529310399831-ed472b81d589?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Chargers",
    rank:"#2 AFC West",
    territory:"LAC",
  },
  texans: {
    avatar:"https://images.unsplash.com/photo-1545345540-ea5d968030af?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Texans",
    rank:"#1 AFC South",
    territory:"HOU",
  },
  broncos: {
    avatar:"https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Broncos",
    rank:"#3 AFC West",
    territory:"DEN",
  },
  bills: {
    avatar:"https://images.unsplash.com/photo-1575414914265-ebc9aa2637f4?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name:"Bills",
    rank:"#1 AFC East",
    territory:"BUF",
  },
  steelers: {
    avatar:"https://plus.unsplash.com/premium_photo-1697730155764-cc8ca8f78cbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl0dHNidXJnaHxlbnwwfHwwfHx8MA%3D%3D",
    name:"Steelers",
    rank:"#2 AFC North",
    territory:"PIT",
  },
  ravens: {
    avatar:"https://images.unsplash.com/photo-1433888376991-1297486ba3f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmF2ZW58ZW58MHx8MHx8fDA%3D",
    name:"Ravens",
    rank:"#1 AFC North",
    territory:"BAL",
  },
  bye: {
    avatar:"",
    name:"BYE",
    rank:"",
    territory:"",
  },
}

const LayoutBracket = () => {
  return (
    <div>
      <Layout
          layout="bracket"
      >
        <Layout.RoundLabel>
          <Caption>Wild Card</Caption>
          <SectionSeparator marginY="sm"/>
        </Layout.RoundLabel>
        <Layout.Round marginBottom={{ xs: "md", sm: "md" }}>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.packers.avatar}
                name={teamData.packers.name}
                points="10"
                rank={teamData.packers.rank}
                territory={teamData.packers.territory}
            />
            <Layout.Participant
                avatar={teamData.eagles.avatar}
                name={teamData.eagles.name}
                points="22"
                rank={teamData.eagles.rank}
                self
                territory={teamData.eagles.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.vikings.avatar}
                name={teamData.vikings.name}
                points="9"
                rank={teamData.vikings.rank}
                territory={teamData.vikings.territory}
            />
            <Layout.Participant
                avatar={teamData.rams.avatar}
                name={teamData.rams.name}
                points="27"
                rank={teamData.rams.rank}
                territory={teamData.rams.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.lions.avatar}
                name={teamData.lions.name}
                points=""
                rank={teamData.lions.rank}
                territory={teamData.lions.territory}
                winner
            />
            <Layout.Participant
                avatar={teamData.bye.avatar}
                name={teamData.bye.name}
                points=""
                rank={teamData.bye.rank}
                territory={teamData.bye.territory}
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.commanders.avatar}
                name={teamData.commanders.name}
                points="23"
                rank={teamData.commanders.rank}
                territory={teamData.commanders.territory}
                winner
            />
            <Layout.Participant
                avatar={teamData.buccaneers.avatar}
                name={teamData.buccaneers.name}
                points="20"
                rank={teamData.buccaneers.rank}
                territory={teamData.buccaneers.territory}
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.chiefs.avatar}
                name={teamData.chiefs.name}
                points=""
                rank={teamData.chiefs.rank}
                territory={teamData.chiefs.territory}
                winner
            />
            <Layout.Participant
                avatar={teamData.bye.avatar}
                name={teamData.bye.name}
                points=""
                rank={teamData.bye.rank}
                territory={teamData.bye.territory}
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.chargers.avatar}
                name={teamData.chargers.name}
                points="12"
                rank={teamData.chargers.rank}
                territory={teamData.chargers.territory}
            />
            <Layout.Participant
                avatar={teamData.texans.avatar}
                name={teamData.texans.name}
                points="32"
                rank={teamData.texans.rank}
                territory={teamData.texans.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.broncos.avatar}
                name={teamData.broncos.name}
                points="7"
                rank={teamData.broncos.rank}
                territory={teamData.broncos.territory}
            />
            <Layout.Participant
                avatar={teamData.bills.avatar}
                name={teamData.bills.name}
                points="31"
                rank={teamData.bills.rank}
                territory={teamData.bills.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.steelers.avatar}
                name={teamData.steelers.name}
                points="14"
                rank={teamData.steelers.rank}
                territory={teamData.steelers.territory}
            />
            <Layout.Participant
                avatar={teamData.ravens.avatar}
                name={teamData.ravens.name}
                points="28"
                rank={teamData.ravens.rank}
                territory={teamData.ravens.territory}
                winner
            />
          </Layout.Game>
        </Layout.Round>
        <Layout.RoundLabel>
          <Caption>Divisional</Caption>
          <SectionSeparator marginY="sm"/>
        </Layout.RoundLabel>
        <Layout.Round marginBottom={{ xs: "md", sm: "md" }}>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.rams.avatar}
                name={teamData.rams.name}
                points="22"
                rank={teamData.rams.rank}
                territory={teamData.rams.territory}
            />
            <Layout.Participant
                avatar={teamData.eagles.avatar}
                name={teamData.eagles.name}
                points="28"
                rank={teamData.eagles.rank}
                self
                territory={teamData.eagles.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.commanders.avatar}
                name={teamData.commanders.name}
                points="45"
                rank={teamData.commanders.rank}
                territory={teamData.commanders.territory}
                winner
            />
            <Layout.Participant
                avatar={teamData.lions.avatar}
                name={teamData.lions.name}
                points="31"
                rank={teamData.lions.rank}
                territory={teamData.lions.territory}
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.texans.avatar}
                name={teamData.texans.name}
                points="14"
                rank={teamData.texans.rank}
                territory={teamData.texans.territory}
            />
            <Layout.Participant
                avatar={teamData.chiefs.avatar}
                name={teamData.chiefs.name}
                points="23"
                rank={teamData.chiefs.rank}
                territory={teamData.chiefs.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.ravens.avatar}
                name={teamData.ravens.name}
                points="25"
                rank={teamData.ravens.rank}
                territory={teamData.ravens.territory}
            />
            <Layout.Participant
                avatar={teamData.bills.avatar}
                name={teamData.bills.name}
                points="27"
                rank={teamData.bills.rank}
                territory={teamData.bills.territory}
                winner
            />
          </Layout.Game>
        </Layout.Round>
        <Layout.RoundLabel>
          <Caption>Conference</Caption>
          <SectionSeparator marginY="sm"/>
        </Layout.RoundLabel>
        <Layout.Round marginBottom={{ xs: "md", sm: "md" }}>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.commanders.avatar}
                name={teamData.commanders.name}
                points="23"
                rank={teamData.commanders.rank}
                territory={teamData.commanders.territory}
            />
            <Layout.Participant
                avatar={teamData.eagles.avatar}
                name={teamData.eagles.name}
                points="55"
                rank={teamData.eagles.rank}
                self
                territory={teamData.eagles.territory}
                winner
            />
          </Layout.Game>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.bills.avatar}
                name={teamData.bills.name}
                points="29"
                rank={teamData.bills.rank}
                territory={teamData.bills.territory}
            />
            <Layout.Participant
                avatar={teamData.chiefs.avatar}
                name={teamData.chiefs.name}
                points="32"
                rank={teamData.chiefs.rank}
                territory={teamData.chiefs.territory}
                winner
            />
          </Layout.Game>
        </Layout.Round>
        <Layout.RoundLabel>
          <Caption>Super Bowl</Caption>
          <SectionSeparator marginY="sm"/>
        </Layout.RoundLabel>
        <Layout.Round>
          <Layout.Game>
            <Layout.Participant
                avatar={teamData.chiefs.avatar}
                name={teamData.chiefs.name}
                points="22"
                rank={teamData.chiefs.rank}
                territory={teamData.chiefs.territory}
            />
            <Layout.Participant
                avatar={teamData.eagles.avatar}
                name={teamData.eagles.name}
                points="40"
                rank={teamData.eagles.rank}
                self
                territory={teamData.eagles.territory}
                winner
            />
          </Layout.Game>
        </Layout.Round>
      </Layout>
    </div>
  )
}

export default LayoutBracket
