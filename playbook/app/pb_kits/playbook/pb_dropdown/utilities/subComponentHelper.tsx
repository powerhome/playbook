import React, { ReactElement } from "react";
import DropdownTrigger from "../subcomponents/DropdownTrigger";
import DropdownContainer from "../subcomponents/DropdownContainer";

type PrepareComponentsProps = {
  children: React.ReactChild[] | React.ReactChild;
  hasTriggerSubcomponent: boolean;
  hasContainerSubcomponent: boolean;
  trigger: React.ReactChild;
  container: React.ReactChild;
  otherChildren: React.ReactChild[];
};

export const separateChildComponents = (children: React.ReactChild[] | React.ReactChild | ReactElement[]) => {
  let trigger: React.ReactChild = null;
  let container: React.ReactChild = null;
  const otherChildren: React.ReactChild[] = [];

  React.Children.forEach(children, (child) => {
    if (child && (child as ReactElement).type === DropdownTrigger) {
      trigger = child;
    } else if (child && (child as ReactElement).type === DropdownContainer) {
      container = child;
    } else {
      otherChildren.push(child);
    }
  });

  return { trigger, container, otherChildren };
};

export const prepareSubcomponents = ({
  children,
  hasTriggerSubcomponent,
  hasContainerSubcomponent,
  trigger,
  container,
  otherChildren,
}: PrepareComponentsProps) => {
  const componentsToRender = [];

  if (!hasTriggerSubcomponent && !hasContainerSubcomponent) {
    componentsToRender.push(<DropdownTrigger />);
    componentsToRender.push(<DropdownContainer>{children}</DropdownContainer>);
  } else if (!hasTriggerSubcomponent && hasContainerSubcomponent) {
    componentsToRender.push(<DropdownTrigger />);
    componentsToRender.push(children);
  } else if (hasTriggerSubcomponent && !hasContainerSubcomponent) {
    componentsToRender.push(trigger);
    componentsToRender.push(
      <DropdownContainer>{otherChildren}</DropdownContainer>
    );
  } else {
    componentsToRender.push(trigger);
    componentsToRender.push(container);
  }

  return componentsToRender;
};
