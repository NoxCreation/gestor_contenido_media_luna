import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Slider: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    thumb: {
      backgroundColor: "bgDark",
      _focus: {
        boxShadow: "none",
        outline: "none",
        border: "none",
      },
    },
    filledTrack: {
      backgroundColor: "bgDark",
    },
    track: {
      backgroundColor: "white",
      borderRadius: "none",
    },
  },
});

export default Slider;
