import React from 'react';
import DropdownTrigger from '../subcomponents/DropdownTrigger';
import DropdownContainer from '../subcomponents/DropdownContainer';

export const separateChildComponents = (children: any) => {
    let trigger: React.ReactChild = null;
    let container: React.ReactChild = null;
    const otherChildren: React.ReactChild[] = [];
  
    React.Children.forEach(children, child => {
      if (child && child.type === DropdownTrigger) {
        trigger = child;
      } else if (child && child.type === DropdownContainer) {
        container = child;
      } else {
        otherChildren.push(child);
      }
    });
  
    return { trigger, container, otherChildren };
  };