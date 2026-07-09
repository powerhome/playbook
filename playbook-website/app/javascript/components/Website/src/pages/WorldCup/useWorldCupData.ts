import { useCallback, useEffect, useState } from "react"

import { WORLDCUP_DATA_URL } from "./bracketConfig"
import type { ApiMatch, ApiTeam } from "./types"

type WorldCupData = {
  matchesByNum: Map<number, ApiMatch>
  teamsByCode: Map<string, ApiTeam>
  updatedAt: string | null
}

type WorldCupState =
  | { status: "loading" }
  | { status: "error"; message: string; retry: () => void }
  | { status: "ready"; data: WorldCupData }

let sessionCache: WorldCupData | null = null

const parsePayload = async (): Promise<WorldCupData> => {
  if (sessionCache) {
    return sessionCache
  }

  const response = await fetch(WORLDCUP_DATA_URL)

  if (!response.ok) {
    throw new Error("Could not load World Cup data")
  }

  const json = await response.json()

  if (json.error) {
    throw new Error(json.error)
  }

  sessionCache = {
    matchesByNum: new Map<number, ApiMatch>(
      (json.matches.data as ApiMatch[]).map((match) => [match.num, match])
    ),
    teamsByCode: new Map<string, ApiTeam>(
      (json.teams.data as ApiTeam[]).map((team) => [team.code, team])
    ),
    updatedAt: json.updated_at ?? json.matches?.meta?.generated ?? null,
  }

  return sessionCache
}

export const useWorldCupData = (): WorldCupState => {
  const [state, setState] = useState<WorldCupState>({ status: "loading" })

  const load = useCallback(async () => {
    setState({ status: "loading" })

    try {
      const data = await parsePayload()
      setState({ status: "ready", data })
    } catch (error) {
      sessionCache = null
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Could not load World Cup data",
        retry: () => {
          sessionCache = null
          load()
        },
      })
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return state
}
