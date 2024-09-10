'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '../common/Topbar';
import Footer from '../common/Footer';


function DefaultLayout({ children }) {

  const pathname = usePathname()
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default DefaultLayout
