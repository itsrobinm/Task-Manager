import type { Metadata } from "next";
import "./globals.scss";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import React from "react";



export const metadata: Metadata = {
  title: "Task Manager",
  description: "A site to help you manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
