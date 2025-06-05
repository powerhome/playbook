import React, { useState } from 'react';
import FilterSingle, { FilterSingleProps } from './FilterSingle';
import FilterDouble, { FilterDoubleProps } from './FilterDouble';

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean;
    });

const Filter = ({
  double = false,
  ...templateProps
}: FilterProps): React.ReactElement => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (child: Element) => {
    const dates = child.textContent;
    setSelectedDate(dates);
    console.log('Selected date:', dates);
    
    const datePickers = Array.from(document.getElementsByClassName('quick-pick-ul')[0].children);
    datePickers.forEach((el) => el.classList.remove('selected'));
    child.classList.add('selected');
  };

  const handlePopoverOpen = () => {
    const datePickers = Array.from(document.getElementsByClassName('quick-pick-ul')[0].children);
    
    datePickers.forEach((child: Element) => {
      child.removeEventListener('click', handleDateClick);
      
      child.addEventListener('click', () => handleDateClick(child));
    });
  };

  const displayFilter = () => {
    if (double === true) {
      return (
        <FilterDouble 
            onPopoverOpen={handlePopoverOpen}
            {...templateProps}
        />
      );
    } else {
      return (
        <FilterSingle 
            onPopoverOpen={handlePopoverOpen} 
            selectedDate={selectedDate}
            {...templateProps} 
        />
      );
    }
  };

  return <>{displayFilter()}</>;
};

export default Filter;