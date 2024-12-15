/* eslint-disable @next/next/no-sync-scripts */
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { ReactQueryProvider } from "@/components/providers/query-client-provider";

export const metadata: Metadata = {
  title: "Tokymail",
  description: "Filter Webmail App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <ReactQueryProvider>
          <head>
            <script src="http://localhost:8097"></script>
          </head>
          <body className="min-w-[400px]">
            <Toaster richColors duration={2000} />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
