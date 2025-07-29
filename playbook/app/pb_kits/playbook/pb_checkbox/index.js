import PbEnhancedElement from "../pb_enhanced_element"

const INDETERMINATE_MAIN_CHECKBOX_SELECTOR = "[data-pb-checkbox-indeterminate-main='true']"

export default class PbCheckbox extends PbEnhancedElement {
  static get selector() {
    return INDETERMINATE_MAIN_CHECKBOX_SELECTOR
  }

  connect() {
    const mainCheckboxWrapper = this.element;
    const mainCheckbox = mainCheckboxWrapper.querySelector('input')

    // Get all direct child checkboxes
    const directChildCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${this.element.id}"] input[type="checkbox"]`);

    // Get all descendant checkboxes (including nested children)
    const getAllDescendantCheckboxes = () => {
      const descendants = [];
      const queue = [...directChildCheckboxes];
      
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

    const updateMainCheckbox = () => {
      // Get all descendant checkboxes dynamically (in case they've changed)
      const allDescendantCheckboxes = getAllDescendantCheckboxes();
      
      // Count the number of checked descendant checkboxes
      const checkedCount = allDescendantCheckboxes.filter(cb => cb.checked).length;
      const totalCount = allDescendantCheckboxes.length;
      
      // Determine the three states:
      // - checked: all descendants are checked
      // - unchecked: no descendants are checked  
      // - indeterminate: some descendants are checked
      const allChecked = checkedCount === totalCount;
      const noneChecked = checkedCount === 0;
      const indeterminate = !allChecked && !noneChecked;
      
      // Set the main checkbox states
      mainCheckbox.indeterminate = indeterminate;
      mainCheckbox.checked = allChecked;

      // Determine the main checkbox label based on the number of checked checkboxes
      const checkAllLabel = mainCheckboxWrapper.dataset.pbCheckboxIndeterminateMainLabelCheck ?? 'Check All'
      const uncheckAllLabel = mainCheckboxWrapper.dataset.pbCheckboxIndeterminateMainLabelUncheck ?? 'Uncheck All'
      const text = noneChecked ? checkAllLabel : uncheckAllLabel;

      // Determine the icon class to add and remove based on the state
      const iconClassToAdd = indeterminate ? 'pb_checkbox_indeterminate' : 'pb_checkbox_checkmark';
      const iconClassToRemove = indeterminate ? 'pb_checkbox_checkmark' : 'pb_checkbox_indeterminate';

      // Update main checkbox label
      const bodyKitElement = mainCheckboxWrapper.getElementsByClassName('pb_body_kit')[0];
      if (bodyKitElement) {
        bodyKitElement.textContent = text;
      }
      
      // Add and remove the icon class to the main checkbox wrapper
      const iconSpan = mainCheckboxWrapper.querySelector('[data-pb-checkbox-icon-span]');
      if (iconSpan) {
        iconSpan.classList.add(iconClassToAdd);
        iconSpan.classList.remove(iconClassToRemove);
      }
      
      // Toggle the visibility of the checkbox icon based on the indeterminate state
      const indeterminateIcon = mainCheckboxWrapper.getElementsByClassName("indeterminate_icon")[0];
      const checkIcon = mainCheckboxWrapper.getElementsByClassName("check_icon")[0];
      
      if (indeterminateIcon) {
        indeterminateIcon.classList.toggle('hidden', !indeterminate);
      }
      if (checkIcon) {
        checkIcon.classList.toggle('hidden', indeterminate);
      }
    };

    // Function to update parent checkboxes recursively
    const updateParentCheckboxes = () => {
      const parentId = mainCheckboxWrapper.dataset.pbCheckboxIndeterminateParent;
      if (parentId) {
        const parentCheckbox = document.getElementById(parentId);
        
        if (parentCheckbox) {
          const parentWrapper = parentCheckbox.closest('[data-pb-checkbox-indeterminate-main="true"]');
          
          if (parentWrapper) {
            // Find the parent's PbCheckbox instance and call its updateMainCheckbox
            const parentInstance = parentWrapper.pbCheckboxInstance;
            
            if (parentInstance && parentInstance.updateMainCheckbox) {
              parentInstance.updateMainCheckbox();
              // Recursively update the parent's parents
              parentInstance.updateParentCheckboxes();
            }
          }
        }
      }
    };

    // Store this instance on the wrapper for parent access
    mainCheckboxWrapper.pbCheckboxInstance = {
      updateMainCheckbox,
      updateParentCheckboxes
    };

    // Set indeterminate icon on main checkbox if initial children checkboxes are checked
    updateMainCheckbox();

    // Handle main checkbox change - propagate to all descendants
    this.element.querySelector('input').addEventListener('change', function() {
      // Get all descendant checkboxes dynamically
      const allDescendantCheckboxes = getAllDescendantCheckboxes();
      
      // Calculate the current state based on descendants
      const checkedCount = allDescendantCheckboxes.filter(cb => cb.checked).length;
      const totalCount = allDescendantCheckboxes.length;
      const allChecked = checkedCount === totalCount;
      const noneChecked = checkedCount === 0;
      const wasIndeterminate = !allChecked && !noneChecked;
      
      if (wasIndeterminate) {
        // If it was indeterminate, uncheck ALL descendants and the parent
        allDescendantCheckboxes.forEach(cb => cb.checked = false);
        this.checked = false;
      } else {
        // Otherwise, set all children to the same state as this checkbox
        allDescendantCheckboxes.forEach(cb => cb.checked = this.checked);
      }
      
      // Update this checkbox first
      updateMainCheckbox();
      
      // Then update parents after a small delay to ensure state is propagated
      setTimeout(() => {
        updateParentCheckboxes();
      }, 0);
    });

    // Handle child checkbox changes - update main checkbox only
    directChildCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        updateMainCheckbox();
      });
    });

    // Listen for changes from deeper descendants to update this checkbox only
    const allDescendantCheckboxes = getAllDescendantCheckboxes();
    allDescendantCheckboxes.forEach(cb => {
      if (!Array.from(directChildCheckboxes).includes(cb)) {
        cb.addEventListener('change', () => {
          updateMainCheckbox();
        });
      }
    });

    // Also listen for changes on any checkbox that has this as a parent
    const allChildCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${this.element.id}"] input[type="checkbox"]`);
    allChildCheckboxes.forEach(cb => {
      if (!allDescendantCheckboxes.includes(cb)) {
        cb.addEventListener('change', () => {
          updateMainCheckbox();
        });
      }
    });

    // Also ensure that any checkbox that has children gets updated when its children change
    // This is for non-"main" checkboxes that have children
    const allCheckboxesWithChildren = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxesWithChildren.forEach(cb => {
      const checkboxWrapper = cb.closest('[data-pb-checkbox-indeterminate-main="true"]');
      if (checkboxWrapper && checkboxWrapper !== mainCheckboxWrapper) {
        // This is a different "main" checkbox, so we don't need to handle it here
        return;
      }
      
      // Check if this checkbox has any children
      const childCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${cb.id}"] input[type="checkbox"]`);
      if (childCheckboxes.length > 0) {
        childCheckboxes.forEach(childCb => {
          childCb.addEventListener('change', () => {
            // Update the parent checkbox state based on its children
            const checkedChildren = Array.from(childCheckboxes).filter(child => child.checked).length;
            cb.checked = checkedChildren > 0;
            cb.indeterminate = checkedChildren > 0 && checkedChildren < childCheckboxes.length;
            
            // Also trigger an update on any "main" checkbox that might be affected
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
  }
}
