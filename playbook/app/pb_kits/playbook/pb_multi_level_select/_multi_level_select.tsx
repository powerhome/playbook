import React, { useState, useEffect, useRef, forwardRef } from "react";
import classnames from "classnames";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props";
import { cloneDeep } from "../utilities/object";

import Icon from "../pb_icon/_icon";
import FormPill from "../pb_form_pill/_form_pill";
import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";
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

interface MultiLevelSelectComponent
  extends React.ForwardRefExoticComponent<
    MultiLevelSelectProps & React.RefAttributes<HTMLInputElement>
  > {
  Options: typeof MultiLevelSelectOptions;
}

type MultiLevelSelectProps = {
  aria?: { [key: string]: string }
  className?: string
  data?: { [key: string]: string }
  disabled?: boolean
  error?: string
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string
  inputDisplay?: "pills" | "none"
  inputName?: string
  label?: string
  name?: string
  required?: boolean
  returnAllSelected?: boolean
  showCheckedChildren?: boolean
  treeData?: { [key: string]: string; }[] | any
  onChange?: (event: { target: { name?: string; value: any } }) => void
  onSelect?: (prop: { [key: string]: any }) => void
  selectedIds?: string[] | any
  variant?: "multi" | "single"
  wrapped?: boolean
  pillColor?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
} & GlobalProps

