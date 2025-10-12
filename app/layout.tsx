import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "ELITEIIT Marketing Tools",
  description: "AI-powered marketing tools for ELITEIIT Coaching Institute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
