import React, {useState, useRef, useEffect} from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'

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
  const [isInputFocused, setIsInputFocused] = useState(false);
  //state for keyboard events
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // useEffect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownClosed(true);
        setIsInputFocused(false)
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


  const handleWrapperClick = () => {
    inputRef.current.focus();
    setIsDropDownClosed(!isDropDownClosed);
  };

  const handleBackspace = () => {
    setSelected({})
    onSelect(null)
    setFocusedOptionIndex(-1)
  }

  const filteredOptions = options?.filter((option: GenericObject) =>
  option.label.toLowerCase().includes(filterItem.toLowerCase())
);

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
            setSelected,
            options,
            filterItem,
            handleChange,
            setIsDropDownClosed,
            isDropDownClosed,
            inputRef,
            handleWrapperClick,
            focusedOptionIndex,
            setFocusedOptionIndex,
            filteredOptions,
            handleBackspace,
            isInputFocused,
            setIsInputFocused
          }}
      >
        <div className="dropdown_wrapper" 
            ref={dropdownRef}
        >
          {children ? (
            children
          ) : (
            <>
              <DropdownTrigger />
              <DropdownContainer>
              {options && options?.map((option: GenericObject) => (
                <Dropdown.Option key={option.id} 
                    option={option}
                >
                    <Body text={option.label}/>
                </Dropdown.Option>
              ))}
              </DropdownContainer>
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
