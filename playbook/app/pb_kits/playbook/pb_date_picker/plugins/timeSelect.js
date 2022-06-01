export const getTimezoneText = (inputDate) => {
  const tzAbbr = inputDate.toLocaleDateString('en-US', {
    day: '2-digit',
    timeZoneName: 'short',
  }).slice(4)
  const tzText = inputDate.toLocaleDateString('en-US', {
    day: '2-digit',
    timeZoneName: 'long',
  }).slice(4)
  return `${tzAbbr} (${tzText})`
}

function timeSelectPlugin(props) {
  return function(fp) {

    const generateMeridiemCard = (text) => {
      const selectableCard = document.createElement('div')
      selectableCard.className = 'pb_selectable_card_kit_enabled'

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

    const generateMeridiemToggle = () => {
      fp.amPM.style.display = 'none'
      const formGroupKit = document.createElement('div')
      formGroupKit.className = 'pb_form_group_kit'

      const amCard = generateMeridiemCard('AM')
      amCard.addEventListener('click', () => {
        fp.selectedDates[0].setHours((fp.selectedDates[0].getHours() % 12) + 12 * 0)
        fp.setDate(fp.selectedDates[0], true)
      })

      const pmCard = generateMeridiemCard('PM')
      pmCard.addEventListener('click', () => {
        fp.selectedDates[0].setHours((fp.selectedDates[0].getHours() % 12) + 12 * 1)
        fp.setDate(fp.selectedDates[0], true)
      })

      formGroupKit.prepend(amCard)
      formGroupKit.append(pmCard)

      const meridiemContainer = document.createElement('div')
      meridiemContainer.className = 'meridiem'
      meridiemContainer.append(formGroupKit)
      document.querySelector('.pb_time_selection').append(meridiemContainer)
    }

    const getMeridiem = (dateObj) => {
      return dateObj[0].getHours() < 12 ? 'AM' : 'PM'
    }

    const updateMeridiemToggle = (forceClick) => {
      if (!fp.selectedDates.length) return

      const uncheckedClass = 'pb_selectable_card_kit_enabled',
        checkedClass = 'pb_selectable_card_kit_checked_enabled',
        pickerAM = document.getElementById('datePickerAM'),
        pickerPM = document.getElementById('datePickerPM'),
        meridiem = getMeridiem(fp.selectedDates)

      if (forceClick) {
        pickerAM.checked = false
        pickerPM.checked = false
        pickerPM.checked = meridiem === 'PM'
        pickerAM.checked = meridiem === 'AM'
      }

      if (meridiem === 'PM') {
        pickerPM.parentElement.className = checkedClass
        pickerAM.parentElement.className = uncheckedClass
      } else if (meridiem === 'AM') {
        pickerAM.parentElement.className = checkedClass
        pickerPM.parentElement.className = uncheckedClass
      }
    }

    return {
      onValueUpdate() {
        updateMeridiemToggle()
      },
      onReady() {
        const id = fp.input.id

        if (!id || !fp?.timeContainer) return

        fp.timeContainer.classList.add('pb_time_selection')

        // allow single minutes
        fp.minuteElement.step = '1'

        // add caption text
        if (props.caption) {
          const captionContainer = document.createElement('div')
          captionContainer.className = 'pb_caption_kit_md'
          captionContainer.innerHTML = props?.caption
          fp.timeContainer.prepend(captionContainer)
        }

        // add meridiem toggle
        generateMeridiemToggle()
        updateMeridiemToggle(true)

        // add timezone text
        if (props.showTimezone) {
          const subcaptionContainer = document.createElement('div')
          subcaptionContainer.className = 'pb_caption_kit_xs'
          subcaptionContainer.innerHTML = getTimezoneText(fp._initialDate)
          fp.timeContainer.append(subcaptionContainer)
        }

        fp.loadedPlugins.push("timeSelectPlugin")
      }
    }
  }
}

export default timeSelectPlugin
