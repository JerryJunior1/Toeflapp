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
      <body suppressHydrationWarning className="bg-background text-on-surface font-body min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
