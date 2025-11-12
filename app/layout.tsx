import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import "material-symbols";

export const metadata: Metadata = {
  title: "Sole Mates",
  description: "A platform for finding your perfect shoe match",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </head>
      <body className={`antialiased bg-white/5 dark:black/5 text-foreground`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
