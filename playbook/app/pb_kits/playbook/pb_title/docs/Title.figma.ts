// url=https://www.figma.com/design/Zj4FIeaa9fyMn2LcuL15hG/Playbook-Design-System-Library?node-id=98-815
import figma from "figma"

function rubyProp(name: string, value: unknown): string {
  if (value === undefined || value === null) return ""
  if (typeof value === "boolean") return `${name}: ${value}`
  if (typeof value === "number") return `${name}: ${value}`
  return `${name}: "${value}"`
}

const instance = figma.currentLayer
const textLayer = instance.findText("@text")
const text = textLayer && textLayer.type === "TEXT" ? textLayer.textContent : ""
const size = instance.getEnum("Size", {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
})
const color = instance.getEnum("Color", {
  default: "default",
  light: "light",
  lighter: "lighter",
  link: "link",
  success: "success",
  error: "error",
})
const bold = instance.getEnum("Bold", {
  true: true,
  false: false,
})

const props = [
  rubyProp("text", text),
  rubyProp("size", size),
  rubyProp("color", color),
  rubyProp("bold", bold),
].filter(Boolean).join(", ")

export default {
  id: "pb-title-rails",
  example: figma.code`<%= pb_rails("title", props: { ${props} }) %>`,
  metadata: { nestable: true },
}
