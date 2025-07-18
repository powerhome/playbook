import PbEnhancedElement from "../pb_enhanced_element"

const INDETERMINATE_MAIN_CHECKBOX_SELECTOR = "[data-pb-checkbox-indeterminate-main='true']"

export default class PbCheckbox extends PbEnhancedElement {
  static get selector() {
    return INDETERMINATE_MAIN_CHECKBOX_SELECTOR
  }

  connect() {
    const mainCheckboxWrapper = this.element;
    const mainCheckbox = mainCheckboxWrapper.querySelector('input')
    const childCheckboxes = document.querySelectorAll(`[data-pb-checkbox-indeterminate-parent="${this.element.id}"] input[type="checkbox"]`);

    const updateMainCheckbox = () => {
      // Count the number of checked child checkboxes
      const checkedCount = Array.from(childCheckboxes).filter(cb => cb.checked).length;
      // Determine if the main checkbox should be in an indeterminate state
      const indeterminate = checkedCount > 0 && checkedCount < childCheckboxes.length;
      
      // Set the main checkbox states
      mainCheckbox.indeterminate = indeterminate;
      mainCheckbox.checked = checkedCount > 0;

      // Determine the main checkbox label based on the number of checked checkboxes
      const checkAllLabel = mainCheckboxWrapper.dataset.pbCheckboxIndeterminateMainLabelCheck ?? 'Check All'
      const uncheckAllLabel = mainCheckboxWrapper.dataset.pbCheckboxIndeterminateMainLabelUncheck ?? 'Uncheck All'
      const text = checkedCount === 0 ? checkAllLabel : uncheckAllLabel;

      // Determine the icon class to add and remove based on the number of checked checkboxes
      const iconClassToAdd = checkedCount === 0 ? 'pb_checkbox_checkmark' : 'pb_checkbox_indeterminate';
      const iconClassToRemove = checkedCount === 0 ? 'pb_checkbox_indeterminate' : 'pb_checkbox_checkmark';

      // Update main checkbox label
      mainCheckboxWrapper.getElementsByClassName('pb_body_kit')[0].textContent = text;
      
      // Add and remove the icon class to the main checkbox wrapper
      mainCheckboxWrapper.querySelector('[data-pb-checkbox-icon-span]').classList.add(iconClassToAdd);
      mainCheckboxWrapper.querySelector('[data-pb-checkbox-icon-span]').classList.remove(iconClassToRemove);
      
      // Toggle the visibility of the checkbox icon based on the indeterminate state
      mainCheckboxWrapper.getElementsByClassName("indeterminate_icon")[0].classList.toggle('hidden', !indeterminate);
      mainCheckboxWrapper.getElementsByClassName("check_icon")[0].classList.toggle('hidden', indeterminate);
    };

    // Set indeterminate icon on main checkbox if initial children checkboxes are checked
    updateMainCheckbox();

    this.element.querySelector('input').addEventListener('change', function() {
      childCheckboxes.forEach(cb => cb.checked = this.checked);
      updateMainCheckbox();
    });

    childCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateMainCheckbox);
    });
  }
}
