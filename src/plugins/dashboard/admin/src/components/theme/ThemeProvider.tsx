"use client"


import React, { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "./Theme";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function ChakraThemeProvider({ children }: Props) {
  return <ChakraProvider theme={Theme}>{children}</ChakraProvider>;
}
