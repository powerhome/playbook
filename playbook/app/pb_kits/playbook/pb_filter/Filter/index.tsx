import React, { Children, isValidElement } from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
      variant?: "popover" | "inline"
    })

interface FilterInputsProps {
  children: React.ReactChild | React.ReactChild[]
}

const FilterInputs: React.FC<FilterInputsProps> = ({ children }) => {
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
  }: FilterProps & { children?: React.ReactNode | React.ReactChild[] }): React.ReactElement => {
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
  const extractInputs = (children: React.ReactNode): React.ReactChild | React.ReactChild[] => {
    const extractedChildren = Children.toArray(children).reduce<React.ReactChild[]>((acc, child) => {
      if (!isValidElement(child)) return acc;

      if (child.type === FilterInputs) {
        const inputChildren = Children.toArray(child.props.children) as React.ReactChild[];
        return [...acc, ...inputChildren];
      }

      if (child.props && child.props.children) {
        const nestedChildren = extractInputs(child.props.children);
        if (Array.isArray(nestedChildren)) {
          return [...acc, ...nestedChildren];
        } else if (nestedChildren) {
          return [...acc, nestedChildren];
        }
      }

      return acc;
    }, []);

    return extractedChildren.length === 1 ? extractedChildren[0] : extractedChildren;
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
