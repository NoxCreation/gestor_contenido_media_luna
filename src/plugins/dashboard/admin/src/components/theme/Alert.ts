import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const Alert: ComponentStyleConfig = {
  baseStyle: ({ isDisabled, colorMode }) => ({}),

  variants: {
    success: {
      container: {
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "success.500",
        backgroundColor: "success.100",
        padding: "16px",
      },
      title: {
        color: "white",
      },
      description: {
        color: "white",
      },
      icon: {
        color: "white",
      },
      spinner: {
        color: "white",
      },
    },
    error: {
      container: {
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "error.500",
        backgroundColor: "error.100",
        padding: "16px",
      },
      title: {
        color: "white",
      },
      description: {
        color: "white",
      },
      icon: {
        color: "white",
      },
      spinner: {
        color: "white",
      },
    },
    warning: {
      container: {
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "warning.500",
        backgroundColor: "warning.100",
        padding: "16px",
      },
      title: {
        color: "white",
      },
      description: {
        color: "white",
      },
      icon: {
        color: "white",
      },
      spinner: {
        color: "white",
      },
    },
  },

  defaultProps: {
    variant: 'success',
  },
}

export default Alert
