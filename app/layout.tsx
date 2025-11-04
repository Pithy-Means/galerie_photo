import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "In the Beginning Was the Word | Divine Grace",
  description: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life. Walk in faith, hope, and love as we share the Gospel of Jesus Christ and the transforming power of His Word.",
  keywords: [
    "Jesus Christ",
    "Gospel",
    "Faith",
    "Bible",
    "Christian",
    "Salvation",
    "Grace",
    "Holy Spirit",
    "Word of God",
    "Scripture",
    "Prayer",
    "Worship",
  ],
  authors: [{ name: "Blessed by His Grace" }],
  creator: "Servant of the Most High God",
  publisher: "Ministry of the Living Word",
  openGraph: {
    title: "The Word Became Flesh | Kingdom of Heaven",
    description: "I am the way, the truth, and the life. No one comes to the Father except through Me. - John 14:6. Experience the love of Christ and the power of His resurrection.",
    siteName: "Eternal Life in Christ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust in the Lord with All Your Heart",
    description: "Be strong and courageous. Do not be afraid or discouraged, for the Lord your God is with you wherever you go. - Joshua 1:9",
    creator: "@BlessedInChrist",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: "Kingdom Gateway - Proclaiming His Glory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
