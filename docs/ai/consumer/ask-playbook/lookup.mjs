#!/usr/bin/env node
// Looks up Playbook kit metadata from the playbook-ui installed in a repo.
// Reads node_modules/playbook-ui/dist/ai. Does not bundle a Playbook version.

import fs from "node:fs"
import path from "node:path"

function fail(message, extra = {}) {
  const payload = { ok: false, error: message, ...extra }
  process.stderr.write(`${JSON.stringify(payload, null, 2)}\n`)
  process.exit(1)
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function aiIndex(dir) {
  return path.join(dir, "node_modules", "playbook-ui", "dist", "ai", "index.json")
}

function findAiDirs(start) {
  const found = []
  const seen = new Set()
  const add = (indexFile) => {
    if (!fs.existsSync(indexFile)) return
    const aiDir = path.dirname(indexFile)
    if (seen.has(aiDir)) return
    seen.add(aiDir)
    found.push(aiDir)
  }

  let dir = path.resolve(start)
  const root = path.parse(dir).root
  while (true) {
    add(aiIndex(dir))
    if (dir === root) break
    dir = path.dirname(dir)
  }

  const componentsDir = path.join(path.resolve(start), "components")
  if (fs.existsSync(componentsDir) && fs.statSync(componentsDir).isDirectory()) {
    for (const entry of fs.readdirSync(componentsDir)) {
      add(aiIndex(path.join(componentsDir, entry)))
    }
  }

  return found
}

function normalizeKit(name) {
  return name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
}

function normalizeProp(name) {
  return name.trim().toLowerCase().replace(/[\s_-]+/g, "")
}

function loadAi(aiDir) {
  const index = readJson(path.join(aiDir, "index.json"))
  return { aiDir, index }
}

function resolveKit(index, query) {
  const names = Object.keys(index.kitMeta || {})
  const wanted = normalizeKit(query)
  const exact = names.find((name) => normalizeKit(name) === wanted)
  if (exact) return { match: exact }

  const partial = names.filter(
    (name) => name.includes(wanted) || wanted.includes(name)
  )
  if (partial.length === 1) return { match: partial[0] }
  return { candidates: partial.length > 0 ? partial : names.filter((name) => name.includes(wanted.split("_")[0])).slice(0, 8) }
}

function propSummary(props) {
  return Object.entries(props || {}).map(([name, prop]) => ({
    ...prop,
    name,
    type: prop.type ?? null,
    platforms: prop.platforms ?? [],
    values: prop.values ?? null,
    default: prop.default ?? null,
  }))
}

function relatedRules(playground, propName) {
  if (!playground) return { conditionals: {}, hints: {} }
  const key = normalizeProp(propName)
  const conditionals = {}
  for (const [name, rule] of Object.entries(playground.conditionals || {})) {
    const mentions =
      normalizeProp(name) === key ||
      JSON.stringify(rule).toLowerCase().includes(propName.toLowerCase())
    if (mentions) conditionals[name] = rule
  }
  const hints = {}
  for (const [name, hint] of Object.entries(playground.hints || {})) {
    if (JSON.stringify(hint).toLowerCase().includes(propName.toLowerCase())) hints[name] = hint
  }
  return { conditionals, hints }
}

function externalFor(aiDir, kitName) {
  const file = path.join(aiDir, "external-dependencies.json")
  if (!fs.existsSync(file)) return null
  const data = readJson(file)
  return data.kits?.[kitName] ?? null
}

function loadPlayground(aiDir, relativePath) {
  if (!relativePath) return null
  const file = path.join(aiDir, relativePath)
  if (!fs.existsSync(file)) return null
  const playground = readJson(file)
  return {
    presets: playground.presets ?? [],
    hints: playground.hints ?? {},
    conditionals: playground.conditionals ?? {},
  }
}

function loadSchema(aiDir, relativePath) {
  const file = path.join(aiDir, relativePath)
  if (!fs.existsSync(file)) fail(`Schema file not found: ${relativePath}`, { aiDir })
  return readJson(file)
}

function meta(index, aiDir) {
  return {
    ok: true,
    version: index.version ?? null,
    generated: index.generated ?? null,
    metadataVersion: index.metadataVersion ?? null,
    aiDir,
  }
}

function commandVersion(ai) {
  return {
    ...meta(ai.index, ai.aiDir),
    kitCount: Object.keys(ai.index.kitMeta || {}).length,
  }
}

function commandSearch(ai, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const scored = Object.entries(ai.index.kitMeta || {}).map(([name, kit]) => {
    const schema = kit.schema ? loadSchema(ai.aiDir, kit.schema) : {}
    const methods = schema.form?.rails?.builder?.methods || []
    const faqs = schema.faqs || []
    const haystack = `${name} ${kit.description || ""} ${kit.category || ""} ${methods.map((method) => method.name).join(" ")} ${faqs.flatMap((faq) => [...faq.questions, ...(faq.aliases || [])]).join(" ")}`.toLowerCase()
    let score = 0
    if (normalizeKit(query) === name) score += 100
    if (methods.some((method) => normalizeKit(query) === method.name)) score += 100
    if (name.includes(normalizeKit(query))) score += 40
    for (const term of terms) {
      if (haystack.includes(term)) score += 10
    }
    return { name, score, description: kit.description ?? "", category: kit.category ?? null, status: kit.status ?? null }
  })
  const matches = scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 8)
  return { ...meta(ai.index, ai.aiDir), query, matches }
}

