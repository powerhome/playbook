import { useEffect, useState } from 'react'
import { Typeahead, Badge, Flex } from 'playbook-ui'
import { matchSorter } from 'match-sorter'

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

const KitSearch = ({ classname, id, kits, global_props_and_tokens, marginBottom }: KitSearchProps) => {
  const kitsAndGuidelines = combineKitsandVisualGuidelines(kits, global_props_and_tokens)

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
      window.location = selection.value
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
          dark
          margin="xs"
          text={type === 'global_prop' ? 'Global Prop' : 'Token'}
          variant="primary"
        />
    </Flex>
  )

  return (
      <Typeahead
        className={classname}
        dark={document.cookie.split("; ").includes("dark_mode=true")}
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
