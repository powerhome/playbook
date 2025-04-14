import React from 'react'

import Layout from '../../pb_layout/_layout'
import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'

const teamData = {
  eagles: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Philadelphia_Eagles_logo.svg/1920px-Philadelphia_Eagles_logo.svg.png",
    name:"Eagles",
    rank:"#1 NFC East",
    territory:"PHI",
  },
  packers: {
    avatar:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Bay_Packers_logo.svg/1920px-Green_Bay_Packers_logo.svg.png",
    name:"Packers",
    rank:"#3 NFC North",
    territory:"GB",
  },
  vikings: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Minnesota_Vikings_logo.svg/1024px-Minnesota_Vikings_logo.svg.png",
    name:"Vikings",
    rank:"#2 NFC North",
    territory:"MIN",
  },
  rams: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Los_Angeles_Rams_logo.svg/1920px-Los_Angeles_Rams_logo.svg.png",
    name:"Rams",
    rank:"#1 NFC West",
    territory:"LAR",
  },
  lions: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Detroit_Lions_logo.svg/1920px-Detroit_Lions_logo.svg.png",
    name:"Lions",
    rank:"#1 NFC North",
    territory:"DET",
  },
  commanders: {
    avatar:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Washington_Commanders_logo.svg/2560px-Washington_Commanders_logo.svg.png",
    name:"Commanders",
    rank:"#2 NFC East",
    territory:"WAS",
  },
  buccaneers: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Tampa_Bay_Buccaneers_logo.svg/1920px-Tampa_Bay_Buccaneers_logo.svg.png",
    name:"Buccaneers",
    rank:"#1 NFC South",
    territory:"TB",
  },
  chiefs: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Kansas_City_Chiefs_logo.svg/2560px-Kansas_City_Chiefs_logo.svg.png",
    name:"Chiefs",
    rank:"#1 AFC West",
    territory:"KC",
  },
  chargers: {
    avatar:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Los_Angeles_Chargers_logo.svg/2560px-Los_Angeles_Chargers_logo.svg.png",
    name:"Chargers",
    rank:"#2 AFC West",
    territory:"LAC",
  },
  texans: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Houston_Texans_logo.svg/1280px-Houston_Texans_logo.svg.png",
    name:"Texans",
    rank:"#1 AFC South",
    territory:"HOU",
  },
  broncos: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Denver_Broncos_logo.svg/2560px-Denver_Broncos_logo.svg.png",
    name:"Broncos",
    rank:"#3 AFC West",
    territory:"DEN",
  },
  bills: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Buffalo_Bills_logo.svg/1920px-Buffalo_Bills_logo.svg.png",
    name:"Bills",
    rank:"#1 AFC East",
    territory:"BUF",
  },
  steelers: {
    avatar:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pittsburgh_Steelers_logo.svg/1280px-Pittsburgh_Steelers_logo.svg.png",
    name:"Steelers",
    rank:"#2 AFC North",
    territory:"PIT",
  },
  ravens: {
    avatar:"https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Baltimore_Ravens_logo.svg/2560px-Baltimore_Ravens_logo.svg.png",
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
            />
          </Layout.Game>
        </Layout.Round>
      </Layout>
    </div>
  )
}

export default LayoutBracket