function commandKit(ai, name) {
  const resolved = resolveKit(ai.index, name)
  if (!resolved.match) {
    return {
      ...meta(ai.index, ai.aiDir),
      ambiguous: true,
      query: name,
      candidates: resolved.candidates,
    }
  }
  const kitMeta = ai.index.kitMeta[resolved.match]
  const schema = loadSchema(ai.aiDir, kitMeta.schema)
  const playground = loadPlayground(ai.aiDir, kitMeta.playground)
  return {
    ...meta(ai.index, ai.aiDir),
    kit: resolved.match,
    description: schema.description ?? kitMeta.description ?? "",
    category: schema.category ?? kitMeta.category ?? null,
    status: schema.status ?? kitMeta.status ?? null,
    platforms: schema.platforms ?? [],
    globalProps: schema.globalProps === true,
    usage: schema.usage ?? null,
    form: schema.form ?? null,
    faqs: schema.faqs ?? [],
    externalDependency: externalFor(ai.aiDir, resolved.match),
    props: propSummary(schema.props),
    presets: playground?.presets ?? [],
    hints: playground?.hints ?? {},
    conditionals: playground?.conditionals ?? {},
  }
}

function findProp(props, query) {
  const wanted = normalizeProp(query)
  const names = Object.keys(props || {})
  const exact = names.find((name) => normalizeProp(name) === wanted)
  if (exact) return exact
  const partial = names.filter((name) => normalizeProp(name).includes(wanted))
  if (partial.length === 1) return partial[0]
  return null
}

function commandProp(ai, kitName, propName) {
  const resolved = resolveKit(ai.index, kitName)
  if (!resolved.match) {
    return {
      ...meta(ai.index, ai.aiDir),
      ambiguous: true,
      query: kitName,
      candidates: resolved.candidates,
    }
  }
  const kitMeta = ai.index.kitMeta[resolved.match]
  const schema = loadSchema(ai.aiDir, kitMeta.schema)
  const playground = loadPlayground(ai.aiDir, kitMeta.playground)
  const match = findProp(schema.props, propName)
  if (!match) {
    const globalFile = path.join(ai.aiDir, "global-props.schema.json")
    const globalProps = fs.existsSync(globalFile) ? readJson(globalFile).props || {} : {}
    const globalMatch = findProp(globalProps, propName)
    if (globalMatch && schema.globalProps === true) {
      return {
        ...meta(ai.index, ai.aiDir),
        kit: resolved.match,
        prop: globalMatch,
        source: "global",
        ...globalProps[globalMatch],
        note: "This is a global prop, available on every kit, not a kit-specific prop.",
      }
    }
    fail(`Prop "${propName}" was not found on kit "${resolved.match}" or in global props.`, {
      version: ai.index.version,
      kit: resolved.match,
      propNames: Object.keys(schema.props || {}).sort(),
      form: schema.form ?? null,
      faqs: faqsForProp(schema, propName),
    })
  }
  const rules = relatedRules(playground, match)
  return {
    ...meta(ai.index, ai.aiDir),
    kit: resolved.match,
    prop: match,
    source: "kit",
    ...schema.props[match],
    form: schema.form ?? null,
    faqs: faqsForProp(schema, match),
    conditionals: rules.conditionals,
    hints: rules.hints,
  }
}

