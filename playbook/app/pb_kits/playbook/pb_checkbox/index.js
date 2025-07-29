import PbEnhancedElement from "../pb_enhanced_element"

const INDETERMINATE_MAIN_CHECKBOX_SELECTOR = "[data-pb-checkbox-indeterminate-main='true']"

export default class PbCheckbox extends PbEnhancedElement {
  static get selector() {
    return INDETERMINATE_MAIN_CHECKBOX_SELECTOR
  }

  connect() {
    const mainCheckboxWrapper = this.element;
    const mainCheckbox = mainCheckboxWrapper.querySelector('input')
    const directChildCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${this.element.id}"] input[type="checkbox"]`);

    // Helper function to get all descendant checkboxes
    const getAllDescendantCheckboxes = () => {
      const descendants = [];
      const queue = [...directChildCheckboxes];
      
      // Breadth-first search to find all nested descendants
      while (queue.length > 0) {
        const checkbox = queue.shift();
        descendants.push(checkbox);
        
        // Find children of this checkbox
        const checkboxWrapper = checkbox.closest('[data-pb-checkbox-indeterminate-main="true"]');
        if (checkboxWrapper) {
          const childCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${checkboxWrapper.id}"] input[type="checkbox"]`);
          queue.push(...childCheckboxes);
        }
      }
      
      // Also include any non-"main" checkboxes that have this as a parent
      const nonMainChildCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${this.element.id}"] input[type="checkbox"]`);
      nonMainChildCheckboxes.forEach(cb => {
        if (!descendants.includes(cb)) {
          descendants.push(cb);
        }
      });
      
      return descendants;
    };

    // Helper function to determine checkbox state
    const getCheckboxState = (checkboxes) => {
      const checkedCount = checkboxes.filter(cb => cb.checked).length;
      const totalCount = checkboxes.length;
      
      return {
        allChecked: checkedCount === totalCount,
        noneChecked: checkedCount === 0,
        indeterminate: !(checkedCount === totalCount || checkedCount === 0),
        checkedCount,
        totalCount
      };
    };

    // Helper function to update checkbox visual state
    const updateCheckboxVisualState = (checkbox, isIndeterminate, isChecked) => {
      checkbox.indeterminate = isIndeterminate;
      checkbox.checked = isChecked;
    };

    // Helper function to update checkbox label and icons
    const updateCheckboxLabelAndIcons = (wrapper, isIndeterminate, checkedCount) => {
      const checkAllLabel = wrapper.dataset.pbCheckboxIndeterminateMainLabelCheck ?? 'Check All';
      const uncheckAllLabel = wrapper.dataset.pbCheckboxIndeterminateMainLabelUncheck ?? 'Uncheck All';
      const text = checkedCount === 0 ? checkAllLabel : uncheckAllLabel;

      // Update label
      const bodyKitElement = wrapper.getElementsByClassName('pb_body_kit')[0];
      if (bodyKitElement) {
        bodyKitElement.textContent = text;
      }
      
      // Update icons
      const iconSpan = wrapper.querySelector('[data-pb-checkbox-icon-span]');
      if (iconSpan) {
        const iconClassToAdd = isIndeterminate ? 'pb_checkbox_indeterminate' : 'pb_checkbox_checkmark';
        const iconClassToRemove = isIndeterminate ? 'pb_checkbox_checkmark' : 'pb_checkbox_indeterminate';
        iconSpan.classList.add(iconClassToAdd);
        iconSpan.classList.remove(iconClassToRemove);
      }
      
      // Toggle icon visibility
      const indeterminateIcon = wrapper.getElementsByClassName("indeterminate_icon")[0];
      const checkIcon = wrapper.getElementsByClassName("check_icon")[0];
      
      if (indeterminateIcon) {
        indeterminateIcon.classList.toggle('hidden', !isIndeterminate);
      }
      if (checkIcon) {
        checkIcon.classList.toggle('hidden', isIndeterminate);
      }
    };

    // Main function to update this checkbox's state
    const updateMainCheckbox = () => {
      const allDescendantCheckboxes = getAllDescendantCheckboxes();
      const state = getCheckboxState(allDescendantCheckboxes);
      
      updateCheckboxVisualState(mainCheckbox, state.indeterminate, state.allChecked);
      updateCheckboxLabelAndIcons(mainCheckboxWrapper, state.indeterminate, state.checkedCount);
    };

    // Function to update parent checkboxes recursively
    const updateParentCheckboxes = () => {
      const parentId = mainCheckboxWrapper.dataset.pbCheckboxIndeterminateParent;
      if (parentId) {
        const parentCheckbox = document.getElementById(parentId);
        if (parentCheckbox) {
          const parentWrapper = parentCheckbox.closest('[data-pb-checkbox-indeterminate-main="true"]');
          if (parentWrapper) {
            const parentInstance = parentWrapper.pbCheckboxInstance;
            if (parentInstance && parentInstance.updateMainCheckbox) {
              parentInstance.updateMainCheckbox();
              parentInstance.updateParentCheckboxes();
            }
          }
        }
      }
    };

    // Function to update non-main checkboxes when their children change
    const setupNonMainCheckboxUpdates = () => {
      const allCheckboxesWithChildren = document.querySelectorAll('input[type="checkbox"]');
      allCheckboxesWithChildren.forEach(cb => {
        const checkboxWrapper = cb.closest('[data-pb-checkbox-indeterminate-main="true"]');
        if (checkboxWrapper && checkboxWrapper !== mainCheckboxWrapper) {
          return; // Skip different "main" checkboxes
        }
        
        const childCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${cb.id}"] input[type="checkbox"]`);
        if (childCheckboxes.length > 0) {
          childCheckboxes.forEach(childCb => {
            childCb.addEventListener('change', () => {
              const state = getCheckboxState(Array.from(childCheckboxes));
              updateCheckboxVisualState(cb, state.indeterminate, state.allChecked);
              
              // Trigger updates on all main checkboxes that might be affected
              const mainCheckboxes = document.querySelectorAll('[data-pb-checkbox-indeterminate-main="true"]');
              mainCheckboxes.forEach(mainCb => {
                const mainInstance = mainCb.pbCheckboxInstance;
                if (mainInstance && mainInstance.updateMainCheckbox) {
                  setTimeout(() => {
                    mainInstance.updateMainCheckbox();
                  }, 0);
                }
              });
            });
          });
        }
      });
    };

    // Store this instance on the wrapper for parent access
    mainCheckboxWrapper.pbCheckboxInstance = {
      updateMainCheckbox,
      updateParentCheckboxes
    };

    // Initialize checkbox state
    updateMainCheckbox();

    // Handle main checkbox change - propagate to all descendants
    mainCheckbox.addEventListener('change', function() {
      const allDescendantCheckboxes = getAllDescendantCheckboxes();
      const state = getCheckboxState(allDescendantCheckboxes);
      
      if (state.indeterminate) {
        // If indeterminate, uncheck all descendants and the parent
        allDescendantCheckboxes.forEach(cb => cb.checked = false);
        this.checked = false;
      } else {
        // Otherwise, set all descendants to the same state as this checkbox
        allDescendantCheckboxes.forEach(cb => cb.checked = this.checked);
      }
      
      // Update this checkbox first, then parents after a delay
      updateMainCheckbox();
      setTimeout(() => {
        updateParentCheckboxes();
      }, 0);
    });

    // Handle child checkbox changes
    directChildCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateMainCheckbox);
    });

    // Handle deeper descendant changes
    const allDescendantCheckboxes = getAllDescendantCheckboxes();
    allDescendantCheckboxes.forEach(cb => {
      if (!Array.from(directChildCheckboxes).includes(cb)) {
        cb.addEventListener('change', updateMainCheckbox);
      }
    });

    // Handle non-main child checkboxes
    const allChildCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${this.element.id}"] input[type="checkbox"]`);
    allChildCheckboxes.forEach(cb => {
      if (!allDescendantCheckboxes.includes(cb)) {
        cb.addEventListener('change', updateMainCheckbox);
      }
    });

    // Setup updates for non-main checkboxes with children
    setupNonMainCheckboxUpdates();
  }
}
