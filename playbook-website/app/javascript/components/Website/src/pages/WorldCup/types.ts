export type ApiMatch = {
  num: number
  date: string
  time_utc?: string
  home: string | null
  away: string | null
  home_name?: string
  away_name?: string
  phase: string
  status?: string
  score_home?: number
  score_away?: number
  datetime_utc?: string
  label?: string
}

export type ApiTeam = {
  code: string
  name: string
  group: string
  confederation: string
}

export type BracketRound = {
  label: string
  matchNums: number[]
}

export type ResolvedParticipant = {
  avatar: string
  name: string
  points: string
  rank: string
  territory: string
  winner?: boolean
  self?: boolean
}
