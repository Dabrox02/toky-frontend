import AppThemeProvider from "@/context/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toky Mail",
  description: "Filter Webmail App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <AppThemeProvider>{children}+ </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
