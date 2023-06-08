import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import Icon from "../pb_icon/_icon";
import Checkbox from "../pb_checkbox/_checkbox";
import FormPill from "../pb_form_pill/_form_pill";
import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button";

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

  useEffect(() => {
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

  useEffect(() => {
    let el = document.getElementById(`pb_data_wrapper_${id}`);
    if (el) {
      el.setAttribute("data-tree", JSON.stringify(returnedArray));
    }
    onSelect(returnedArray);
  }, [returnedArray]);

  useEffect(() => {
    //Create new formattedData array for use that has checked + parent property
    //Use this for all kit logic
    setFormattedData(addCheckedAndParentProperty(treeData));
  }, []);

  //function to map over data and add checked + parent_id + depth + expanded property to each item
  const addCheckedAndParentProperty = (
    treeData: { [key: string]: any }[],
    parent_id: string = null,
    depth: number = 0,
    expanded: boolean = false
  ) => {
    if (!Array.isArray(treeData)) {
      return;
    }
    return treeData.map((item: { [key: string]: any } | any) => {
      const newItem = { ...item, checked: false, parent_id, depth, expanded };

      if (newItem.children && newItem.children.length > 0) {
        newItem.children = addCheckedAndParentProperty(
          newItem.children,
          newItem.id,
          depth + 1,
          expanded
        );
      }

      return newItem;
    });
  };

  //function for unchecking items in formattedData
  const unCheckIt = (formattedData: { [key: string]: any }[], id: string) => {
    formattedData.map((item: { [key: string]: any }) => {
      if (item.id === id && item.checked) {
        item.checked = false;
      }
      if (item.children && item.children.length > 0) {
        unCheckIt(item.children, id);
      }
      return item;
    });
  };

  //click event for x on form pill
  const handlePillClose = (event: any, clickedItem: { [key: string]: any }) => {
    // prevents the dropdown from closing when clicking on the pill
    event.stopPropagation();
    //logic for removing items from returnArray when pills clicked
    if (returnedArray.includes(clickedItem)) {
      if (returnAllSelected) {
        const removeUnchecked = returnedArray.filter(
          (item) => item.id !== clickedItem.id
        );
        setReturnedArray(removeUnchecked);
      } else {
        if (clickedItem.parent_id) {
          getAncestorsOfChecked(formattedData, clickedItem);
          const getNewChecked = getCheckedItems(formattedData);
          const removeUnchecked = getNewChecked.filter(
            (item) => item.id !== clickedItem.id
          );
          setReturnedArray(removeUnchecked);
        }
      }
    }
    //logic to uncheck clickedItem in formattedData
    unCheckIt(formattedData, clickedItem.id);
  };

  //handle click on input wrapper(entire div with pills, typeahead, etc) so it doesn't close when input or form pill is clicked
  const handleInputWrapperClick = (e: any) => {
    if (
      e.target.id === "multiselect_input" ||
      e.target.classList.contains("pb_form_pill_tag")
    ) {
      return;
    }
    setIsClosed(!isClosed);
  };

  const getAncestorsOfChecked = (formattedData: { [key: string]: any }[], item: { [key: string]: any }) => {
    if (item.parent_id) {
      const ancestors = filterFormattedDataById(formattedData, item.parent_id);
      ancestors[0].checked = false;

      if (ancestors[0].parent_id) {
        getAncestorsOfChecked(formattedData, ancestors[0]);
      }
    }
  };

  const handledropdownItemClick = (e: any) => {
    //grab id from parent div
    const clickedItem = e.target.parentNode.id;
    //setting filterItem to "" will clear textinput and clear typeahead
    setFilterItem("");

    const filtered = filterFormattedDataById(formattedData, clickedItem);
    //check and uncheck all children of checked/unchecked parent item
    if (filtered[0].children && filtered[0].children.length > 0) {
      if (filtered[0].checked) {
        filtered[0].children.forEach((item: { [key: string]: any }) => {
          checkedRecursive(item);
        });
      } else if (!filtered[0].checked && !returnAllSelected) {
        filtered[0].children.forEach((item: { [key: string]: any }) => {
          unCheckedRecursive(item);
        });
      }
    }

    const checkedItems = getCheckedItems(formattedData);

    //filtered will always be an array with 1 object in it, so targetting it with index [0]
    if (returnedArray.includes(filtered[0])) {
      if (!filtered[0].checked) {
        if (!returnAllSelected) {
          //uncheck parent if any child unchecked
          getAncestorsOfChecked(formattedData, filtered[0]);

          const updatedFiltered = (
            returnedArray: { [key: string]: any }[],
            filtered: { [key: string]: any }
          ) => {
            const updatedArray = returnedArray.filter(
              (item: { [key: string]: any }) => item !== filtered[0]
            );

            if (filtered.children && filtered.children.length > 0) {
              const filteredChildren = filtered.children.map(
                (child: { [key: string]: any }) =>
                  updatedFiltered(returnedArray, [child])
              );
              updatedArray.push(...filteredChildren.flat());
            }
            return updatedArray.filter(
              (item: { [key: string]: any }, index: number) =>
                updatedArray.indexOf(item) === index
            );
          };
          setReturnedArray(getCheckedItems(formattedData));
        } else {
          const updatedFiltered = returnedArray.filter(
            (item) => item !== filtered[0]
          );
          setReturnedArray(updatedFiltered);
        }
      }
    } else {
      setReturnedArray(checkedItems);
    }
  };

  //recursively check all child and grandchild items if parent checked
  const checkedRecursive = (item: { [key: string]: any }) => {
    if (!item.checked) {
      item.checked = true;
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach((childItem: { [key: string]: any }) => {
        checkedRecursive(childItem);
      });
    }
  };

  //recursively uncheck all child and grandchild items if parent checked
  const unCheckedRecursive = (item: { [key: string]: any }) => {
    if (item.checked) {
      item.checked = false;
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach((childItem: { [key: string]: any }) => {
        unCheckedRecursive(childItem);
      });
    }
  };

  //function to get all items with checked = true
  const getCheckedItems = (
    data: { [key: string]: any }[]
  ): { [key: string]: any }[] => {
    const checkedItems: { [key: string]: any }[] = [];
    data.forEach((item: { [key: string]: any }) => {
      if (item.checked) {
        checkedItems.push(item);
      }
      if (item.children && item.children.length > 0) {
        const childCheckedItems = getCheckedItems(item.children);
        checkedItems.push(...childCheckedItems);
      }
    });
    return checkedItems;
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

  //function is going over formattedData and returning all objects that match the
  //id of the clicked item from the dropdown
  const filterFormattedDataById = (
    formattedData: { [key: string]: any }[],
    id: string
  ) => {
    const matched: { [key: string]: any }[] = [];
    const recursiveSearch = (data: { [key: string]: any }[], term: string) => {
      for (const item of data) {
        if (item.id.toLowerCase().includes(term.toLowerCase())) {
          matched.push(item);
        }

        if (item.children && item.children.length > 0) {
          recursiveSearch(item.children, term);
        }
      }
    };

    recursiveSearch(formattedData, id);
    return matched;
  };

  const findByFilter = (
    formattedData: { [key: string]: any }[],
    searchTerm: string
  ) => {
    const matchedItems: { [key: string]: any }[] = [];
    const recursiveSearch = (data: { [key: string]: any }[], term: string) => {
      for (const item of data) {
        if (item.label.toLowerCase().includes(term.toLowerCase())) {
          matchedItems.push(item);
        }

        if (item.children) {
          recursiveSearch(item.children, term);
        }
      }
    };

    recursiveSearch(formattedData, searchTerm);
    return matchedItems;
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
            {returnedArray.length !== 0
              ? returnedArray.map((item, index) => (
                  <FormPill
                    key={index}
                    text={item.label}
                    size="small"
                    onClick={(event) => handlePillClose(event, item)}
                  />
                ))
              : null}
            {returnedArray.length !== 0 ? <br /> : null}
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
