import { Layout, Caption, SectionSeparator } from "playbook-ui"

import { BRACKET_ROUNDS } from "./bracketConfig"
import { resolveMatchParticipants } from "./matchUtils"
import type { ApiMatch, ApiTeam, ResolvedParticipant } from "./types"

type WorldCupBracketProps = {
  matchesByNum: Map<number, ApiMatch>
  teamsByCode: Map<string, ApiTeam>
}

const BracketParticipant = (participant: ResolvedParticipant) => (
  <Layout.Participant
    avatar={participant.avatar}
    name={participant.name}
    points={participant.points}
    rank={participant.rank}
    self={participant.self}
    territory={participant.territory}
    winner={participant.winner}
  />
)

const WorldCupBracket = ({ matchesByNum, teamsByCode }: WorldCupBracketProps) => (
  <Layout layout="bracket">
    {BRACKET_ROUNDS.flatMap((round) => [
      <Layout.RoundLabel key={`${round.label}-label`}>
        <Caption>{round.label}</Caption>
        <SectionSeparator marginY="sm" />
      </Layout.RoundLabel>,
      <Layout.Round
        key={`${round.label}-round`}
        marginBottom={
          round.label === "Final" ? undefined : { xs: "md", sm: "md" }
        }
      >
        {round.matchNums.map((matchNum) => {
          const [home, away] = resolveMatchParticipants(
            matchNum,
            matchesByNum,
            teamsByCode
          )

          return (
            <Layout.Game key={matchNum}>
              <BracketParticipant {...home} />
              <BracketParticipant {...away} />
            </Layout.Game>
          )
        })}
      </Layout.Round>,
    ])}
  </Layout>
)

export default WorldCupBracket
