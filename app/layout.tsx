import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import "material-symbols";
import CartDrawer from "@/components/CartDrawer";
import { getNewArrivals } from "@/utils/dataFilter";
import { ShoeProvider } from "@/contexts/ShoeContext";
import { CardDrawerContextProvider } from "@/contexts/DrawerContext";

export const metadata: Metadata = {
  title: "Sole Mates",
  description: "A platform for finding your perfect shoe match",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shoes = await getNewArrivals();
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </head>
      <body className={`antialiased bg-white/5 dark:black/5 text-foreground`}>
        <ShoeProvider>
          <CardDrawerContextProvider>
            <Header />
            {children}
            <CartDrawer />
          </CardDrawerContextProvider>
        </ShoeProvider>
      </body>
    </html>
  );
}
