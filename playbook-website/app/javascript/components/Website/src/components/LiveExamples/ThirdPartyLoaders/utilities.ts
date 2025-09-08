export type DefaultImport = { local: string; source: string }

export type ThirdPartyScope = Record<string, any>
export type ThirdPartyLoader = {
  id: string
  detect: (raw: string, defaults: DefaultImport[], sources: string[]) => boolean
  load: (raw: string, defaults: DefaultImport[], sources: string[]) => Promise<ThirdPartyScope>
}


// Helper functions
export function parseNamedImportsFor(raw: string, moduleName: string) {
  const re = new RegExp(
    String.raw`^\s*import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]${moduleName.replace('/', '\\/')}['"]\s*;?\s*$`,
    'gm'
  )
  const out: Array<{ exported: string; local: string }> = []
  for (const m of raw.matchAll(re)) {
    const inside = m[1]
    inside.split(',').forEach((chunk) => {
      const [exp, maybeAs, local] = chunk.trim().split(/\s+as\s+/)
      if (maybeAs && local) {
        out.push({ exported: exp.trim(), local: local.trim() })
      } else {
        const name = exp.trim()
        out.push({ exported: name, local: name })
      }
    })
  }
  return out
}

export function parseDefaultImports(raw: string): DefaultImport[] {
  const matches = [...raw.matchAll(/^\s*import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/gm)]
  return matches.map((m) => ({ local: m[1], source: m[2] }))
}
