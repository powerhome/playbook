import flatpickr from 'flatpickr';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import weekSelect from "flatpickr/dist/plugins/weekSelect/weekSelect";
import timeSelectPlugin from './plugins/timeSelect';
import quickPickPlugin from './plugins/quickPick';
const getPositionElement = (element) => {
    return (typeof element === 'string') ? document.querySelectorAll(element)[0] : element;
};
const datePickerHelper = (config, scrollContainer) => {
    const noop = () => {
        // intentionally left empty as a no-op placeholder
    };
    const { allowInput, closeOnSelect = true, customQuickPickDates = { override: true, dates: [] }, defaultDate, disableDate, disableRange, disableWeekdays, enableTime, format, maxDate, minDate, mode, onChange = noop, onClose = noop, pickerId, plugins, position = "auto", positionElement, required, selectionType, showTimezone, staticPosition = true, thisRangesEndToday = false, timeCaption = 'Select Time', timeFormat = 'at h:i K', yearRange, } = config;
    // ===========================================================
    // |                   Hook Definitions                      |
    // ===========================================================
    const defaultDateGetter = () => {
        if (defaultDate === '') {
            return null;
        }
        else {
            return defaultDate;
        }
    };
    const disabledWeekDays = () => {
        return ([
            (date) => {
                const weekdayObj = {
                    Sunday: 0,
                    Monday: 1,
                    Tuesday: 2,
                    Wednesday: 3,
                    Thursday: 4,
                    Friday: 5,
                    Saturday: 6,
                };
                return (date.getDay() === weekdayObj[disableWeekdays[0]] ||
                    date.getDay() === weekdayObj[disableWeekdays[1]] ||
                    date.getDay() === weekdayObj[disableWeekdays[2]] ||
                    date.getDay() === weekdayObj[disableWeekdays[3]] ||
                    date.getDay() === weekdayObj[disableWeekdays[4]] ||
                    date.getDay() === weekdayObj[disableWeekdays[5]] ||
                    date.getDay() === weekdayObj[disableWeekdays[6]]);
            },
        ]);
    };
    const disabledParser = () => {
        const disabledArray = [];
        disableDate && disableDate.length > 0 && disabledArray.push(...disableDate);
        disableRange && disableRange.length > 0 && disabledArray.push(...disableRange);
        disableWeekdays && disableWeekdays.length > 0 && disabledArray.push(...disabledWeekDays());
        return disabledArray;
    };
    const calendarResizer = () => {
        const cal = document.querySelector(`#cal-${pickerId}.open`);
        const parentInput = cal.parentElement;
        if ((cal === null || cal === void 0 ? void 0 : cal.getBoundingClientRect().right) > window.innerWidth) {
            parentInput.style.display = 'flex';
            parentInput.style.justifyContent = 'center';
        }
        if (cal.offsetWidth <= parentInput.offsetWidth) {
            parentInput.style.display = '';
            parentInput.style.justifyContent = '';
        }
    };
    const setPlugins = (thisRangesEndToday, customQuickPickDates) => {
        const pluginList = [];
        // month and week selection
        if (selectionType === "month" || plugins.length > 0) {
            pluginList.push(monthSelectPlugin({ shorthand: true, dateFormat: 'F Y', altFormat: 'F Y' }));
        }
        else if (selectionType === "week") {
            pluginList.push(weekSelect());
        }
        else if (selectionType === "quickpick") {
            //------- QUICKPICK VARIANT PLUGIN -------------//
            pluginList.push(quickPickPlugin(thisRangesEndToday, customQuickPickDates));
        }
        // time selection
        if (enableTime)
            pluginList.push(timeSelectPlugin({ caption: timeCaption, showTimezone: showTimezone }));
        return pluginList;
    };
    const getDateFormat = () => {
        return enableTime ? `${format} ${timeFormat}` : format;
    };
    // Attach / detach to / from scroll events
    const initialPicker = document.querySelector(`#${pickerId}`)._flatpickr;
    const scrollEvent = () => {
        initialPicker._positionCalendar();
    };
    function attachToScroll(scrollParent) {
        var _a;
        (_a = document.querySelectorAll(scrollParent)[0]) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", scrollEvent, { passive: true });
    }
    function detachFromScroll(scrollParent = document.body) {
        var _a;
        (_a = document.querySelectorAll(scrollParent)[0]) === null || _a === void 0 ? void 0 : _a.removeEventListener("scroll", scrollEvent);
    }
    // two way binding
    const yearChangeHook = (fp) => {
        var _a;
        const yearInput = document.querySelector(`#year-${fp.input.id}`);
        yearInput.value = (_a = fp.currentYear) === null || _a === void 0 ? void 0 : _a.toString();
    };
    // ===========================================================
    // |             Flatpickr initializer w/ config             |
    // ===========================================================
    flatpickr(`#${pickerId}`, {
        allowInput,
        closeOnSelect,
        disableMobile: true,
        dateFormat: getDateFormat(),
        defaultDate: defaultDateGetter(),
        disable: disabledParser(),
        enableTime,
        locale: {
            rangeSeparator: ' to '
        },
        maxDate,
        minDate,
        mode,
        nextArrow: '<i class="far fa-angle-right"></i>',
        onOpen: [() => {
                calendarResizer();
                window.addEventListener('resize', calendarResizer);
                if (!staticPosition && scrollContainer)
                    attachToScroll(scrollContainer);
            }],
        onClose: [(selectedDates, dateStr) => {
                window.removeEventListener('resize', calendarResizer);
                if (!staticPosition && scrollContainer)
                    detachFromScroll(scrollContainer);
                onClose(selectedDates, dateStr);
            }],
        onChange: [(selectedDates, dateStr, fp) => {
                yearChangeHook(fp);
                onChange(dateStr, selectedDates);
            }],
        onYearChange: [(_selectedDates, _dateStr, fp) => {
                yearChangeHook(fp);
            }],
        plugins: setPlugins(thisRangesEndToday, customQuickPickDates),
        position,
        positionElement: getPositionElement(positionElement),
        prevArrow: '<i class="far fa-angle-left"></i>',
        static: staticPosition,
    });
    // Assign dynamically sourced flatpickr instance to variable
    const picker = document.querySelector(`#${pickerId}`)._flatpickr;
    picker.innerContainer.parentElement.id = `cal-${pickerId}`;
    // replace year selector with dropdown
    picker.yearElements[0].parentElement.innerHTML = `<select class="numInput cur-year" type="number" tabIndex="-1" aria-label="Year" id="year-${pickerId}"></select>`;
    // create html option tags for desired years
    let years = '';
    for (let year = yearRange[1]; year >= yearRange[0]; year--) {
        years += `<option value="${year}">${year}</option>`;
    }
    // variablize each dropdown selector
    const dropdown = document.querySelector(`#year-${pickerId}`);
    // inject year options into dropdown and assign it the flatpickr's current year value
    dropdown.innerHTML = years;
    dropdown.value = picker.currentYear;
    // whenever a new year is selected from dropdown update flatpickr's current year value
    dropdown.addEventListener('input', (e) => {
        picker.changeYear(Number(e.target.value));
    });
    // Reverse month and year dropdown reset on form.reset()
    if (picker.input.form) {
        picker.input.form.addEventListener('reset', () => {
            // Code block triggers after form.reset() is called and executed
            setTimeout(() => {
                dropdown.value = picker.currentYear;
                picker.monthsDropdownContainer.value = picker.currentMonth;
                /* Reset date picker to default value on form.reset() */
                if (defaultDate) {
                    picker.setDate(defaultDate);
                    yearChangeHook(picker);
                }
            }, 0);
        });
    }
    // Adding dropdown icons to year and month selects
    dropdown.insertAdjacentHTML('afterend', '<i class="far fa-angle-down year-dropdown-icon" id="test-id"></i>');
    if (picker.monthElements[0].parentElement) {
        return picker.monthElements[0].insertAdjacentHTML('afterend', '<i class="far fa-angle-down month-dropdown-icon"></i>');
    }
    // if (picker.weekElements[0].parentElement){
    //   return  picker.weekElements[0].insertAdjacentHTML('afterend', '<i class="far fa-angle-down year-dropdown-icon" id="test-id"></i>')
    // }
    // Remove readonly attribute for validation and or text input
    if (allowInput) {
        picker.input.removeAttribute('readonly');
    }
    if (required) {
        picker.input.removeAttribute('readonly');
        picker.input.addEventListener('keydown', (e) => e.preventDefault());
        picker.input.style.caretColor = 'transparent';
        picker.input.style.cursor = 'pointer';
    }
    // Fix event bubbling bug on wrapper
    document.querySelector(`#${pickerId}`).parentElement.addEventListener('click', (e) => e.stopPropagation());
};
export default datePickerHelper;
//# sourceMappingURL=date_picker_helper.js.map