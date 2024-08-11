import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Input: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    field: {
      border: "none",
      borderColor: "#D7D7D7",
      borderBottom: "2px solid",
      padding: "20px",
      fontSize: "15px",
      borderRadius: "0",
      fontsize: "20px",
      _placeholder: {
        textColor: "#D7D7D7"
      }
    },
  },
  defaultProps: {
    variant: "unstyled",
  },
});
export default Input;
