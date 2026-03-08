"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

export function Provider({ children }) {
  return (
    <ChakraProvider>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