function faqsForProp(schema, propName) {
  return (schema.faqs || []).filter((faq) =>
    (faq.props || []).some((name) => normalizeProp(name) === normalizeProp(propName))
  )
}

function commandForms(ai, methodName) {
  const relativePath = ai.index.forms
  if (!relativePath) return { ...meta(ai.index, ai.aiDir), forms: null, note: "The installed metadata does not describe form builder contracts." }
  const forms = loadSchema(ai.aiDir, relativePath)
  if (!methodName) return { ...meta(ai.index, ai.aiDir), forms }
  const method = (forms.methods || []).find(({ name }) => normalizeKit(name) === normalizeKit(methodName))
  if (normalizeKit(methodName) === "actions") return { ...meta(ai.index, ai.aiDir), builder: forms.builder, actions: forms.actions }
  if (!method) fail(`Form builder method "${methodName}" was not found.`, { version: ai.index.version, methodNames: (forms.methods || []).map(({ name }) => name) })
  const schemaPath = ai.index.kitMeta?.[method.kit]?.schema
  const schema = schemaPath ? loadSchema(ai.aiDir, schemaPath) : {}
  return { ...meta(ai.index, ai.aiDir), builder: forms.builder, method, faqs: schema.faqs || [] }
}

function commandGlobal(ai, propName) {
  const file = path.join(ai.aiDir, "global-props.schema.json")
  if (!fs.existsSync(file)) fail("global-props.schema.json was not found", { aiDir: ai.aiDir })
  const schema = readJson(file)
  if (!propName) {
    return {
      ...meta(ai.index, ai.aiDir),
      description: schema.description ?? "",
      breakpoints: schema.breakpoints ?? {},
      spacing: schema.spacing ?? {},
      warnings: schema.warnings ?? [],
      props: propSummary(schema.props),
    }
  }
  const match = findProp(schema.props, propName)
  if (!match) {
    fail(`Global prop "${propName}" was not found.`, {
      version: ai.index.version,
      propNames: Object.keys(schema.props || {}).sort(),
      form: schema.form ?? null,
      faqs: faqsForProp(schema, propName),
    })
  }
  return {
    ...meta(ai.index, ai.aiDir),
    prop: match,
    source: "global",
    ...schema.props[match],
    spacing: schema.spacing ?? {},
  }
}

function parseArgs(argv) {
  const args = []
  let root = process.cwd()
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root") {
      root = argv[i + 1]
      if (!root) fail("--root requires a directory")
      i += 1
    } else {
      args.push(argv[i])
    }
  }
  return { root, args }
}

function main() {
  const { root, args } = parseArgs(process.argv.slice(2))
  const [command, ...rest] = args
  if (!command || command === "help") {
    fail("Usage: lookup.mjs --root <repo> <version|search|kit|prop|global|forms> [args]")
  }
  if (!fs.existsSync(root)) fail(`Repo path does not exist: ${root}`)

  const aiDirs = findAiDirs(root)
  if (aiDirs.length === 0) {
    fail("playbook-ui is not installed in this repo (no dist/ai/index.json). Install dependencies, or open a repo that depends on playbook-ui.", { root: path.resolve(root) })
  }

  const ai = loadAi(aiDirs[0])
  const alsoFound = aiDirs.slice(1)
  let result
  if (command === "version") result = commandVersion(ai)
  else if (command === "search") {
    if (rest.length === 0) fail("search requires a query")
    result = commandSearch(ai, rest.join(" "))
  } else if (command === "kit") {
    if (rest.length === 0) fail("kit requires a kit name")
    result = commandKit(ai, rest.join(" "))
  } else if (command === "prop") {
    if (rest.length < 2) fail("prop requires a kit name and a prop name")
    result = commandProp(ai, rest[0], rest.slice(1).join(" "))
  } else if (command === "global") result = commandGlobal(ai, rest.join(" ") || null)
  else if (command === "forms") result = commandForms(ai, rest.join(" ") || null)
  else fail(`Unknown command "${command}"`)

  if (alsoFound.length > 0) result.alsoFound = alsoFound
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}

main()
