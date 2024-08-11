import { ThemeConfig, extendTheme } from "@chakra-ui/react";

import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";
import Slider from "./Slider";
import Heading from "./Heading";
import Alert from "./Alert";

const Theme: ThemeConfig = extendTheme({
  fonts: {
    /* default: "Cormorant Garamond",
    heading: "Cormorant Garamond",
    body: "Cormorant Garamond", */
  },

  // Custom Colors
  colors: {
    brand: "#D1B06B",
    bgDarkest: "#161d27",
    bgMid: "#555f6d",
    bgLight: "#2e3947",
    bgDark: "#1f2732",
    bgDarkOpacity: "rgba(31, 39, 50, 0.9)",
    textGray: "#d7d7d7",
    textDarkGray: "#909090",
    borderDivider: "#4e555f",
    borderDividerLight: "#C5C5C5",
    success: {
      500: '#4BEDC5',
      400: '#1EE9B6',
      300: '#1EE9B6',
      200: '#1BD2A4',
      100: '#18BA92',
    },

    warning: {
      500: '#FFE576',
      400: '#FFE165',
      300: '#FFDE54',
      200: '#E6C84C',
      100: '#CCB243',
    },

    error: {
      500: '#F65354',
      400: '#F53E3E',
      300: '#F42829',
      200: '#DC2425',
      100: '#C32021',
    },

    info: {
      500: '#3363FF',
      400: '#1A50FF',
      300: '#003CFF',
      200: '#0036E6',
      100: '#0030CC',
    },

    text: {
      DEFAULT: "white",
    },
  },

  components: {
    Heading,
    Button,
    Input,
    Textarea,
    Slider,
    Alert
  },
});

export default Theme;
