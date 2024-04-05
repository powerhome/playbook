import React, {useState, useRef, useEffect} from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import DropdownContainer from './subcomponents/DropdownContainer'
import DropdownOption from './subcomponents/DropdownOption'
import DropdownTrigger from './subcomponents/DropdownTrigger'
import DropdownContext from './context'
import { GenericObject } from '../types'

type DropdownProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  children?: React.ReactChild[] | React.ReactChild,
  options?: GenericObject,
  onSelect?: (arg:GenericObject) => null
}

const Dropdown = (props: DropdownProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
    options,
    onSelect
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_dropdown'), globalProps(props), className)

  const [isDropDownClosed, setIsDropDownClosed] = useState(true);
  const [filterItem, setFilterItem] = useState("");
  const [selected, setSelected] = useState({});
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // useEffect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownClosed(true);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleChange = (e: any) => {
    setFilterItem(e.target.value);
    setIsDropDownClosed(false);
  };

  const handleOptionClick = (selectedItem: GenericObject) => {
    setSelected(selectedItem);
    setFilterItem("");
    onSelect(selectedItem);
    setIsDropDownClosed(true);
  };

  const handleOnKeyDown = (key: string) => {
    if (key === "Backspace" || key === "Delete") {
      setSelected({ label: "", value: "" });
    }
  };

  const handleWrapperClick = () => {
    inputRef.current.focus();
    setIsDropDownClosed(!isDropDownClosed);
  };



  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <DropdownContext.Provider
          value={{
            handleOptionClick,
            selected,
            options,
            filterItem,
            handleChange,
            handleOnKeyDown,
            setIsDropDownClosed,
            isDropDownClosed,
            inputRef,
            handleWrapperClick
          }}
      >
        <div className="typeahead_wrapper" 
            ref={dropdownRef}
        >
          {children ? (
            children
          ) : (
            <>
              <DropdownTrigger />
              <DropdownContainer/>
            </>
          )}
        </div>
      </DropdownContext.Provider>
    </div>
  )
}

Dropdown.Option = DropdownOption;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Container = DropdownContainer;

export default Dropdown
