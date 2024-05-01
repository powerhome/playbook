export const getPlacementProps = (placement: string, size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs") => {
    let placementMapping: any;
  
    if (size === 'xxs') {
      placementMapping = {
        'top-right': { top: 'xs', right: 'xs' },
        'bottom-left': { bottom: 'xs', left: 'xs' },
        'top-left': { top: 'xs', left: 'xs' },
        'bottom-right': { bottom: 'xs', right: 'xs' },
      };
    } else if (size === 'xs') {
      placementMapping = {
        'top-right': { top: 'xs', right: 'xs' },
        'bottom-left': { bottom: 'xs', left: 'xs' },
        'top-left': { top: 'xs', left: 'xs' },
        'bottom-right': { bottom: 'xs', right: 'xs' },
      };
    } else if (size === 'sm') {
      placementMapping = {
        'top-right': { top: '0', right: 'xs' },
        'bottom-left': { bottom: '0', left: 'xs' },
        'top-left': { top: '0', left: 'xs' },
        'bottom-right': { bottom: '0', right: 'xs' },
      };
    } else if (size === 'md') {
      placementMapping = {
        'top-right': { top: '0', right: '0' },
        'bottom-left': { bottom: '0', left: '0' },
        'top-left': { top: '0', left: '0' },
        'bottom-right': { bottom: '0', right: '0' },
      };
    } else if (size === 'lg') {
      placementMapping = {
        'top-right': { top: '0', right: '0' },
        'bottom-left': { bottom: '0', left: '0' },
        'top-left': { top: '0', left: '0' },
        'bottom-right': { bottom: '0', right: '0' },
      };
    } else if (size === 'xl') {
      placementMapping = {
        'top-right': { top: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
        'bottom-left': { bottom: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
        'top-left': { top: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
        'bottom-right': { bottom: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
      };
    }
  
    // Return the specific placement mapping or an empty object if placement is not found
    return placementMapping[placement] || {};
  };