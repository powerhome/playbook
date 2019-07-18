import colors from "../../tokens/_colors.scss";
import typography from "../../tokens/_typography.scss";

const pbIndicator = {
  title: {
    fontFamily: typography.font_family_base,
    color: colors.primary,
    fontSizes: {
      big: typography.font_large,
      medium: typography.font_base,
      small: typography.font_small,
      micro: typography.font_small
    }
  },
  secondaryTitle: {
    fontFamily: typography.font_family_base,
    fontSizes: {
      big: typography.font_large,
      medium: typography.font_base,
      small: typography.font_small,
      micro: typography.font_small
    }
  },
  value: {
    fontFamily: typography.font_family_base,
    color: colors.charcoal,
    fontSizes: {
      big: typography.font_jumbo,
      medium: typography.font_large,
      small: typography.font_base,
      micro: typography.font_small
    }
  },
  secondaryValue: {
    fontFamily: typography.font_family_base,
    fontSizes: {
      big: typography.font_large,
      medium: typography.font_base,
      small: typography.font_small,
      micro: typography.font_small
    }
  }
};

export default pbIndicator;
