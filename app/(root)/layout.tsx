import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { Children, ReactNode } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nythera Zoom",
  description: "Video Calling App",
  icons: {
    icon:'/icons/zoom.svg'
  }
};

const RootLayout = ({children} : {children :
ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout