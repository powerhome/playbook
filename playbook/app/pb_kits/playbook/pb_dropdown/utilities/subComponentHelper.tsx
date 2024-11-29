import React, { ReactElement } from "react";
import DropdownTrigger from "../subcomponents/DropdownTrigger";
import DropdownContainer from "../subcomponents/DropdownContainer";

type PrepareComponentsProps = {
  children: React.ReactChild[] | React.ReactChild;
  container: React.ReactChild;
  dark?: boolean;
  hasContainerSubcomponent: boolean;
  hasTriggerSubcomponent: boolean;
  otherChildren: React.ReactChild[];
  trigger: React.ReactChild;
};

export const separateChildComponents = (children: React.ReactChild[] | React.ReactChild | ReactElement[]) => {
  let trigger: React.ReactChild = null;
  let container: React.ReactChild = null;
  const otherChildren: React.ReactChild[] = [];

  React.Children.forEach(children, (child) => {
    const element = child as ReactElement;
    const childType = element?.type;
    const childDisplayName = (childType as any)?.displayName || (childType as any)?.name;

    if (
      childType === DropdownTrigger ||
      childDisplayName === "DropdownTrigger"
    ) {
      trigger = child;
    } else if (
      childType === DropdownContainer ||
      childDisplayName === "DropdownContainer"
    ) {
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
  dark
}: PrepareComponentsProps) => {
  const componentsToRender = [];

  if (!hasTriggerSubcomponent && !hasContainerSubcomponent) {
    componentsToRender.push(<DropdownTrigger dark={dark}/>);
    componentsToRender.push(<DropdownContainer dark={dark}>{children}</DropdownContainer>);
  } else if (!hasTriggerSubcomponent && hasContainerSubcomponent) {
    componentsToRender.push(<DropdownTrigger dark={dark}/>);
    componentsToRender.push(children);
  } else if (hasTriggerSubcomponent && !hasContainerSubcomponent) {
    componentsToRender.push(trigger);
    componentsToRender.push(
      <DropdownContainer dark={dark}>{otherChildren}</DropdownContainer>
    );
  } else {
    componentsToRender.push(trigger);
    componentsToRender.push(container);
  }

  return componentsToRender;
};
