import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nythera Zoom",
  description: "Video Calling App",
  icons: {
    icon:'/icons/zoom.svg'
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children} {/* Jangan dikomentari */}
      </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
