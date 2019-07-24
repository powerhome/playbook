import colors from "../tokens/_colors.scss";
import typography from "../tokens/_typography.scss";

const pbIndicator = {
  title: {
    fontFamily: typography.font_family_base,
    color: colors.primary,
    fontSizes: {
      big: typography.text_large,
      medium: typography.text_base,
      small: typography.text_small,
      micro: typography.text_small
    }
  },
  secondaryTitle: {
    fontFamily: typography.font_family_base,
    fontSizes: {
      big: typography.text_large,
      medium: typography.text_base,
      small: typography.text_small,
      micro: typography.text_small
    }
  },
  value: {
    fontFamily: typography.font_family_base,
    color: colors.charcoal,
    fontSizes: {
      big: typography.text_jumbo,
      medium: typography.text_large,
      small: typography.text_base,
      micro: typography.text_small
    }
  },
  secondaryValue: {
    fontFamily: typography.font_family_base,
    fontSizes: {
      big: typography.text_large,
      medium: typography.text_base,
      small: typography.text_small,
      micro: typography.text_small
    }
  }
};

export default pbIndicator;
