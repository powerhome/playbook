import { acceptsChildren } from "./kitUtils";
import type { BuilderInstance, PlaygroundKit, TargetOption } from "./types";

export const countInstances = (instances: BuilderInstance[]): number =>
  instances.reduce((count, instance) => count + 1 + countInstances(instance.children), 0);

export const findInstance = (
  instances: BuilderInstance[],
  id: string | null
): BuilderInstance | undefined => {
  if (!id) return undefined;

  for (const instance of instances) {
    if (instance.id === id) return instance;
    const found = findInstance(instance.children, id);
    if (found) return found;
  }

  return undefined;
};

export const updateInstanceInTree = (
  instances: BuilderInstance[],
  id: string,
  updater: (instance: BuilderInstance) => BuilderInstance
): BuilderInstance[] =>
  instances.map((instance) => {
    if (instance.id === id) return updater(instance);

    return {
      ...instance,
      children: updateInstanceInTree(instance.children, id, updater),
    };
  });

export const removeInstanceFromTree = (
  instances: BuilderInstance[],
  id: string
): BuilderInstance[] =>
  instances
    .filter((instance) => instance.id !== id)
    .map((instance) => ({
      ...instance,
      children: removeInstanceFromTree(instance.children, id),
    }));

export const moveInstanceInTree = (
  instances: BuilderInstance[],
  id: string,
  direction: -1 | 1
): BuilderInstance[] => {
  const index = instances.findIndex((instance) => instance.id === id);

  if (index >= 0) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= instances.length) return instances;

    const next = [...instances];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    return next;
  }

  return instances.map((instance) => ({
    ...instance,
    children: moveInstanceInTree(instance.children, id, direction),
  }));
};

export const buildTargetOptions = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  depth = 0
): TargetOption[] =>
  instances.flatMap((instance) => {
    const kit = kitsByName[instance.kitName];
    const childOptions = buildTargetOptions(instance.children, kitsByName, depth + 1);

    if (!acceptsChildren(kit)) return childOptions;

    return [
      {
        id: instance.id,
        label: `${"--".repeat(depth)}${depth ? " " : ""}${kit?.label ?? instance.kitName}`,
      },
      ...childOptions,
    ];
  });

export const buildInstanceOptions = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  depth = 0
): TargetOption[] =>
  instances.flatMap((instance, index) => {
    const kit = kitsByName[instance.kitName];
    const label = `${"--".repeat(depth)}${depth ? " " : ""}${kit?.label ?? instance.kitName} ${
      index + 1
    }`;

    return [
      { id: instance.id, label },
      ...buildInstanceOptions(instance.children, kitsByName, depth + 1),
    ];
  });
