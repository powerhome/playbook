import { useEffect, useState } from 'react'
import { Typeahead, Badge, Flex } from 'playbook-ui'
import { matchSorter } from 'match-sorter'
import { useDarkMode } from './Website/src/contexts/DarkModeContext'

type Kit = {
  label: string,
  value: string,
  type?: string,
}

type KitSearchProps = {
  classname: string,
  kits: Kit[],
  id: string,
  global_props_and_tokens?: Record<string, any>,
  marginBottom?: string,
  beta?: boolean,
  onBetaNavigate?: (path: string) => void,
  /** When set with `beta`, remounts Typeahead on navigation so query/selection clears (e.g. pathname+search from useLocation). */
  betaSearchResetKey?: string,
}

const combineKitsandVisualGuidelines = (
  kits: Kit[],
  global_props_and_tokens?: Record<string, any>,
): Kit[] => {
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
  
  return [...kits, ...globalPropsItems, ...tokensItems].sort((a, b) => a.label.localeCompare(b.label))
}

const KitSearch = ({ classname, id, kits, global_props_and_tokens, marginBottom, beta, onBetaNavigate, betaSearchResetKey }: KitSearchProps) => {
  const kitsAndGuidelines = combineKitsandVisualGuidelines(kits, global_props_and_tokens)
  const { darkMode } = useDarkMode();
  const [filteredKits, setFilteredKits] = useState(kitsAndGuidelines)

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

  const handleChange = (selection: any) => {
    if (selection) {
      const path = beta ? `/beta${selection.value}` : selection.value
      if (beta && onBetaNavigate) {
        onBetaNavigate(path)
      } else {
        window.location.href = path
      }
    }
  }

  const handleFilteredKits = (query: string) => {
    if (query) {
      const results = matchSorter(kitsAndGuidelines, query, { keys: ['label'] })
      setFilteredKits(results)
    } else {
      setFilteredKits(kitsAndGuidelines)
    }
  }

  const Item = ({ labelLeft, type }: { labelLeft: string, type: string }) => (
    <Flex alignItems="center" justify="between">
        {labelLeft}
        <Badge
          dark={darkMode}
          margin="xs"
          text={type === 'global_prop' ? 'Global Prop' : 'Token'}
          variant="primary"
        />
    </Flex>
  )

  const typeaheadKey = beta ? `${id}__${betaSearchResetKey ?? ''}` : id

  return (
      <Typeahead
        key={typeaheadKey}
        className={classname}
        dark={beta ? darkMode : document.cookie.split("; ").includes("dark_mode=true")}
        id={id}
        marginBottom={marginBottom || 'sm'}
        onChange={handleChange}
        onInputChange={handleFilteredKits}
        options={filteredKits}
        placeholder="Search..."
        valueComponent={(option: Kit) => {
          if (option.type === 'global_prop' || option.type === 'token') {
            return <Item labelLeft={option.label} type={option.type} />
          }
          return <>{option.label}</>
        }}
      />
  )
}

export default KitSearch
