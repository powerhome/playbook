import { Plugin } from "flatpickr/dist/types/options";
import { Instance } from "flatpickr/dist/types/instance";
import { createElement } from "flatpickr/dist/esm/utils/dom";
import { int } from "flatpickr/dist/esm/utils";

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

    const createAmPm = () => {
      const {
        config,
        l10n,
      } = fp
      if (!config.time_24hr) {
        // add self.amPM if appropriate
        fp.amPM = createElement(
          "span",
          "flatpickr-am-pm time-selection-am-pm",
          l10n.amPM[
            int(
              (fp.latestSelectedDateObj
                ? fp.hourElement.value
                : config.defaultHour) > 11
            )
          ]
        );
        fp.amPM.title = l10n.toggleTitle;
        fp.amPM.tabIndex = -1;
        fp.timeContainer.appendChild(fp.amPM);
      }
      return fp.timeContainer;
    }

    return {
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

        createAmPm()

        fp.loadedPlugins.push("timeSelectPlugin")
      }
    }
  }
}

export default timeSelectPlugin
