import React, { useState, useEffect, useRef } from "react"
import classnames from "classnames"
import { globalProps, GlobalProps } from "../utilities/globalProps"
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props"
import Checkbox from "../pb_checkbox/_checkbox"
import Icon from "../pb_icon/_icon"
import FormPill from "../pb_form_pill/_form_pill"
import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button"
import { cloneDeep } from "lodash"

import {
  getAncestorsOfUnchecked,
  filterFormattedDataById,
  findByFilter,
  getCheckedItems,
  getDefaultCheckedItems,
  recursiveCheckParent,
} from "./_helper_functions"

type MultiLevelSelectProps = {
  aria?: { [key: string]: string }
  className?: string
  data?: { [key: string]: string }
  id?: string
  name?: string
  returnAllSelected?: boolean
  treeData?: { [key: string]: string }[]
  onSelect?: (prop: { [key: string]: any }) => void
} & GlobalProps

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    name,
    returnAllSelected = false,
    treeData,
    onSelect = () => {},
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss("pb_multi_level_select"),
    globalProps(props),
    className
  )

  const dropdownRef = useRef(null)


  //state for expanded property
  const [expanded, setExpanded] = useState([])
  //state for whether dropdown is open or closed
  const [isClosed, setIsClosed] = useState(true)
  //state from onchange for textinput, to use for filtering to create typeahead
  const [filterItem, setFilterItem] = useState("")
  //this is essentially the return that the user will get when they use the kit
  const [returnedArray, setReturnedArray] = useState([])
  //formattedData with checked and parent_id added
  const [formattedData, setFormattedData] = useState([])
  //state for return for default
  const [defaultReturn, setDefaultReturn] = useState([])


  useEffect(() => {
    setFormattedData(addCheckedAndParentProperty(treeData))
  }, [treeData])

  useEffect(() => {
    if (returnAllSelected) {
      setReturnedArray(getCheckedItems(formattedData))
    } else {
      setDefaultReturn(getDefaultCheckedItems(formattedData))
    }
  }, [formattedData])

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClosed(true)
      }
    }
    // Attach the event listener
    window.addEventListener("click", handleClickOutside)
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const modifyRecursive = (tree: { [key: string]: any }[], check: boolean) => {
    if (!Array.isArray(tree)) {
      return
    }
    return tree.map((item: { [key: string]: any }) => {
      item.checked = check
      item.children = modifyRecursive(item.children, check)
      return item
    })
  }

  //iterate over tree, find item and set checked or unchecked
  const modifyValue = (
    id: string,
    tree: { [key: string]: any }[],
    check: boolean
  ) => {
    if (!Array.isArray(tree)) {
      return
    }
    return tree.map((item: any) => {
      if (item.id != id) item.children = modifyValue(id, item.children, check)
      else {
        item.checked = check
        item.children = modifyRecursive(item.children, check)
      }

      return item
    })
  }

  //clone tree, check items + children
  const checkItem = (item: { [key: string]: any }) => {
    const tree = cloneDeep(formattedData)
    if (returnAllSelected) {
      return modifyValue(item.id, tree, true)
    } else {
      const checkedTree = modifyValue(item.id, tree, true)
      return recursiveCheckParent(item, checkedTree)
    }
  }

  //clone tree, uncheck items + children
  const unCheckItem = (item: { [key: string]: any }) => {
    const tree = cloneDeep(formattedData)
    if (returnAllSelected) {
      return modifyValue(item.id, tree, false)
    } else {
      const uncheckedTree = modifyValue(item.id, tree, false)
      return getAncestorsOfUnchecked(uncheckedTree, item)
    }
  }

  //setformattedData with proper properties
  const changeItem = (item: { [key: string]: any }, check: boolean) => {
    const tree = check ? checkItem(item) : unCheckItem(item)
    setFormattedData(tree)

    return tree
  }

  //function to map over data and add parent_id + depth property to each item
  const addCheckedAndParentProperty = (
    treeData: { [key: string]: any }[],
    parent_id: string = null,
    depth: number = 0
  ) => {
    if (!Array.isArray(treeData)) {
      return
    }
    return treeData.map((item: { [key: string]: any } | any) => {
      const newItem = {
        ...item,
        parent_id,
        depth,
      }
      if (newItem.children && newItem.children.length > 0) {
        const children =
          item.checked && !returnAllSelected
            ? modifyRecursive(item.children, true)
            : item.children
        newItem.children = addCheckedAndParentProperty(
          children,
          newItem.id,
          depth + 1
        )
      }
      return newItem
    })
  }

  //click event for x on form pill
  const handlePillClose = (event: any, clickedItem: { [key: string]: any }) => {
    // prevents the dropdown from closing when clicking on the pill
    event.stopPropagation()
    const updatedTree = changeItem(clickedItem, false)
    //logic for removing items from returnArray or defaultReturn when pills clicked
    if (returnAllSelected) {
      onSelect(getCheckedItems(updatedTree))
    } else {
      onSelect(getDefaultCheckedItems(updatedTree))
    }
  }

  //handle click on input wrapper(entire div with pills, typeahead, etc) so it doesn't close when input or form pill is clicked
  const handleInputWrapperClick = (e: any) => {
    e.stopPropagation()
    if (
      e.target.id === "multiselect_input" ||
      e.target.classList.contains("pb_form_pill_tag")
    ) {
      return
    }
    setIsClosed(!isClosed)
  }

  //Main function to handle any click inside dropdown
  const handledropdownItemClick = (e: any, check: boolean) => {
    const clickedItem = e.target.parentNode.id
    //setting filterItem to "" will clear textinput and clear typeahead
    setFilterItem("")

    const filtered = filterFormattedDataById(formattedData, clickedItem)
    const updatedTree = changeItem(filtered[0], check)
    if (returnAllSelected) {
      onSelect(getCheckedItems(updatedTree))
    } else {
      onSelect(getDefaultCheckedItems(updatedTree))
    }
  }

  const isExpanded = (item: any) => expanded.indexOf(item.id) > -1

  //handle click on chevron toggles in dropdown
  const handleToggleClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const clickedItem = filterFormattedDataById(formattedData, id)
    if (clickedItem) {
      let expandedArray = [...expanded]
      const itemExpanded = isExpanded(clickedItem[0])

      if (itemExpanded)
        expandedArray = expandedArray.filter((i) => i != clickedItem[0].id)
      else expandedArray.push(clickedItem[0].id)

      setExpanded(expandedArray)
    }
  }

  //rendering formattedData to UI based on typeahead
  const renderNestedOptions = (items: { [key: string]: any }[]) => {
    return (
      <ul>
        {Array.isArray(items) &&
          items.map((item: { [key: string]: any }) => {
            return (
              <div key={item.id}>
                <li className='dropdown_item' data-name={item.id}>
                  <div className='dropdown_item_checkbox_row'>
                    <div
                      key={isExpanded(item) ? "chevron-down" : "chevron-right"}
                    >
                      <CircleIconButton
                        icon={
                          isExpanded(item) ? "chevron-down" : "chevron-right"
                        }
                        className={
                          item.children && item.children.length > 0
                            ? ""
                            : "toggle_icon"
                        }
                        onClick={(event: any) =>
                          handleToggleClick(item.id, event)
                        }
                        variant='link'
                      />
                    </div>
                    <Checkbox text={item.label} id={item.id}>
                      <input
                        checked={item.checked}
                        type='checkbox'
                        name={item.label}
                        value={item.label}
                        onChange={(e) => {
                          handledropdownItemClick(e, !item.checked)
                        }}
                      />
                    </Checkbox>
                  </div>
                  {isExpanded(item) &&
                    item.children &&
                    item.children.length > 0 &&
                    !filterItem && ( // Show children if expanded is true
                      <div>{renderNestedOptions(item.children)}</div>
                    )}
                </li>
              </div>
            )
          })}
      </ul>
    )
  }

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      <div ref={dropdownRef} className='wrapper'>
        <div className='input_wrapper' onClick={handleInputWrapperClick}>
          <div className='input_inner_container'>
            {returnedArray.length !== 0 && returnAllSelected
              ? returnedArray.map((item) => (
                  <input type='hidden' name={`${name}[]`} value={item.id} />
                ))
              : null}

            {returnedArray.length !== 0 && returnAllSelected
              ? returnedArray.map((item, index) => (
                  <FormPill
                    key={index}
                    text={item.label}
                    size='small'
                    onClick={(event: any) => handlePillClose(event, item)}
                  />
                ))
              : null}
            {!returnAllSelected &&
              defaultReturn.length !== 0 &&
              defaultReturn.map((item, index) => (
                <FormPill
                  key={index}
                  text={item.label}
                  size='small'
                  onClick={(event: any) => handlePillClose(event, item)}
                />
              ))}
            {returnedArray.length !== 0 && returnAllSelected && <br />}
            {defaultReturn.length !== 0 && !returnAllSelected && <br />}
            <input
              id='multiselect_input'
              onChange={(e) => {
                setFilterItem(e.target.value)
              }}
              placeholder='Start typing...'
              value={filterItem}
              onClick={() => setIsClosed(false)}
            />
          </div>
          {isClosed ? (
            <div key='chevron-down'>
              <Icon icon='chevron-down' />
            </div>
          ) : (
            <div key='chevron-up'>
              <Icon icon='chevron-up' />
            </div>
          )}
        </div>
        <div className={`dropdown_menu ${isClosed ? "close" : "open"}`}>
          {renderNestedOptions(
            filterItem ? findByFilter(formattedData, filterItem) : formattedData
          )}
        </div>
      </div>
    </div>
  )
}

export default MultiLevelSelect
