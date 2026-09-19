import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgniCycle — AI Biomass Exchange",
  description: "Estimate crop residue, find viable biomass buyers, create contracts and optimize collection routes.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
