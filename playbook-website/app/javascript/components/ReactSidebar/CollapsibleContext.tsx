import React, { createContext, useContext, useState } from 'react';

const CollapsibleContext = createContext();

export const CollapsibleProvider = ({ children }) => {
  const [collapsedItems, setCollapsedItems] = useState({});

  const toggleCollapse = (id) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <CollapsibleContext.Provider value={{ collapsedItems, toggleCollapse }}>
      {children}
    </CollapsibleContext.Provider>
  );
};

export const useCollapsibleContext = () => {
  return useContext(CollapsibleContext);
};
