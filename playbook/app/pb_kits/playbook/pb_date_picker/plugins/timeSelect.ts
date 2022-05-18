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

      const cardInput = document.createElement('input'),
          cardInputId = `datePicker${text}`

      cardInput.id = cardInputId
      cardInput.name = 'datepicker-ampm'
      cardInput.type = 'radio'
      cardInput.value = text

      const cardLabel = document.createElement('label'),
      cardLabelBuffer = document.createElement('div')
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
        amCard.addEventListener('click', ({target}) => {
          console.log('Clicked AM', target)
        })

        const pmCard = generateAmPmCard('PM')
        pmCard.addEventListener('click', ({target}) => {
          console.log('Clicked PM', target)
        })

        formGroupKit.prepend(amCard)
        formGroupKit.append(pmCard)

        fp.amPM.innerHTML = ''
        fp.amPM.append(formGroupKit)
      }
    }

    return {
      onValueUpdate() {
        generateAmPmToggle()
      },
      onReady() {
        const id = fp.input.id

        if (!id || !fp?.timeContainer) return

        // // eslint-disable-next-line no-debugger
        // debugger
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
        generateAmPmToggle()

        fp.loadedPlugins.push("timeSelectPlugin")
      }
    }
  }
}

export default timeSelectPlugin
