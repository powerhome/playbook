import { useEffect, useMemo, useState } from 'react'
import { Typeahead, Badge, Flex } from 'playbook-ui'
import { matchSorter } from 'match-sorter'
import { useDarkMode } from '../contexts/DarkModeContext'

type Kit = {
  label: string,
  platforms?: string[],
  props?: KitProp[],
  searchTerms?: string[],
  value: string,
  type?: string,
}

type KitProp = {
  name: string,
  platforms: string[],
}

type KitSearchProps = {
  classname: string,
  kits: Kit[],
  id: string,
  platform?: string,
  global_props_and_tokens?: Record<string, any>,
  marginBottom?: string,
  onNavigate?: (path: string) => void,
  searchResetKey?: string,
}

const putPropsLast = (items: Kit[]): Kit[] => [
  ...items.filter(({ type }) => type !== 'prop'),
  ...items.filter(({ type }) => type === 'prop'),
]

const normalizePropName = (name: string): string =>
  name.replace(/[_-]/g, '').toLowerCase()

const kitPropBadge = (platforms: string[]): string => {
  const supportsReact = platforms.includes('react')
  const supportsRails = platforms.includes('rails')

  if (supportsReact && supportsRails) return 'Kit Prop (React & Rails)'
  if (supportsReact) return 'Kit Prop (React)'
  if (supportsRails) return 'Kit Prop (Rails)'
  return 'Kit Prop'
}

const kitPropItems = (kit: Kit): Kit[] => {
  const propsByName = new Map<string, { name: string, platforms: Set<string>, searchTerms: Set<string> }>()

  kit.props?.forEach(({ name, platforms }) => {
    const normalizedName = normalizePropName(name)
    const prop = propsByName.get(normalizedName) || {
      name,
      platforms: new Set<string>(),
      searchTerms: new Set<string>(),
    }
    const supportedPlatforms = platforms.length > 0 ? platforms : ['react', 'rails']

    supportedPlatforms.forEach((supportedPlatform) => prop.platforms.add(supportedPlatform))
    prop.searchTerms.add(name)
    propsByName.set(normalizedName, prop)
  })

  return Array.from(propsByName.values()).map(({ name, platforms, searchTerms }) => ({
    label: `${name} (${kit.label})`,
    platforms: Array.from(platforms),
    searchTerms: Array.from(searchTerms),
    type: 'prop',
    value: kit.value,
  }))
}

const combineKitsandVisualGuidelines = (
  kits: Kit[],
  global_props_and_tokens?: Record<string, any>,
): Kit[] => {
  const propItems = kits.flatMap(kitPropItems)

  const globalPropsItems = global_props_and_tokens?.global_props?.map((item: string) => ({
    label: item.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()),
    value: `/global_props/${item}`,
    type: 'global_prop'
  })) || []

  const tokensItems = global_props_and_tokens?.tokens?.map((item: string) => ({
    label: item.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()),
    value: `/tokens/${item}`,
    type: 'token'
  })) || []
  
  const items = [...kits, ...globalPropsItems, ...tokensItems, ...propItems]
    .sort((a, b) => a.label.localeCompare(b.label))

  return putPropsLast(items)
}

const normalizePathForPlatform = (path: string, platform: string) => {
  if (!path || !path.startsWith('/')) return path

  if (path.startsWith('/global_props/') || path.startsWith('/tokens/')) {
    return path
  }

  if (path.startsWith('/kit_category/')) {
    const [pathname, rawQuery = ''] = path.split('?')
    const params = new URLSearchParams(rawQuery)
    params.set('type', platform)
    return `${pathname}?${params.toString()}`
  }

  if (path.startsWith('/kits/')) {
    if (/\/(react|rails)$/.test(path)) {
      return path.replace(/\/(react|rails)$/, `/${platform}`)
    }

    return `${path}/${platform}`
  }

  return path
}

const KitSearch = ({ classname, id, kits, platform = 'react', global_props_and_tokens, marginBottom, onNavigate, searchResetKey }: KitSearchProps) => {
  const kitsAndGuidelines = useMemo(
    () => combineKitsandVisualGuidelines(kits, global_props_and_tokens),
    [kits, global_props_and_tokens],
  )
  const { darkMode } = useDarkMode()
  const [query, setQuery] = useState('')
  const filteredKits = useMemo(() => {
    if (!query) return kitsAndGuidelines

    return putPropsLast(matchSorter(kitsAndGuidelines, query, { keys: ['label', 'searchTerms'] }))
  }, [kitsAndGuidelines, query])

  useEffect(() => {
    if (id === 'desktop-kit-search') {
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          const kitSearch = document.querySelector('#desktop-kit-search #react-select-2-input') as HTMLInputElement
          kitSearch === document.activeElement ? kitSearch.blur() : kitSearch.focus()
        }
      })
    }
  }, [ id ])

  const handleChange = (selection: Kit | null) => {
    if (selection) {
      const selectedPlatform = selection.type === 'prop' && selection.platforms?.length === 1
        ? selection.platforms[0]
        : platform
      const nextPath = normalizePathForPlatform(selection.value, selectedPlatform)

      if (onNavigate) {
        onNavigate(nextPath)
      } else {
        window.location.href = nextPath
      }
    }
  }

  const handleFilteredKits = (query: string) => {
    setQuery(query)
  }

  const Item = ({ labelLeft, platforms = [], type }: { labelLeft: string, platforms?: string[], type: string }) => (
    <Flex alignItems="center" justify="between">
        {labelLeft}
        <Badge
          dark={darkMode}
          margin="xs"
          text={type === 'global_prop'
            ? 'Global Prop'
            : type === 'prop'
              ? kitPropBadge(platforms)
              : 'Token'}
          variant="primary"
        />
    </Flex>
  )

  return (
      <Typeahead
        key={`${id}__${searchResetKey ?? ''}`}
        className={classname}
        dark={darkMode}
        filterOption={() => true}
        id={id}
        marginBottom={marginBottom || 'sm'}
        onChange={handleChange}
        onInputChange={handleFilteredKits}
        options={filteredKits}
        placeholder="Search..."
        valueComponent={(option: Kit) => {
          if (option.type === 'global_prop' || option.type === 'prop' || option.type === 'token') {
            return <Item labelLeft={option.label} platforms={option.platforms} type={option.type} />
          }
          return <>{option.label}</>
        }}
      />
  )
}

export default KitSearch
