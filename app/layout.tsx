import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/providers/tanstackQuery";
import { SessionProvider } from "@/providers/SessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voting Game",
  description: "A fun joke voting app built with Next.js",
  keywords: ["voting game", "jokes", "fun app", "Next.js", "React"],
  authors: [
    { name: "Dragan Ignjatovuc", url: "https://www.draganignjatovic.com" },
  ],
  openGraph: {
    title: "Voting Game - The Funniest Joke Wins!",
    description: "Vote for the funniest joke in this entertaining app!",
    url: "https://yourwebsite.com",
    siteName: "Voting Game",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Voting Game - Vote for the Funniest Joke",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voting Game - The Funniest Joke Wins!",
    description: "Vote for the funniest joke in this entertaining app!",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <TanstackProvider>
        <SessionProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </SessionProvider>
      </TanstackProvider>
    </html>
  );
}
