import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props";
// import Checkbox from "../pb_checkbox/_checkbox";
// import Radio from "../pb_radio/_radio";
// import Body from "../pb_body/_body";
import Icon from "../pb_icon/_icon";
import FormPill from "../pb_form_pill/_form_pill";
// import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button";
import { cloneDeep } from "lodash";
import MultiLevelSelectOptions from "./multi_level_select_options";
import MultiLevelSelectContext from "./context";

import {
  getAncestorsOfUnchecked,
  filterFormattedDataById,
  findByFilter,
  getCheckedItems,
  getDefaultCheckedItems,
  recursiveCheckParent,
  getExpandedItems,
} from "./_helper_functions";

type MultiLevelSelectProps = {
  aria?: { [key: string]: string };
  className?: string;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  inputDisplay?: "pills" | "none";
  inputName?: string;
  name?: string;
  returnAllSelected?: boolean;
  treeData?: { [key: string]: string }[];
  onSelect?: (prop: { [key: string]: any }) => void;
  selectedIds?: string[];
  variant?: "multi" | "single";
  children?: any;
} & GlobalProps;

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const {
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    id,
    inputDisplay = "pills",
    inputName,
    name,
    returnAllSelected = false,
    treeData,
    onSelect = () => null,
    selectedIds,
    variant = "multi",
    children,
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_multi_level_select"),
    globalProps(props),
    className
  );

  const dropdownRef = useRef(null);

  // State for whether dropdown is open or closed
  const [isDropdownClosed, setIsDropdownClosed] = useState(true);
  // State from onChange for textinput, to use for filtering to create typeahead
  const [filterItem, setFilterItem] = useState("");
  // FormattedData with checked and parent_id added
  const [formattedData, setFormattedData] = useState([]);
  // State for the return of returnAllSelected
  const [returnedArray, setReturnedArray] = useState([]);
  // State for default return
  const [defaultReturn, setDefaultReturn] = useState([]);
  // Get expanded items from treeData
  const initialExpandedItems = getExpandedItems(treeData, selectedIds);
  // Initialize state with expanded items
  const [expanded, setExpanded] = useState(initialExpandedItems);

  // Single Select specific state
  const [singleSelectedItem, setSingleSelectedItem] = useState({
    id: [],
    value: "",
    item: [],
  });

  const modifyRecursive = (tree: { [key: string]: any }[], check: boolean) => {
    if (!Array.isArray(tree)) {
      return;
    }
    return tree.map((item: { [key: string]: any }) => {
      item.checked = check;
      item.children = modifyRecursive(item.children, check);
      return item;
    });
  };

  // Function to map over data and add parent_id + depth property to each item
  const addCheckedAndParentProperty = (
    treeData: { [key: string]: any }[],
    selectedIds: string[],
    parent_id: string = null,
    depth = 0
  ) => {
    if (!Array.isArray(treeData)) {
      return;
    }
    return treeData.map((item: { [key: string]: any } | any) => {
      const newItem = {
        ...item,
        checked: Boolean(
          selectedIds && selectedIds.length && selectedIds.includes(item.id)
        ),
        parent_id,
        depth,
      };
      if (newItem.children && newItem.children.length > 0) {
        const children =
          item.checked && !returnAllSelected
            ? modifyRecursive(item.children, true)
            : item.children;
        newItem.children = addCheckedAndParentProperty(
          children,
          selectedIds,
          newItem.id,
          depth + 1
        );
      }
      return newItem;
    });
  };

  useEffect(() => {
    const formattedData = addCheckedAndParentProperty(
      treeData,
      variant === "single" ? [selectedIds?.[0]] : selectedIds
    );

    setFormattedData(formattedData);

    if (variant === "single") {
      // No selectedIds, reset state
      if (selectedIds?.length === 0 || !selectedIds?.length) {
        setSingleSelectedItem({ id: [], value: "", item: [] });
      } else {
        // If there is a selectedId but no current item, set the selectedItem
        if (selectedIds?.length !== 0 && !singleSelectedItem.value) {
          const selectedItem = filterFormattedDataById(
            formattedData,
            selectedIds[0]
          );

          if (!selectedItem.length) {
            setSingleSelectedItem({ id: [], value: "", item: [] });
          } else {
            const { id, value } = selectedItem[0];
            setSingleSelectedItem({ id: [id], value, item: selectedItem });
          }
        }
      }
    }
  }, [treeData, selectedIds]);

  useEffect(() => {
    if (returnAllSelected) {
      setReturnedArray(getCheckedItems(formattedData));
    } else if (variant === "single") {
      setDefaultReturn(singleSelectedItem.item);
    } else {
      setDefaultReturn(getDefaultCheckedItems(formattedData));
    }
  }, [formattedData]);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownClosed(true);
      }
    };
    // Attach the event listener
    window.addEventListener("click", handleClickOutside);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Iterate over tree, find item and set checked or unchecked
  const modifyValue = (
    id: string,
    tree: { [key: string]: any }[],
    check: boolean
  ) => {
    if (!Array.isArray(tree)) {
      return;
    }
    return tree.map((item: any) => {
      if (item.id != id) item.children = modifyValue(id, item.children, check);
      else {
        item.checked = check;

        if (variant === "single") {
          // Single select: no children should be checked
          item.children = modifyRecursive(item.children, !check);
        } else {
          item.children = modifyRecursive(item.children, check);
        }
      }

      return item;
    });
  };

  // Clone tree, check items + children
  const checkItem = (item: { [key: string]: any }) => {
    const tree = cloneDeep(formattedData);
    if (returnAllSelected) {
      return modifyValue(item.id, tree, true);
    } else {
      const checkedTree = modifyValue(item.id, tree, true);
      return recursiveCheckParent(item, checkedTree);
    }
  };

  // Clone tree, uncheck items + children
  const unCheckItem = (item: { [key: string]: any }) => {
    const tree = cloneDeep(formattedData);
    if (returnAllSelected) {
      return modifyValue(item.id, tree, false);
    } else {
      const uncheckedTree = modifyValue(item.id, tree, false);
      return getAncestorsOfUnchecked(uncheckedTree, item);
    }
  };

  // setFormattedData with proper properties
  const changeItem = (item: { [key: string]: any }, check: boolean) => {
    const tree = check ? checkItem(item) : unCheckItem(item);
    setFormattedData(tree);

    return tree;
  };

  // Click event for x on form pill
  const handlePillClose = (event: any, clickedItem: { [key: string]: any }) => {
    // Prevents the dropdown from closing when clicking on the pill
    event.stopPropagation();
    const updatedTree = changeItem(clickedItem, false);
    // Logic for removing items from returnArray or defaultReturn when pills clicked
    if (returnAllSelected) {
      onSelect(getCheckedItems(updatedTree));
    } else {
      onSelect(getDefaultCheckedItems(updatedTree));
    }
  };

  // Handle click on input wrapper(entire div with pills, typeahead, etc) so it doesn't close when input or form pill is clicked
  const handleInputWrapperClick = (e: any) => {
    e.stopPropagation();
    if (
      e.target.id === "multiselect_input" ||
      e.target.classList.contains("pb_form_pill_tag")
    ) {
      return;
    }
    setIsDropdownClosed(!isDropdownClosed);
  };

  // Main function to handle any click inside dropdown
  const handledropdownItemClick = (e: any, check: boolean) => {
    const clickedItem = e.target.parentNode.id;
    // Setting filterItem to "" will clear textinput and clear typeahead
    setFilterItem("");

    const filtered = filterFormattedDataById(formattedData, clickedItem);
    const updatedTree = changeItem(filtered[0], check);
    if (returnAllSelected) {
      onSelect(getCheckedItems(updatedTree));
    } else {
      onSelect(getDefaultCheckedItems(updatedTree));
    }
  };

  // Single select
  const handleRadioButtonClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value: inputText } = e.target;
    // The radio button needs a unique ID, this grabs the ID before the hyphen
    const selectedItemID = id.match(/^[^-]*/)[0];
    // Reset tree checked state, triggering useEffect
    const treeWithNoSelections = modifyRecursive(formattedData, false);
    // Update tree with single selection
    const treeWithSelectedItem = modifyValue(
      selectedItemID,
      treeWithNoSelections,
      true
    );
    const selectedItem = filterFormattedDataById(
      treeWithSelectedItem,
      selectedItemID
    );

    setFormattedData(treeWithSelectedItem);
    setSingleSelectedItem({
      id: [selectedItemID],
      value: inputText,
      item: selectedItem,
    });
    // Reset the filter to always display dropdown options on click
    setFilterItem("");
    setIsDropdownClosed(true);

    onSelect(selectedItem);
  };

  // Single select: reset the tree state upon typing
  const handleRadioInputChange = (inputText: string) => {
    modifyRecursive(formattedData, false);
    setDefaultReturn([]);
    setSingleSelectedItem({ id: [], value: inputText, item: [] });
    setFilterItem(inputText);
  };

  const isTreeRowExpanded = (item: any) => expanded.indexOf(item.id) > -1;

  // Handle click on chevron toggles in dropdown
  const handleToggleClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const clickedItem = filterFormattedDataById(formattedData, id);
    if (clickedItem) {
      let expandedArray = [...expanded];
      const itemExpanded = isTreeRowExpanded(clickedItem[0]);

      if (itemExpanded)
        expandedArray = expandedArray.filter((i) => i != clickedItem[0].id);
      else expandedArray.push(clickedItem[0].id);

      setExpanded(expandedArray);
    }
  };

  const itemsSelectedLength = () => {
    let items;
    if (returnAllSelected && returnedArray && returnedArray.length) {
      items = returnedArray.length;
    } else if (!returnAllSelected && defaultReturn && defaultReturn.length) {
      items = defaultReturn.length;
    }
    return items;
  };

  // Rendering formattedData to UI based on typeahead
  const renderNestedOptions = (items?: { [key: string]: any }[]) => {
    return (
      <MultiLevelSelectOptions
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
          // eslint-disable-next-line react/no-children-prop
          children={children}
          items={items}
      />
    );
  };


  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <MultiLevelSelectContext.Provider value={{
          items: filterItem ? findByFilter(formattedData, filterItem) : formattedData,
          variant,
          inputName,
          renderNestedOptions,
          isTreeRowExpanded,
          handleToggleClick,
          handleRadioButtonClick,
          handledropdownItemClick,
          filterItem,
      }}>
      <div className="wrapper" 
          ref={dropdownRef}
      >
        <div className="input_wrapper" 
            onClick={handleInputWrapperClick}
        >
          <div className="input_inner_container">
            {variant === "single" && defaultReturn.length !== 0
              ? defaultReturn.map((selectedItem) => (
                  <input
                      key={selectedItem.id}
                      name={`${name}[]`}
                      type="hidden"
                      value={selectedItem.id}
                  />
                ))
              : null}

            {variant !== "single" && (
              <>
                {returnAllSelected && returnedArray.length !== 0
                  ? returnedArray.map((item) => (
                      <input
                          key={item.id}
                          name={`${name}[]`}
                          type="hidden"
                          value={item.id}
                      />
                    ))
                  : null}

                {returnAllSelected &&
                returnedArray.length !== 0 &&
                inputDisplay === "pills"
                  ? returnedArray.map((item, index) => (
                      <FormPill
                          key={index}
                          onClick={(event: any) => handlePillClose(event, item)}
                          text={item.label}
                      />
                    ))
                  : null}

                {!returnAllSelected &&
                defaultReturn.length !== 0 &&
                inputDisplay === "pills"
                  ? defaultReturn.map((item, index) => (
                      <FormPill
                          key={index}
                          onClick={(event: any) => handlePillClose(event, item)}
                          text={item.label}
                      />
                    ))
                  : null}

                {returnAllSelected &&
                  returnedArray.length !== 0 &&
                  inputDisplay === "pills" && <br />}

                {!returnAllSelected &&
                  defaultReturn.length !== 0 &&
                  inputDisplay === "pills" && <br />}
              </>
            )}

            <input
                id="multiselect_input"
                onChange={(e) => {
                  variant === "single"
                    ? handleRadioInputChange(e.target.value)
                    : setFilterItem(e.target.value);
                }}
                onClick={() => setIsDropdownClosed(false)}
                placeholder={
                  inputDisplay === "none" && itemsSelectedLength()
                    ? `${itemsSelectedLength()} ${
                        itemsSelectedLength() === 1 ? "item" : "items"
                      } selected`
                    : "Start typing..."
                }
                value={singleSelectedItem.value || filterItem}
            />
          </div>

          {isDropdownClosed ? (
            <div key="chevron-down">
                <Icon icon="chevron-down" 
                    size="xs" 
                />
            </div>
          ) : (
            <div key="chevron-up">
                <Icon icon="chevron-up" 
                    size="xs" 
                />
            </div>
          )}
        </div>

        <div className={`dropdown_menu ${isDropdownClosed ? "close" : "open"}`}>
            {renderNestedOptions(
              filterItem ? findByFilter(formattedData, filterItem) : formattedData
            )}
        </div>
      </div>
      </MultiLevelSelectContext.Provider>
    </div>
  );
};

MultiLevelSelect.Options = MultiLevelSelectOptions;

export default MultiLevelSelect;
