import appConfig from 'config/appConfig';
import FontSizes from 'scss/variables/_fontSizes.scss';

const { Colors } = appConfig;

export const energyUITheme = {
  UTTextInput: {
    underline: {
      hover: { borderBottom: `1px solid ${Colors.gray}` },
      disabled: { borderBottom: `1px solid ${Colors.disabledGray}` },
      focused: { borderBottom: `2px solid ${Colors.inputPrimary}` },
      base: { borderBottom: `2px solid ${Colors.inputPrimary}` },
      unfocused: { borderBottom: `1px solid ${Colors.gray}` }
    },
    formLabel: {
      color: Colors.gray,
      errorColor: Colors.gray,
      focusedColor: Colors.inputPrimary,
      focusedErrorColor: Colors.error
    }
  },
  UTLabel: {
    base: {
      fontSize: FontSizes.medium
    },
    primary: {
      color: Colors.inputPrimary
    },
    gray: {
      color: Colors.gray
    },
    error: {
      color: Colors.error
    }
  },
  UTButton: {
    base: {
      backgroundColor: Colors.primaryButton,
      color: Colors.white,
      hover: {
        backgroundColor: Colors.primaryButtonHover
      }
    },
    baseText: {
      color: Colors.primaryButton,
      hover: {
        backgroundColor: Colors.primaryTextButtonHover
      }
    },
    disabled: {
      backgroundColor: Colors.disabledGray,
      color: Colors.white
    },
    disabledText: {
      color: Colors.disabledGray
    },
    loading: {
      color: Colors.primaryButton
    }
  },
  Fonts: {
    fontFamily: 'Poppins',
    small: FontSizes.small,
    medium: FontSizes.medium,
    large: FontSizes.large
  }
};
