import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers/providers";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrenchGuestPost - Content Marketplace",
  description: "Find and buy high-quality content services for your website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "min-h-screen bg-background antialiased")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

