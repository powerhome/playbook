import React, { Children, isValidElement } from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
      variant?: "popover" | "inline"
    })

const FilterInputs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}

const Filter = ({
  children,
  double = false,
  variant = "popover",
  ...templateProps
  }: FilterProps & { children?: React.ReactNode }): React.ReactElement => {
   // Function to check if children contain FilterInputs
  const hasFilterInputs = (children: React.ReactNode): boolean => {
    let found = false;
    Children.forEach(children, child => {
      if (!isValidElement(child)) return;

      if (child.type === FilterInputs) {
        found = true;
      } else if (child.props && child.props.children) {
        if (hasFilterInputs(child.props.children)) {
          found = true;
        }
      }
    });
    return found;
  }

  // Function to find and extract FilterInputs children
  const extractInputs = (children: React.ReactNode): React.ReactNode => {
    return Children.map(children, child => {
      if (!isValidElement(child)) return null;

      if (child.type === FilterInputs) {
        return child.props.children;
      }

      if (child.props && child.props.children) {
        const extractedChildren = extractInputs(child.props.children);
        if (extractedChildren) {
          return extractedChildren;
        }
      }

      return null;
    });
  }

  const displayFilter = () => {
    const inputsToDisplay = hasFilterInputs(children)
      ? extractInputs(children)
      : children;

    if (double === true) {
      return (
        <FilterDouble
            variant={variant}
            {...templateProps}
        >
          {inputsToDisplay}
        </FilterDouble>
      )
    } else {
      return (
        <FilterSingle
            variant={variant}
            {...templateProps}
        >
          {inputsToDisplay}
        </FilterSingle>
      )
    }
  }
  return (
    <>
      {displayFilter()}
    </>
  )
}

Filter.Inputs = FilterInputs

export default Filter
