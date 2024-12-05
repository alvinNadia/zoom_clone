import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import 'react-datepicker/dist/react-datepicker.css'

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nythera Zoom",
  description: "Video Calling App",
  icons: {
    icon:'/icons/zoom.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    //     {children}
    //   </body>
    // </html>
      <html lang="en">
        <ClerkProvider
          appearance={{
            layout: {
              logoImageUrl: '/icons/zoom.svg',
              socialButtonsVariant: 'iconButton'
            },
            variables: {
              colorText: '#fff',
              colorPrimary: '#0E78F9',
              colorBackground: '#1c1f2e',
              colorInputBackground: '#252a41',
              colorInputText: '#fff'

            }
          }}
        >
          <body className={`${inter.className} bg-dark-2`}>
            {children}
            <Toaster />
          </body>
        </ClerkProvider>
      </html>
    );
}