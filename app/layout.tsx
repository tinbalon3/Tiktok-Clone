import type { Metadata } from "next";

import "./globals.css";
import StagewiseWrapper from "./components/tools/StagewiseWrapper";

export const metadata: Metadata = {
  title: "Tiktok Clone",
  description: "Tiktok Clone using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <StagewiseWrapper />
      </body>
    </html>
  );
}
