import React from "react"
import { Body, Button, Flex, LoadingInline, Title } from "playbook-ui"

import WorldCupBracket from "./WorldCupBracket"
import { useWorldCupData } from "./useWorldCupData"
import "./styles.scss"

const formatUpdatedAt = (iso: string | null) => {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })
  } catch {
    return null
  }
}

export default function WorldCup() {
  const state = useWorldCupData()
  const updatedAt =
    state.status === "ready" ? formatUpdatedAt(state.data.updatedAt) : null

  return (
    <div className="worldcup-page">
      <Flex
        align="stretch"
        columnGap="none"
        flexDirection="column"
        paddingBottom="md"
        paddingTop="md"
        paddingX="md"
        rowGap="sm"
      >
        <Title size={2} tag="h1" text="2026 FIFA World Cup Bracket" />
        <Body color="light">
          Knockout results loaded on visit — refresh the page for the latest scores.
          Built with Playbook&apos;s{" "}
          <a href="/kits/layout/react#layout_bracket">Layout bracket</a> variant.
          {" "}
          Data from{" "}
          <a href="https://wheniskickoff.com/data/" rel="noreferrer" target="_blank">
            When Is Kickoff
          </a>
          .
        </Body>
        {updatedAt && (
          <Body color="light" text={`Last updated ${updatedAt}`} />
        )}
      </Flex>

      <div className="worldcup-page__bracket">
        {state.status === "loading" && (
          <Flex alignItems="center" justifyContent="center" padding="xl">
            <LoadingInline />
          </Flex>
        )}

        {state.status === "error" && (
          <Flex
            align="center"
            columnGap="sm"
            flexDirection="column"
            padding="xl"
            rowGap="sm"
          >
            <Body color="error" text={state.message} />
            <Button onClick={state.retry} text="Try again" variant="secondary" />
          </Flex>
        )}

        {state.status === "ready" && (
          <WorldCupBracket
            matchesByNum={state.data.matchesByNum}
            teamsByCode={state.data.teamsByCode}
          />
        )}
      </div>
    </div>
  )
}
