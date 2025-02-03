import React, { useEffect, useState } from 'react'
import { Typeahead, Badge } from 'playbook-ui'
import { matchSorter } from 'match-sorter'
import { VisualGuidelinesItems } from './MainSidebar/MenuData/GuidelinesNavItems'

type Kit = {
  label: string,
  value: string,
}

type KitSearchProps = {
  classname: string,
  kits: Kit[],
  id: string,
}

interface VisualGuidelineItem {
  label: string,
  value: string,
}

const combineKitsandVisualGuidelines = (
  kits: Kit[],
  VisualGuidelineItems: VisualGuidelineItem[]):
  (Kit | VisualGuidelineItem)[] => {
  return [...kits, ...VisualGuidelineItems].sort((a, b) => a.label.localeCompare(b.label))
}

const KitSearch = ({ classname, id, kits }: KitSearchProps) => {
  const kitsAndGuidelines = combineKitsandVisualGuidelines(kits, VisualGuidelinesItems)

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



  const formattedKits = filteredKits.map(option => ({
    ...option,
    label: option.value.includes("guidelines") ? `${option.label} (Global Prop)` : option.label
  }));

  return (
    <div>
      <Typeahead
          className={classname}
          dark={document.cookie.split("; ").includes("dark_mode=true")}
          id={id}
          onChange={handleChange}
          onInputChange={handleFilteredKits}
          options={formattedKits}
          placeholder="Search..."
      />
    </div>
  )
}

export default KitSearch
