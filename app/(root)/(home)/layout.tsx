import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { Children, ReactNode } from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nythera Zoom",
  description: "Video Calling App",
  icons: {
    icon:'/icons/zoom.svg'
  }
};

const HomeLayout = ({children} : {children :
ReactNode }) => {
  return (
    <main className='relative'>
        <Navbar/>

        <div className='flex'>
            <Sidebar />
            <section className="flex min-h-screen flex-1 flex-col px-6 pt-28 max-md:pd-14 sm:px-14">

                <div className='w-full'>
                {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout