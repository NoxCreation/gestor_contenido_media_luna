import { ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Textarea: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    border: "none",
    borderColor: "#ff33ff",
    borderBottom: "2px solid",
    padding: "20px",
    fontSize: "15px",
    borderRadius: "0",
    fontsize: "20px",
    _placeholder: {
      textColor: "textGray",
    },
  },
  defaultProps: {
    variant: "unstyled",
  },
});
export default Textarea;
