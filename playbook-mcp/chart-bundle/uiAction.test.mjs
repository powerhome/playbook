import { test } from "node:test"
import assert from "node:assert/strict"
import { interpolate, pointContext, buildUiMessage, parseAction } from "./uiAction.js"

const point = {
  category: "Q3",
  name: "Slice",
  x: 2,
  y: 1048,
  series: { name: "Revenue" },
}

test("interpolates point tokens", () => {
  const vars = pointContext(point)
  assert.equal(
    interpolate("Show {{category}} {{series}} {{value}}", vars),
    "Show Q3 Revenue 1048"
  )
})

test("builds a prompt UI action", () => {
  const message = buildUiMessage(
    { type: "prompt", prompt: "Drill into {{category}} ({{value}})" },
    point
  )
  assert.deepEqual(message, {
    type: "prompt",
    payload: { prompt: "Drill into Q3 (1048)" },
  })
})

test("builds a tool UI action with click context", () => {
  const message = buildUiMessage(
    { type: "tool", toolName: "render_kit", params: { kit: "card", label: "{{category}}" } },
    point
  )
  assert.equal(message.type, "tool")
  assert.equal(message.payload.toolName, "render_kit")
  assert.equal(message.payload.params.kit, "card")
  assert.equal(message.payload.params.label, "Q3")
  assert.equal(message.payload.params.series, "Revenue")
  assert.equal(message.payload.params.value, "1048")
})

test("builds an intent UI action", () => {
  const message = buildUiMessage(
    { type: "intent", intent: "inspect-{{series}}", params: { id: "{{category}}" } },
    point
  )
  assert.equal(message.type, "intent")
  assert.equal(message.payload.intent, "inspect-Revenue")
  assert.equal(message.payload.params.id, "Q3")
})

test("ignores unknown action types", () => {
  assert.equal(parseAction({ type: "link" }), null)
  assert.equal(buildUiMessage({ type: "none" }, point), null)
})
