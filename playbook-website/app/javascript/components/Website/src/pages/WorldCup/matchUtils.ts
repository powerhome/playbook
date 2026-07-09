import { FEEDER_MATCHES } from "./bracketConfig"
import { flagUrl, isUnitedStates } from "./teamFlags"
import type { ApiMatch, ApiTeam, ResolvedParticipant } from "./types"

const TBD: ResolvedParticipant = {
  avatar: "",
  name: "TBD",
  points: "",
  rank: "",
  territory: "",
}

const isFinished = (match?: ApiMatch) =>
  match?.status === "FINISHED" &&
  match.score_home != null &&
  match.score_away != null

export const getWinnerCode = (match?: ApiMatch): string | null => {
  if (!isFinished(match) || !match) return null
  if (match.score_home! > match.score_away!) return match.home
  if (match.score_away! > match.score_home!) return match.away
  return null
}

const participantFromCode = (
  code: string | null | undefined,
  name: string | undefined,
  teamsByCode: Map<string, ApiTeam>,
  match: ApiMatch | undefined,
  side: "home" | "away"
): ResolvedParticipant => {
  if (!code && !name) return TBD

  const team = code ? teamsByCode.get(code) : undefined
  const displayName = name || team?.name || "TBD"
  const finished = isFinished(match)
  const score =
    side === "home" ? match?.score_home : match?.score_away
  const homeWins = finished && match!.score_home! > match!.score_away!
  const awayWins = finished && match!.score_away! > match!.score_home!
  const winner = side === "home" ? homeWins : awayWins

  return {
    avatar: flagUrl(code),
    name: displayName,
    points: finished && score != null ? String(score) : "",
    rank: team ? `Group ${team.group}` : "",
    territory: team?.confederation || "",
    winner: winner || undefined,
    self: isUnitedStates(code, displayName) || undefined,
  }
}

export const resolveMatchParticipants = (
  matchNum: number,
  matchesByNum: Map<number, ApiMatch>,
  teamsByCode: Map<string, ApiTeam>
): [ResolvedParticipant, ResolvedParticipant] => {
  const match = matchesByNum.get(matchNum)

  if (match?.home && match?.away) {
    return [
      participantFromCode(match.home, match.home_name, teamsByCode, match, "home"),
      participantFromCode(match.away, match.away_name, teamsByCode, match, "away"),
    ]
  }

  const feeders = FEEDER_MATCHES[matchNum]
  if (!feeders) {
    return [TBD, TBD]
  }

  const [feederA, feederB] = feeders
  const feederMatchA = matchesByNum.get(feederA)
  const feederMatchB = matchesByNum.get(feederB)
  const winnerA = getWinnerCode(feederMatchA)
  const winnerB = getWinnerCode(feederMatchB)

  const sideA = winnerA
    ? participantFromCode(
        winnerA,
        winnerA === feederMatchA?.home
          ? feederMatchA.home_name
          : feederMatchA?.away_name,
        teamsByCode,
        match,
        "home"
      )
    : TBD

  const sideB = winnerB
    ? participantFromCode(
        winnerB,
        winnerB === feederMatchB?.home
          ? feederMatchB.home_name
          : feederMatchB?.away_name,
        teamsByCode,
        match,
        "away"
      )
    : TBD

  return [sideA, sideB]
}
