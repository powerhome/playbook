import React, { useState, useEffect } from "react";
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
} & GlobalProps

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
  //state for whether dropdown is open or closed
  const [isClosed, setIsClosed] = useState(true);
  //state from onchange for textinput, to use for filtering to create typeahead
  const [filterItem, setFilterItem] = useState("");
  //this is essentially the return that the user will get when they use the kit
  const [returnedArray, setReturnedArray] = useState([]);
  //formattedData with checked and parent_id added
  const [formattedData, setFormattedData] = useState(treeData);
  //toggle chevron in dropdown
  const [isToggled, setIsToggled] = useState<{ [id: number]: boolean }>({})

  useEffect(() => {
    returnAllSelected && (
      onSelect(returnedArray)
    )
  }, [returnedArray]);

  useEffect(() => {
    //Create new formattedData array for use that has checked + parent property
    //Use this for all kit logic
    setFormattedData(addCheckedAndParentProperty(treeData));
  }, []);

  //function to map over data and add checked + parent_id + depth property to each item
  const addCheckedAndParentProperty = (treeData:any, parent_id:string = null, depth:number = 0) => {
    if (!Array.isArray(treeData)) {
      return; 
    }
    return treeData.map((item:any) => {
      const newItem = { ...item, checked: false, parent_id, depth };

      if (newItem.children && newItem.children.length > 0) {
        newItem.children = addCheckedAndParentProperty(
          newItem.children,
          newItem.id,
          depth + 1
        );
      }

      return newItem;
    });
  };

  //function for unchecking items in formattedData
  const unCheckIt = (formattedData:any, id:string) => {
    formattedData.map((item:any) => {
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
  const handlePillClose = (clickedItem: any) => {
    //logic for removing items from returnArray when pills clicked
    if (returnedArray.includes(clickedItem)) {
      const removeUnchecked = returnedArray.filter(
        (item) => item.id !== clickedItem.id
      );
      setReturnedArray(removeUnchecked);
    }
    //logic to uncheck clickedItem in formattedData
    unCheckIt(formattedData, clickedItem.id);
  };

  //handle click on input wrapper(entire div with pills, typeahead, etc) so it doesn't close when input or form pill is clicked
  const handleInputWrapperClick = (e:any) => {
    if (e.target.id === "multiselect_input" || e.target.classList.contains("pb_form_pill_tag")) {
      return;
    }
    setIsClosed(!isClosed);
  };

  const handledropdownItemClick = (e:any) => {
    //grab id from parent div
    const clickedItem = e.target.parentNode.id;
    //setting filterItem to "" will clear textinput and clear typeahead
    setFilterItem("");

    const filtered = filterTreeDataById(formattedData, clickedItem);
    //check all children of checked parent item
    if (filtered[0].children && filtered[0].children.length > 0) {
      filtered[0].children.forEach((item: any) => {
        toggleCheckedRecursive(item);
      });
    }

    const checkedItems = getCheckedItems(formattedData);
    console.log(checkedItems);

    //filtered will always be an array with 1 object in it, so targetting it with index [0] 
    if (returnedArray.includes(filtered[0])) {
      if (!filtered[0].checked) {
        const updatedFiltered = returnedArray.filter(
          (item) => item !== filtered[0]
        );
        setReturnedArray(updatedFiltered);
      }
    } else {
      setReturnedArray(checkedItems)
    }
  };

//recursively check all child and grandchild items if parent checked
  const toggleCheckedRecursive = (item: any) => {
    if (!item.checked) {
      item.checked = true;
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach((childItem: any) => {
        toggleCheckedRecursive(childItem);
      });
    }
  };

  //function to get all items with checked = true
  const getCheckedItems = (data: any[]): any[] => {
    const checkedItems: any[] = [];
    data.forEach((item: any) => {
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
const handleToggleClick = (id:number) => {
  setIsToggled((prevState:{ [id: number]: boolean }) => ({
    ...prevState,
    [id]: !prevState[id],
  }));
}

  //Function is filtering formattedData by filteredItem to create typeahead functionality
  const filterTreeData = (formattedData:any, searchTerm:string) => {
    const matchedItems:any = [];
  
    const recursiveSearch = (data:any, term:any) => {
      if (!Array.isArray(data)) {
        return; 
      }
      data.forEach((item:any) => {
        if (item.label.toLowerCase().includes(term.toLowerCase())) {
          matchedItems.push(item);
        }
  
        if (item.children && item.children.length > 0) {
          recursiveSearch(item.children, term);
        }
      });
    };
  
    recursiveSearch(formattedData, searchTerm);
    return matchedItems;
  };

  //function is going over formattedData and returning all objects that match the
  //id of the clicked item from the dropdown
  const filterTreeDataById = (formattedData:any, id:string) => {
    const matched: any[] = [];
    const recursiveSearch = (data:any, term:any) => {
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


  //rendering formattedData to UI based on typeahead
  const renderNestedOptions = (items:any) => {
    return (
      <ul>
        {items.map((item:any) => {
          const isItemMatchingFilter = item.label
            .toLowerCase()
            .includes(filterItem.toLowerCase());

          if (
            !isItemMatchingFilter &&
            (!item.children || item.children.length === 0)
          ) {
            return null;
          }

          return (
            <>
            {isItemMatchingFilter && (
              <>
              <li
                key={item.id}
                className="dropdown_item"
                data-name={item.id}
                style={{paddingLeft: item.depth * 20}}
              >
                <div key={isToggled[item.id] ? "chevron-down" : "chevron-right"}>
                  <CircleIconButton
                    icon={isToggled[item.id] ? "chevron-down" : "chevron-right"}
                    className={item.children ? "" : "toggle_icon"}
                    onClick={() => handleToggleClick(item.id)}
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
              </li>
              {/* {
                isToggled[item.id] && (
                  item.children.map((x:any)=> {
                    <div>hello</div>
                  })
                )
              } */}
              </>
            )}
            </>
          );
        })}
      </ul>
    );
  };

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      <div className="wrapper">
        <div className="input_wrapper" onClick={handleInputWrapperClick}>
          <div className="input_inner_container">
            {returnedArray.length !== 0
              ? returnedArray.map((item, index) => (
                  <FormPill
                    key={index}
                    text={item.label}
                    size="small"
                    onClick={() => handlePillClose(item)}
                  />
                ))
              : null}
            {returnedArray.length !== 0 ? <br /> : null}
            <input
              id="multiselect_input"
              onChange={(e) => setFilterItem(e.target.value)}
              placeholder="Select..."
              value={filterItem}
              onClick={() => setIsClosed(false)}
              data-tree={JSON.stringify(returnedArray)}
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
          {renderNestedOptions(filterTreeData(formattedData, filterItem))}
        </div>
      </div>
    </div>
  );
          }


export default MultiLevelSelect;
