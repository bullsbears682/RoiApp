import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "@/contexts/auth-context";
// import { Header } from "@/components/header"; // Header also commented out as it uses AuthProvider

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ROI Calculator Pro - Professional Business ROI Analysis",
  description: "Calculate your business ROI with our professional tool. Support for 77+ business types across 26 countries with real-time calculations and detailed insights.",
  keywords: "ROI calculator, business analysis, financial planning, investment returns, business metrics",
  authors: [{ name: "ROI Calculator Pro" }],
  openGraph: {
    title: "ROI Calculator Pro",
    description: "Professional ROI calculations for your business",
    type: "website",
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
        <title>ROI Calculator Pro</title>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <main>
          {/* Temporarily disabled AuthProvider for debugging */}
          {/* <AuthProvider> */}
            {/* <Header /> */}
            {children}
          {/* </AuthProvider> */}
        </main>
      </body>
    </html>
  );
}
