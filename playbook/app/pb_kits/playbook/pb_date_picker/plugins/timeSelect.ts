import { Plugin } from "flatpickr/dist/types/options";
import { Instance } from "flatpickr/dist/types/instance";

export type TimeSelection = {
  caption?: string,
  showTimezone?: string,
};

function timeSelectPlugin(props: TimeSelection): Plugin {
  return function(fp: Instance) {

    const getTimezoneText = () => {
      const tzAbbr = fp._initialDate.toLocaleDateString('en-US', {
        day: '2-digit',
        timeZoneName: 'short',
      }).slice(4)
      const tzText = fp._initialDate.toLocaleDateString('en-US', {
        day: '2-digit',
        timeZoneName: 'long',
      }).slice(4)
      return `${tzAbbr} (${tzText})`
    }

    const generateAmPmCard = (text: 'AM' | 'PM') => {
      const selectableCard = document.createElement('div')
      selectableCard.className = 'pb_selectable_card_kit_enabled'

      // eslint-disable-next-line no-debugger
      // debugger

      const cardInput = document.createElement('input'),
          cardInputId = `datePicker${text}`

      cardInput.id = cardInputId
      cardInput.name = 'datepicker-ampm'
      cardInput.type = 'radio'
      cardInput.value = text

      const cardLabel = document.createElement('label'),
      cardLabelBuffer = document.createElement('div')
      cardLabel.className = `label-${text.toLowerCase()}`
      cardLabel.setAttribute('for', cardInputId)
      cardLabelBuffer.className = 'buffer'
      cardLabelBuffer.innerHTML = text

      cardLabel.append(cardLabelBuffer)
      selectableCard.prepend(cardInput)
      selectableCard.append(cardLabel)

      return selectableCard
    }

    const generateAmPmToggle = () => {
      if (fp.amPM) {
        const formGroupKit = document.createElement('div')
        formGroupKit.className = 'pb_form_group_kit'

        const amCard = generateAmPmCard('AM')
        amCard.addEventListener('click', () => {
          // eslint-disable-next-line no-debugger
          // debugger
          fp.selectedDates[0].setHours((fp.selectedDates[0].getHours() % 12) + 12 * 0)
          fp.setDate(fp.selectedDates[0], true)
        })

        const pmCard = generateAmPmCard('PM')
        pmCard.addEventListener('click', () => {
          // eslint-disable-next-line no-debugger
          debugger
          fp.selectedDates[0].setHours((fp.selectedDates[0].getHours() % 12) + 12)
          fp.setDate(fp.selectedDates[0], true)
        })

        formGroupKit.prepend(amCard)
        formGroupKit.append(pmCard)

        fp.amPM.innerHTML = ''
        fp.amPM.append(formGroupKit)
      }
    }

    const getMeridiem = (dateObj: Date[]) => {
      return parseInt(dateObj[0].toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).split(':')[0]) > 12 ? 'PM' : 'AM'
    }

    const updateAmPmToggle = () => {
      if (!fp.selectedDates.length) return

      const uncheckedClass = 'pb_selectable_card_kit_enabled',
        checkedClass = 'pb_selectable_card_kit_checked_enabled',
        pickerAM = document.getElementById('datePickerAM'),
        pickerPM = document.getElementById('datePickerPM'),
        meridiem = getMeridiem(fp.selectedDates)

      // eslint-disable-next-line no-debugger
      // debugger

      // const hoursMil = (dateObj[0].getHours() % 12) + 12

      if (meridiem === 'PM') {
        pickerPM.parentElement.className = checkedClass
        pickerAM.parentElement.className = uncheckedClass
      } else if (meridiem === 'AM') {
        pickerAM.parentElement.className = checkedClass
        pickerPM.parentElement.className = uncheckedClass
      }
    }

    const renderAmPm = () => {
      generateAmPmToggle()
      updateAmPmToggle()
    }

    return {
      onValueUpdate() {
        renderAmPm()
      },
      onReady() {
        const id = fp.input.id

        if (!id || !fp?.timeContainer) return

        fp.timeContainer.classList.add('pb_time_selection')

        // add caption text
        if (props.caption) {
          const captionContainer = document.createElement('div')
          captionContainer.className = 'pb_caption_kit_md'
          captionContainer.innerHTML = props?.caption
          fp.timeContainer.prepend(captionContainer)
        }

        // add timezone text
        if (props.showTimezone) {
          const subcaptionContainer = document.createElement('div')
          subcaptionContainer.className = 'pb_caption_kit_xs'
          subcaptionContainer.innerHTML = getTimezoneText()
          fp.timeContainer.append(subcaptionContainer)
        }

        // const icon = document.createElement('i')
        // icon.className = 'pb_icon_kit far fa-fw fa-user mr_sm'
        // fp.amPM.prepend(icon)

        // eslint-disable-next-line no-debugger
        // debugger
        // if (this.selectedDates.length > 0) getMeridiem(this.selectedDates)
        renderAmPm()

        fp.loadedPlugins.push("timeSelectPlugin")
      }
    }
  }
}

export default timeSelectPlugin
