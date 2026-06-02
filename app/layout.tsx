import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nimbara — Gayathri's Portfolio",
  description:
    "A cozy futuristic floating city built from projects, ideas, experiments, and curiosity. The portfolio of Gayathri — ECE student, data scientist, and designer.",
  keywords: ["portfolio", "data science", "AI", "software engineering", "graphic design", "ECE student"],
  authors: [{ name: "Gayathri" }],
  openGraph: {
    title: "Nimbara — Gayathri's Portfolio",
    description: "Engineer by training. Builder by nature. Designer at heart.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
