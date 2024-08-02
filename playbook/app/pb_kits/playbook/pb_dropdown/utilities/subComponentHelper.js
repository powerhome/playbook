import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import DropdownTrigger from "../subcomponents/DropdownTrigger";
import DropdownContainer from "../subcomponents/DropdownContainer";
export const separateChildComponents = (children) => {
    let trigger = null;
    let container = null;
    const otherChildren = [];
    React.Children.forEach(children, (child) => {
        if (child && child.type === DropdownTrigger) {
            trigger = child;
        }
        else if (child && child.type === DropdownContainer) {
            container = child;
        }
        else {
            otherChildren.push(child);
        }
    });
    return { trigger, container, otherChildren };
};
export const prepareSubcomponents = ({ children, hasTriggerSubcomponent, hasContainerSubcomponent, trigger, container, otherChildren, dark }) => {
    const componentsToRender = [];
    if (!hasTriggerSubcomponent && !hasContainerSubcomponent) {
        componentsToRender.push(_jsx(DropdownTrigger, { dark: dark }));
        componentsToRender.push(_jsx(DropdownContainer, { dark: dark, children: children }));
    }
    else if (!hasTriggerSubcomponent && hasContainerSubcomponent) {
        componentsToRender.push(_jsx(DropdownTrigger, { dark: dark }));
        componentsToRender.push(children);
    }
    else if (hasTriggerSubcomponent && !hasContainerSubcomponent) {
        componentsToRender.push(trigger);
        componentsToRender.push(_jsx(DropdownContainer, { dark: dark, children: otherChildren }));
    }
    else {
        componentsToRender.push(trigger);
        componentsToRender.push(container);
    }
    return componentsToRender;
};
//# sourceMappingURL=subComponentHelper.js.map