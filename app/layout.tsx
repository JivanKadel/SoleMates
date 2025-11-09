import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sole Mates",
  description: "A platform for finding your perfect shoe match",
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
