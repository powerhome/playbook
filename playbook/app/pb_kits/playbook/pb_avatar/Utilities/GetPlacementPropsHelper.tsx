export const getPlacementProps = (placement: string, size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs") => {
  let placementMapping: { [key: string]: any } = {};
  
  switch (size) {
      case 'xxs':
      case 'xs':
          placementMapping = {
              'top-right': { top: 'xs', right: 'xs' },
              'bottom-left': { bottom: 'xs', left: 'xs' },
              'top-left': { top: 'xs', left: 'xs' },
              'bottom-right': { bottom: 'xs', right: 'xs' },
          };
          break;
      
      case 'sm':
          placementMapping = {
              'top-right': { top: '0', right: 'xs' },
              'bottom-left': { bottom: '0', left: 'xs' },
              'top-left': { top: '0', left: 'xs' },
              'bottom-right': { bottom: '0', right: 'xs' },
          };
          break;
      
      case 'md':
      case 'lg':
          placementMapping = {
              'top-right': { top: '0', right: '0' },
              'bottom-left': { bottom: '0', left: '0' },
              'top-left': { top: '0', left: '0' },
              'bottom-right': { bottom: '0', right: '0' },
          };
          break;

      case 'xl':
          placementMapping = {
              'top-right': { top: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
              'bottom-left': { bottom: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
              'top-left': { top: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
              'bottom-right': { bottom: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
          };
          break;

      default:
          // Return an empty object if size is not recognized
          break;
  }

  // Return the specific placement mapping or an empty object if placement is not found
  return placementMapping[placement] || {};
};
