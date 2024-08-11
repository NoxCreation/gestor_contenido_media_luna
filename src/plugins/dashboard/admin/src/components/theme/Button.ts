import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Button: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    fontFamily: "fonts.body",
    borderRadius: 0,
    fontWeight: "normal",
    paddingY: "25px",
    paddingX: "50px",
    transition: "filter .2s ease, background-color .2s ease",
    fontSize: "18px",

    _hover: {
      filter: "brightness(1.2)",
    },
  },

  variants: {
    primary: {
      backgroundColor: "brand",
      color: "bgDark",
      fontSize: "18px",
      fontWeight: "700",
    },

    secondary: {
      backgroundColor: "#FFFFFF1A",
      color: "textGray",
      fontSize: "18px",
      fontWeight: "700",

      _hover: {
        backgroundColor: "#FFFFFF3F",
      }
    },

    outlined: {
      backgroundColor: "bgDark",
      backdropFilter: "opacity(0.4)",
      color: "textGray",
      borderColor: "brand",
      borderWidth: "2px",
      boxSizing: "border-box"
    },
  },
});

export default Button;
