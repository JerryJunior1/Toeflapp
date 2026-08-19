import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOEFL Prep 2026",
  description: "Professional Academic Preparation for TOEFL iBT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