const MultiLevelSelect = forwardRef<HTMLInputElement, MultiLevelSelectProps>((props) => {
  const {
    aria = {},
    className,
    data = {},
    disabled = false,
    error,
    htmlOptions = {},
    id,
    inputDisplay = "pills",
    inputName,
    name,
    label,
    required = false,
    returnAllSelected = false,
    showCheckedChildren = true,
    treeData,
    onChange = () => null,
    onSelect = () => null,
    selectedIds,
    variant = "multi",
    children,
    wrapped,
    pillColor = "primary"
  } = props

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_multi_level_select"),
    error && "error",
    globalProps(props),
    className
  );

  const inputId = id ? `${id}_multiselect_input` : `${Math.random().toString(36).slice(2)}_multiselect_input`;

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
  const initialExpandedItems = getExpandedItems(treeData, selectedIds, showCheckedChildren);
  // Initialize state with expanded items
  const [expanded, setExpanded] = useState(initialExpandedItems);

  // Single Select specific state
  const [singleSelectedItem, setSingleSelectedItem] = useState({
    id: [],
    value: "",
    item: [],
  });

  const arrowDownElementId = `arrow_down_${id}`
  const arrowUpElementId = `arrow_up_${id}`

  const modifyRecursive = (tree: { [key: string]: any }[], check: boolean) => {
    if (!Array.isArray(tree)) {
      return;
    }
    return tree.map((item: { [key: string]: any }) => {
      if (!item.disabled) {
        item.checked = check;
      }
      item.children = modifyRecursive(item.children, check);
      return item;
    });
  };

  // Function to map over data and add parent_id + depth property to each item
  const addCheckedAndParentProperty = (
    treeData: { [key: string]: any }[],
    selectedIds: string[],
    parent_id: string | null = null,
    depth = 0,
    parentDisabled = false
  ) => {
    if (!Array.isArray(treeData)) {
      return;
    }
    return treeData.map((item: { [key: string]: any } | any) => {
      // An item is disabled if it is explicitly set as disabled or if its parent is disabled
      const isDisabled = item.disabled || (parentDisabled && !returnAllSelected);

      const newItem = {
        ...item,
        checked: Boolean(
          selectedIds && selectedIds.length && selectedIds.includes(item.id)
        ),
        parent_id,
        depth,
        disabled: isDisabled,
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
          depth + 1,
          isDisabled
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
            const { id, label } = selectedItem[0];
            setSingleSelectedItem({ id: [id], value: label, item: selectedItem });
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.id !== arrowDownElementId &&
        event.target.id !== arrowUpElementId
      ) {
        setIsDropdownClosed(true)
      }
    };
    // Attach the event listener
    window.addEventListener("click", handleClickOutside);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (id) {
      // Attach the clear function to the window, scoped by the id
      (window as any)[`clearMultiLevelSelect_${id}`] = () => {
        const resetData = modifyRecursive(formattedData, false);
        setFormattedData(resetData);
        setReturnedArray([]);
        setDefaultReturn([]);
        setSingleSelectedItem({ id: [], value: "", item: [] });
        onSelect([]);
      };
      return () => {
        delete (window as any)[`clearMultiLevelSelect_${id}`];
      };
    }
  }, [formattedData, id, onSelect]);

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
        if (!item.disabled) {
          item.checked = check;
        }
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
      onChange({ target: { name, value: getCheckedItems(updatedTree) } });
    } else {
      onSelect(getDefaultCheckedItems(updatedTree));
      onChange({ target: { name, value: getDefaultCheckedItems(updatedTree) } });
    }
  };

  // Handle click on input wrapper(entire div with pills, typeahead, etc) so it doesn't close when input or form pill is clicked
  const handleInputWrapperClick = (e: any) => {
  console.log("test", inputId, e.target.id)
  if (disabled) return
  // ignore clicks that originated from the input or pills
  if (e.target.id === inputId || e.target.classList?.contains('pb_form_pill_tag')) return
  setIsDropdownClosed(false)
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
      onChange({ target: { name, value: getCheckedItems(updatedTree) } });
    } else {
      onSelect(getDefaultCheckedItems(updatedTree));
      onChange({ target: { name, value: getDefaultCheckedItems(updatedTree) } });
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
    onChange({ target: { name, value: selectedItem } });
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
  const renderNestedOptions = (items: { [key: string]: string; }[] | any ) => {
    const hasOptionsChild = React.Children.toArray(props.children).some(
      (child) => React.isValidElement(child) && child.type === MultiLevelSelect.Options
    );

    if (hasOptionsChild) {
      return React.Children.map(props.children, (child) => {
        if (React.isValidElement(child) && child.type === MultiLevelSelect.Options) {
          return React.cloneElement(child, { items });
        }
        return null;
      });
    } else {
      // If no children, use the default rendering
      return (
        <MultiLevelSelectOptions items={items} />
      );
    }
  };

const handleChevronClick = (e: React.MouseEvent) => {
  e.stopPropagation()
  setIsDropdownClosed(prev => !prev)
}

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {label &&
        <Caption
            marginBottom="xs"
            text={label}
        />
      }
      <MultiLevelSelectContext.Provider value={{
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
                      disabled={disabled}
                      key={selectedItem.id}
                      name={`${name}[]`}
                      required={required}
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
                          disabled={disabled}
                          key={item.id}
                          name={`${name}[]`}
                          required={required}
                          type="hidden"
                          value={item.id}
                      />
                    ))
                  : null}

                {!returnAllSelected
                  ? defaultReturn.map((item) => (
                      <input
                          disabled={disabled}
                          key={item.id} 
                          name={`${name}[]`}
                          required={required}
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
                          color={pillColor}
                          key={index}
                          onClick={(event: any) => handlePillClose(event, item)}
                          text={item.label}
                          wrapped={wrapped}
                      />
                    ))
                  : null}

                {!returnAllSelected &&
                defaultReturn.length !== 0 &&
                inputDisplay === "pills"
                  ? defaultReturn.map((item, index) => (
                      <FormPill
                          color={pillColor}
                          key={index}
                          onClick={(event: any) => handlePillClose(event, item)}
                          text={item.label}
                          wrapped={wrapped}
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
                disabled={disabled}
                id={inputId}
                onChange={(e) => {
                  variant === "single"
                    ? handleRadioInputChange(e.target.value)
                    : setFilterItem(e.target.value);
                }}
                onClick={(e) => { e.stopPropagation(); setIsDropdownClosed(false) }}
                placeholder={
                  inputDisplay === "none" && itemsSelectedLength()
                    ? `${itemsSelectedLength()} ${
                        itemsSelectedLength() === 1 ? "item" : "items"
                      } selected`
                    : "Start typing..."
                }
                required={required}
                value={singleSelectedItem.value || filterItem}
            />
          </div>

          {isDropdownClosed ? (
            <div id={arrowDownElementId}
                key="chevron-down"
                onClick={handleChevronClick}>
              <Icon
                  icon="chevron-down"
                  id={arrowDownElementId}
                  size="xs"
              />
            </div>
          ) : (
            <div id={arrowUpElementId}
                key="chevron-up"
                onClick={handleChevronClick}>
              <Icon
                  icon="chevron-up"
                  id={arrowUpElementId}
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
      {error &&
          <Body
              dark={props.dark}
              status="negative"
              text={error}
          />
        }
    </div>
  );
}) as MultiLevelSelectComponent;

MultiLevelSelect.displayName = "MultiLevelSelect";
MultiLevelSelect.Options = MultiLevelSelectOptions;

export default MultiLevelSelect;
