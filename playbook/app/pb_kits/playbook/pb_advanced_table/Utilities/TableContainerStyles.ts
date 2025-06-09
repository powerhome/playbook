/**
 * Utility functions to generate styles for table container
 */

/**
 * Creates styles for a virtualized table container
 * These styles are critical for the virtualizer to work properly
 */
export const getVirtualizedContainerStyles = (maxHeight?: string): React.CSSProperties => {
    // Calculate height based on maxHeight prop or use default
    let heightValue = '600px'; // Default height

    if (maxHeight) {
      switch (maxHeight) {
        case 'xs':
          heightValue = '200px';
          break;
        case 'sm':
          heightValue = '300px';
          break;
        case 'md':
          heightValue = '400px';
          break;
        case 'lg':
          heightValue = '500px';
          break;
        case 'xl':
          heightValue = '600px';
          break;
        case 'xxl':
          heightValue = '700px';
          break;
        case 'xxxl':
          heightValue = '800px';
          break;
        default:
          if (maxHeight !== 'auto') {
            heightValue = maxHeight; // Use custom value if provided
          }
      }
    }

    return {
      overflow: 'auto',       // Critical: must have overflow:auto to enable scrolling
      position: 'relative',   // Required for absolute positioning of virtualized rows
      height: heightValue,    // Must have fixed height (not auto) for virtualization
      width: '100%',          // Fill container width
    };
  };

  /**
   * Creates consistent row styles for virtualized table rows
   * Matches the virtualized row height to the standard table
   */
  export const getVirtualizedRowStyle = (startPosition: number): React.CSSProperties => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '40px', // Match standard table row height
      transform: `translateY(${startPosition}px)`,
      tableLayout: 'fixed',
    };
  };

  /**
   * Get height estimates for different row types
   */
  export const getRowHeightEstimate = (rowType: 'header' | 'row' | 'loading' | 'footer') => {
    switch (rowType) {
      case 'header':
        return 40; // Header height
      case 'loading':
        return 30; // Loading indicator height
      case 'footer':
        return 40
      case 'row':
      default:
        return 40; // Standard row height - match this to your design system
    }
  };
