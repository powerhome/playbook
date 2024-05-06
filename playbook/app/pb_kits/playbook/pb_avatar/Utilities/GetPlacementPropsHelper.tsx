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
              'bottom-center': { bottom: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'top-center': { top: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'left-center': { left: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } },
              'right-center': { right: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } }
          };
          break;
      
      case 'sm':
          placementMapping = {
              'top-right': { top: '0', right: 'xs' },
              'bottom-left': { bottom: '0', left: 'xs' },
              'top-left': { top: '0', left: 'xs' },
              'bottom-right': { bottom: '0', right: 'xs' },
              'bottom-center': { bottom: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'top-center': { top: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'left-center': { left: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } },
              'right-center': { right: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } }
          };
          break;
      
      case 'md':
      case 'lg':
          placementMapping = {
              'top-right': { top: '0', right: '0' },
              'bottom-left': { bottom: '0', left: '0' },
              'top-left': { top: '0', left: '0' },
              'bottom-right': { bottom: '0', right: '0' },
              'bottom-center': { bottom: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'top-center': { top: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'left-center': { left: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } },
              'right-center': { right: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } }
          };
          break;

      case 'xl':
          placementMapping = {
              'top-right': { top: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
              'bottom-left': { bottom: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
              'top-left': { top: { value: "xxs", inset: true }, left: { value: "xxs", inset: true } },
              'bottom-right': { bottom: { value: "xxs", inset: true }, right: { value: "xxs", inset: true } },
              'bottom-center': { bottom: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'top-center': { top: "xs", htmlOptions: { style: { left: '50%', transform: 'translateX(-50%)', padding: '2px' } } },
              'left-center': { left: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } },
              'right-center': { right: "sm", htmlOptions: { style: { top: '50%', transform: 'translateY(-50%)', padding: '2px' } } }
          };
          break;
  }
  return placementMapping[placement] || {};
};
