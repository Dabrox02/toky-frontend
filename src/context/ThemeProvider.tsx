"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

function AppThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
