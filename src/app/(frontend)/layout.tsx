import type { Metadata } from "next";
import { PT_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { AppQueryProvider } from "@/lib/query";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter-v",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Articulate",
  description: "Baydreaming's custom articulate card creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ptSerif.variable} ${inter.variable} font-inter antialiased text-black bg-black/5`}
      >
        <AppQueryProvider>
          <Nav />
          {children}
        </AppQueryProvider>
      </body>
    </html>
  );
}
