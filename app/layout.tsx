import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nimbara — Welcome to my Portfolio Website!",
  description:
    "The portfolio of Gayathri Menon — ECE student at VIT, AI & ML builder, and designer. Welcome to Nimbara.",
  keywords: [
    "Gayathri Menon",
    "portfolio",
    "AI",
    "machine learning",
    "ECE",
    "VIT",
    "software engineering",
    "graphic design",
  ],
  authors: [{ name: "Gayathri Menon" }],
  openGraph: {
    title: "Nimbara — Gayathri Menon",
    description: "Gayathri Menon — ECE student, AI builder, and designer. Welcome to Nimbara.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}