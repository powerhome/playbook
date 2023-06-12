import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import Icon from "../pb_icon/_icon";
import Checkbox from "../pb_checkbox/_checkbox";
import FormPill from "../pb_form_pill/_form_pill";
import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button";
import {
  unCheckIt,
  getAncestorsOfChecked,
  unCheckedRecursive,
  checkedRecursive,
  filterFormattedDataById,
  findByFilter,
  getCheckedItems,
  getChildIds,
  updateReturnItems,
} from "./_helper_functions";

type MultiLevelSelectProps = {
  aria?: { [key: string]: string };
  className?: string;
  data?: { [key: string]: string };
  id?: string;
  returnAllSelected?: boolean;
  treeData?: { [key: string]: string }[];
  onSelect?: (prop: { [key: string]: any }) => void;
} & GlobalProps;

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    returnAllSelected = false,
    treeData,
    onSelect = () => {},
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_multi_level_select"),
    globalProps(props),
    className
  );

  const dropdownRef = useRef(null);

  //state for whether dropdown is open or closed
  const [isClosed, setIsClosed] = useState(true);
  //state from onchange for textinput, to use for filtering to create typeahead
  const [filterItem, setFilterItem] = useState("");
  //this is essentially the return that the user will get when they use the kit
  const [returnedArray, setReturnedArray] = useState([]);
  //formattedData with checked and parent_id added
  const [formattedData, setFormattedData] = useState(treeData);
  //toggle chevron in dropdown
  const [isToggled, setIsToggled] = useState<{ [id: number]: boolean }>({});
  //state for return for default
  const [defaultReturn, setDefaultReturn] = useState([]);

  useEffect(() => {
    let el = document.getElementById(`pb_data_wrapper_${id}`);
    if (el) {
      el.setAttribute(
        "data-tree",
        JSON.stringify(returnAllSelected ? returnedArray : defaultReturn)
      );
    }
    returnAllSelected
      ? onSelect(returnedArray)
      : onSelect(
          defaultReturn.filter(
            (item, index, self) =>
              index === self.findIndex((obj) => obj.id === item.id)
          )
        );
  }, [returnedArray, defaultReturn]);

  useEffect(() => {
    //Create new formattedData array for use
    setFormattedData(addCheckedAndParentProperty(treeData));
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClosed(true);
      }
    };
    // Attach the event listener
    window.addEventListener("click", handleClickOutside);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //function to map over data and add checked + parent_id + depth + expanded + allChildrenChecked property to each item
  const addCheckedAndParentProperty = (
    treeData: { [key: string]: any }[],
    parent_id: string = null,
    depth: number = 0,
    expanded: boolean = false,
    allChildrenChecked: boolean = false
  ) => {
    if (!Array.isArray(treeData)) {
      return;
    }
    return treeData.map((item: { [key: string]: any } | any) => {
      const newItem = {
        ...item,
        checked: false,
        parent_id,
        depth,
        expanded,
        allChildrenChecked,
      };

      if (newItem.children && newItem.children.length > 0) {
        newItem.children = addCheckedAndParentProperty(
          newItem.children,
          newItem.id,
          depth + 1,
          expanded,
          allChildrenChecked
        );
      }

      return newItem;
    });
  };

  //click event for x on form pill
  const handlePillClose = (event: any, clickedItem: { [key: string]: any }) => {
    // prevents the dropdown from closing when clicking on the pill
    event.stopPropagation();
    //logic for removing items from returnArray or defaultReturn when pills clicked
    if (returnAllSelected) {
      if (returnedArray.includes(clickedItem)) {
        const removeUnchecked = returnedArray.filter(
          (item) => item.id !== clickedItem.id
        );
        setReturnedArray(removeUnchecked);
      }
    } else {
      if (defaultReturn.includes(clickedItem)) {
        getAncestorsOfChecked(formattedData, clickedItem);
        const newChecked = getCheckedItems(formattedData);
        const filteredReturn = updateReturnItems(newChecked).filter(
          (item) => item.id !== clickedItem.id
        );
        setDefaultReturn(filteredReturn);
        if (clickedItem.children && clickedItem.children.length > 0) {
          unCheckedRecursive(clickedItem);
        }
      }
    }
    //logic to uncheck clickedItem in formattedData
    unCheckIt(formattedData, clickedItem.id);
  };

  //handle click on input wrapper(entire div with pills, typeahead, etc) so it doesn't close when input or form pill is clicked
  const handleInputWrapperClick = (e: any) => {
    e.stopPropagation();
    if (
      e.target.id === "multiselect_input" ||
      e.target.classList.contains("pb_form_pill_tag")
    ) {
      return;
    }
    setIsClosed(!isClosed);
  };

  //Main function to handle any click inside dropdown
  const handledropdownItemClick = (e: any) => {
    const clickedItem = e.target.parentNode.id;
    //setting filterItem to "" will clear textinput and clear typeahead
    setFilterItem("");

    const filtered = filterFormattedDataById(formattedData, clickedItem);
    //check and uncheck all children of checked/unchecked parent item
    if (filtered[0].children && filtered[0].children.length > 0) {
      if (filtered[0].checked) {
        filtered[0].allChildrenChecked = true;
        filtered[0].children.forEach((item: { [key: string]: any }) => {
          checkedRecursive(item);
        });
      } else if (!filtered[0].checked && !returnAllSelected) {
        filtered[0].allChildrenChecked = false;
        filtered[0].children.forEach((item: { [key: string]: any }) => {
          unCheckedRecursive(item);
        });
      }
    }

    const checkedItems = getCheckedItems(formattedData);

    //checking and unchecking items for returnAllSelected variant
    if (returnedArray.includes(filtered[0])) {
      if (!filtered[0].checked) {
        const updatedFiltered = returnedArray.filter(
          (item) => item !== filtered[0]
        );
        setReturnedArray(updatedFiltered);
      }
    } else {
      setReturnedArray(checkedItems);
    }

    //when item is unchecked for default variant
    if (!filtered[0].checked && !returnAllSelected) {
      //uncheck parent and grandparent if any child unchecked
      getAncestorsOfChecked(formattedData, filtered[0]);

      const newChecked = getCheckedItems(formattedData);
      //get all checked items, and filter to check if all children checked, if yes return only parent
      const filteredReturn = updateReturnItems(newChecked);
      setDefaultReturn(filteredReturn);
    }

    //when item is checked for default variant
    if (!returnAllSelected && filtered[0].checked) {
      //if clicked item has parent_id, find parent and check if all children checked or not
      if (filtered[0].parent_id !== null) {
        const parent = filterFormattedDataById(
          formattedData,
          filtered[0].parent_id
        );
        const allChildrenChecked = parent[0].children.every(
          (child: any) => child.checked
        );
        if (allChildrenChecked) {
          // Only return the parent and remove its children from defaultReturn
          parent[0].checked = true;
          parent[0].allChildrenChecked = true;
          const filteredDefaultReturn = defaultReturn.filter((item) => {
            // Remove children of the specific parent
            if (parent[0].children.find((child: any) => child.id === item.id)) {
              return false;
            }
            return true;
          });
          setDefaultReturn([...filteredDefaultReturn, parent[0]]);
        } else {
          parent[0].allChildrenChecked = false;
          const checkedChildren = parent[0].children.filter(
            (child: any) => child.checked
          );
          const updatedDefaultReturn = [...defaultReturn, ...checkedChildren];
          setDefaultReturn(updatedDefaultReturn);
        }
      } else {
        setDefaultReturn([filtered[0]]);
      }
      //if checked item has children
      if (filtered[0].children && filtered[0].children.length > 0) {
        const childIds = getChildIds(filtered[0], defaultReturn);
        const filteredDefaultArray = defaultReturn.filter(
          (item: any) => !childIds.includes(item.id)
        );
        setDefaultReturn([...filteredDefaultArray, filtered[0]]);
      }
    }
  };

  //handle click on chevron toggles in dropdown
  const handleToggleClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsToggled((prevState: { [id: string]: boolean }) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    const clickedItem = filterFormattedDataById(formattedData, id);

    if (clickedItem) {
      clickedItem[0].expanded = !clickedItem[0].expanded;
    }
  };

  //rendering formattedData to UI based on typeahead
  const renderNestedOptions = (items: { [key: string]: any }[]) => {
    return (
      <ul>
        {Array.isArray(items) &&
          items.map((item: { [key: string]: any }) => {
            return (
              <>
                <li
                  key={item.id}
                  className="dropdown_item"
                  data-name={item.id}
                  style={{ paddingLeft: item.depth * 20 }}
                >
                  <div className="dropdown_item_checkbox_row">
                    <div
                      key={
                        isToggled[item.id] ? "chevron-down" : "chevron-right"
                      }
                    >
                      <CircleIconButton
                        icon={
                          isToggled[item.id] ? "chevron-down" : "chevron-right"
                        }
                        className={item.children ? "" : "toggle_icon"}
                        onClick={(event) => handleToggleClick(item.id, event)}
                        variant="link"
                      />
                    </div>
                    <Checkbox text={item.label} id={item.id}>
                      <input
                        checked={item.checked}
                        type="checkbox"
                        name={item.label}
                        value={item.label}
                        onChange={(e) => {
                          item.checked = !item.checked;
                          handledropdownItemClick(e);
                        }}
                      />
                    </Checkbox>
                  </div>
                  {item.expanded &&
                    item.children &&
                    item.children.length > 0 &&
                    !filterItem && ( // Show children if expanded is true
                      <div>{renderNestedOptions(item.children)}</div>
                    )}
                </li>
              </>
            );
          })}
      </ul>
    );
  };

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      <div ref={dropdownRef} className="wrapper">
        <div className="input_wrapper" onClick={handleInputWrapperClick}>
          <div className="input_inner_container">
            {returnedArray.length !== 0 && returnAllSelected
              ? returnedArray.map((item, index) => (
                  <FormPill
                    key={index}
                    text={item.label}
                    size="small"
                    onClick={(event) => handlePillClose(event, item)}
                  />
                ))
              : null}
            {!returnAllSelected &&
              defaultReturn.length !== 0 &&
              defaultReturn
                .filter(
                  (item, index, self) =>
                    index === self.findIndex((obj) => obj.id === item.id)
                )
                .map((item, index) => (
                  <FormPill
                    key={index}
                    text={item.label}
                    size="small"
                    onClick={(event) => handlePillClose(event, item)}
                  />
                ))}
            {(returnedArray.length !== 0 && returnAllSelected) && <br />}
            {(defaultReturn.length !== 0 && !returnAllSelected) && <br/>}
            <input
              id="multiselect_input"
              onChange={(e) => {
                setFilterItem(e.target.value);
              }}
              placeholder="Select..."
              value={filterItem}
              onClick={() => setIsClosed(false)}
            />
          </div>
          {isClosed ? (
            <div key="chevron-down">
              <Icon icon="chevron-down" />
            </div>
          ) : (
            <div key="chevron-up">
              <Icon icon="chevron-up" />
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
  );
};

export default MultiLevelSelect;
