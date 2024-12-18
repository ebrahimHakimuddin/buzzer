import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: "buzz.svg",
  title: "Buzzer",
  description: "A simple Buzzer App for games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
