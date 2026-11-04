import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "21 Questions — Couples",
  description: "How well do you know each other? Make a challenge, share the link, and find out.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
